import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  OnDestroy,
  output,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBar } from '@angular/aria/menu';
import { RouterModule } from '@angular/router';
import { NavHeaderLink } from '../nav-header-link/nav-header-link.component';
import { Dropdown } from '../dropdown/dropdown.component';
import { NavHeaderRight } from '../nav-header-right/nav-header-right.component';
import type { DropdownItem, NavItem, UserProfile } from '../../../models';
import { Subscription } from 'rxjs';

export type { NavItem };

@Component({
  selector: 'ui-nav-header-center',
  imports: [CommonModule, MenuBar, RouterModule, NavHeaderLink, Dropdown, NavHeaderRight],
  templateUrl: './nav-header-center.component.html',
  styleUrl: './nav-header-center.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavHeaderCenter implements AfterViewInit, OnDestroy {
  private static readonly MOBILE_BREAKPOINT = '(max-width: 768px)';
  private static readonly PROFILE_GAP_PX = 4;

  readonly items = input<NavItem[]>([]);
  readonly maxVisibleItems = input(99);

  readonly rounded = input(true);

  readonly showHeaderNavMobileTop = input(true);
  readonly showHeaderNavMobileBottom = input(true);
  readonly showHeaderNavRight = input(true);
  readonly burgerIcon = input(false);
  readonly burgerIconPos = input<'left' | 'right'>('right');

  readonly showProfile = input(false);
  readonly userProfile = input<UserProfile | null>(null);
  readonly profileMenuItems = input<DropdownItem[]>([]);
  readonly showAvatar = input(false);
  readonly showEmail = input(false);
  readonly showIcons = input(false);

  readonly clickMainLogo = output<void>();
  readonly mobileMenuOpenChange = output<boolean>();

  readonly isMobile = signal(this.detectMobileState());
  readonly mobileMenuOpen = signal(false);
  readonly navigationStack = signal<DropdownItem[][]>([]);
  readonly currentMenuTitle = signal('');

  private readonly visibleCount = signal(0);
  private resizeObserver?: ResizeObserver;
  private recalcQueued = false;
  private measureItemsChangesSubscription?: Subscription;
  private mobileMediaQueryList?: MediaQueryList;

  private readonly mediaQueryChangeHandler = (event: MediaQueryListEvent): void => {
    this.isMobile.set(event.matches);
    if (!event.matches) {
      this.closeMobileMenu();
    }
  };

  @ViewChild('navMenu') navMenu?: ElementRef<HTMLElement>;
  @ViewChild('navContent') navContent?: ElementRef<HTMLElement>;
  @ViewChildren('measureItem', { read: ElementRef })
  measureItems?: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('measureMore') measureMore?: ElementRef<HTMLElement>;
  @ViewChild('navRight') navRight?: ElementRef<HTMLElement>;

  readonly effectiveVisibleCount = computed(() => {
    const items = this.items();
    const maxAllowed = this.getMaxAllowedItems(items.length);
    return Math.min(this.visibleCount(), maxAllowed, items.length);
  });

  readonly visibleItems = computed(() => {
    const allItems = this.items();
    const count = this.effectiveVisibleCount();

    if (allItems.length === 0 || count <= 0) {
      return [];
    }

    return allItems.slice(0, count);
  });

  readonly moreItems = computed<DropdownItem[]>(() => {
    const allItems = this.items();
    const count = this.effectiveVisibleCount();

    if (allItems.length <= count) {
      return [];
    }

    return this.cloneMenuItems(allItems.slice(count));
  });

  readonly isMoreActive = computed(() => this.moreItems().some(item => item.active));

  constructor() {
    this.setupItemsWatcher();
    this.setupMediaQueryListener();
  }

  ngAfterViewInit(): void {
    this.setupMeasureItemsWatcher();
    this.scheduleRecalculate();
    this.waitForFontsAndRecalculate();
    this.setupResizeObserver();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.measureItemsChangesSubscription?.unsubscribe();

    if (this.mobileMediaQueryList) {
      this.mobileMediaQueryList.removeEventListener('change', this.mediaQueryChangeHandler);
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(isOpen => {
      const nextOpen = !isOpen;

      if (nextOpen) {
        this.navigationStack.set([this.cloneMenuItems(this.items())]);
        this.currentMenuTitle.set('');
      }

      this.mobileMenuOpenChange.emit(nextOpen);
      return nextOpen;
    });
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    this.navigationStack.set([]);
    this.currentMenuTitle.set('');
    this.mobileMenuOpenChange.emit(false);
  }

  navigateToSubMenu(item: DropdownItem, event?: Event): void {
    this.stopEvent(event);

    if (!item.subMenu || item.subMenu.length === 0) {
      return;
    }

    this.navigationStack.update(stack => [...stack, this.cloneMenuItems(item.subMenu ?? [])]);
    this.currentMenuTitle.set(item.label);
  }

  goBack(event?: Event): void {
    this.stopEvent(event);

    this.navigationStack.update(stack => {
      if (stack.length <= 1) {
        this.closeMobileMenu();
        return [];
      }

      const newStack = stack.slice(0, -1);
      if (newStack.length === 1) {
        this.currentMenuTitle.set('');
      }

      return newStack;
    });
  }

  getMobileLevelTransform(levelIndex: number): string {
    const shift = 100 * (levelIndex - (this.navigationStack().length - 1));
    return `translateX(${shift}%)`;
  }

  getMobileItemAnimationDelay(levelIndex: number, itemIndex: number): string {
    return levelIndex === 0 ? `${itemIndex * 0.05}s` : '0s';
  }

  private setupItemsWatcher(): void {
    effect(() => {
      const items = this.items();

      if (!this.measureItems?.length) {
        this.visibleCount.set(items.length);
      }

      this.maxVisibleItems();
      this.scheduleRecalculate();
    });
  }

  private setupMediaQueryListener(): void {
    const windowRef = this.getWindow();
    if (!windowRef?.matchMedia) {
      return;
    }

    this.mobileMediaQueryList = windowRef.matchMedia(NavHeaderCenter.MOBILE_BREAKPOINT);
    this.isMobile.set(this.mobileMediaQueryList.matches);
    this.mobileMediaQueryList.addEventListener('change', this.mediaQueryChangeHandler);
  }

  private setupMeasureItemsWatcher(): void {
    if (!this.measureItems) {
      return;
    }

    this.measureItemsChangesSubscription = this.measureItems.changes.subscribe(() => {
      this.scheduleRecalculate();
    });
  }

  private waitForFontsAndRecalculate(): void {
    if (typeof document === 'undefined' || !('fonts' in document)) {
      return;
    }

    const fontsApi = (document as Document & { fonts?: FontFaceSet }).fonts;
    fontsApi?.ready.then(() => {
      this.scheduleRecalculate();
    });
  }

  private setupResizeObserver(): void {
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

  private observeElements(elements: Array<HTMLElement | undefined>): void {
    elements.forEach(element => {
      if (element) {
        this.resizeObserver?.observe(element);
      }
    });
  }

  private scheduleRecalculate(): void {
    if (this.recalcQueued) {
      return;
    }

    const windowRef = this.getWindow();
    if (!windowRef) {
      this.visibleCount.set(this.items().length);
      return;
    }

    this.recalcQueued = true;
    windowRef.requestAnimationFrame(() => {
      this.recalcQueued = false;
      this.recalculate();
    });
  }

  private recalculate(): void {
    const allItems = this.items();

    if (allItems.length === 0) {
      this.visibleCount.set(0);
      return;
    }

    if (this.isMobile()) {
      this.visibleCount.set(allItems.length);
      return;
    }

    const count = this.calculateVisibleItemsCount(allItems);
    const maxAllowed = this.getMaxAllowedItems(allItems.length);
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

    return this.countItemsThatFit(allItems, measurements, availableWidth, moreWidth);
  }

  private getMeasurements(measureEls: ElementRef<HTMLElement>[], navEl: HTMLElement): {
    rects: DOMRect[];
    gap: number;
  } {
    const rects = measureEls.map(el => el.nativeElement.getBoundingClientRect());
    const gap = this.calculateGapBetweenItems(rects, navEl);

    return { rects, gap };
  }

  private calculateGapBetweenItems(rects: DOMRect[], navEl: HTMLElement): number {
    if (rects.length > 1) {
      return Math.max(0, rects[1].left - rects[0].right);
    }

    return this.extractGapFromStyles(navEl);
  }

  private countItemsThatFit(
    allItems: NavItem[],
    measurements: { rects: DOMRect[]; gap: number },
    availableWidth: number,
    moreWidth: number,
  ): number {
    const { rects, gap } = measurements;
    let count = 0;
    let accumulatedWidth = 0;

    for (let index = 0; index < allItems.length; index += 1) {
      const itemWidth = rects[index]?.width ?? 0;
      const gapWidth = index > 0 ? gap : 0;
      const remainingItems = allItems.length - (index + 1);

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
    const gap = Number.parseFloat(gapValue);
    return Number.isFinite(gap) ? gap : 0;
  }

  private getAvailableWidth(navEl: HTMLElement): number {
    const contentEl = this.navContent?.nativeElement;
    const rightEl = this.navRight?.nativeElement;

    if (!contentEl || !rightEl) {
      return Math.max(0, navEl.clientWidth - NavHeaderCenter.PROFILE_GAP_PX);
    }

    const contentRect = contentEl.getBoundingClientRect();
    const rightRect = rightEl.getBoundingClientRect();

    return Math.max(0, rightRect.left - contentRect.left - NavHeaderCenter.PROFILE_GAP_PX);
  }

  private getMaxAllowedItems(totalItems: number): number {
    const cap = this.maxVisibleItems();
    return cap > 0 ? cap : totalItems;
  }

  private detectMobileState(): boolean {
    const windowRef = this.getWindow();
    if (!windowRef?.matchMedia) {
      return false;
    }

    return windowRef.matchMedia(NavHeaderCenter.MOBILE_BREAKPOINT).matches;
  }

  private getWindow(): Window | null {
    return typeof window === 'undefined' ? null : window;
  }

  private cloneMenuItems(items: ReadonlyArray<DropdownItem>): DropdownItem[] {
    return items.map(item => ({
      label: item.label,
      link: item.link,
      icon: item.icon,
      active: item.active,
      subMenu: item.subMenu ? this.cloneMenuItems(item.subMenu) : undefined,
    }));
  }

  private stopEvent(event?: Event): void {
    if (!event) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  }
}
