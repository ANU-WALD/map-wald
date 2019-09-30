import { AfterViewInit, OnChanges, SimpleChanges, EventEmitter, QueryList, NgZone } from '@angular/core';
import { MappedLayer } from '../data/mapped-layer';
import { LayerSelection } from '../data/actions';
import { StaticDataService } from '../static-data.service';
import { DataMouseEvent, LatLng, AgmMap, AgmInfoWindow } from '@agm/core';
import { Feature, Point, GeometryObject } from 'geojson';
import { MapTypeControlOptions } from '@agm/core/services/google-maps-types';
import { Bounds } from '../data/bounds';
import { MetadataService } from '../metadata.service';
export interface SimpleMarker {
    loc: LatLng;
    value: string;
    open: boolean;
    iconUrl: string;
}
export declare class LayeredMapComponent implements AfterViewInit, OnChanges {
    private _zone;
    private staticData;
    private metadata;
    layers: Array<MappedLayer>;
    markers: Array<SimpleMarker>;
    mapTypeId: string;
    layersChange: EventEmitter<MappedLayer[]>;
    featureSelected: EventEmitter<{
        feature: Feature<GeometryObject, any>;
        layer?: MappedLayer;
    }>;
    pointSelected: EventEmitter<LatLng>;
    mapTypePosition: number;
    streetViewControl: boolean;
    theMap: AgmMap;
    infoWindows: QueryList<AgmInfoWindow>;
    selectedFeature: any;
    zoom: number;
    showMapType: boolean;
    mapTypeOptions: MapTypeControlOptions;
    lat: number;
    lng: number;
    bounds: Bounds;
    _bounds: Bounds;
    constructor(_zone: NgZone, staticData: StaticDataService, metadata: MetadataService);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    layersChanged(changes: Array<MappedLayer>): void;
    layerAdded(selection: LayerSelection): void;
    private activateLayer;
    setLayerPositions(): void;
    extractFeature(f: any): Feature<Point>;
    clicked(event: DataMouseEvent): void;
    circleClicked(ml: MappedLayer, feature: any): void;
    mapClick(event: any): void;
    zoomToBounds(bounds: Bounds): void;
    zoomChanged(): void;
}
