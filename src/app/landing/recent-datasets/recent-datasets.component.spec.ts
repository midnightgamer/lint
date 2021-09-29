import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentDatasetsComponent } from './recent-datasets.component';

describe('RecentDatasetsComponent', () => {
  let component: RecentDatasetsComponent;
  let fixture: ComponentFixture<RecentDatasetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentDatasetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentDatasetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
