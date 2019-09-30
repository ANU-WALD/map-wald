import { Observable } from 'rxjs';
import { MappedLayer } from './data/mapped-layer';
import { MetadataService } from './metadata.service';
export declare class AvailableDatesService {
    private metadata;
    constructor(metadata: MetadataService);
    private fnForYear;
    availableDates(mapped: MappedLayer, year?: number): Observable<Date[]>;
}
