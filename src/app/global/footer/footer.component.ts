import {Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/api.service';
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  city: any = undefined;
  constructor(private global: GlobalService, private api: ApiService) {
  }

  async ngOnInit(): Promise<void> {
    let active_city = this.global.get_active_city();
    let cities = await this.api.get_cities();
    cities.forEach((city: any) => {
      if(city.instance == active_city) this.city = city;
    });
  }

}
