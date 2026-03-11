import { Component, input, computed, signal, output, ViewChild, ViewChildren, ElementRef, QueryList, AfterViewInit, OnDestroy, effect } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MenuBar } from '@angular/aria/menu';
import { RouterModule } from '@angular/router';
import { NavLink } from '../nav-link/nav-link';
import { Dropdown, DropdownItem } from '../dropdown/dropdown';
import { UserProfile } from '../profile-menu/profile-menu';
import { Observable, of } from 'rxjs';

export interface NavItem {
  label: string;
  link?: string;
  active?: boolean;
  subMenu?: DropdownItem[];
}

@Component({
  selector: 'app-nav',
  imports: [CommonModule, NgOptimizedImage, MenuBar, RouterModule, NavLink, Dropdown],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements AfterViewInit, OnDestroy {
  // test
  items = input<NavItem[]>([]);
  maxVisibleItems = input<number>(99);
  readonly isMobile = signal(window.matchMedia('(max-width: 768px)').matches);
  // Inputs issus des images
  rounded = input<boolean>(true);
  mainLogoUrl = input<string>('/');
  mainLogoTitle = input<string>('Home');
  mainLogoPath = input<string | null>(null);
  themeLogoPath$ = input<Observable<string | null>>(of(null));
  mainLogoAlt = input<string>('Logo');
  themeLogoAlt$ = input<Observable<string | null>>(of(null));
  logoWidth = input<number>(140);
  logoHeight = input<number>(32);

  showHeaderSecondLogo = input<boolean>(false);
  showHeaderNavMobileTop = input<boolean>(true);
  showHeaderNavMobileBottom = input<boolean>(true);
  showHeaderNavRight = input<boolean>(true);
  burgerIcon = input<boolean>(true);
  burgerIconPos = input<'left' | 'right'>('right');

  // New Profile inputs
  showProfile = input<boolean>(false);
  userProfile = input<UserProfile | null>(null);
  profileMenuItems = input<DropdownItem[]>([]);
  showAvatar = input<boolean>(false);
  showEmail = input<boolean>(false);
  showIcons = input<boolean>(false);

  // Outputs
  clickMainLogo = output<void>();

  mobileMenuOpen = signal(false);
  mobileNavRightHidden = signal(false);
  private readonly visibleCount = signal<number>(0);
  private resizeObserver?: ResizeObserver;
  private recalcQueued = false;
  private readonly profileGapPx = 4;

  @ViewChild('navMenu') navMenu?: ElementRef<HTMLElement>;
  @ViewChild('navContent') navContent?: ElementRef<HTMLElement>;
  @ViewChildren('measureItem', { read: ElementRef }) measureItems?: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('measureMore') measureMore?: ElementRef<HTMLElement>;
  @ViewChild('navRight') navRight?: ElementRef<HTMLElement>;

  constructor() {
    effect(() => {
      const items = this.items();
      if (!this.measureItems?.length) {
        this.visibleCount.set(items.length);
      }
      this.maxVisibleItems();
      this.scheduleRecalculate();
    });

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addEventListener('change', e => {
      this.isMobile.set(e.matches);
    });
  }

  toggleMobileMenu() {
    const nextState = !this.mobileMenuOpen();
    this.mobileMenuOpen.set(nextState);

    if (!nextState && typeof window !== 'undefined') {
      this.mobileNavRightHidden.set(false);
      window.dispatchEvent(new Event('arv-mobile-nav-back'));
    }
  }

  onMobileNavRightClick(): void {
    if (!this.isMobile()) {
      return;
    }

    this.mobileNavRightHidden.set(true);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  onClickMainLogo() {
    this.clickMainLogo.emit();
  }

  ngAfterViewInit() {
    this.measureItems?.changes.subscribe(() => this.scheduleRecalculate());
    this.scheduleRecalculate();

    if (typeof document !== 'undefined' && 'fonts' in document) {
      // Recalculate after fonts load to avoid late text width changes.
      (document as Document & { fonts?: FontFaceSet }).fonts?.ready.then(() => this.scheduleRecalculate());
    }

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.scheduleRecalculate());
      if (this.navMenu?.nativeElement) {
        this.resizeObserver.observe(this.navMenu.nativeElement);
      }
      if (this.navContent?.nativeElement) {
        this.resizeObserver.observe(this.navContent.nativeElement);
      }
      if (this.navRight?.nativeElement) {
        this.resizeObserver.observe(this.navRight.nativeElement);
      }
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  visibleItems = computed(() => {
    const allItems = this.items();
    const count = this.visibleCount();
    if (!allItems.length) {
      return [];
    }
    return allItems.slice(0, Math.min(count, allItems.length));
  });

  moreItems = computed<DropdownItem[]>(() => {
    const allItems = this.items();
    const count = this.visibleCount();
    if (allItems.length <= count) {
      return [];
    }
    return allItems.slice(count).map(item => ({
      label: item.label,
      link: item.link,
      icon: '', // Default icon if needed
      active: item.active,
      subMenu: item.subMenu
    }));
  });

  isMoreActive = computed(() => {
    return this.moreItems().some(item => item.active);
  });

  private scheduleRecalculate() {
    if (this.recalcQueued) {
      return;
    }
    if (typeof window === 'undefined') {
      this.visibleCount.set(this.items().length);
      return;
    }
    this.recalcQueued = true;
    requestAnimationFrame(() => {
      this.recalcQueued = false;
      this.recalculate();
    });
  }

  private recalculate() {
    const allItems = this.items();
    if (!allItems.length) {
      this.visibleCount.set(0);
      return;
    }

    if (!this.isDesktop()) {
      this.visibleCount.set(allItems.length);
      return;
    }

    const navEl = this.navMenu?.nativeElement;
    const measureEls = this.measureItems?.toArray() ?? [];
    if (!navEl || measureEls.length === 0) {
      this.visibleCount.set(allItems.length);
      return;
    }

    const availableWidth = this.getAvailableWidth(navEl);
    const moreWidth = this.measureMore?.nativeElement?.offsetWidth ?? 0;
    const rects = measureEls.map(el => el.nativeElement.getBoundingClientRect());
    const baseLeft = rects[0]?.left ?? 0;
    const gap = rects.length > 1
      ? Math.max(0, rects[1].left - rects[0].right)
      : this.getGap(navEl);

    let count = 0;
    for (let i = 0; i < allItems.length; i += 1) {
      const itemRight = rects[i]?.right ?? baseLeft;
      const nextTotal = itemRight - baseLeft;
      const remaining = allItems.length - (i + 1);
      if (remaining > 0) {
        const withMore = nextTotal + gap + moreWidth;
        if (withMore > availableWidth) {
          break;
        }
      } else if (nextTotal > availableWidth) {
        break;
      }
      count += 1;
    }

    const cap = this.maxVisibleItems();
    const maxAllowed = cap > 0 ? cap : allItems.length;
    this.visibleCount.set(Math.min(count, maxAllowed));
  }

  private getGap(element: HTMLElement): number {
    const styles = window.getComputedStyle(element);
    const gapValue = styles.columnGap || styles.gap || '0px';
    const gap = parseFloat(gapValue);
    return Number.isFinite(gap) ? gap : 0;
  }

  private getAvailableWidth(navEl: HTMLElement): number {
    const contentEl = this.navContent?.nativeElement;
    const rightEl = this.navRight?.nativeElement;
    if (!contentEl || !rightEl) {
      return Math.max(0, navEl.clientWidth - this.profileGapPx);
    }

    const contentRect = contentEl.getBoundingClientRect();
    const rightRect = rightEl.getBoundingClientRect();
    const contentGap = this.getGap(contentEl);
    return Math.max(0, rightRect.left - contentRect.left - contentGap - this.profileGapPx);
  }

  private isDesktop(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
  }
}
