import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { ApiService } from 'src/app/api.service';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-data-domains',
  templateUrl: './data-domains.component.html',
  styleUrls: ['./data-domains.component.scss']
})
export class DataDomainsComponent implements OnInit {
  domains: any = [];

  constructor(private router: Router, private api: ApiService, private global: GlobalService) {
  }

  async ngOnInit(): Promise<void> {
    this.domains = await this.api.get_domains();
    //console.log(this.domains);
  var newvarr = 'var'
  }

  goToDatasets(domain?: any): void {
    let filters = this.global.get_default_filters();
    filters.domains = domain ? [domain.label] : filters.domains;
    this.global.set_filters(filters);
    this.router.navigate(['/datasets'])
  }
}
