import {Component, OnInit} from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {

  constructor(private global: GlobalService, private keycloak: KeycloakService) {
  }

  ngOnInit(): void {
  }


  closePopup(): void {
    this.global.set_popup(false, 'login-popup')
  }

  loggedIn(): void {
    this.global.login(this.keycloak);
  }

}
