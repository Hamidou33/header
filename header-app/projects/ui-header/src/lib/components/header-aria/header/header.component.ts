import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { RouterModule } from '@angular/router';
import { NavHeaderCenter } from '../nav-header-center/nav-header-center.component';
import { UserProfile } from '../../../models';
import { Observable, of } from 'rxjs';

interface SubMenuItem {
  label: string;
  link?: string;
  subMenu?: SubMenuItem[];
}

interface MenuItem {
  label: string;
  link?: string;
  subMenu?: SubMenuItem[];
}

interface ProfileMenuItem {
  label: string;
  link?: string;
  icon: string;
  subMenu?: { label: string; link: string; icon: string }[];
}

@Component({
  selector: 'ui-header',
  imports: [CommonModule, NgOptimizedImage, CdkMenuModule, RouterModule, NavHeaderCenter],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  showProfile = input<boolean>(true);
  showAvatar = input<boolean>(false);
  showEmail = input<boolean>(false);
  showIcons = input<boolean>(false);
  maxVisibleItems = input<number>(99);
  logoPath = input<string | null>('/logo-header.svg');
  themeLogoPath$ = input<Observable<string | null>>(of(null));
  mainLogoAlt = input<string>('Logo');
  themeLogoAlt$ = input<Observable<string | null>>(of(null));
  logoWidth = input<number>(140);
  logoHeight = input<number>(32);
  rounded = input<boolean>(true);

  // Nouveaux signaux basés sur les images
  isHeaderFixed = input<boolean>(false);
  showHeaderPreNav = input<boolean>(true);
  showHeaderPostNav = input<boolean>(true);
  showHeaderPostNavMobile = input<boolean>(false); // Pour la classe arv-header_post-header-desktop--show

  sticky = input<boolean>(false);
  showNav = input<boolean>(true);

  companyName = input<string>('My Company');
  logoUrl = input<string>('/');

  clickMainLogo = output<void>();

  onClickMainLogo() {
    this.clickMainLogo.emit();
  }

  userProfile = input<UserProfile | null>({
    name: 'John Doe',
    email: 'john.doe@company.com',
    avatar: '👤',
  });

  profileMenuItems = input<ProfileMenuItem[]>([
    {
      label: 'My Profile',
      icon: '👤',
      subMenu: [
        { label: 'View Profile', link: '/profile/view', icon: '👁️' },
        { label: 'Edit Profile', link: '/profile/edit', icon: '✏️' },
        { label: 'Privacy', link: '/profile/privacy', icon: '🔒' },
      ],
    },
    {
      label: 'Settings',
      icon: '⚙️',
      subMenu: [
        { label: 'Account', link: '/settings/account', icon: '🔧' },
        { label: 'Preferences', link: '/settings/preferences', icon: '🎨' },
        { label: 'Security', link: '/settings/security', icon: '🛡️' },
        { label: 'Billing', link: '/settings/billing', icon: '💳' },
      ],
    },
    {
      label: 'Notifications',
      link: '/notifications',
      icon: '🔔',
    },
    {
      label: 'Help',
      icon: '❓',
      subMenu: [
        { label: 'Documentation', link: '/help/docs', icon: '📚' },
        { label: 'Contact Support', link: '/help/support', icon: '💬' },
        { label: 'FAQ', link: '/help/faq', icon: '💡' },
      ],
    },
    {
      label: 'Logout',
      link: '/logout',
      icon: '🚪',
    },
  ]);

  menuItems = input<MenuItem[]>([
    {
      label: 'Products',
      subMenu: [
        { label: 'Software', link: '/products/software' },
        {
          label: 'Services',
          subMenu: [
            { label: 'Consulting', link: '/products/services/consulting' },
            { label: 'Training', link: '/products/services/training' },
            { label: 'Support', link: '/products/services/support' },
          ],
        },
        { label: 'Cloud Solutions', link: '/products/cloud' },
      ],
    },
    {
      label: 'Solutions',
      subMenu: [
        { label: 'Enterprise', link: '/solutions/enterprise' },
        { label: 'Small Business', link: '/solutions/smb' },
        { label: 'Startups', link: '/solutions/startups' },
      ],
    },
    {
      label: 'Resources',
      subMenu: [
        { label: 'Documentation', link: '/resources/docs' },
        { label: 'Tutorials', link: '/resources/tutorials' },
        { label: 'Blog', link: '/resources/blog' },
        { label: 'Support', link: '/resources/support' },
      ],
    },
    {
      label: 'About',
      link: '/about',
    },
    {
      label: 'Contact',
      link: '/contact',
    },
    {
      label: 'Pricing',
      link: '/pricing',
    },
    {
      label: 'Partners',
      link: '/partners',
    },
    {
      label: 'Careers',
      link: '/careers',
    },
    {
      label: 'Blog',
      link: '/blog',
    },
    {
      label: 'Docs',
      link: '/docs',
    },
    {
      label: 'Support',
      link: '/support',
    },
    {
      label: 'Community',
      link: '/community',
    },
    {
      label: 'Events',
      link: '/events',
    },
  ]);
}

