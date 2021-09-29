import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import { ApiService } from 'src/app/api.service';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.scss']
})
export class DatasetsComponent implements OnInit, OnDestroy {
  datasets: any = [];
  filter_sub: any;

  constructor(private global: GlobalService, private router: Router, private api: ApiService) {
    this.set_datasets(this.global.get_filters_Obj());
    this.filter_sub = this.global.get_filters().subscribe((filters: any) => {
      this.set_datasets(filters);
    });
  }

  ngOnInit(): void {
  }

  async set_datasets(filters: any): Promise<void> {
    this.datasets = await this.api.get_datasets(filters);
  }

  goToSingleResource(dataset: any): void {
    this.router.navigate(['/dataset', dataset.unique_id]);
  }

  ngOnDestroy(): void {
    this.filter_sub.unsubscribe();
  }

}
