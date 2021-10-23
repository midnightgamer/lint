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
  role: any;
  constructor(private global: GlobalService, private keycloak: KeycloakService) {
    this.popup_sub = this.global.get_popup().subscribe((data) => {
      this.popup_status = data.flag;
      this.popup_type = data.type;
    });
    this.user_profile = this.global.get_user_profile();
    this.role = this.global.get_role();
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

  navigateToConsumerPanel(): void {
    window.open(environment.consumer_web, "_blank");
  }

  loggedIn(): void {
    this.global.login(this.keycloak);
  }

  toggleProfile(): void {
    this.showProfilePopup = !this.showProfilePopup;
  }

  logout(): void {
    this.global.logout(this.keycloak);
  }

  ngOnDestroy(): void {
    this.popup_sub.unsubscribe();
  }

  visit_profile() {
    open_window = window.open(environment.sso_url, '_blank');
  }
}