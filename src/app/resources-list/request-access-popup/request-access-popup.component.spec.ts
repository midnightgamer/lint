import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAccessPopupComponent } from './request-access-popup.component';

describe('RequestAccessPopupComponent', () => {
  let component: RequestAccessPopupComponent;
  let fixture: ComponentFixture<RequestAccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAccessPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
