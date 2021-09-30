import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from 'src/app/global.service';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

let open_window: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  popup_status: boolean = false;
  popup_type: string = '';
  popup_sub: any;
  isLoggedIn: boolean = false;
  showProfilePopup: boolean = false;
  auth_window: any;
  user_profile: any;
  cookie_interval: any;
  constructor(private global: GlobalService, private keycloak: KeycloakService) {
    this.popup_sub = this.global.get_popup().subscribe((data) => {
      this.popup_status = data.flag;
      this.popup_type = data.type;
    });
    this.user_profile = this.global.get_user_profile();
    if(this.user_profile.userId) this.isLoggedIn = true;
  }

  ngOnInit(): void {
    
  }

  openMenu(): void {
    this.global.set_popup(true, 'menu');
  }

  openSearchPopup(): void {
    this.global.set_popup(true, 'search-popup');
  }

  loggedIn(): void {
   this.cookie_interval = setInterval(()=>{
      this.listen_cookie();
    },100);
    open_window = window.open(environment.sso_url, '_blank');
  }

  toggleProfile(event: Event): void {
    event.stopPropagation();
    this.showProfilePopup = !this.showProfilePopup;
  }

  logout(event: Event): void {
    event.stopPropagation();
    document.cookie = "iudx-ui-cat=logged-out;max-age=0";
    document.cookie = "iudx-ui-sso=logged-out;max-age=0;domain=" + environment.parent_domain;
    this.global.set_toaster('error','You have been logged out. Please login again.');
    setTimeout(()=>{
      this.keycloak.logout();
    },100);
  }

  ngOnDestroy(): void {
    this.popup_sub.unsubscribe();
  }

  listen_cookie() {
    if(document.cookie && document.cookie.split('iudx-ui-sso=')[1]) {
      if(document.cookie.split('iudx-ui-sso=')[1].split(';')[0] == 'logged-in') {
        clearInterval(this.cookie_interval);
        open_window.close();
        location.reload();
      }
    }
  }

}