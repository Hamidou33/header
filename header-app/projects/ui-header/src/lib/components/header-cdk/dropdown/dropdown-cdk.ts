import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { DropdownItem } from '../../../models';

@Component({
  selector: 'ui-dropdown-cdk',
  imports: [CommonModule, CdkMenuModule],
  templateUrl: './dropdown-cdk.html',
  styleUrl: '../../header-aria/dropdown/dropdown.component.css',
})
export class DropdownCdk {
  label = input.required<string>();
  items = input<DropdownItem[]>([]);
  position = input<
    Array<{ originX: string; originY: string; overlayX: string; overlayY: string }> | undefined
  >(undefined);
}
