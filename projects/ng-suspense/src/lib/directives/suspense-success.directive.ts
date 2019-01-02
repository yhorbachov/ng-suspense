import { Directive, Inject, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { SuspenseDirective } from './suspense.directive';
import { destroyed } from '../utils';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[ngSuspenseSuccess]'
})
export class SuspenseSuccessDirective {
  @Input('ngSuspenseSuccess')
  set ngSuspenseSuccess(template: TemplateRef<any>) {
    this._customTemplate = template;
  }

  private _customTemplate: TemplateRef<any> | null = null;

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
          viewContainerRef.createEmbeddedView(this._customTemplate || template, {
            $implicit: state.data
          });
        }
      });
  }
}
