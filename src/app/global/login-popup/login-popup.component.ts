import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {

  constructor(private global: GlobalService) {
  }

  ngOnInit(): void {
  }


  closePopup(): void {
    this.global.set_popup(false, 'login-popup')
  }

}
