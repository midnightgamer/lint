import {Component, Input, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";

@Component({
  selector: 'app-sample-data',
  templateUrl: './sample-data.component.html',
  styleUrls: ['./sample-data.component.scss']
})
export class SampleDataComponent implements OnInit {
  data: any = "";

  constructor(private global: GlobalService) {
  }

  ngOnInit(): void {
    this.data = this.global.get_temp_data();
  }

  closePopup(): void {
    this.global.set_popup(false,'sample-popup')
  }

}
