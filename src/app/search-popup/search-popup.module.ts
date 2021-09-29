import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPopupComponent } from './search-popup.component';

@NgModule({
  declarations: [
    SearchPopupComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SearchPopupComponent,
  ]
})
export class SearchPopupModule { }
