import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from './api.service';
import { GlobalService } from './global.service';
import { KeycloakService } from 'keycloak-angular';
import { get_keycloak } from './keycloak.init';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loader: Boolean;
  toast_props: any;
  show_toast: Boolean;
  is_loaded: Boolean;
  cookie_interval: any;
  constructor(
    private title: Title,
    private global: GlobalService,
    private api: ApiService,
    private keycloak: KeycloakService
  ) {
    this.is_loaded = false;
    this.show_toast = false;
    this.loader = false;
    this.global.get_loader().subscribe((flag) => {
      this.loader = flag;
    });
    this.global.get_toaster().subscribe(data => {
      this.toast_props = data;
      this.show_toast = true;
      setTimeout(()=>{
        this.show_toast = false;
      }, 2500);
    });
    get_keycloak().subscribe(()=>{
      this.initialize();
    });
  }

  async initialize() {
    await this.analyse_user_login();
    await this.analyse_cities();
    this.is_loaded = true;
  }

  async analyse_user_login() {
    if(document.cookie && document.cookie.split('iudx-ui-sso=')[1] && document.cookie.split('iudx-ui-sso=')[1].split(';')[0] == 'logged-in') {
      let lstoken = localStorage.getItem('iudx-ui-cat-auth-token');
      if(lstoken && lstoken != ''){
        await this.analyse_user_profile(lstoken);
      } else {
        await this.keycloak.isLoggedIn().then(async result => {
          if(result) {
            let token: any = await this.keycloak.getToken();
            await this.analyse_user_profile("Bearer " + token);
          } else {
            this.keycloak.login({
              redirectUri: window.location.href
            });
          }
        });
      }
    }
    return true;
  }

  async analyse_cities() {
    let whitelist_urls = ['localhost:4000','catalogue'];
    let origin = location.host.split('.')[0];
    let host = whitelist_urls.includes(origin) ? '' : origin;
    this.global.set_active_city(host);
    let instances  = await this.api.get_cities();
    this.global.set_cities(instances);
    if(host != '') {
      instances.forEach((a: any)=>{
        if(host == a.instance) {
          this.title.setTitle(a.name + " | IUDX | India Urban Data Exchange");
          this.global.set_city(a);
        }
      });
    } else {
      this.title.setTitle("IUDX | India Urban Data Exchange");
    }
    return true;
  }

  async analyse_user_profile(token: any) {
    this.global.set_auth_token(token);
    let response: any = await this.api.get_user_profile();
    let profile = response.results;
    this.global.set_user_profile(response.results);
    let role = response.results.roles.includes('consumer') ? 'consumer' : 'non-consumer';
    this.global.set_role(role);
    if(profile.roles.includes('consumer')) {
      localStorage.setItem('iudx-ui-cat-auth-token',token);
    } else {
      this.global.set_toaster('error',"You don't have access to this panel.");
    }
    return true;
  }

}
