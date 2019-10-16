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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var dap_query_1 = require("dap-query-js/dist/dap-query");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var OpendapService = /** @class */ (function () {
    function OpendapService(http) {
        this.http = http;
    }
    OpendapService.prototype.makeURL = function (host, filepath) {
        return host.url + '/dodsC/' + filepath;
    };
    OpendapService.prototype.get = function (url) {
        return this.http.get(url, { responseType: 'text' });
    };
    OpendapService.prototype.getData = function (queryUrl, das) {
        return this.get(queryUrl).pipe(operators_1.map(function (txt) { return dap_query_1.simplify(dap_query_1.parseData(txt, das)); }));
    };
    OpendapService.prototype.getDAS = function (url) {
        return this.get(url + '.das').pipe(operators_1.map(dap_query_1.parseDAS));
    };
    OpendapService.prototype.getDDX = function (url) {
        return this.get(url + '.ddx').pipe(operators_1.map(dap_query_1.parseDDX));
    };
    OpendapService.prototype.getExtent = function (url) {
        var _this = this;
        console.log(url);
        return rxjs_1.forkJoin([
            this.getDAS(url),
            this.getDDX(url)
        ]).pipe(operators_1.switchMap(function (_a) {
            var _b = __read(_a, 2), theDAS = _b[0], theDDX = _b[1];
            var das = theDAS;
            return rxjs_1.forkJoin([
                _this.getData(url + '.ascii?latitude', das),
                _this.getData(url + '.ascii?longitude', das)
            ]);
        }), operators_1.map(function (ll) {
            var lats = ll[0].latitude;
            var lons = ll[1].longitude;
            return [lats[0], lats[lats.length - 1],
                lons[0], lons[lons.length - 1]];
        }));
    };
    OpendapService.prototype.dapRangeQuery = function (from, to, step) {
        step = step || 1;
        if (to === undefined) {
            to = from;
        }
        return '[' + from + ':' + step + ':' + to + ']';
    };
    OpendapService.ctorParameters = function () { return [
        { type: http_1.HttpClient }
    ]; };
    OpendapService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], OpendapService);
    return OpendapService;
}());
exports.OpendapService = OpendapService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlbmRhcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJvcGVuZGFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLDZDQUFrRDtBQUNsRCx5REFDK0Y7QUFFL0YsNENBQWdEO0FBQ2hELDZCQUEyQztBQUczQztJQUVFLHdCQUFvQixJQUFlO1FBQWYsU0FBSSxHQUFKLElBQUksQ0FBVztJQUVuQyxDQUFDO0lBRUQsZ0NBQU8sR0FBUCxVQUFRLElBQWdCLEVBQUMsUUFBZTtRQUN0QyxPQUFPLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUN6QyxDQUFDO0lBRUQsNEJBQUcsR0FBSCxVQUFJLEdBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQ3BELENBQUM7SUFFRCxnQ0FBTyxHQUFQLFVBQVEsUUFBZSxFQUFDLEdBQVU7UUFDaEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FDNUIsZUFBRyxDQUFDLFVBQUMsR0FBVSxJQUFHLE9BQUEsb0JBQVEsQ0FBQyxxQkFBUyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsK0JBQU0sR0FBTixVQUFPLEdBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDOUIsZUFBRyxDQUFDLG9CQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCwrQkFBTSxHQUFOLFVBQU8sR0FBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUM5QixlQUFHLENBQUMsb0JBQVEsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELGtDQUFTLEdBQVQsVUFBVSxHQUFVO1FBQXBCLGlCQWlCQztRQWhCQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sZUFBUSxDQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBUyxDQUFDLFVBQUMsRUFBZTtnQkFBZixrQkFBZSxFQUFkLGNBQU0sRUFBQyxjQUFNO1lBQy9CLElBQUksR0FBRyxHQUFrQixNQUFNLENBQUM7WUFDaEMsT0FBTyxlQUFRLENBQUM7Z0JBQ2QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUMsaUJBQWlCLEVBQUMsR0FBRyxDQUFDO2dCQUN2QyxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBQyxrQkFBa0IsRUFBQyxHQUFHLENBQUM7YUFDekMsQ0FBQyxDQUFBO1FBQUEsQ0FBQyxDQUFDLEVBQ0osZUFBRyxDQUFDLFVBQUMsRUFBWTtZQUNmLElBQUksSUFBSSxHQUF5QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQ2hELElBQUksSUFBSSxHQUF5QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ2pELE9BQU8sQ0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVELHNDQUFhLEdBQWIsVUFBYyxJQUFXLEVBQUMsRUFBVSxFQUFDLElBQVk7UUFDL0MsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUM7UUFDakIsSUFBRyxFQUFFLEtBQUcsU0FBUyxFQUFDO1lBQ2hCLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDWDtRQUNELE9BQU8sR0FBRyxHQUFDLElBQUksR0FBQyxHQUFHLEdBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDO0lBQ3RDLENBQUM7O2dCQXBEd0IsaUJBQVU7O0lBRnhCLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FHYyxpQkFBVTtPQUZ4QixjQUFjLENBdUQxQjtJQUFELHFCQUFDO0NBQUEsQUF2REQsSUF1REM7QUF2RFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgcGFyc2VEYXRhLCBwYXJzZURBUyxwYXJzZUREWCxcbiAgc2ltcGxpZnksIERhcERhdGEsIERhcERBUywgRGFwRERYLCBEYXBWYXJpYWJsZURhdGFBcnJheSB9IGZyb20gJ2RhcC1xdWVyeS1qcy9kaXN0L2RhcC1xdWVyeSc7XG5pbXBvcnQgeyBDYXRhbG9nSG9zdCB9IGZyb20gJy4vZGF0YS9jYXRhbG9nJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSxmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3BlbmRhcFNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDpIdHRwQ2xpZW50KSB7XG5cbiAgfVxuXG4gIG1ha2VVUkwoaG9zdDpDYXRhbG9nSG9zdCxmaWxlcGF0aDpzdHJpbmcpOnN0cmluZ3tcbiAgICByZXR1cm4gaG9zdC51cmwgKyAnL2RvZHNDLycgKyBmaWxlcGF0aDtcbiAgfVxuXG4gIGdldCh1cmw6c3RyaW5nKTpPYnNlcnZhYmxlPHN0cmluZz57XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSlcbiAgfVxuXG4gIGdldERhdGEocXVlcnlVcmw6c3RyaW5nLGRhczpEYXBEQVMpOk9ic2VydmFibGU8RGFwRGF0YT57XG4gICAgcmV0dXJuIHRoaXMuZ2V0KHF1ZXJ5VXJsKS5waXBlKFxuICAgICAgbWFwKCh0eHQ6c3RyaW5nKT0+c2ltcGxpZnkocGFyc2VEYXRhKHR4dCxkYXMpKSkpO1xuICB9XG5cbiAgZ2V0REFTKHVybDpzdHJpbmcpOk9ic2VydmFibGU8RGFwREFTPntcbiAgICByZXR1cm4gdGhpcy5nZXQodXJsKycuZGFzJykucGlwZShcbiAgICAgIG1hcChwYXJzZURBUykpO1xuICB9XG5cbiAgZ2V0RERYKHVybDpzdHJpbmcpOk9ic2VydmFibGU8RGFwRERYPntcbiAgICByZXR1cm4gdGhpcy5nZXQodXJsKycuZGR4JykucGlwZShcbiAgICAgIG1hcChwYXJzZUREWCkpO1xuICB9XG5cbiAgZ2V0RXh0ZW50KHVybDpzdHJpbmcpOk9ic2VydmFibGU8bnVtYmVyW10+e1xuICAgIGNvbnNvbGUubG9nKHVybCk7XG4gICAgcmV0dXJuIGZvcmtKb2luKFtcbiAgICAgIHRoaXMuZ2V0REFTKHVybCksXG4gICAgICB0aGlzLmdldEREWCh1cmwpXG4gICAgXSkucGlwZShzd2l0Y2hNYXAoKFt0aGVEQVMsdGhlRERYXSk9PntcbiAgICAgIHZhciBkYXM6RGFwREFTID0gPERhcERBUz50aGVEQVM7XG4gICAgICByZXR1cm4gZm9ya0pvaW4oW1xuICAgICAgICB0aGlzLmdldERhdGEodXJsKycuYXNjaWk/bGF0aXR1ZGUnLGRhcyksXG4gICAgICAgIHRoaXMuZ2V0RGF0YSh1cmwrJy5hc2NpaT9sb25naXR1ZGUnLGRhcylcbiAgICAgIF0pfSksXG4gICAgICBtYXAoKGxsOkRhcERhdGFbXSk9PntcbiAgICAgICAgdmFyIGxhdHMgPSA8RGFwVmFyaWFibGVEYXRhQXJyYXk+bGxbMF0ubGF0aXR1ZGU7XG4gICAgICAgIHZhciBsb25zID0gPERhcFZhcmlhYmxlRGF0YUFycmF5PmxsWzFdLmxvbmdpdHVkZTtcbiAgICAgICAgcmV0dXJuIFs8bnVtYmVyPmxhdHNbMF0sPG51bWJlcj5sYXRzW2xhdHMubGVuZ3RoLTFdLFxuICAgICAgICAgICAgICAgIDxudW1iZXI+bG9uc1swXSw8bnVtYmVyPmxvbnNbbG9ucy5sZW5ndGgtMV1dO1xuICAgICAgfSkpO1xuICB9XG5cbiAgZGFwUmFuZ2VRdWVyeShmcm9tOm51bWJlcix0bz86bnVtYmVyLHN0ZXA/Om51bWJlcik6c3RyaW5ne1xuICAgIHN0ZXAgPSBzdGVwIHx8IDE7XG4gICAgaWYodG89PT11bmRlZmluZWQpe1xuICAgICAgdG8gPSBmcm9tO1xuICAgIH1cbiAgICByZXR1cm4gJ1snK2Zyb20rJzonK3N0ZXArJzonK3RvKyddJztcbiAgfVxufVxuIl19