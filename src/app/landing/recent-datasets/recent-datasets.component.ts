import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-recent-datasets',
  templateUrl: './recent-datasets.component.html',
  styleUrls: ['./recent-datasets.component.scss']
})
export class RecentDatasetsComponent implements OnInit {
  @Input() datasets: any = []
  @Input() city: any;
  @Input() summary: any;

  constructor(private router: Router, private global: GlobalService) {
  }

  ngOnInit(): void {
  }

  doSearch(): void {
    let filters = this.global.get_default_filters();
    this.global.set_filters(filters);
    this.router.navigate(['/datasets']);
  }

  goToSingleResource(dataset: any): void {
    this.router.navigate(['/dataset', dataset.unique_id])
  }

}
