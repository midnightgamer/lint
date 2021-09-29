import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesListRoutingModule } from './resources-list-routing.module';
import { HomeComponent } from './home/home.component';
import { ResourcesComponent } from './resources/resources.component';
import { DatasetDescComponent } from './dataset-desc/dataset-desc.component';
import { DataDescriptorComponent } from './data-descriptor/data-descriptor.component';
import { ResourcesMapComponent } from './resources-map/resources-map.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { ResourceCardModule } from '../resource-card/resource-card.module';
import { SubscriberComponent } from './subscriber/subscriber.component';
import {GsMapComponent} from "./gs-map/gs-map.component";
import {FilesPopupComponent} from "./files-popup/files-popup.component";
import {ApiLinkPopupComponent} from "./api-link-popup/api-link-popup.component";
import { AccessTagsModule } from '../access-tags/access-tags.module';
import { RequestAccessPopupComponent } from './request-access-popup/request-access-popup.component';
import { SampleDataModule } from '../sample-data/sample-data.module';
import { LatestDataModule } from '../latest-data/latest-data.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  declarations: [
    HomeComponent,
    ResourcesComponent,
    DatasetDescComponent,
    DataDescriptorComponent,
    ResourcesMapComponent,
    ViewDataComponent,
    SubscriberComponent,
    GsMapComponent,
    FilesPopupComponent,
    ApiLinkPopupComponent,
    RequestAccessPopupComponent,
  ],
  imports: [
    CommonModule,
    ResourcesListRoutingModule,
    ResourceCardModule,
    AccessTagsModule,
    SampleDataModule,
    LeafletModule,
    LatestDataModule
  ],
  exports:[
    GsMapComponent,
    FilesPopupComponent,
    ApiLinkPopupComponent,
    RequestAccessPopupComponent,
  ]
})

export class ResourcesListModule { }
