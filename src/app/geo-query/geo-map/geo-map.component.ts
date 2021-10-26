import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as L from 'leaflet';
import {latLng, FeatureGroup, Map, featureGroup, DrawEvents} from 'leaflet';
import {ApiService} from 'src/app/api.service';
import {GlobalService} from 'src/app/global.service';
import {NetworkService} from "../../network.service";

@Component({
  selector: 'app-geo-map',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.scss']
})
export class GeoMapComponent implements OnInit {
  leaflet_options: any;
  map: any;
  city: any;
  datasets: any = [];
  dataset_filters: any = [];
  resources: any;
  markersLayer = new L.FeatureGroup();
  pathFillColor: string[] = this.global.get_map_colors();
  polygonColor: string[] = this.global.get_map_colors();
  drawItems: FeatureGroup = featureGroup();
  is_drawn: boolean;
  drawQuery = {}

  constructor(
    private router: Router,
    private global: GlobalService,
    private network: NetworkService,
    private api: ApiService
  ) {
    this.is_drawn = false;
    this.city = this.global.get_city();
    this.datasets = this.global.get_datasets();
    this.leaflet_options = {};
    this.initialize_dataset_filters();
    this.getMapData();


    this.global.get_popup().subscribe((data) => {
      if (data.flag == false && data.type == 'geo-filter') {
        this.markersLayer.clearLayers();
        this.initialize_dataset_filters();
        this.getMapData();
      }
    });
  }

  ngOnInit() {
    this.leaflet_options = this.initMap();
  }

