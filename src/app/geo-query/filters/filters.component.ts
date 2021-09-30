import {Component, Input, OnInit} from '@angular/core';
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Input() filter: any;
  @Input() type: any;
  filters: any;
  datasets: any;
  query: string = '';

  searched: any = [];
  constructor(private global: GlobalService) {
    this.datasets = this.global.get_datasets();
    this.filters = this.global.get_dataset_filters();
    this.searched = this.datasets;
  }

  ngOnInit(): void {
  }

  toggle_dataset(dataset: any) {
    let index = this.filters.indexOf(dataset._id);
    if (index != -1) {
      this.filters.splice(index, 1);
    } else {
      this.filters.push(dataset._id);
    }
  }

  checkdataset(dataset: any): boolean {
    return this.filters.indexOf(dataset._id) != -1;
  }

  clear() {
    this.filters = [];
  }

  apply_filter() {
    if (this.filters.length != 0) {
      this.global.set_dataset_filters(this.filters);
    }
    this.close_filter();
  }

  close_filter(): void {
    if (this.filters.length == 0) {
      this.global.set_toaster('error','Please select 1 or more dataset.')
      return;
    }
    this.global.set_popup(false, 'geo-filter');
  }
  handleSearchInput(event: any): void {
    event = event.toLowerCase();
    const results = this.datasets.filter((item: any) => {
      return item.label && item.label.toLowerCase().includes(event);
    });
    if (results) {
      this.searched = results;
    } else {
      this.searched = [];
    }
  }
  closePopup(): void {
    this.global.set_popup(false, 'geo-filter')
  }
}
