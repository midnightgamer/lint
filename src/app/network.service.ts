import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {GlobalService} from "./global.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  url: string;
  constructor(
    private global: GlobalService,
    private http: HttpClient,
    private keycloak:KeycloakService
  ) {
    this.url = environment.mlayer_url;
  }

  get_headers(auth: any, type?: string) {
    let headers: any = {};
    let token = this.global.get_auth_token();
    if(auth == 'auth' && token) {
      headers["Authorization"] = this.global.get_auth_token();
    }
    if(auth == 'res' && token) {
      headers["token"] = this.global.get_res_token(type);
    }
    return headers;
  }

  get_api(url: string, auth?: string, type?: string) {
    this.global.set_loader(true);
    return new Promise((resolve, reject) => {
      this.http.get(this.get_url(url), { headers: new HttpHeaders(this.get_headers(auth, type)) }).subscribe(async (data: any) => {
        this.global.set_loader(false);
        resolve(data);
      }, async (err) => {
        this.global.set_loader(false);
        if(auth == 'res') reject(err);
        if(err.status == 401) this.unauthorizedErrorAlert();
        else if (err.status == 400 || err.status == 404) this.technicalErrorAlert(err);
        else if (err.status == 500 || err.status == 501 || err.status == 502 || err.status == 503 || err.status == 504) this.serverErrorAlert();
        reject(err);
      });
    });
  }

  post_api(url: string, post_body: object, auth?: string, type?: string) {
    this.global.set_loader(true);
    return new Promise((resolve, reject) => {
      this.http.post(this.get_url(url), post_body, { headers: new HttpHeaders(this.get_headers(auth, type)) }).subscribe(async (data: any) => {
        this.global.set_loader(false);
        resolve(data);
      }, async (err) => {
        this.global.set_loader(false);
        if(auth == 'res') reject(err);
        if(err.status == 401) this.unauthorizedErrorAlert();
        else if (err.status == 400 || err.status == 404) this.technicalErrorAlert(err);
        else if (err.status == 500 || err.status == 501 || err.status == 502 || err.status == 503 || err.status == 504) this.serverErrorAlert();
        reject(err);
      });
    });
  }

  put_api(url: string, put_body: object, auth?: string, type?: string) {
    this.global.set_loader(true);
    return new Promise((resolve, reject) => {
      this.http.put(this.get_url(url), put_body, { headers: new HttpHeaders(this.get_headers(auth, type)) }).subscribe(async (data: any) => {
        this.global.set_loader(false);
        resolve(data);
      }, async (err) => {
        this.global.set_loader(false);
        if(auth == 'res') reject(err);
        if(err.status == 401) this.unauthorizedErrorAlert();
        else if (err.status == 400 || err.status == 404) this.technicalErrorAlert(err);
        else if (err.status == 500 || err.status == 501 || err.status == 502 || err.status == 503 || err.status == 504) this.serverErrorAlert();
        reject(err);
      });
    });
  }

  delete_api(url: string, auth?: string, type?: string) {
    this.global.set_loader(true);
    return new Promise((resolve, reject) => {
      this.http.delete(this.get_url(url), { headers: new HttpHeaders(this.get_headers(auth, type)) }).subscribe(async (data: any) => {
        this.global.set_loader(false);
        resolve(data);
      }, async (err) => {
        this.global.set_loader(false);
        if(auth == 'res') reject(err);
        if(err.status == 401) this.unauthorizedErrorAlert();
        else if (err.status == 400 || err.status == 404) this.technicalErrorAlert(err);
        else if (err.status == 500 || err.status == 501 || err.status == 502 || err.status == 503 || err.status == 504) this.serverErrorAlert();
        reject(err);
      });
    });
  }

  serverErrorAlert() {
    this.global.set_toaster('error', 'Network error. Try again later.');
  }

  technicalErrorAlert(err: any) {
    this.global.set_toaster('error', err.error.title);
  }

  unauthorizedErrorAlert() {
    document.cookie = "iudx-ui-cat=logged-out;max-age=0";
    document.cookie = "iudx-ui-sso=logged-out;max-age=0;domain=" + environment.parent_domain;
    this.global.set_toaster('error','You have been logged out. Please login again.');
    setTimeout(()=>{
      this.keycloak.logout();
    },100);
  }

  get_url(url: any) {
    if (url.indexOf('http') === -1) {
      return environment.mlayer_url + url;
    }
    return url;
  }

}