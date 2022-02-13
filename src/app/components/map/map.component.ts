import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import { fromLonLat, transform } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import { Vector } from 'ol/source';
import { Icon, Style } from 'ol/style';
import { MapService } from './map.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService, private route: ActivatedRoute) { }

  map: Map;

  location_id: number;

  ngOnInit(): void {
    this.route.queryParams.subscribe(async ({ location_id }) => {
      if (location_id) {
        const { result } = await this.getLocationLonLat(location_id);
        return this.mapInit(result, 18);
      }
      return this.mapInit([19.02754, 50.25841], 15);
    });
  }

  async getLocationsMarkers() {
    const { coordinates } = await this.mapService.getAllMarkers();
    return coordinates.map(({coordinates: cords}) => {
      const [longitude, latitude] = cords;
      return new Feature({
        geometry: new Point(fromLonLat([longitude, latitude])),
      });
    });
  }

  async mapInit([lon = 19.02754, lat = 50.25841]: number[], zoom: number): Promise<Map> {
    return new Map({
      view: this.getView([lon, lat]),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new Vector({
            features: await this.getLocationsMarkers(),
          }),
          style: new Style({
            image: new Icon({
              anchor: [0.5, 46],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              src: 'assets/map-marker.png',
              scale: 0.1,
              color: [255, 255, 0, 0.5]
            })
          }),
        })
      ],
      target: 'ol-map'
    });
  }

  getView(coordinates: number[], zoom: number = 15): View {
    return new View({
      center: fromLonLat(coordinates),
      zoom
    });
  }

  async getLocationLonLat(location_id: number | string) {
    return this.mapService.getLocationLonLat(location_id);
  }
}
