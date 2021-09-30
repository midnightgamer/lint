import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../global.service";
import {Router} from "@angular/router";
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  city: any = undefined;
  dummyDatasetSearch: any;
  searched: any = [];
  query: string = ''
  showNoMatch: boolean = false;
  summary: any = {
    summary: {}
  };
  cities: any = [];
  domains: any = [];
  cityList: any;

  constructor(private global: GlobalService, private router: Router, private api: ApiService) {
    this.dummyDatasetSearch = [];
  }

  async ngOnInit(): Promise<void> {
    this.summary = await this.api.get_summary();
    this.cities = await this.api.get_cities();
    this.domains = await this.api.get_domains();
    this.cityList = this.cities.slice(0, 4);
    let active_city = this.global.get_active_city();
    this.cities.forEach((city: any) => {
      if(city.instance == active_city) this.city = city;
    });
    this.dummyDatasetSearch = await this.api.get_datasets();
    this.onEnterClick();
  }

  handleSearchInput(event: string): void {
    this.showNoMatch = true;
    event = event.toLowerCase();
    const results = this.dummyDatasetSearch.filter((item: any) => item.label && item.label.toLowerCase().includes(event))
    if (results) {
      this.searched = results.map((item: any) => ({
        ...item,
        boldLabel: item.label.toLowerCase().replace(event, event.bold())
      }));
    } else {
      this.searched = [];
    }
  }

  selectSearchItem(item: any): void {
    this.query = '';
    this.searched = [];
    this.showNoMatch = false;
    this.router.navigate(['/dataset', item.unique_id])
  }

  doSearch(): void {
    let filters = this.global.get_default_filters();
    filters.search = this.query;
    this.global.set_filters(filters);
    this.router.navigate(['/datasets']);
  }

  onEnterClick(): void {
    let searchDiv = document.getElementById('landing-search');
    if(searchDiv) {
      let that = this;
      searchDiv.onkeyup = function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
          that.doSearch();
        }
      }
    }
  }

  goToGeoQueryPage(): void {
    // this.router.navigate(['/geoquery'])
  }

  removecity(): void {
    window.localStorage.clear()
  }

}
