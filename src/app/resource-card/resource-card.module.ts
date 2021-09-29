import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceCardComponent } from './resource-card.component';
import { AccessTagsModule } from '../access-tags/access-tags.module';


@NgModule({
  declarations: [
    ResourceCardComponent,

  ],
    imports: [
        CommonModule,
        AccessTagsModule
    ],
  exports:[
    ResourceCardComponent,


  ]
})
export class ResourceCardModule { }
