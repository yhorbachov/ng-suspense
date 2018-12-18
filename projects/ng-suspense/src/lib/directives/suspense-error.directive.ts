import { Directive, Inject, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';
import { SuspenseDirective } from './suspense.directive';
import { destroyed } from '../utils';
import { takeUntil, map, distinctUntilChanged } from 'rxjs/operators';

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
    private template: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.suspense.state$
      .pipe(
        takeUntil(destroyed(this)),
        map(state => state.error),
        distinctUntilChanged()
      )
      .subscribe(error => {
        this.viewContainerRef.clear();
        if (error) {
          this.viewContainerRef.createEmbeddedView(this._customTemplate || this.template, {
            $implicit: error
          });
        }
      });
  }
}
