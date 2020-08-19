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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb2plY3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLGlDQUFpQztBQUNqQyxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQix5Q0FBeUM7QUFHekMsTUFBTSxPQUFPLGlCQUFpQjtJQUU1QjtJQUVBLENBQUM7SUFFRCxLQUFLO1FBQ0gsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7WUFURixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy9pbXBvcnQgKiBhcyBwcm9qNCBmcm9tICdwcm9qNCc7XG5pbXBvcnQgKiBhcyBwcm9qNCBmcm9tICdwcm9qNCc7XG4vL2NvbnN0IHByb2o0ID0gcmVxdWlyZSgncHJvajQnKS5kZWZhdWx0O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHJvamVjdGlvblNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBwcm9qNCgpe1xuICAgIHJldHVybiBwcm9qNDtcbiAgfVxufVxuIl19