import { Directive, Input, OnDestroy } from '@angular/core';
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
  @Input('ngSuspense')
  set ngSuspense(value: Observable<any> | Promise<any>) {
    this.subscribe(value);
  }

  state$: BehaviorSubject<SuspenseState> = new BehaviorSubject({
    loaded: false
  });

  private subscription: Subscription | null = null;

  ngOnDestroy() {
    this.unsubscribe();
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private subscribe(value$: Observable<any> | Promise<any>) {
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
