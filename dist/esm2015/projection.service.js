import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
//import * as proj4 from 'proj4';
import * as proj4 from 'proj4';
//const proj4 = require('proj4').default;
let ProjectionService = class ProjectionService {
    constructor() {
    }
    proj4() {
        return proj4;
    }
};
ProjectionService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], ProjectionService);
export { ProjectionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJwcm9qZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsaUNBQWlDO0FBQ2pDLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLHlDQUF5QztBQUd6QyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUU1QjtJQUVBLENBQUM7SUFFRCxLQUFLO1FBQ0gsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0YsQ0FBQTtBQVRZLGlCQUFpQjtJQUQ3QixVQUFVLEVBQUU7O0dBQ0EsaUJBQWlCLENBUzdCO1NBVFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy9pbXBvcnQgKiBhcyBwcm9qNCBmcm9tICdwcm9qNCc7XG5pbXBvcnQgKiBhcyBwcm9qNCBmcm9tICdwcm9qNCc7XG4vL2NvbnN0IHByb2o0ID0gcmVxdWlyZSgncHJvajQnKS5kZWZhdWx0O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHJvamVjdGlvblNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBwcm9qNCgpe1xuICAgIHJldHVybiBwcm9qNDtcbiAgfVxufVxuIl19