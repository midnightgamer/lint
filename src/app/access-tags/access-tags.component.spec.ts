import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessTagsComponent } from './access-tags.component';

describe('AccessTagsComponent', () => {
  let component: AccessTagsComponent;
  let fixture: ComponentFixture<AccessTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
