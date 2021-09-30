import {Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import {GlobalService} from "../../global.service";

let open_window: any;

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {
  cookie_interval: any;

  constructor(private global: GlobalService) {
  }

  ngOnInit(): void {
  }


  closePopup(): void {
    this.global.set_popup(false, 'login-popup')
  }

  loggedIn(): void {
    this.cookie_interval = setInterval(()=>{
      this.listen_cookie();
    },100);
    open_window = window.open(environment.sso_url, '_blank');
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
