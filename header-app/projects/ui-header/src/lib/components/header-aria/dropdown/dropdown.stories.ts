import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MenuBar } from '@angular/aria/menu';
import { DropdownComponent } from './dropdown.component';
import type { DropdownItem } from '../../../models';

const simpleItems: DropdownItem[] = [
  { label: 'Item 1', link: '/item1', icon: '\u{1F4E6}' },
  { label: 'Item 2', link: '/item2', icon: '\u{1F4CB}' },
  { label: 'Item 3', link: '/item3', icon: '\u{1F4CC}' },
];

const submenuItems: DropdownItem[] = [
  {
    label: 'Consulting',
    icon: '\u{1F4BC}',
    subMenu: [
      { label: 'Strategy', link: '/consulting/strategy', icon: '\u{1F4CA}' },
      { label: 'Implementation', link: '/consulting/implementation', icon: '\u{1F527}' },
    ],
  },
  {
    label: 'Support',
    icon: '\u{1F198}',
    subMenu: [
      { label: 'Technical', link: '/support/technical', icon: '\u{1F4BB}' },
      { label: 'Billing', link: '/support/billing', icon: '\u{1F4B3}' },
    ],
  },
  { label: 'Contact', link: '/contact', icon: '\u{1F4E7}' },
];

const textOnlyItems: DropdownItem[] = [
  { label: 'Documentation', link: '/docs' },
  { label: 'API Reference', link: '/api' },
  { label: 'Tutorials', link: '/tutorials' },
];

const meta: Meta<DropdownComponent> = {
  title: 'Header ARIA/Dropdown',
  component: DropdownComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
  },
  decorators: [
    moduleMetadata({
      imports: [DropdownComponent, MenuBar],
    }),
    applicationConfig({
      providers: [
        provideRouter([{ path: '**', redirectTo: '' }], withHashLocation()),
        provideAnimationsAsync(),
      ],
    }),
  ],
  argTypes: {
    label: { control: 'text', description: 'DropdownComponent button label' },
    items: { control: 'object', description: 'DropdownComponent items' },
    active: { control: 'boolean', description: 'Trigger active state' },
    measureOnly: { control: 'boolean', description: 'Render for measurement only' },
  },
  args: {
    label: 'Products',
    items: simpleItems,
    active: false,
    measureOnly: false,
  },
  render: args => ({
    props: args,
    template: `
      <div
        ngMenuBar
        style="display:inline-flex;align-items:center;gap:12px;padding:16px;background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <ui-dropdown
          [label]="label"
          [items]="items"
          [active]="active"
          [measureOnly]="measureOnly"></ui-dropdown>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<DropdownComponent>;

export const Default: Story = {};

export const WithSubMenus: Story = {
  args: {
    label: 'Services',
    items: submenuItems,
  },
};

export const ActiveState: Story = {
  args: {
    active: true,
  },
};

export const WithoutIcons: Story = {
  args: {
    label: 'Links',
    items: textOnlyItems,
  },
};

export const MeasureOnly: Story = {
  args: {
    label: 'Measure label',
    measureOnly: true,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    label: 'Services',
    items: submenuItems,
  },
  render: args => ({
    props: args,
    template: `
      <div style="background:#1a1a1a;padding:16px;min-height:100vh;">
        <ui-dropdown
          [label]="label"
          [items]="items"
          [active]="active"
          [measureOnly]="measureOnly"></ui-dropdown>
      </div>
    `,
  }),
};
