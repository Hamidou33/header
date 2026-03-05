import {
  Component,
  input,
  computed,
  signal,
  output,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList,
  AfterViewInit,
  OnDestroy,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MenuBar } from '@angular/aria/menu';
import { RouterModule } from '@angular/router';
import { NavLink } from '../nav-link/nav-link.component';
import { Dropdown } from '../dropdown/dropdown.component';
import { NavRight } from '../nav-right/nav-right.component';
import type { NavItem, DropdownItem, UserProfile } from '../../../models';
import { Observable, of } from 'rxjs';

export type { NavItem };

@Component({
  selector: 'ui-nav-center',
  imports: [CommonModule, NgOptimizedImage, MenuBar, RouterModule, NavLink, Dropdown, NavRight],
  templateUrl: './nav-center.component.html',
  styleUrl: './nav-center.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavCenter implements AfterViewInit, OnDestroy {
  private static readonly MOBILE_BREAKPOINT = '(max-width: 768px)';
  private static readonly DESKTOP_BREAKPOINT = '(min-width: 768px)';
  private static readonly PROFILE_GAP_PX = 4;

  items = input<NavItem[]>([]);
  maxVisibleItems = input<number>(99);

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
  burgerIcon = input<boolean>(false);
  burgerIconPos = input<'left' | 'right'>('right');

  showProfile = input<boolean>(false);
  userProfile = input<UserProfile | null>(null);
  profileMenuItems = input<DropdownItem[]>([]);
  showAvatar = input<boolean>(false);
  showEmail = input<boolean>(false);
  showIcons = input<boolean>(false);

  clickMainLogo = output<void>();

  readonly isMobile = signal(this.checkIfMobile());
  readonly mobileMenuOpen = signal(false);
  private readonly visibleCount = signal<number>(0);
  private resizeObserver?: ResizeObserver;
  private recalcQueued = false;

  @ViewChild('navMenu') navMenu?: ElementRef<HTMLElement>;
  @ViewChild('navContent') navContent?: ElementRef<HTMLElement>;
  @ViewChildren('measureItem', { read: ElementRef }) measureItems?: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('measureMore') measureMore?: ElementRef<HTMLElement>;
  @ViewChild('navRight') navRight?: ElementRef<HTMLElement>;

  visibleItems = computed(() => {
    const allItems = this.items();
    const count = this.visibleCount();

    if (allItems.length === 0) {
      return [];
    }

    const maxCount = Math.min(count, allItems.length);
    return allItems.slice(0, maxCount);
  });

  moreItems = computed<DropdownItem[]>(() => {
    const allItems = this.items();
    const count = this.visibleCount();

    if (allItems.length <= count) {
      return [];
    }

    return this.convertToDropdownItems(allItems.slice(count));
  });

  isMoreActive = computed(() => {
    return this.moreItems().some((item) => item.active);
  });

  constructor() {
    this.setupItemsWatcher();
    this.setupMediaQueryListener();
  }

  ngAfterViewInit() {
    this.setupMeasureItemsWatcher();
    this.scheduleRecalculate();
    this.waitForFontsAndRecalculate();
    this.setupResizeObserver();
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(isOpen => !isOpen);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  onClickMainLogo() {
    this.clickMainLogo.emit();
  }

  private setupItemsWatcher() {
    effect(() => {
      const items = this.items();
      if (!this.measureItems?.length) {
        this.visibleCount.set(items.length);
      }
      this.maxVisibleItems();
      this.scheduleRecalculate();
    });
  }

  private setupMediaQueryListener() {
    const mediaQuery = window.matchMedia(NavCenter.MOBILE_BREAKPOINT);
    mediaQuery.addEventListener('change', (event) => {
      this.isMobile.set(event.matches);
    });
  }

  private setupMeasureItemsWatcher() {
    this.measureItems?.changes.subscribe(() => {
      this.scheduleRecalculate();
    });
  }

  private waitForFontsAndRecalculate() {
    if (typeof document === 'undefined' || !('fonts' in document)) {
      return;
    }

    const fontsApi = (document as Document & { fonts?: FontFaceSet }).fonts;
    fontsApi?.ready.then(() => {
      this.scheduleRecalculate();
    });
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.scheduleRecalculate();
    });

    this.observeElements([
      this.navMenu?.nativeElement,
      this.navContent?.nativeElement,
      this.navRight?.nativeElement,
    ]);
  }

  private observeElements(elements: (HTMLElement | undefined)[]) {
    elements.forEach(element => {
      if (element) {
        this.resizeObserver?.observe(element);
      }
    });
  }

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

    if (allItems.length === 0) {
      this.visibleCount.set(0);
      return;
    }

    if (this.isMobileView()) {
      this.visibleCount.set(allItems.length);
      return;
    }

    const count = this.calculateVisibleItemsCount(allItems);
    const maxAllowed = this.getMaxAllowedItems(allItems);
    this.visibleCount.set(Math.min(count, maxAllowed));
  }

  private calculateVisibleItemsCount(allItems: NavItem[]): number {
    const navEl = this.navMenu?.nativeElement;
    const measureEls = this.measureItems?.toArray() ?? [];

    if (!navEl || measureEls.length === 0) {
      return allItems.length;
    }

    const availableWidth = this.getAvailableWidth(navEl);
    const moreWidth = this.measureMore?.nativeElement?.offsetWidth ?? 0;
    const measurements = this.getMeasurements(measureEls, navEl);

    return this.countItemsThatFit(
      allItems,
      measurements,
      availableWidth,
      moreWidth
    );
  }

  private getMeasurements(measureEls: ElementRef<HTMLElement>[], navEl: HTMLElement) {
    const rects = measureEls.map(el => el.nativeElement.getBoundingClientRect());
    const baseLeft = rects[0]?.left ?? 0;
    const gap = this.calculateGapBetweenItems(rects, navEl);

    return { rects, baseLeft, gap };
  }

  private calculateGapBetweenItems(rects: DOMRect[], navEl: HTMLElement): number {
    if (rects.length > 1) {
      return Math.max(0, rects[1].left - rects[0].right);
    }
    return this.extractGapFromStyles(navEl);
  }

  private countItemsThatFit(
    allItems: NavItem[],
    measurements: { rects: DOMRect[]; baseLeft: number; gap: number },
    availableWidth: number,
    moreWidth: number
  ): number {
    const { rects, gap } = measurements;
    let count = 0;
    let accumulatedWidth = 0;

    for (let i = 0; i < allItems.length; i += 1) {
      const itemWidth = rects[i]?.width ?? 0;
      const gapWidth = i > 0 ? gap : 0;
      const remainingItems = allItems.length - (i + 1);

      if (remainingItems > 0) {
        const widthWithMore = accumulatedWidth + gapWidth + itemWidth + gap + moreWidth;
        if (widthWithMore > availableWidth) {
          break;
        }
      } else {
        const totalWidth = accumulatedWidth + gapWidth + itemWidth;
        if (totalWidth > availableWidth) {
          break;
        }
      }

      accumulatedWidth += gapWidth + itemWidth;
      count += 1;
    }

    return count;
  }

  private extractGapFromStyles(element: HTMLElement): number {
    const styles = window.getComputedStyle(element);
    const gapValue = styles.columnGap || styles.gap || '0px';
    const gap = parseFloat(gapValue);
    return Number.isFinite(gap) ? gap : 0;
  }

  private getAvailableWidth(navEl: HTMLElement): number {
    const contentEl = this.navContent?.nativeElement;
    const rightEl = this.navRight?.nativeElement;

    if (!contentEl || !rightEl) {
      return Math.max(0, navEl.clientWidth - NavCenter.PROFILE_GAP_PX);
    }

    const contentRect = contentEl.getBoundingClientRect();
    const rightRect = rightEl.getBoundingClientRect();

    // On calcule l'espace entre le début de la zone centrale et le début de la zone de droite
    return Math.max(
      0,
      rightRect.left - contentRect.left - NavCenter.PROFILE_GAP_PX
    );
  }

  private getMaxAllowedItems(allItems: NavItem[]): number {
    const cap = this.maxVisibleItems();
    return cap > 0 ? cap : allItems.length;
  }

  private isMobileView(): boolean {
    return !this.isDesktopView();
  }

  private isDesktopView(): boolean {
    return typeof window !== 'undefined' &&
           window.matchMedia(NavCenter.DESKTOP_BREAKPOINT).matches;
  }

  private checkIfMobile(): boolean {
    return window.matchMedia(NavCenter.MOBILE_BREAKPOINT).matches;
  }

  private convertToDropdownItems(items: NavItem[]): DropdownItem[] {
    return items.map(item => ({
      label: item.label,
      link: item.link,
      icon: '',
      active: item.active,
      subMenu: item.subMenu,
    }));
  }
}

export { NavCenter as Nav };
