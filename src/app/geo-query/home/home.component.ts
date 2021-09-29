import {Component, OnInit} from '@angular/core';
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
  is_loaded: Boolean = false;
  legends: any = [];

  constructor(private global: GlobalService, private api: ApiService) {

    this.set_datasets();
    this.global.get_popup().subscribe((data) => {
      this.popup_status = data.flag;
      this.popup_type = data.type;
      if (data.flag == false && data.type == 'geo-filter') {
        this.showLegends();
      }
    });
  }

  ngOnInit(): void {
  }

  getColor(dataset: any) {
    let index = this.get_dataset_pos(dataset);
    let colors = this.global.get_map_colors();
    return colors[index];
  }

  get_dataset_pos(dataset: any) {
    let index = 0;
    let filters = this.global.get_dataset_filters();
    filters.forEach((id: any, ind: any) => {
      if (id == dataset._id) index = ind;
    });
    return index;
  }

  showLegends(): void {
    this.legends = [];
    let datasets = this.global.get_datasets();
    let filters = this.global.get_dataset_filters();
    datasets.forEach((dataset: any) => {
      if (filters.indexOf(dataset._id) != -1) this.legends.push(dataset);
    });
  }

  openFilter(): void {
    this.global.set_popup(true, 'geo-filter')
  }

  closeFilter(): void {
    this.global.set_popup(false, 'geo-filter');
  }

  initialize_dataset_filters(datasets: any) {
    let dataset_filters = this.global.get_dataset_filters();
    if (!dataset_filters || dataset_filters.length === 0) {
      dataset_filters = [];
      datasets.forEach((dataset: any) => {
        dataset_filters.push(dataset._id);
      });
      this.global.set_dataset_filters(dataset_filters);
    }
  }

  async set_datasets(): Promise<void> {
    let datasets = await this.api.get_datasets();
    this.global.set_datasets(datasets);
    this.initialize_dataset_filters(datasets)
    this.showLegends();
    this.is_loaded = true;
  }
}
