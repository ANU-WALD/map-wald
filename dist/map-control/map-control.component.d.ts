import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
export declare class MapControlComponent implements OnInit, AfterViewInit {
    private _el;
    _wrapper: GoogleMapsAPIWrapper;
    mapControl: Component;
    position: string;
    constructor(_el: ElementRef, _wrapper: GoogleMapsAPIWrapper);
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
