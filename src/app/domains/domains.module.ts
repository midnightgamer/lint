import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomainsRoutingModule } from './domains-routing.module';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './banner/banner.component';
import { DataDomainsComponent } from './data-domains/data-domains.component';


@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    DataDomainsComponent
  ],
  imports: [
    CommonModule,
    DomainsRoutingModule
  ]
})
export class DomainsModule { }
