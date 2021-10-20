import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../global.service";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-request-access-popup',
  templateUrl: './request-access-popup.component.html',
  styleUrls: ['./request-access-popup.component.scss']
})
export class RequestAccessPopupComponent implements OnInit {
  year = 0;
  month = 0;
  day = 0;
  dataset_id = '';

  constructor(private global: GlobalService, private api: ApiService) {
    this.dataset_id = this.global.get_request_dataset_id();
  }

  ngOnInit(): void {
  }

  closePopup(): void {
    this.global.set_popup(false, 'request-access')
  }

  encodeTime() {
    return 'P' + this.year + 'Y' + this.month + 'M' + this.day + 'DT0H0M';
  }

  async submit(): Promise<any> {

    if (this.year < 0) {
      return this.global.set_toaster('error', `Year should be greater than or equal to 0 `);
    }
    if (this.year > 10) {
      return this.global.set_toaster('error', `Year should be less than or equal to 10 `);
    }
    if (this.day < 0 || this.day > 31) {
      this.global.set_toaster('error', 'Days should be between 1-31');
    }
    if (this.month < 0 || this.month > 12) {
      return this.global.set_toaster('error', 'Month' +
        ' should be between 0-12');
    }
    if (this.day === 0 && this.month === 0 && this.year === 0) {
      return this.global.set_toaster('error', `Year, Month and Day all can't be 0`);
    }
    let expiryDate = this.encodeTime();
    let res = await this.api.request_dataset(this.dataset_id, 'resource_group', expiryDate)
    console.log(res)
  }
}
