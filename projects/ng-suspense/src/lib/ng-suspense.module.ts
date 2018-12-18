import { NgModule } from '@angular/core';
import { SuspenseDirective } from './directives/suspense.directive';
import { SuspenseErrorDirective } from './directives/suspense-error.directive';
import { SuspensePlaceholderDirective } from './directives/suspense-placeholder.directive';
import { SuspenseSuccessDirective } from './directives/suspense-success.directive';

@NgModule({
  declarations: [
    SuspenseDirective,
    SuspenseErrorDirective,
    SuspensePlaceholderDirective,
    SuspenseSuccessDirective
  ],
  imports: [],
  exports: [
    SuspenseDirective,
    SuspenseErrorDirective,
    SuspensePlaceholderDirective,
    SuspenseSuccessDirective
  ]
})
export class NgSuspenseModule {}
