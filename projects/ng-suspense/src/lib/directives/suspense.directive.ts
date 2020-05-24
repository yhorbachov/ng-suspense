import { Directive, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription, from, BehaviorSubject } from 'rxjs';

export interface SuspenseState {
  loading?: boolean;
  error?: any;
  data?: any;
  loaded: boolean;
}

/**
 * TODO: Add documentation
 */
@Directive({
  selector: '[ngSuspense]',
})
export class SuspenseDirective implements OnDestroy {
  @Input('ngSuspense')
  set ngSuspense(obj: Observable<any> | Promise<any>) {
    if (obj !== this._obj) {
      this._subscribe(obj);
    }
  }

  state$: BehaviorSubject<SuspenseState> = new BehaviorSubject<SuspenseState>({
    loaded: false,
  });

  private _obj: Observable<any> | Promise<any> | null = null;
  private _subscription: Subscription | null = null;

  ngOnDestroy() {
    this._unsubscribe();
  }

  private _unsubscribe() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private _subscribe(obj: Observable<any> | Promise<any>) {
    this._unsubscribe();

    this._obj = obj;

    this.state$.next({
      loading: true,
      loaded: false,
    });

    this._subscription = from(obj).subscribe(
      (data) => {
        this.state$.next({
          data,
          loaded: true,
        });
      },
      (error) => {
        this.state$.next({ error, loaded: true });
      }
    );
  }
}
