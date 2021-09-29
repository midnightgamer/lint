import {Component, OnInit} from '@angular/core';
import {GlobalService} from 'src/app/global.service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.scss'],
})
export class SubscriberComponent implements OnInit {
  showOptions: any;
  subscribed: boolean = false;
  dummyData: Array<{ data: string, name: string, type: string }> = [
    {
      data: `{
"totalHits": 10,
"results": [
{ }
],
"status": "success",
"description": "a detailed description"
}`,
      name: 'From surveillance/traffic cameras in Bangalore city',
      type: 'application/json'
    },
    {
      data: `{
"totalHits": 10,
"results": [
{ }
],
"status": "success",
"description": "a detailed description"
}`,
      name: 'From surveillance/traffic cameras in Bangalore city',
      type: 'application/json'
    }
  ];

  constructor(private global: GlobalService) {
    this.showOptions = false;
  }

  ngOnInit(): void {
  }

  closePopup(): void {
    this.global.set_popup(false, 'subscriber-data');
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  toggleSubscription() {
    this.subscribed = !this.subscribed;
  }

  copyResults(id: string): void {
    this.global.copy(id, 'Copied Successfully')
  }
}
