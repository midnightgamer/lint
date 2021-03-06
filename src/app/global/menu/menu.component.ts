import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from 'src/app/global.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  showDocsLinks: any;
  showDevsLinks: any;
  public env: any;

  constructor(private global: GlobalService, private router: Router) {
    this.showDocsLinks = false;
    this.showDevsLinks = false;
    this.env = environment;
  }

  ngOnInit(): void {
  }

  closePopup(): void {
    this.global.set_popup(false, 'menu');
  }

  toggleDocsLinks(e: any) {
    e.stopPropagation()
    this.showDocsLinks = !this.showDocsLinks;
    this.showDevsLinks = false;
  }

  toggleDevsLinks(e: any) {
    e.stopPropagation()
    this.showDevsLinks = !this.showDevsLinks;
    this.showDocsLinks = false;
  }

  doSearch(): void {
    let filters = this.global.get_default_filters();
    this.global.set_filters(filters);
    this.router.navigate(['/datasets']);
    this.closePopup();
  }

  navigateToProviderPanel(): void {
    window.open(environment.provider_web, "_blank");
  }
}
