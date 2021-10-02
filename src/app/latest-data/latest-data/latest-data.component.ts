import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-latest-data',
  templateUrl: './latest-data.component.html',
  styleUrls: ['./latest-data.component.scss']
})
export class LatestDataComponent implements OnInit {
  resource_id: string;
  latest_data: any = '';
  constructor(private global: GlobalService, private api: ApiService) {
    this.resource_id = this.global.get_temp_data();
    this.get_latest_data();
  }

  ngOnInit(): void {
  }

  closePopup(): void {
    this.global.set_popup(false,'latest-data');
  }

  async get_latest_data() {
    let data: any = await this.api.get_latest_data(this.resource_id, 'public');
    if (data.type == "ERROR") {
      this.global.set_popup(false, 'latest-data');
      this.global.set_popup(true, 'login-popup');
    } else {
      this.latest_data = JSON.stringify(data?.results, null, 4);
    }
  }

}
