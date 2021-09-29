import {Component, Input, OnInit} from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-data-descriptor',
  templateUrl: './data-descriptor.component.html',
  styleUrls: ['./data-descriptor.component.scss'],
})
export class DataDescriptorComponent implements OnInit {
  data_descriptor: any;
  @Input() dataDescriptor: any;
  flags: Array<Boolean>;
  constructor(
    private global: GlobalService
  ) {
    this.flags = [];
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    let data: any = this.global.manipulate_data_descriptor(this.dataDescriptor);
    this.data_descriptor = data.data_descriptor;
    this.flags = data.flags;
  }

  typeOf(value: any) {
    return typeof value;
  }

  toggle(i: any) {
    this.flags[i] = !this.flags[i];
  }

}
