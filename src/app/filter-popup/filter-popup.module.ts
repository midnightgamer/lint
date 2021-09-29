import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPopupComponent } from './filter-popup/filter-popup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FilterPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FilterPopupComponent
  ]
})
export class FilterPopupModule { }
