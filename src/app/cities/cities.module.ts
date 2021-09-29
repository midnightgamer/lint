import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './banner/banner.component';
import { CitiesListComponent } from './cities-list/cities-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    CitiesListComponent
  ],
  imports: [
    CommonModule,
    CitiesRoutingModule
  ]
})
export class CitiesModule { }
