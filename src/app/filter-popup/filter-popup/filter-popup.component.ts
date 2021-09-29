import {Component, Input, OnInit} from '@angular/core';
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.scss']
})
export class FilterPopupComponent implements OnInit {
  @Input() filter: any;
  @Input() type: any;
  selected: Array<string> = [];
  searched: any = [];
  query: string = '';

  constructor(private global: GlobalService) {
  }

  ngOnInit(): void {
    let filters = Object.assign({}, this.global.get_filters_Obj());
    this.selected = filters[this.type];
    this.searched = this.filter;
  }

  handleSearchInput(event: any): void {
    event = event.toLowerCase();
    const results = this.filter.filter((item: any) => {
      let val = item;
      if (this.type === 'domains') val = val.name;
      else if (this.type === 'providers') val = val.description;
      return val.toLowerCase().includes(event);
    });
    if (results) {
      this.searched = results;
    } else {
      this.searched = [];
    }
  }

  toggleFilter(filter: any): void {
    if (this.type === 'domains') filter = filter.label;
    else if (this.type === 'providers') filter = filter._id;
    if (this.selected.includes(filter)) {
      this.selected.splice(this.getIndex(filter), 1)
    } else {
      this.selected.push(filter);
    }
  }

  getIndex(filter: string): number {
    return this.selected.indexOf(filter);
  }

  isSelected(filter: any): boolean {
    if (this.type === 'tags')
      return this.selected.includes(filter);
    else if (this.type === 'domains')
      return this.selected.includes(filter.label);
    else if (this.type === 'providers')
      return this.selected.includes(filter._id);
    else
      return false;
  }

  clearAll(): void {
    this.selected = [];
    this.apply();
  }

  closePopup(): void {
    this.global.set_popup(false, 'show-filter')
  }

  apply() {
    let filters = Object.assign({}, this.global.get_filters_Obj());
    filters[this.type] = this.selected;
    this.global.set_filters(filters);
    this.global.set_popup(false, 'show-filter')
  }

}
