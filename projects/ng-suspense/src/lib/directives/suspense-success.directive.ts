import {
  Directive,
  Inject,
  TemplateRef,
  ViewContainerRef,
  Input,
  ChangeDetectorRef,
  EmbeddedViewRef
} from '@angular/core';
import { SuspenseDirective, SuspenseState } from './suspense.directive';
import { destroyed } from '../utils';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

class SuspenseSuccessContext {
  $implicit: any = null;
}

/**
 * TODO: Add documentation
 */
@Directive({
  selector: '[ngSuspenseSuccess]'
})
export class SuspenseSuccessDirective {
  @Input('ngSuspenseSuccess')
  set ngSuspenseSuccess(template: TemplateRef<any>) {
    this._customTemplate = template;
  }

  private _customTemplate: TemplateRef<any> | null = null;
  private readonly _context = new SuspenseSuccessContext();
  private _viewRef: EmbeddedViewRef<any> | null = null;

  constructor(
    @Inject(SuspenseDirective) suspense: SuspenseDirective,
    private _template: TemplateRef<any>,
    private _viewContainerRef: ViewContainerRef,
    private _changeDetectionRef: ChangeDetectorRef
  ) {
    suspense.state$
      .pipe(
        takeUntil(destroyed(this)),
        distinctUntilChanged()
      )
      .subscribe(state => this._render(state));
  }

  private _render(suspenseState: SuspenseState) {
    if (suspenseState.loaded && !suspenseState.error) {
      this._context.$implicit = suspenseState.data;
      if (!this._viewRef) {
        this._viewRef = this._viewContainerRef.createEmbeddedView(
          this._customTemplate || this._template,
          this._context
        );
      }
      this._changeDetectionRef.markForCheck();
    } else {
      this._viewContainerRef.clear();
    }
  }
}
