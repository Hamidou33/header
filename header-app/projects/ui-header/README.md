# UI Header Library

Angular library for building accessible, customizable navigation headers with CDK Menu directives.

## Features

- 🎨 **Fully customizable** with theme support
- ♿ **Accessible** using Angular CDK ARIA directives
- 📱 **Responsive** design
- 🔧 **Modular components** (Header, Nav, Dropdown, Profile Menu)
- 🎯 **TypeScript** with full type safety
- 🚀 **Angular 21+** with latest features

## Installation

```bash
npm install @angular/cdk
npm install ui-header
```

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { Header, NavItem, UserProfile, DropdownItem } from 'ui-header';

@Component({
  selector: 'app-root',
  imports: [Header],
  template: `
    <ui-header
      [companyName]="'My Company'"
      [logoUrl]="'🏢'"
      [menuItems]="menuItems"
      [userProfile]="userProfile"
      [profileMenuItems]="profileMenuItems">
    </ui-header>
  `
})
export class AppComponent {
  menuItems: NavItem[] = [
    {
      label: 'Products',
      subMenu: [
        { label: 'Software', link: '/products/software' },
        { label: 'Services', link: '/products/services' }
      ]
    },
    { label: 'About', link: '/about' }
  ];

  userProfile: UserProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '👤'
  };

  profileMenuItems: DropdownItem[] = [
    { label: 'Settings', link: '/settings', icon: '⚙️' },
    { label: 'Logout', link: '/logout', icon: '🚪' }
  ];
}
```

### With Theme Customization

```typescript
import { HeaderTheme } from 'ui-header';

theme: HeaderTheme = {
  primaryColor: '#2563eb',
  hoverColor: '#00965E',
  backgroundColor: '#ffffff',
  textColor: '#000000',
  borderRadius: '2rem'
};
```

```html
<ui-header
  [theme]="theme"
  [sticky]="true"
  [showBrand]="true"
  [showNav]="true"
  [showProfile]="true">
</ui-header>
```

## Building

To build the library, run:

```bash
ng build ui-header
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:

   ```bash
   cd dist/ui-header
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
