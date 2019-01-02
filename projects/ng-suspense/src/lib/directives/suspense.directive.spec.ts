import { SuspenseDirective } from './suspense.directive';
import { Subject } from 'rxjs';

describe('SuspenseDirective', () => {
  let directive: SuspenseDirective;

  beforeEach(() => {
    directive = new SuspenseDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('with Observable', () => {
    let subject: Subject<any>;
    beforeEach(() => {
      subject = new Subject();
      directive.ngSuspense = subject;
    });

    it('Should set default "loaded" property', () => {});
  });
});
