import { OnInit } from '@angular/core';
import { PaletteService } from '../palette.service';
export declare class MapLegendComponent implements OnInit {
    private _palettes;
    imageURL: string;
    colours: Array<string>;
    labels: Array<string>;
    title: string;
    mapUnits: string;
    helpText: string;
    tooltipPlacement: string;
    attribution: string;
    attributionLink: string;
    generatedLabels: string[];
    _cbPalette: string;
    _cbCount: number;
    _cbReverse: boolean;
    _cbRange: Array<number>;
    cbPalette: string;
    cbCount: number;
    cbReverse: boolean;
    cbRange: Array<number>;
    generateLabels(count: number): Array<string> | null;
    generatePalette(): void;
    formatValue: (val: number, decimalPlaces: number) => string;
    constructor(_palettes: PaletteService);
    ngOnInit(): void;
}
