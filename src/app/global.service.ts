import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loader_subject = new Subject<any>();
  toast_subject = new Subject<any>();
  popup_subject = new Subject<any>();
  active_city: any = '';
  city: any;
  cities: any = [];
  res_city: any;
  resource_groups_list: any;
  search_params: any;
  provider_rel: any;
  search_params_sub = new Subject<any>();
  id: any;
  type: any;
  filters: any = window.sessionStorage.filters ? JSON.parse(window.sessionStorage.filters) : this.get_default_filters();
  dataset_filters: any = window.sessionStorage.datasets ? JSON.parse(window.sessionStorage.datasets) : [];
  filters_sub = new Subject<any>();
  datasets: any;
  temp_data: any;
  single_resource: any
  dataset_res: any;
  res_token: any;
  request_dataset_id: string = '';
  map_colors: any = [
    '#1c699d',
    '#ff7592',
    '#564d65',
    '#2fcb83',
    '#0ea3b1',
    '#f39c1c',
    '#d35414',
    '#9b59b6',
  ];
  user_profile: any;
  role: any;
  cookie_interval: any;
  open_window: any;

  constructor() {
    this.temp_data = {};
    this.user_profile = {};
    this.res_token = {
      public: '',
      private: ''
    }
    this.role = '';
  }

  get_role() {
    return this.role;
  }

  set_role(value: any) {
    this.role = value;
  }

  set_loader(flag: Boolean) {
    this.loader_subject.next(flag);
  }

  get_loader(): Observable<any> {
    return this.loader_subject.asObservable();
  }

  set_toaster(type: any, message: any) {
    this.toast_subject.next({type, message});
  }

  get_toaster(): Observable<any> {
    return this.toast_subject.asObservable();
  }

  set_popup(flag: boolean, type: string): void {
    this.popup_subject.next({flag, type});
  }

  get_popup(): Observable<any> {
    return this.popup_subject.asObservable();
  }

  set_active_city(city: any): void {
    this.active_city = city;
  }

  get_active_city(): any {
    return this.active_city;
  }

  set_city(city: any): void {
    this.city = city;
  }

  get_city(): any {
    return this.city;
  }

  set_cities(cities: any): void {
    this.cities = cities;
  }

  get_cities(): any {
    return this.cities;
  }

  set_res_city(city: any): void {
    this.res_city = city;
  }

  get_res_city(): any {
    return this.res_city;
  }

  get_default_filters(): any {
    return {
      instance: this.get_active_city(),
      tags: [],
      providers: [],
      domains: [],
      search: ''
    };
  }

  get_filters_Obj(): any {
    return this.filters;
  }

  set_filters(filters: any): void {
    this.filters = filters;
    window.sessionStorage.filters = JSON.stringify(this.filters);
    this.filters_sub.next(this.filters);
  }

  get_filters(): Observable<any> {
    return this.filters_sub.asObservable();
  }

  set_datasets(datasets: any): void {
    this.datasets = datasets;
  }

  get_datasets(): any {
    return this.datasets;
  }

  set_dataset_filters(filters: any): void {
    this.dataset_filters = filters;
    window.sessionStorage.datasets = JSON.stringify(this.dataset_filters);
  }

  get_dataset_filters(): any {
    return this.dataset_filters;
  }

  get_map_colors(): any {
    return this.map_colors;
  }

  copy(id: any, message: string) {
    const el = document.createElement('textarea');
    el.value = id;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.set_toaster(
      'success',
      message
    );
  }

  set_filter_rsg(value: any) {
    this.resource_groups_list = value;
  }

  get_filter_rsg() {
    return this.resource_groups_list;
  }

  set_search_query(query: any) {
    this.search_params = query;
    window.sessionStorage.search_params = JSON.stringify(this.search_params);
  }

  set_filter(query: any) {
    this.set_search_query(query);
    this.search_params_sub.next(this.search_params);
  }

  get_filter(): Observable<any> {
    return this.search_params_sub.asObservable();
  }

  set_temp_data(data: any): void {
    this.temp_data = data;
  }

  get_temp_data(): any {
    return this.temp_data;
  }

  set_id_name_rel(val: any) {
    this.provider_rel = val;
  }

  get_id_name_rel() {
    return this.provider_rel;
  }

  set_item_id(id: any) {
    this.id = id;
  }

  get_item_id() {
    return this.id;
  }

  set_data_type(type: any) {
    this.type = type;
  }

  get_data_type() {
    return this.type;
  }

  manipulate_data_descriptor(obj: any) {
    if (!obj) return {};
    let arr: any = [], flags: any = [];
    let keys = Object.keys(obj);
    keys.forEach((a: any, i) => {
      if (typeof obj[a] == 'object' && a != 'dataDescriptorLabel' && a != 'type') {
        let o = {key: a, ...obj[a]};
        arr.push(o);
      }
    });
    let data_descriptor = arr;
    flags.length = data_descriptor.length;
    data_descriptor.forEach((a: any, i: number) => {
      data_descriptor[i] = this.convert_obj_array_of_objs(a);
      flags[i] = false;
    });
    return {data_descriptor: data_descriptor, flags: flags};
  }

  convert_obj_array_of_objs(obj: any) {
    let keys = Object.keys(obj);
    let arr: any = [];
    keys.forEach((a, i) => {
      if (a != 'type') {
        let data;
        if (typeof obj[a] == 'string') {
          data = {
            key: a,
            value: obj[a].includes(':') ? obj[a].split(':')[1] : obj[a],
          };
        } else if (typeof obj[a] == 'number') {
          data = {
            key: a,
            value: obj[a],
            level: 1,
          };
        } else if (typeof obj[a] == 'object') {
          data = {
            key: a,
            value: this.convert_obj_array_of_objs(obj[a]),
          };
        }
        arr.push(data);
      }
    });
    return arr;
  }


  set_single_resource(resource: any) {
    this.single_resource = resource;
  }

  get_single_resource() {
    return this.single_resource;
  }

  get_dataset_res() {
    return this.dataset_res;
  }

  set_dataset_res(res: any) {
    this.dataset_res = res;
  }

  get_auth_token() {
    return localStorage.getItem('iudx-ui-cat-auth-token');
  }

  set_res_token(key: any, value: any) {
    this.res_token[key] = value;
  }

  get_res_token(key: any) {
    return this.res_token[key];
  }

  set_user_profile(value: any) {
    this.user_profile = value;
  }

  get_user_profile() {
    return this.user_profile;
  }

  set_request_dataset_id(id: string): void {
    this.request_dataset_id = id;
  }

  get_request_dataset_id(): string {
    return this.request_dataset_id;
  }

  // Authentication Section

  get_cookie_value(key: string): string {
    let value = '';
    if (document.cookie && document.cookie.split(key + '=')[1] &&
      document.cookie.split(key + '=')[1].split(';')[0]) {
      value = document.cookie.split(key + '=')[1].split(';')[0];
    }
    return value;
  }

  listen_cookie(keycloak: any): void {
    if (this.get_cookie_value('iudx-ui-sso') == 'logged-in') {
      clearInterval(this.cookie_interval);
      this.open_window.close();
      //location.reload();
      keycloak.login({
        redirectUri: window.location.href,
        prompt: "none"
      });
    }
  }

  login(keycloak: any): void {
    this.cookie_interval = setInterval(()=>{
      this.listen_cookie(keycloak);
    },100);
    this.open_window = window.open(environment.sso_url, '_blank');
  }

  logout(keycloak: any): void {
    document.cookie = "iudx-ui-sso='logged-out';path=/;max-age=0;domain=" + environment.parent_domain;
    localStorage.removeItem('iudx-ui-cat-auth-token');
    this.set_toaster('error','You have been logged out. Please login again.');
    setTimeout(()=>{
      keycloak.logout(window.location.href);
    }, 100);
  }

}
