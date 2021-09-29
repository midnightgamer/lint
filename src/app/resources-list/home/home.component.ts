import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from 'src/app/api.service';
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popup_status: boolean = false;
  popup_type: string = '';
  dataset_details: any = {
    dataset: {
      provider: {}
    },
  };
  is_loaded = false;

  constructor(private global: GlobalService, private route: ActivatedRoute, private api: ApiService) {
    this.global.get_popup().subscribe((data) => {
      this.popup_status = data.flag;
      this.popup_type = data.type;
    });
    this.route.params.subscribe(params => {
      this.api.get_dataset_details(params.id).then((dataset: any) => {
        this.dataset_details = dataset;
        this.global.set_dataset_res(dataset.resources);
        let cities = this.global.get_cities();
        let instance = dataset.dataset.instance;
        cities.forEach((city: any)=>{
          if(instance == city.instance) {
            this.global.set_res_city(city);
          }
        });
        this.is_loaded = true;
      }, err => {
      });
    });
  }

  ngOnInit(): void {
  }

}
