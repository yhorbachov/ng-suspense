import { SuspenseDirective } from './suspense.directive';
import { Subject } from 'rxjs';

describe('SuspenseDirective', () => {
  let directive: SuspenseDirective;

  beforeEach(() => {
    directive = new SuspenseDirective();
  });

  const runTests = () => {
    it('Should set default default state', () => {});

    it('should change state on error', () => {});

    it('should change state on success', () => {});

    it('should not resubscribe if same input value is set', () => {});

    it('should unsubscribe when new input appears', () => {});

    it('should change state to default when new input provided', () => {});
  };

  describe('with Observable', () => {
    let subject: Subject<any>;
    beforeEach(() => {
      subject = new Subject();
      directive.ngSuspense = subject;
    });

    runTests();
  });

  describe('with Promise', () => {
    let subject: Subject<any>;
    beforeEach(() => {
      subject = new Subject();
      directive.ngSuspense = subject;
    });

    runTests();
  });
});
