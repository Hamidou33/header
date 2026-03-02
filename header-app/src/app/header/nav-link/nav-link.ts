import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MenuItem } from '@angular/aria/menu';

@Component({
  selector: 'app-nav-link',
  imports: [CommonModule, RouterModule, CdkMenuModule, MenuItem],
  templateUrl: './nav-link.html',
  styleUrl: './nav-link.css',
})
export class NavLink {
  label = input<string>('');
  link = input<string | undefined>();
  icon = input<string | undefined>();
  active = input<boolean>(false);
  measureOnly = input<boolean>(false);
  useAriaMenu = input<boolean>(false);
}
