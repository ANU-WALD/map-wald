import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare type ColourSpecification = string;
export declare type ColourPalette = Array<ColourSpecification>;
export declare class PaletteService {
    private _http;
    namedPalettes: {
        [key: string]: ColourPalette;
    };
    constructor(_http: HttpClient);
    private _source;
    source: string;
    getPalette(name: string, reverse?: boolean, numColours?: number): Observable<ColourPalette>;
    parseNCWMSPalette(txt: string): ColourPalette;
    colourIndex(val: number, min: number, max: number, count: number): number;
}
