import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-request-access-popup',
  templateUrl: './request-access-popup.component.html',
  styleUrls: ['./request-access-popup.component.scss']
})
export class RequestAccessPopupComponent implements OnInit {

  constructor(private global: GlobalService) {
  }

  ngOnInit(): void {
  }

  closePopup():void{
    this.global.set_popup(false,'request-access')
  }

}
