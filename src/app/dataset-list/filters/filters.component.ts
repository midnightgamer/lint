import {Component, OnDestroy, OnInit} from '@angular/core';
import { ApiService } from 'src/app/api.service';
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  filters: Array<string> = [];
  popup_status: boolean;
  popup_type: string;
  popup_sub: any;
  data: any = {
    domains: [],
    tags: [],
    providers: []
  };
  filters_data: any = [];
  type: any = '';
  filter_tags: any = {
    domains: [],
    tags: [],
    providers: []
  };

  constructor(private global: GlobalService, private api: ApiService) {
    this.filters = ['domains', 'tags', 'providers'];

    this.popup_status = false;
    this.popup_type = '';
    this.popup_sub = this.global.get_popup().subscribe((data) => {
      this.popup_status = data.flag;
      this.popup_type = data.type;
      this.set_filter_tags();
    });
  }

  async ngOnInit(): Promise<void> {
    this.data.domains = await this.api.get_domains();
    this.data.tags = await this.api.get_tags();
    this.data.providers = await this.api.get_providers();
    this.set_filter_tags();
  }

  set_filter_tags(): void {
    this.filter_tags.domains = [];
    this.filter_tags.tags = [];
    this.filter_tags.providers = [];
    let filter_Obj = this.global.get_filters_Obj();
    this.data.domains.forEach((domain: any) => {
      if(filter_Obj.domains.includes(domain.label))
        this.filter_tags.domains.push(domain);
    });
    filter_Obj.tags.forEach((tag: any) => {
      this.filter_tags.tags.push(tag);
    });
    this.data.providers.forEach((provider: any) => {
      if(filter_Obj.providers.includes(provider._id))
        this.filter_tags.providers.push(provider);
    });
  }

  removeTag(type: any, tag: any): void {
    let filters = Object.assign({}, this.global.get_filters_Obj());
    let tag_val = tag;
    if (type === 'domains') tag_val = tag.label;
    if (type === 'providers') tag_val = tag._id;
    filters[type].splice(filters[type].indexOf(tag_val), 1);
    this.filter_tags[type].splice(this.filter_tags[type].indexOf(tag), 1);
    this.global.set_filters(filters);
  }

  openPopup(filter: any): void {
    this.type = filter;
    this.filters_data = this.data[filter];
    this.global.set_popup(true, 'show-filter')
  }

  ngOnDestroy(): void {
    this.popup_sub.unsubscribe();
  }

}