  on_map_ready(map: Map) {
    this.map = map;
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

  initialize_dataset_filters() {
    this.dataset_filters = this.global.get_dataset_filters();
    if (!this.dataset_filters || this.dataset_filters.length === 0) {
      this.dataset_filters = [];
      this.datasets.forEach((dataset: any) => {
        this.dataset_filters.push(dataset._id);
      });
      this.global.set_dataset_filters(this.dataset_filters);
    }
  }

  getMarkerIcon(resource: any) {
    return L.divIcon({
      className: 'custom-div-icon',
      html: this.getColor(resource),
    });
  }

  getColor(resource: any) {
    let index = this.get_dataset_pos(resource);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=${this.pathFillColor[index]} width="50px" height="50px" outline="5px solid white"><path d="M12 4C9.24 4 7 6.24 7 9c0 2.85 2.92 7.21 5 9.88 2.11-2.69 5-7 5-9.88 0-2.76-2.24-5-5-5zm0 7.5c-1.38 0-2-1.12-2-2s1.12-2 2-2 2 1.12 2 2-1.12 2-2 2z" opacity="1" stroke="white" stroke-width="0.5" /><circle cx="12" cy="9.5" r="2" fill="white"/></svg>
    `;
  }

  stringToColour(resource: any) {
    let index = this.get_dataset_pos(resource);
    return this.polygonColor[index];
  }

  get_dataset_pos(resource: any) {
    let index = 0;
    this.dataset_filters.forEach((id: any, ind: any) => {
      if (id == resource.dataset._id) index = ind;
    });
    return index;
  }

  checkGeometryType(resource: any, type: any) {
    return resource.location && resource.location.geometry &&
      (resource.location.geometry.type == 'undefined' || resource.location.geometry.type == type);
  }

  mark_on_map() {
    for (let resource of this.resources) {
      if (this.checkGeometryType(resource, 'Point')) {
        let lng = resource.location.geometry.coordinates[0];
        let lat = resource.location.geometry.coordinates[1];
        const markers = L.marker([lat, lng], {
          icon: this.getMarkerIcon(resource),
        }).bindPopup(`
        <div>
            <div class="with-image">
               <img src=${resource.dataset.icon}>
               <span class="provider">${resource.provider.description}</span>
            </div>
            <span class="resource"><b>${resource.label}</b></span>
            <span class="resource dataset"><b>${resource.dataset.label}</b></span>
            <a href='/dataset/${resource.dataset.unique_id}' target="_blank" class="resource anchor">View Dataset</a>
        </div>
        `, {className: 'popupCustom'});
        this.markersLayer.addLayer(markers);
        this.markersLayer.addTo(this.map);
      } else if (this.checkGeometryType(resource, 'Polygon')) {
        L.geoJSON(resource.location.geometry, {
          style: {
            fillColor: this.stringToColour(resource),
            weight: 2,
            opacity: 1,
            fillOpacity: 0.5,
          },
        }).addTo(this.markersLayer);
        this.markersLayer.addTo(this.map);
      }
    }
  }

  getMapData() {
    let filters = {datasets: this.dataset_filters};
    this.api
      .get_geoquery_resource_list(filters)
      .then((data: any) => {
        this.resources = data;
        this.mark_on_map();
      });
  }

  /*Draw */
  drawOptions = {
    draw: {
      marker: undefined,
      circlemarker: undefined,
      polyline: undefined,
    },
    edit: {
      featureGroup: this.drawItems
    }
  };

  onDrawCreated(e: any) {
    this.drawItems.clearLayers();
    this.drawItems.addLayer((e as DrawEvents.Created).layer);
    let type = e.layerType;
    if (type === 'circle') {
      let geometry = 'Point';
      let types = 'intersects';
      let point = [];
      const center_point = e.layer._latlng;
      point.push(this.get_precision(center_point['lng'], 6), this.get_precision(center_point['lat'], 6));
      let radius = Math.ceil(e.layer._mRadius);
      this.markersLayer.clearLayers();
      if (radius > 10000) e.layer.setRadius(10000)
      this.api_call(point, radius, types, geometry);
    } else if (type === 'polygon') {
      let geometry = 'Polygon';
      let types = 'within';
      let points = e.layer._latlngs[0];
      let polyPoints = [];
      points.forEach((p: { lng: any; lat: any; }) => {
        polyPoints.push([this.get_precision(p.lng, 6), this.get_precision(p.lat, 6)]);
      });
      polyPoints.push([this.get_precision(points[0].lng, 6), this.get_precision(points[0].lat, 6)]);
      let radius = 0;
      this.markersLayer.clearLayers();
      this.api_call(polyPoints, radius, types, geometry);
    } else if (type === 'rectangle') {
      let geometry = 'bbox';
      let types = 'within';
      let radius = 0;
      let bound_points = e.layer._latlngs[0];
      let boundingPoints = [];
      boundingPoints.push([this.get_precision(bound_points[1]['lng'], 6), this.get_precision(bound_points[1]['lat'], 6)]);
      boundingPoints.push([this.get_precision(bound_points[3]['lng'], 6), this.get_precision(bound_points[3]['lat'], 6)]);
      this.markersLayer.clearLayers();
      this.api_call(boundingPoints, radius, types, geometry);
    }
  }

  get_precision(value: any, precision: number) {
    return parseFloat(value.toFixed(precision));
  }

  async api_call(points: any, radius: number, types: string, geometry: string) {
    let drawQuery = {
      type: types,
      geometry: geometry,
      radius: radius,
      coordinates: points,
    };
    let res = await this.api.get_special_data(drawQuery)
    this.resources = this.parseResourcesData(res.results);
    this.mark_on_map();
  }

  parseResourcesData(results: any) {
    return results.map((item: any) => {
      let uniqueID = item.resourceGroup.replace(/\//g, "-");
      let filter = this.datasets.filter((data: any) => {
        return data.unique_id === uniqueID;
      });
      let dataset = filter[0];
      let provider = filter[0].provider
      return {
        dataset: dataset,
        id: item.id,
        name: item.name,
        description: item.description,
        label: item.label,
        location: item.location,
        instance: item.instance,
        provider: provider
      }
    })
  }
}
