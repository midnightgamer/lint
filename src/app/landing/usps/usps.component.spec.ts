import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UspsComponent } from './usps.component';

describe('UspsComponent', () => {
  let component: UspsComponent;
  let fixture: ComponentFixture<UspsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UspsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UspsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
