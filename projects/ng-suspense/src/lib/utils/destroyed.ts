import { Subject } from 'rxjs';

export function destroyed(component: any) {
  const destroy$ = new Subject();
  const orig = component.ngOnDestroy;
  component.ngOnDestroy = function() {
    destroy$.next();
    if (orig) {
      return orig.apply(this, arguments);
    }
  };

  return destroy$;
}
