import { Component, OnInit, Inject } from '@angular/core';
import { SuspenseDirective } from '../../directives';

@Component({
  selector: 'ng-suspense-placeholder',
  templateUrl: './suspense-placeholder.component.html',
  styleUrls: ['./suspense-placeholder.component.css']
})
export class SuspensePlaceholderComponent implements OnInit {
  constructor(@Inject(SuspenseDirective) suspense: SuspenseDirective) {}

  ngOnInit() {}
}
