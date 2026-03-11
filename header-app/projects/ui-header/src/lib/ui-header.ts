import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-ui-header',
  imports: [],
  template: `<p>ui-header works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiHeaderComponent {}
