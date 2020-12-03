import { Observable } from 'rxjs';
import { MappedLayer } from './data/mapped-layer';
import { MetadataService } from './metadata.service';
import * as ɵngcc0 from '@angular/core';
export declare class AvailableDatesService {
    private metadata;
    constructor(metadata: MetadataService);
    private fnForYear;
    availableDates(mapped: MappedLayer, year?: number): Observable<Date[]>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AvailableDatesService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<AvailableDatesService>;
}

//# sourceMappingURL=available-dates.service.d.ts.map