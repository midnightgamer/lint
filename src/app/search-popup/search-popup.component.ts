import {Component, OnInit} from '@angular/core';
import {GlobalService} from 'src/app/global.service';
import {Router} from "@angular/router";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search-popup',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.scss']
})
export class SearchPopupComponent implements OnInit {
  dummyDatasetSearch: any;
  searched: any = [];
  query: string = '';
  showNoMatch: boolean = false;

  constructor(private global: GlobalService, private router: Router, private api: ApiService) {
    this.dummyDatasetSearch = [];
  }

  async ngOnInit(): Promise<void> {
    this.closeOnEcpClick();
    this.onEnterClick();
    this.dummyDatasetSearch = await this.api.get_datasets();
    // @ts-ignore
    document.querySelector('input').focus()
  }

  closePopup(): void {
    this.global.set_popup(false, 'search-popup');
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
    this.closePopup();
  }

  closeOnEcpClick(): void {
    document.onkeydown = (evt) => {
      evt = evt || window.event;
      let isEscape = false;
      if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
      } else {
        isEscape = (evt.keyCode === 27);
      }
      if (isEscape) {
        this.closePopup()
      }
    };
  }

  doSearch(): void {
    let filters = this.global.get_default_filters();
    filters.search = this.query;
    this.global.set_filters(filters);
    this.router.navigate(['/datasets']);
  }

  onEnterClick(): void {
    let searchDiv = document.getElementById('header-search');
    if(searchDiv) {
      let that = this;
      searchDiv.onkeyup = function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
          that.doSearch();
          that.closePopup();
        }
      }
    }
  }
}
