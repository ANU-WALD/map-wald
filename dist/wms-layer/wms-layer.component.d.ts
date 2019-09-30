import { OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { WMSService } from '../wms.service';
export declare class WMSLayerComponent implements OnInit, OnDestroy {
    private _wmsService;
    _wrapper: GoogleMapsAPIWrapper;
    url: string;
    params: any;
    opacity: number;
    position: number;
    constructor(_wmsService: WMSService, _wrapper: GoogleMapsAPIWrapper);
    map: any;
    overlay: any;
    zoom: number;
    private building;
    buildMap(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
