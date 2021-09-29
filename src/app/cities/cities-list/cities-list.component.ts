import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.scss']
})
export class CitiesListComponent implements OnInit {
  cities: any = [];

  constructor(private api: ApiService) {
  }

  async ngOnInit(): Promise<void> {
    this.cities = await this.api.get_cities();
  }

  setCity(city: any) {
    window.open('https://' + city.instance + '.' + environment.web_url, '_blank');
  }

}