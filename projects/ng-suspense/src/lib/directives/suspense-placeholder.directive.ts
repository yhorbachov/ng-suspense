import { Directive, Inject, TemplateRef, ViewContainerRef, Input, OnInit } from '@angular/core';
import { SuspenseDirective } from './suspense.directive';
import { destroyed } from '../utils';
import { takeUntil, map, distinctUntilChanged, switchMap, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Directive({
  selector: '[ngSuspensePlaceholder]'
})
export class SuspensePlaceholderDirective implements OnInit {
  @Input()
  set ngSuspensePlaceholder(delay: number) {
    this._delay = delay;
  }

  @Input()
  set ngSuspensePlaceholderTemplate(template: TemplateRef<any>) {
    this._customTemplate = template;
  }

  private _delay = 0;
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
        map(state => state.loading),
        switchMap(isLoading => {
          if (isLoading) {
            return of(true).pipe(delay(this._delay));
          } else {
            return of(false);
          }
        }),
        distinctUntilChanged()
      )
      .subscribe(loading => {
        this.viewContainerRef.clear();
        if (loading) {
          this.viewContainerRef.createEmbeddedView(this._customTemplate || this.template);
        }
      });
  }
}
