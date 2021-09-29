import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatasetListRoutingModule } from './dataset-list-routing.module';
import { HomeComponent } from './home/home.component';
import { FiltersComponent } from './filters/filters.component';
import { DatasetsComponent } from './datasets/datasets.component';

import { DatasetCardModule } from '../dataset-card/dataset-card.module';
import { FilterPopupModule } from '../filter-popup/filter-popup.module';

@NgModule({
  declarations: [
    HomeComponent,
    FiltersComponent,
    DatasetsComponent
  ],
  imports: [
    CommonModule,
    DatasetListRoutingModule,
    DatasetCardModule,
    FilterPopupModule
  ]
})
export class DatasetListModule { }
