import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDescriptorComponent } from './data-descriptor.component';

describe('DataDescriptorComponent', () => {
  let component: DataDescriptorComponent;
  let fixture: ComponentFixture<DataDescriptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataDescriptorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDescriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
