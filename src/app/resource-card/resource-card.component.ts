import {Component, Input, OnInit} from '@angular/core';
import {GlobalService} from 'src/app/global.service';

@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.scss'],
})
export class ResourceCardComponent implements OnInit {
  @Input() resource: any;
  @Input() dataset: any;
  showDataDescriptors: boolean = false;
  data_descriptor: any;
  isAuthenticated = this.global.get_cookie_value('iudx-ui-sso') == 'logged-in';
  flags: Array<Boolean>;

  constructor(private global: GlobalService) {
    this.data_descriptor = [];
    this.flags = [];
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    let data: any = this.global.manipulate_data_descriptor(this.resource.dataDescriptor);
    this.data_descriptor = data.data_descriptor;
    this.flags = data.flags;
  }

  toggleDataDescriptors() {
    this.showDataDescriptors = !this.showDataDescriptors;
  }

  openGsMap(resource: any): void {
    if (this.isAuthenticated) {
      if (this.global.get_role() !== 'consumer') return this.global.set_toaster('error', 'Login as a consumer to use the features of our website.');
      this.global.set_single_resource(resource)
      this.global.set_popup(true, 'gs-map');
    } else {
      this.global.set_popup(true, 'login-popup');
    }

  }

  openFilesPopup(): void {
    this.global.set_popup(true, 'files');
  }

  openViewData(): void {
    this.global.set_popup(true, 'view-data');
  }

  openLatestData(id: string): void {
    if (this.isAuthenticated) {
      if (this.global.get_role() != 'consumer') return this.global.set_toaster('error', 'Login as a consumer to use the features of our website.');
      this.global.set_temp_data(id);
      this.global.set_popup(true, 'latest-data');
    } else {
      this.global.set_popup(true, 'login-popup');
    }
  }

  openSampleData(data: any) {
    this.global.set_temp_data(JSON.stringify(data, null, 4));
    this.global.set_popup(true, 'sample-popup');
  }

  typeOf(value: any) {
    return typeof value;
  }

  toggle(i: any) {
    this.flags[i] = !this.flags[i];
  }

  copy(): void {
    this.global.copy(this.resource.id, 'ID copied Successfully')
  }

}
