"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import * as proj4 from 'proj4';
var proj4 = require("proj4");
//const proj4 = require('proj4').default;
var ProjectionService = /** @class */ (function () {
    function ProjectionService() {
    }
    ProjectionService.prototype.proj4 = function () {
        return proj4;
    };
    ProjectionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ProjectionService);
    return ProjectionService;
}());
exports.ProjectionService = ProjectionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJwcm9qZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsaUNBQWlDO0FBQ2pDLDZCQUErQjtBQUMvQix5Q0FBeUM7QUFHekM7SUFFRTtJQUVBLENBQUM7SUFFRCxpQ0FBSyxHQUFMO1FBQ0UsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBUlUsaUJBQWlCO1FBRDdCLGlCQUFVLEVBQUU7O09BQ0EsaUJBQWlCLENBUzdCO0lBQUQsd0JBQUM7Q0FBQSxBQVRELElBU0M7QUFUWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vL2ltcG9ydCAqIGFzIHByb2o0IGZyb20gJ3Byb2o0JztcbmltcG9ydCAqIGFzIHByb2o0IGZyb20gJ3Byb2o0Jztcbi8vY29uc3QgcHJvajQgPSByZXF1aXJlKCdwcm9qNCcpLmRlZmF1bHQ7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcm9qZWN0aW9uU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG4gIHByb2o0KCl7XG4gICAgcmV0dXJuIHByb2o0O1xuICB9XG59XG4iXX0=