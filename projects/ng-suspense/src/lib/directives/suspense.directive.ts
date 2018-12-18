import { Directive, Input, OnDestroy, TemplateRef } from '@angular/core';
import { Observable, Subscription, from, BehaviorSubject } from 'rxjs';

interface SuspenseState {
  loading?: boolean;
  error?: any;
  data?: any;
  loaded: boolean;
}

@Directive({
  selector: '[ngSuspense]'
})
export class SuspenseDirective implements OnDestroy {
  @Input()
  set ngSuspense(value: Observable<any>) {
    this.subscribeTo(value);
  }

  @Input()
  set ngSuspenseTemplate(template: TemplateRef<any> | null) {
    console.log('Template: ', template);
  }

  state$: BehaviorSubject<SuspenseState> = new BehaviorSubject({
    loaded: false
  });

  private subscription: Subscription | null = null;

  constructor() {}

  ngOnDestroy() {
    this.unsubscribe();
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private subscribeTo(value$: Observable<any>) {
    this.unsubscribe();

    this.state$.next({
      loading: true,
      loaded: false
    });

    this.subscription = from(value$).subscribe(
      data => {
        this.state$.next({
          data,
          loaded: true
        });
      },
      error => {
        this.state$.next({ error, loaded: true });
      }
    );
  }
}
