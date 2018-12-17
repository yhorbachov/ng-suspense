import { Directive, Inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { SuspenseDirective } from './suspense.directive';
import { destroyed } from '../utils';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[ngSuspenseSuccess]'
})
export class SuspenseSuccessDirective {
  constructor(
    @Inject(SuspenseDirective) suspense: SuspenseDirective,
    template: TemplateRef<any>,
    viewContainerRef: ViewContainerRef
  ) {
    suspense.state$
      .pipe(
        takeUntil(destroyed(this)),
        distinctUntilChanged()
      )
      .subscribe(state => {
        viewContainerRef.clear();
        if (state.loaded && !state.error) {
          viewContainerRef.createEmbeddedView(template, { $implicit: state.data });
        }
      });
  }
}
