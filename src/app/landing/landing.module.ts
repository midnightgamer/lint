import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { DomainsComponent } from './domains/domains.component';
import { CitiesComponent } from './cities/cities.component';
import { DatasetsComponent } from './datasets/datasets.component';
import { UspsComponent } from './usps/usps.component';
import { ProviderComponent } from './provider/provider.component';

import { DatasetCardModule } from '../dataset-card/dataset-card.module';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { KnowledgeHubComponent } from './knowledge-hub/knowledge-hub.component';
import { RecentDatasetsComponent } from './recent-datasets/recent-datasets.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HomeComponent,
    DomainsComponent,
    CitiesComponent,
    DatasetsComponent,
    UspsComponent,
    ProviderComponent,
    TestimonialsComponent,
    KnowledgeHubComponent,
    RecentDatasetsComponent
  ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        DatasetCardModule,
        FormsModule
    ]
})
export class LandingModule { }
