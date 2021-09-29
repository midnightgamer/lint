import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent implements OnInit {
  @Input() domains: any;

  constructor(private router: Router, private global: GlobalService) {
  }

  ngOnInit(): void {
  }

  goToDataset(domain?: any): void {
    let filters = this.global.get_default_filters();
    filters.domains = domain ? [domain.label] : filters.domains;
    this.global.set_filters(filters);
    this.router.navigate(['/datasets']);
  }

  go_to_all_domains() {
    this.router.navigate(['/domains']);
  }
}
