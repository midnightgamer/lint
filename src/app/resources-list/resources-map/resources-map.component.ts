import {Component, Input, OnInit} from '@angular/core';
import * as L from "leaflet";
import {latLng, Map} from "leaflet";
import {GlobalService} from "../../global.service";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-resources-map',
  templateUrl: './resources-map.component.html',
  styleUrls: ['./resources-map.component.scss']
})
export class ResourcesMapComponent implements OnInit {
  @Input() datasets: any;
  leaflet_options: any;
  map: any;
  city: any;
  resources: any = [];
  markersLayer = new L.FeatureGroup();
  pathFillColor: string[] = this.global.get_map_colors();
  polygonColor: string[] = this.pathFillColor;

  constructor(private global: GlobalService, private api: ApiService) {
    this.city = this.global.get_city();
    this.city = !this.city ? this.global.get_res_city() : this.city;
  }

  ngOnInit() {
    this.resources = this.global.get_dataset_res();
    this.leaflet_options = this.initMap();

  }

  on_map_ready(map: Map) {
    this.map = map;
    this.mark_on_map();
  }

  initMap() {
    let zoom = 11;
    return {
      layers: [
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {maxZoom: 19})
      ],
      zoom: zoom,
      center: latLng({
        lng: this.city.coordinates[1],
        lat: this.city.coordinates[0]
      }),
    };
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

  mark_on_map() {
    for (let resource of this.resources) {
      if (this.checkGeometryType(resource, 'Point')) {
        var lng = resource.location.geometry.coordinates[0];
        var lat = resource.location.geometry.coordinates[1];
        const markers = L.marker([lat, lng], {
          icon: this.getMarkerIcon(''),
        }).bindPopup(`
        <div>
            <div class="with-image">
               <img src=${resource.icon}>
               <span class="provider">${this.datasets.provider.description}</span>
            </div>
            <span class="resource "><b>${resource.name}</b></span>

        </div>
        `, {className: 'popupCustom'})
        this.markersLayer.addLayer(markers);
        this.markersLayer.addTo(this.map);
      } else if (this.checkGeometryType(resource, 'Polygon')) {
        L.geoJSON(resource.location.geometry, {
          style: {
            fillColor: this.stringToColour(''),
            weight: 2,
            opacity: 1,
            fillOpacity: 0.5,
          },
          onEachFeature: function (feature, layer) {
            layer.on('mouseover', function (e) {
            });
            layer.on('mouseout', function (e) {
            });
          },
        }).addTo(this.markersLayer);
        this.markersLayer.addTo(this.map);
      }
    }
  }
}
