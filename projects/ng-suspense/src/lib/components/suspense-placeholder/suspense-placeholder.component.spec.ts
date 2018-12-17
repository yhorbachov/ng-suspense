import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspensePlaceholderComponent } from './suspense-placeholder.component';

describe('SuspensePlaceholderComponent', () => {
  let component: SuspensePlaceholderComponent;
  let fixture: ComponentFixture<SuspensePlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspensePlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspensePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
