import { ChangeDetectionStrategy, Component, effect, input, output, signal, viewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NavHeaderCenterComponent } from '../nav-header-center/nav-header-center.component';
import { NavHeaderAvatarComponent } from '../nav-header-avatar/nav-header-avatar.component';
import type { DropdownItem, NavItem, UserProfile } from '../../../models';
import {
  getDefaultMenuItems,
  getDefaultProfileMenuItems,
  getDefaultUserProfile,
} from './header.defaults';

@Component({
  selector: 'ui-header',
  imports: [
    CommonModule,
    NgOptimizedImage,
    CdkMenuModule,
    RouterModule,
    NavHeaderCenterComponent,
    NavHeaderAvatarComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public readonly showProfile = input(true);
  public readonly showAvatar = input(false);
  public readonly showEmail = input(false);
  public readonly showIcons = input(false);
  public readonly maxVisibleItems = input(99);
  public readonly logoPath = input<string | undefined>('/logo-header.svg');
  public readonly themeLogoPath$ = input<Observable<string | undefined>>(of(undefined));
  public readonly mainLogoAlt = input('Logo');
  public readonly themeLogoAlt$ = input<Observable<string | undefined>>(of(undefined));
  public readonly logoWidth = input(140);
  public readonly logoHeight = input(32);
  public readonly rounded = input(true);

  public readonly isHeaderFixed = input(false);
  public readonly showHeaderPreNav = input(true);
  public readonly showHeaderPostNav = input(true);
  public readonly showHeaderPostNavMobile = input(false);

  public readonly sticky = input(false);
  public readonly showNav = input(true);

  public readonly companyName = input('My Company');
  public readonly logoUrl = input('/');

  public readonly clickMainLogo = output<void>();

  public readonly userProfile = input<UserProfile | undefined>(getDefaultUserProfile());
  public readonly profileMenuItems = input<DropdownItem[]>(getDefaultProfileMenuItems());
  public readonly menuItems = input<NavItem[]>(getDefaultMenuItems());

  public readonly mainLogoLoadError = signal(false);
  public readonly isMobileMenuOpen = signal(false);
  public readonly showRightExtra = signal(true);
  public readonly navHeaderCenter = viewChild(NavHeaderCenterComponent);

  public constructor() {
    effect(() => {
      this.logoPath();
      this.themeLogoPath$();
      this.mainLogoLoadError.set(false);
    });
  }

  public onClickMainLogo(): void {
    this.clickMainLogo.emit();
  }

  public onMainLogoError(): void {
    this.mainLogoLoadError.set(true);
  }

  public onMobileMenuOpenChange(isOpen: boolean): void {
    this.isMobileMenuOpen.set(isOpen);
    this.showRightExtra.set(!isOpen);
  }

  public onMobileProfileTriggerClick(event: Event): void {
    this.showRightExtra.set(false);
    this.navHeaderCenter()?.openMobileProfileMenu(event);
  }
}
