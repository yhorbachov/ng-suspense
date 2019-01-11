import {
  Directive,
  Inject,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { SuspenseDirective } from './suspense.directive';
import { destroyed } from '../utils';
import { takeUntil, map, distinctUntilChanged } from 'rxjs/operators';

/**
 * TODO: Add documentation
 */
@Directive({
  selector: '[ngSuspenseError]'
})
export class SuspenseErrorDirective implements OnInit {
  @Input()
  set ngSuspenseError(template: TemplateRef<any>) {
    this._customTemplate = template;
  }

  private _customTemplate: TemplateRef<any> | null = null;

  constructor(
    @Inject(SuspenseDirective) private suspense: SuspenseDirective,
    private _template: TemplateRef<any>,
    private _viewContainerRef: ViewContainerRef,
    private _changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.suspense.state$
      .pipe(
        takeUntil(destroyed(this)),
        map(state => state.error),
        distinctUntilChanged()
      )
      .subscribe(error => this._render(error));
  }

  private _render(error: any) {
    this._viewContainerRef.clear();
    if (error) {
      this._viewContainerRef.createEmbeddedView(this._customTemplate || this._template, {
        $implicit: error
      });
      this._changeDetectionRef.markForCheck();
    }
  }
}
