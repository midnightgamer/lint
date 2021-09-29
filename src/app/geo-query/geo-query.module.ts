import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeoQueryRoutingModule } from './geo-query-routing.module';
import { HomeComponent } from './home/home.component';
import { GeoMapComponent } from './geo-map/geo-map.component';
import { FiltersComponent } from './filters/filters.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HomeComponent,
    GeoMapComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    GeoQueryRoutingModule,
    FormsModule,
    LeafletModule
  ]
})
export class GeoQueryModule { }
