import {Component, Input, OnInit} from '@angular/core';
import {GlobalService} from 'src/app/global.service';
import * as L from "leaflet";
import {latLng, Map} from "leaflet";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-gs-map',
  templateUrl: './gs-map.component.html',
  styleUrls: ['./gs-map.component.scss'],
})
export class GsMapComponent implements OnInit {
  leaflet_options: any;
  map: any;
  city: any;
  resources: any;
  markersLayer = new L.FeatureGroup();
  results: any;
  pathFillColor: string[] = this.global.get_map_colors();
  polygonColor: string[] = this.pathFillColor;
  title: any;

  constructor(private global: GlobalService, private api: ApiService) {
    this.city = this.global.get_city();
    this.city = !this.city ? this.global.get_res_city() : this.city;
    this.resources = this.global.get_single_resource()
    this.title = this.resources.label;
    this.getMapData();
  }

  ngOnInit() {
    this.leaflet_options = this.initMap();
  }

  on_map_ready(map: Map) {
    this.map = map;
  }

  initMap() {
    let zoom = 12;
    var map_options = {
      layers: [
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {maxZoom: 19})
      ],
      zoom: zoom,
      center: latLng({
        lng: this.city.coordinates[1],
        lat: this.city.coordinates[0]
      }),
    };
    return map_options;
  }

  getMarkerIcon(id: any) {
    return L.divIcon({
      className: 'custom-div-icon',
      html: this.getColor(id),
    });
  }

  getColor(id: any) {
    let index = 0;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=${this.pathFillColor[index]} width="50px" height="50px" outline="5px solid white"><path d="M12 4C9.24 4 7 6.24 7 9c0 2.85 2.92 7.21 5 9.88 2.11-2.69 5-7 5-9.88 0-2.76-2.24-5-5-5zm0 7.5c-1.38 0-2-1.12-2-2s1.12-2 2-2 2 1.12 2 2-1.12 2-2 2z" opacity="1" stroke="white" stroke-width="0.5" /><circle cx="12" cy="9.5" r="2" fill="white"/></svg>
    `;
  }

  stringToColour(str: any) {
    let index = 0;
    return this.polygonColor[index];
  }

  checkGeometryType(resource: any, type: any) {
    return resource.location && resource.location.geometry &&
      (resource.location.geometry.type == 'undefined' || resource.location.geometry.type == type);
  }



  getMapData() {
    let data = [];
    let isName: Boolean;
    this.api.get_resource_map_data(this.resources.id,'public')
      .then((data: any) => {
        this.results = data.results;
        for (let i = 0; i < this.results.length; i++) {
          if (this.results[i].location) {
            var lng = this.results[i].location.coordinates[0];
            var lat = this.results[i].location.coordinates[1];
            if (this.results[i].name) {
              isName = true;
            } else isName = false;
            const markers = L.marker([lat, lng], {
              icon: this.getMarkerIcon('')
            }).bindPopup(isName ?
              `<div id="name"> <p style='font-weight:bold'> `
              + this.results[i].name +
              `</p> </div> <div class = "text-centre"><p>Address: ` +
              this.results[i].address +
              `</p> </div>`
              : `<div id="name"> <p style='font-weight:bold'> `
              + this.results[i].depot_name +
              `</p> </div>
       `);
            this.markersLayer.addLayer(markers);
            this.markersLayer.addTo(this.map);
          }
        }
      })

  }

  closePopup(): void {
    this.global.set_popup(false, 'gs-map');
  }


}
