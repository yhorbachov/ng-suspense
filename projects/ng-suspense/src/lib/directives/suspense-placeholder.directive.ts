import { Directive, Inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { SuspenseDirective } from './suspense.directive';
import { destroyed } from '../utils';
import { takeUntil, map, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[ngSuspensePlaceholder]'
})
export class SuspensePlaceholderDirective {
  constructor(
    @Inject(SuspenseDirective) suspense: SuspenseDirective,
    template: TemplateRef<any>,
    viewContainerRef: ViewContainerRef
  ) {
    suspense.state$
      .pipe(
        takeUntil(destroyed(this)),
        map(state => state.loading),
        distinctUntilChanged()
      )
      .subscribe(loading => {
        viewContainerRef.clear();
        if (loading) {
          viewContainerRef.createEmbeddedView(template);
        }
      });
  }
}
