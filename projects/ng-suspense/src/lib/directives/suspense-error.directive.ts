import { Directive, Inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { SuspenseDirective } from './suspense.directive';
import { destroyed } from '../utils';
import { takeUntil, map, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[ngSuspenseError]'
})
export class SuspenseErrorDirective {
  constructor(
    @Inject(SuspenseDirective) suspense: SuspenseDirective,
    template: TemplateRef<any>,
    viewContainerRef: ViewContainerRef
  ) {
    suspense.state$
      .pipe(
        takeUntil(destroyed(this)),
        map(state => state.error),
        distinctUntilChanged()
      )
      .subscribe(error => {
        viewContainerRef.clear();
        if (error) {
          viewContainerRef.createEmbeddedView(template, { $implicit: error });
        }
      });
  }
}
