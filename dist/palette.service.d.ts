import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare type ColourSpecification = string;
export declare type ColourPalette = Array<ColourSpecification>;
export declare class PaletteService {
    private _http;
    namedPalettes: {
        [key: string]: ColourPalette;
    };
    constructor(_http: HttpClient);
    private _source;
    set source(val: string);
    getPalette(name: string, reverse?: boolean, numColours?: number): Observable<ColourPalette>;
    parseNCWMSPalette(txt: string): ColourPalette;
    colourIndex(val: number, min: number, max: number, count: number): number;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PaletteService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<PaletteService>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PaletteService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<PaletteService>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PaletteService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<PaletteService>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PaletteService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<PaletteService>;
}

//# sourceMappingURL=palette.service.d.ts.map