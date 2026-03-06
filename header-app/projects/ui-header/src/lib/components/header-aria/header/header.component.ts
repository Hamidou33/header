import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NavHeaderCenter } from '../nav-header-center/nav-header-center.component';
import type { DropdownItem, NavItem, UserProfile } from '../../../models';
import {
  getDefaultMenuItems,
  getDefaultProfileMenuItems,
  getDefaultUserProfile,
} from './header.defaults';

@Component({
  selector: 'ui-header',
  imports: [CommonModule, NgOptimizedImage, CdkMenuModule, RouterModule, NavHeaderCenter],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly showProfile = input(true);
  readonly showAvatar = input(false);
  readonly showEmail = input(false);
  readonly showIcons = input(false);
  readonly maxVisibleItems = input(99);
  readonly logoPath = input<string | null>('/logo-header.svg');
  readonly themeLogoPath$ = input<Observable<string | null>>(of(null));
  readonly mainLogoAlt = input('Logo');
  readonly themeLogoAlt$ = input<Observable<string | null>>(of(null));
  readonly logoWidth = input(140);
  readonly logoHeight = input(32);
  readonly rounded = input(true);

  readonly isHeaderFixed = input(false);
  readonly showHeaderPreNav = input(true);
  readonly showHeaderPostNav = input(true);
  readonly showHeaderPostNavMobile = input(false);

  readonly sticky = input(false);
  readonly showNav = input(true);

  readonly companyName = input('My Company');
  readonly logoUrl = input('/');

  readonly clickMainLogo = output<void>();

  readonly userProfile = input<UserProfile | null>(getDefaultUserProfile());
  readonly profileMenuItems = input<DropdownItem[]>(getDefaultProfileMenuItems());
  readonly menuItems = input<NavItem[]>(getDefaultMenuItems());

  readonly mainLogoLoadError = signal(false);
  readonly isMobileMenuOpen = signal(false);

  constructor() {
    effect(() => {
      this.logoPath();
      this.themeLogoPath$();
      this.mainLogoLoadError.set(false);
    });
  }

  onClickMainLogo(): void {
    this.clickMainLogo.emit();
  }

  onMainLogoError(): void {
    this.mainLogoLoadError.set(true);
  }

  onMobileMenuOpenChange(isOpen: boolean): void {
    this.isMobileMenuOpen.set(isOpen);
  }
}
