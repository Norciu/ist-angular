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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  map: Map;

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: fromLonLat([19.02754, 50.25841]),
        zoom: 15,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new Vector({
            features: [new Feature({
              geometry: new Point(fromLonLat([19.013769222322, 50.26362300659955])),
            })],
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

}
