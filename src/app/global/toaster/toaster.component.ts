import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements AfterViewInit {
  @Input() props: { type: string; message: string; };
  constructor() {
    this.props = {
      type: '',
      message: ''
    };
  }

  ngAfterViewInit(): void { var elm: any = document.getElementsByClassName('toaster')[0];

  }


}
