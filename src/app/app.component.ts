import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-suspense-app';
  data$ = new Subject();

  next(data: any) {
    this.data$.next(data);
  }

  error() {
    this.data$.error(new Error('Snap!'));
  }

  reset() {
    this.data$ = new Subject();
  }
}
