import {Component, Input, OnInit} from '@angular/core';
import {GlobalService} from 'src/app/global.service';

@Component({
  selector: 'app-dataset-desc',
  templateUrl: './dataset-desc.component.html',
  styleUrls: ['./dataset-desc.component.scss'],
})
export class DatasetDescComponent implements OnInit {
  popup_status: boolean = false;
  popup_type: string = '';
  @Input() dataset: any;

  constructor(private global: GlobalService) {
    this.global.get_popup().subscribe((data) => {
      this.popup_status = data.flag;
      this.popup_type = data.type;
    });
  }

  ngOnInit(): void {
  }

  getIconForSampleFile(data: any): string {
    if (data.includes('.mp4'))
      return './../../../assets/video.svg';
    else
      return './../../../assets/files.svg';
  }

  getTextForSampleFile(data: any): string {
    if (data.includes('.mp4'))
      return 'Video file';
    else if (data.includes('.json'))
      return 'JSON file';
    else
      return 'Document file';
  }

  openSampleData(data: any) {
    this.global.set_temp_data(JSON.stringify(data, null, 4));
    this.global.set_popup(true, 'sample-popup');
  }

  openViewData(): void {
    this.global.set_popup(true, 'view-data');
  }

  openSubscriberData(): void {
    this.global.set_popup(true, 'subscriber-data');
  }

  openRequestAccess(event: Event): void {
    event.preventDefault();
    //this.global.set_popup(true, 'request-access');
  }

  copy(): void {
    this.global.copy(this.dataset.id, 'ID copied Successfully')
  }
}
