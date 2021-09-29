import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-api-link-popup',
  templateUrl: './api-link-popup.component.html',
  styleUrls: ['./api-link-popup.component.scss']
})
export class ApiLinkPopupComponent implements OnInit {
  link = 'https://rs.iudx.org.in/ngsi-ld/v1/entities/suratmunicipal.org/6db486cb4f720e8585ba1f45a931c63c25dbbbda/rs.iudx.org.in/surat-itms-realtime-info/surat-itms-live-eta\n'

  constructor(private global: GlobalService) {
  }

  ngOnInit(): void {
  }

  closePopup(): void {
    this.global.set_popup(false, 'api-link');
  }
  backToFiles():void{
    this.global.set_popup(false, 'api-link');
    this.global.set_popup(true, 'files');

  }

  copyLink(): void {
    this.global.copy(this.link, 'API link copied successfully')
  }
}
