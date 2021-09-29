import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestDataComponent } from './latest-data/latest-data.component';



@NgModule({
  declarations: [
    LatestDataComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LatestDataComponent
  ]
})
export class LatestDataModule { }
