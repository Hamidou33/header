import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MenuBar } from '@angular/aria/menu';
import { NavHeaderLink } from './nav-header-link.component';

const meta: Meta<NavHeaderLink> = {
  title: 'Header ARIA/Nav Link',
  component: NavHeaderLink,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NavHeaderLink, MenuBar],
    }),
    applicationConfig({
      providers: [
        provideRouter([{ path: '**', redirectTo: '' }], withHashLocation()),
        provideAnimationsAsync(),
      ],
    }),
  ],
  argTypes: {
    label: { control: 'text', description: 'Link label text' },
    link: { control: 'text', description: 'URL or route path' },
    icon: { control: 'text', description: 'Optional icon' },
    active: { control: 'boolean', description: 'Active state' },
    measureOnly: { control: 'boolean', description: 'Render for width measurement only' },
    useAriaMenu: { control: 'boolean', description: 'Use Angular aria menu item behavior' },
  },
  args: {
    label: 'Home',
    link: '/home',
    active: false,
    measureOnly: false,
    useAriaMenu: true,
  },
  render: args => ({
    props: args,
    template: `
      <div
        ngMenuBar
        style="display:inline-flex;align-items:center;gap:12px;padding:16px;background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <ui-nav-header-link
          [label]="label"
          [link]="link"
          [icon]="icon"
          [active]="active"
          [measureOnly]="measureOnly"
          [useAriaMenu]="useAriaMenu"></ui-nav-header-link>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<NavHeaderLink>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    label: 'Products',
    link: '/products',
    icon: '\u{1F6CD}\u{FE0F}',
  },
};

export const Active: Story = {
  args: {
    label: 'Current Page',
    link: '/current',
    icon: '\u{1F4CD}',
    active: true,
  },
};

export const MeasureOnly: Story = {
  args: {
    label: 'Measurement Item',
    measureOnly: true,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: args => ({
    props: args,
    template: `
      <div style="background:#1a1a1a;padding:16px;min-height:100vh;">
        <ui-nav-header-link
          [label]="label"
          [link]="link"
          [icon]="icon"
          [active]="active"
          [measureOnly]="measureOnly"
          [useAriaMenu]="useAriaMenu"></ui-nav-header-link>
      </div>
    `,
  }),
};
