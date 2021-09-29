import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetDescComponent } from './dataset-desc.component';

describe('DatasetDescComponent', () => {
  let component: DatasetDescComponent;
  let fixture: ComponentFixture<DatasetDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
