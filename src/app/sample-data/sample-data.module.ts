import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleDataComponent } from './sample-data.component';



@NgModule({
  declarations: [
    SampleDataComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SampleDataComponent
  ]
})
export class SampleDataModule { }
