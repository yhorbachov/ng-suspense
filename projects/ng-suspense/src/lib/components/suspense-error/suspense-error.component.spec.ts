import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenseErrorComponent } from './suspense-error.component';

describe('SuspenseErrorComponent', () => {
  let component: SuspenseErrorComponent;
  let fixture: ComponentFixture<SuspenseErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspenseErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspenseErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
