import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from 'src/app/global.service';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

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
    window.open(environment.sso_url, '_blank');
  }

  toggleProfile(event: Event): void {
    event.stopPropagation();
    this.showProfilePopup = !this.showProfilePopup;
  }

  logout(event: Event): void {
    event.stopPropagation();
    document.cookie = "iudx-ui-cat=false;max-age=0";
    document.cookie = "iudx-ui-sso=false;max-age=0;domain=" + environment.parent_domain;
    this.keycloak.logout();
  }

  ngOnDestroy(): void {
    this.popup_sub.unsubscribe();
  }

}
