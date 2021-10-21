import {Injectable} from '@angular/core';
import {NetworkService} from "./network.service";
import {GlobalService} from "./global.service";
import {environment} from 'src/environments/environment';

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
    if (filters) {
      for (let key in post_body) {
        if (filters[key]) {
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
    if (filters) {
      for (let key in post_body) {
        if (filters[key]) {
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
    let isToken = await this.get_res_public_token();
    if (!isToken) return {
      'type': 'ERROR',
      'message': 'Not Authorized Consumer'
    };
    let data: any = await this.network.get_api(environment.res_url + 'ngsi-ld/v1/entities/' + id, 'res', type);
    return data;
  }

  async get_resource_map_data(id: any, type: string) {
    let isToken = await this.get_res_public_token();
    if (!isToken) return {
      'type': 'ERROR',
      'message': 'Not Authorized Consumer'
    };
    let data: any = await this.network.get_api(environment.res_url + 'ngsi-ld/v1/entities?id=' + id + '&q=id==' + id, 'res', type);
    return data;
  }

  async get_user_profile() {
    return await this.network.get_api(environment.auth_url + 'auth/v1/user/profile', 'auth');
  }

  async get_res_public_token() {
    let token = this.global.get_res_token('public');
    let isTokenNeeded = false;
    if (token) {
      let valid: any = await this.check_valid_token(token);
      if (!valid || !valid.type || valid.type.indexOf('Success') == -1) {
        isTokenNeeded = true;
      }
    } else {
      isTokenNeeded = true;
    }

    if (isTokenNeeded) {
      let post_body = {
        "itemId": environment.res_public_token_url,
        "itemType": "resource_server",
        "role": "consumer"
      };
      let token_resp: any = await this.network.post_api(environment.auth_url + "auth/v1/token", post_body, 'auth', 'no-error');
      if (token_resp && token_resp.results && token_resp.results.accessToken)
        this.global.set_res_token('public', token_resp.results.accessToken);
      else
        return false;
    }
    return true;
  }

  async check_valid_token(token: any) {
    let post_body = {
      "accessToken": token
    };
    return await this.network.post_api(environment.auth_url + "auth/v1/introspect", post_body, 'no-error');
  }

  async request_dataset(id: string, itemType: string, expiry: any) {
    let isToken = await this.get_res_public_token();
    if (!isToken) return {
      'type': 'ERROR',
      'message': 'Not Authorized Consumer'
    };
    let body = {
      "request": [{
        "itemId": id,
        "itemType": itemType,
        "expiryDuration": expiry,
        "constraints": {
          "access": [
            "api",
            "subs",
            "file"
          ]
        }
      }]
    };
    let data: any = await this.network.post_api(environment.auth_url + 'auth/v1/policies/requests', body, 'auth', 'public');
    return data;
  }

  async get_special_data(data: any): Promise<any> {
    let newParams = `geoproperty=location&georel=${data.type}&geometry=${data.geometry}`;
    if (data.geometry == 'Point') {
      newParams += `&maxDistance=${JSON.stringify(data.radius)}`
    }
    if (data.geometry == 'Polygon') {
      newParams += `&coordinates=${JSON.stringify([data.coordinates])}`
    } else {
      newParams += `&coordinates=${JSON.stringify(data.coordinates)}`
    }
    return await this.network.get_api(environment.cat_url + `search?${newParams}`, 'cat', '');

  }
}
