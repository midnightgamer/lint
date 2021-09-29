import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLinkPopupComponent } from './api-link-popup.component';

describe('ApiLinkPopupComponent', () => {
  let component: ApiLinkPopupComponent;
  let fixture: ComponentFixture<ApiLinkPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiLinkPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiLinkPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
