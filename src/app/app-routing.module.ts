import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    "path": "",
    "loadChildren": () => import('./landing/landing.module').then(m => m.LandingModule)
  },
  {
    "path": "datasets",
    "loadChildren": () => import('./dataset-list/dataset-list.module').then(m => m.DatasetListModule)
  },
  {
    "path": "dataset/:id",
    "loadChildren": () => import('./resources-list/resources-list.module').then(m => m.ResourcesListModule)
  },
  {
    "path": "geoquery",
    "loadChildren": () => import('./geo-query/geo-query.module').then(m => m.GeoQueryModule)
  },
  {
    "path": "domains",
    "loadChildren": () => import('./domains/domains.module').then(m => m.DomainsModule)
  },
  {
    "path": "instances",
    "loadChildren": () => import('./cities/cities.module').then(m => m.CitiesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
