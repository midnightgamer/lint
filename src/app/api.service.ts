import {Injectable} from '@angular/core';
import {NetworkService} from "./network.service";
import {GlobalService} from "./global.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  cities: any = [];
  domains: any = [];
  tags: any = [];
  providers: any = [];
  summary: any;

  constructor(private network: NetworkService, private global: GlobalService) {
  }

  async get_cities(): Promise<any> {
    if (this.cities && this.cities.length === 0) {
      this.cities = await this.network.get_api('instances');
    }
    return this.cities;
  }

  async get_domains(): Promise<any> {
    if (this.domains && this.domains.length === 0) {
      this.domains = await this.network.get_api('domains');
    }
    return this.domains;
  }

  async get_providers(): Promise<any> {
    if (this.providers && this.providers.length === 0) {
      let post_body = {
        instance: this.global.get_active_city()
      };
      this.providers = await this.network.post_api('providers', post_body);
    }
    return this.providers;
  }

  async get_summary(): Promise<any> {
    if (!this.summary) {
      let post_body = {
        instance: this.global.get_active_city()
      };
      this.summary = await this.network.post_api('overview', post_body);
    }
    return this.summary;
  }

  async get_tags(): Promise<any> {
    if (this.tags && this.tags.length === 0) {
      this.tags = await this.network.get_api('tags');
    }
    return this.tags;
  }

  async get_datasets(filters?: any) {
    let post_body: any = {
      instance: this.global.get_active_city(),
      tags: [],
      providers: [],
      domains: [],
      search: ''
    };
    if(filters) {
      for(let key in post_body) {
        if(filters[key]) {
          post_body[key] = filters[key];
        }
      }
    }
    return await this.network.post_api('datasets', post_body);
  }

  async get_dataset_details(dataset: string) {
    let post_body = {
      dataset
    };
    return await this.network.post_api('dataset', post_body);
  }

  async get_geoquery_resource_list(filters?: any) {
    let post_body: any = {
      instance: this.global.get_active_city(),
      datasets: []
    };
    if(filters) {
      for(let key in post_body) {
        if(filters[key]) {
          post_body[key] = filters[key];
        }
      }
    }
    return await this.network.post_api('geoquery', post_body);
  }

  async get_relationship() {
    return await this.network.get_api('relationship');
  }

  async get_latest_data(id: any, type: string) {
    let data: any = await this.network.get_api(environment.res_url + 'ngsi-ld/v1/entities/' + id, 'res', type);
  }

  async get_resource_map_data(id: any) {
    return await this.network.get_api(environment.res_url + 'ngsi-ld/v1/entities?id=' + id + '&q=id==' + id, 'res');
  }

  async get_user_profile() {
    return await this.network.get_api(environment.auth_url + 'auth/v1/user/profile', 'auth');
  }

}