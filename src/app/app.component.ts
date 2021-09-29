import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from './api.service';
import { GlobalService } from './global.service';
import { KeycloakService } from 'keycloak-angular';
import { get_keycloak } from './keycloak.init';
import { environment } from 'src/environments/environment';

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
    // analyse user profile
    if(document.cookie && document.cookie.split('iudx-ui-sso=')[1] && document.cookie.split('iudx-ui-sso=')[1].split(';')[0] == 'true') {
      if(document.cookie && document.cookie.split('iudx-ui-cat=')[1]){
        let token = document.cookie.split('iudx-ui-cat=')[1].split(';')[0];
        this.global.set_token(token);
        await this.analyse_profile(token);
      } else {
        this.keycloak.isLoggedIn().then(async result => {
          if(result) {
            let token: any = await this.keycloak.getToken();
            await this.analyse_profile("Bearer " + token);
          } else {
            this.keycloak.login({
              redirectUri: window.location.origin
            });
          }
        });
      }
    } else {
      this.cookie_interval = setInterval(()=>{
        this.listen_cookie();
      },100);
    }
    // analyse cities
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
    this.is_loaded = true;
  }

  async analyse_profile(token: any) {
    try {
      let response: any = await this.api.get_user_profile();
      let profile_completion = response.type.split(':')[3] =='Success'? true : false;
      if(!profile_completion) {
        window.open(environment.sso_url + '?login=auto','_blank');
        this.global.set_toaster('error', 'Profile completion is pending.');
      } else {
        document.cookie = "iudx-ui-cat=" + token + ";";
        this.global.set_token(token);
        this.global.set_user_profile(response.results);
      }
    } catch(e) {
      window.open(environment.sso_url + '?login=auto','_blank');
      this.global.set_toaster('error', 'Profile completion is pending.');
    }
    return true;
  }

  listen_cookie() {
    if(document.cookie && document.cookie.split('iudx-ui-sso=')[1]) {
      this.initialize();
    }
  }

}