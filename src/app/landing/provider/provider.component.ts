import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navigateToProviderPanel(): void {
    window.open(environment.provider_web, "_blank");
  }

}
