import { NgModule } from '@angular/core';
import { SuspenseComponent } from './components/suspense/suspense.component';
import { SuspenseErrorComponent } from './components/suspense-error/suspense-error.component';
import { SuspensePlaceholderComponent } from './components/suspense-placeholder/suspense-placeholder.component';
import { SuspenseDirective } from './directives/suspense.directive';
import { SuspenseErrorDirective } from './directives/suspense-error.directive';
import { SuspensePlaceholderDirective } from './directives/suspense-placeholder.directive';
import { SuspenseSuccessDirective } from './directives/suspense-success.directive';

@NgModule({
  declarations: [
    SuspenseComponent,
    SuspenseErrorComponent,
    SuspensePlaceholderComponent,
    SuspenseDirective,
    SuspenseErrorDirective,
    SuspensePlaceholderDirective,
    SuspenseSuccessDirective
  ],
  imports: [],
  exports: [
    SuspenseComponent,
    SuspenseErrorComponent,
    SuspensePlaceholderComponent,
    SuspenseDirective,
    SuspenseErrorDirective,
    SuspensePlaceholderDirective,
    SuspenseSuccessDirective
  ]
})
export class NgSuspenseModule {}
