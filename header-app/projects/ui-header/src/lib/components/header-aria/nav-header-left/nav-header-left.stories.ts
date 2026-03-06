import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideRouter, withHashLocation } from '@angular/router';
import { NavHeaderLeft } from './nav-header-left.component';

const meta: Meta<NavHeaderLeft> = {
  title: 'Header ARIA/Nav Left',
  component: NavHeaderLeft,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NavHeaderLeft],
    }),
    applicationConfig({
      providers: [provideRouter([{ path: '**', redirectTo: '' }], withHashLocation())],
    }),
  ],
  argTypes: {
    secondaryLogoPath: {
      control: 'text',
      description: 'Path to secondary logo image',
    },
    secondaryLogoAlt: {
      control: 'text',
      description: 'Alt text for secondary logo',
    },
    secondaryLogoUrl: {
      control: 'text',
      description: 'URL for secondary logo link',
    },
    tagText: {
      control: 'text',
      description: 'Text for badge',
    },
    tagVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning'],
      description: 'Badge style variant',
    },
    showSeparator: {
      control: 'boolean',
      description: 'Show separator between elements',
    },
  },
};

export default meta;
type Story = StoryObj<NavHeaderLeft>;

export const Default: Story = {
  args: {
    secondaryLogoPath: '/logo-header.svg',
    secondaryLogoAlt: 'Partner logo',
    secondaryLogoUrl: '/',
    tagText: 'PRO',
    tagVariant: 'primary',
    showSeparator: true,
  },
};

export const LogoOnly: Story = {
  args: {
    secondaryLogoPath: '/logo-header.svg',
    secondaryLogoAlt: 'Company logo',
    showSeparator: false,
  },
};

export const TagOnly: Story = {
  args: {
    tagText: 'BUSINESS',
    tagVariant: 'secondary',
    showSeparator: false,
  },
};

export const WithCustomContent: Story = {
  render: args => ({
    props: args,
    template: `
      <ui-nav-header-left
        [secondaryLogoPath]="secondaryLogoPath"
        [secondaryLogoAlt]="secondaryLogoAlt"
        [showSeparator]="showSeparator"
        [tagText]="tagText"
        [tagVariant]="tagVariant">
        <span style="color:#1a1a1a;font-size:12px;font-weight:500;">Fleet: 250 vehicles</span>
      </ui-nav-header-left>
    `,
  }),
  args: {
    secondaryLogoPath: '/logo-header.svg',
    secondaryLogoAlt: 'Arval',
    tagText: 'PREMIUM',
    tagVariant: 'success',
    showSeparator: true,
  },
};

export const Playground: Story = {
  args: {
    secondaryLogoPath: '/logo-header.svg',
    secondaryLogoAlt: 'Logo',
    secondaryLogoUrl: '/',
    tagText: 'TAG',
    tagVariant: 'primary',
    showSeparator: true,
  },
};
