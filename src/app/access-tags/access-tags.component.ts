import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-tags',
  templateUrl: './access-tags.component.html',
  styleUrls: ['./access-tags.component.scss']
})
export class AccessTagsComponent implements OnInit {
  @Input() type: any;

  constructor() { }

  ngOnInit(): void {
  }



  

}
