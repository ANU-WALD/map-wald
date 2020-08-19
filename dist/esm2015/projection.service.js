import { Injectable } from '@angular/core';
//import * as proj4 from 'proj4';
import * as proj4 from 'proj4';
//const proj4 = require('proj4').default;
export class ProjectionService {
    constructor() {
    }
    proj4() {
        return proj4;
    }
}
ProjectionService.decorators = [
    { type: Injectable }
];
ProjectionService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJwcm9qZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxpQ0FBaUM7QUFDakMsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IseUNBQXlDO0FBR3pDLE1BQU0sT0FBTyxpQkFBaUI7SUFFNUI7SUFFQSxDQUFDO0lBRUQsS0FBSztRQUNILE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7O1lBVEYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vaW1wb3J0ICogYXMgcHJvajQgZnJvbSAncHJvajQnO1xuaW1wb3J0ICogYXMgcHJvajQgZnJvbSAncHJvajQnO1xuLy9jb25zdCBwcm9qNCA9IHJlcXVpcmUoJ3Byb2o0JykuZGVmYXVsdDtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFByb2plY3Rpb25TZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgcHJvajQoKXtcbiAgICByZXR1cm4gcHJvajQ7XG4gIH1cbn1cbiJdfQ==