import {Component, Input, OnInit} from '@angular/core';
import {GlobalService} from "../../global.service";
import {Router} from "@angular/router";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  @Input() cityList: any;

  constructor(public global: GlobalService, private router: Router) {
  }

  ngOnInit(): void {
  }

  setCity(city: any) {
    window.open('https://' + city.instance + '.' + environment.web_url, '_blank');
  }

}
