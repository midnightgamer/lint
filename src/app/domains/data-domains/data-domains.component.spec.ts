import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDomainsComponent } from './data-domains.component';

describe('DataDomainsComponent', () => {
  let component: DataDomainsComponent;
  let fixture: ComponentFixture<DataDomainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataDomainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
