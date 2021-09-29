import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesPopupComponent } from './files-popup.component';

describe('FilesPopupComponent', () => {
  let component: FilesPopupComponent;
  let fixture: ComponentFixture<FilesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
