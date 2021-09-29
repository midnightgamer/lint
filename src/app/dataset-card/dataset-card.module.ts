import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasetCardComponent } from './dataset-card/dataset-card.component';
import { AccessTagsModule } from '../access-tags/access-tags.module';

@NgModule({
  declarations: [
    DatasetCardComponent
  ],
  imports: [
    CommonModule,
    AccessTagsModule
  ],
  exports: [
    DatasetCardComponent
  ]
})
export class DatasetCardModule { }
