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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var opendap_service_1 = require("./opendap.service");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
exports.LAT_NAMES = ['latitude', 'lat'];
exports.LNG_NAMES = ['longitude', 'lng', 'lon'];
exports.TIME_NAMES = ['time', 't'];
var MetadataService = /** @class */ (function () {
    function MetadataService(dap) {
        this.dap = dap;
        this.ddxCache = {};
        this.dasCache = {};
        this.timeCache = {};
    }
    MetadataService.prototype.identifyCoordinate = function (ddx) {
        var e_1, _a;
        var possibleNames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            possibleNames[_i - 1] = arguments[_i];
        }
        try {
            for (var possibleNames_1 = __values(possibleNames), possibleNames_1_1 = possibleNames_1.next(); !possibleNames_1_1.done; possibleNames_1_1 = possibleNames_1.next()) {
                var n = possibleNames_1_1.value;
                if (ddx.variables[n]) {
                    return n;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (possibleNames_1_1 && !possibleNames_1_1.done && (_a = possibleNames_1.return)) _a.call(possibleNames_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return undefined;
    };
    MetadataService.prototype.getDDX = function (host, file) {
        var url = this.dap.makeURL(host, file);
        return this.ddxForUrl(url);
    };
    MetadataService.prototype.ddxForUrl = function (url) {
        if (!this.ddxCache[url]) {
            this.ddxCache[url] =
                this.dap.getDDX(url).pipe(operators_1.publishReplay(), operators_1.refCount());
        }
        return this.ddxCache[url];
    };
    MetadataService.prototype.getDDXForLayer = function (ml) {
        return this.getDDX(ml.flattenedSettings.host, ml.interpolatedFile);
    };
    MetadataService.prototype.getDAS = function (host, file) {
        var url = this.dap.makeURL(host, file);
        return this.dasForUrl(url);
    };
    MetadataService.prototype.dasForUrl = function (url) {
        if (!this.dasCache[url]) {
            this.dasCache[url] =
                this.dap.getDAS(url).pipe(operators_1.publishReplay(), operators_1.refCount());
        }
        return this.dasCache[url];
    };
    MetadataService.prototype.getDASForLayer = function (ml) {
        return this.getDAS(ml.flattenedSettings.host, ml.interpolatedFile);
    };
    MetadataService.prototype.getMetadata = function (ml) {
        if (ml.flattenedSettings.host.software !== 'tds') {
            return rxjs_1.of({});
        }
        return rxjs_1.forkJoin([this.getDASForLayer(ml), this.getDDXForLayer(ml)]).pipe(operators_1.map(function (meta) {
            return {
                das: meta[0],
                ddx: meta[1]
            };
        }), operators_1.map(function (meta) {
            return Object.assign({}, meta.das.attr || {}, meta.ddx.variables[ml.flattenedSettings.layer || ml.flattenedSettings.variable] || {});
        }));
    };
    MetadataService.prototype.populateMetadata = function (ml) {
        this.getMetadata(ml).subscribe(function (entry) {
            setTimeout(function () {
                ml.retrievedMetadata = entry;
            });
        });
    };
    MetadataService.prototype.getGrid = function (host, file) {
        var url = this.dap.makeURL(host, file);
        return this.getGridForURL(url);
    };
    MetadataService.prototype.getGridForURL = function (url) {
        var _this = this;
        var ddx$ = this.ddxForUrl(url);
        var das$ = this.dasForUrl(url);
        var res$ = rxjs_1.forkJoin([ddx$, das$]).pipe(operators_1.map(function (metadata) {
            var ddx = metadata[0];
            var das = metadata[1];
            var latCoord = _this.identifyCoordinate.apply(_this, __spread([ddx], exports.LAT_NAMES));
            var lngCoord = _this.identifyCoordinate.apply(_this, __spread([ddx], exports.LNG_NAMES));
            var lat$ = _this.dap.getData(url + ".ascii?" + latCoord, das).pipe(operators_1.map(function (dd) { return dd[latCoord]; }));
            var lng$ = _this.dap.getData(url + ".ascii?" + lngCoord, das).pipe(operators_1.map(function (dd) { return dd[lngCoord]; }));
            return rxjs_1.forkJoin(lat$, lng$);
        }), operators_1.switchAll(), operators_1.publishReplay(), operators_1.refCount());
        return res$;
    };
    MetadataService.prototype.getGridForLayer = function (ml) {
        return this.getGrid(ml.flattenedSettings.host, ml.interpolatedFile);
    };
    MetadataService.prototype.getSpatialExtent = function (ml) {
        return this.getGridForLayer(ml).pipe(operators_1.map(function (_a) {
            var _b = __read(_a, 2), lats = _b[0], lngs = _b[1];
            var result = {
                east: Math.max.apply(Math, __spread(lngs)),
                west: Math.min.apply(Math, __spread(lngs)),
                north: Math.max.apply(Math, __spread(lats)),
                south: Math.min.apply(Math, __spread(lats))
            };
            return result;
        })).pipe(operators_1.publishReplay(), operators_1.refCount());
    };
    MetadataService.prototype.getTimeDimension = function (host, file) {
        var url = this.dap.makeURL(host, file);
        return this.getTimeDimensionForURL(url);
    };
    MetadataService.prototype.getTimeDimensionForURL = function (url) {
        var _this = this;
        if (!this.timeCache[url]) {
            var ddx$ = this.ddxForUrl(url);
            var das$ = this.dasForUrl(url);
            var res$ = rxjs_1.forkJoin([ddx$, das$]).pipe(operators_1.map(function (metadata) {
                var ddx = metadata[0];
                var das = metadata[1];
                var timeCoord = _this.identifyCoordinate.apply(_this, __spread([ddx], exports.TIME_NAMES));
                var time$ = _this.dap.getData(url + ".ascii?" + timeCoord, das).pipe(operators_1.map(function (dd) { return dd[timeCoord]; }));
                return time$;
            }), operators_1.switchAll(), operators_1.shareReplay());
            this.timeCache[url] = res$;
        }
        return this.timeCache[url];
    };
    MetadataService.ctorParameters = function () { return [
        { type: opendap_service_1.OpendapService }
    ]; };
    MetadataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [opendap_service_1.OpendapService])
    ], MetadataService);
    return MetadataService;
}());
exports.MetadataService = MetadataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsibWV0YWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUczQyxxREFBbUQ7QUFJbkQsNkJBQWdEO0FBQ2hELDRDQUFzRztBQUV6RixRQUFBLFNBQVMsR0FBQyxDQUFDLFVBQVUsRUFBQyxLQUFLLENBQUMsQ0FBQztBQUM3QixRQUFBLFNBQVMsR0FBQyxDQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEMsUUFBQSxVQUFVLEdBQUMsQ0FBQyxNQUFNLEVBQUMsR0FBRyxDQUFDLENBQUM7QUFHckM7SUFJRSx5QkFBb0IsR0FBa0I7UUFBbEIsUUFBRyxHQUFILEdBQUcsQ0FBZTtRQUh0QyxhQUFRLEdBQW1DLEVBQUUsQ0FBQTtRQUM3QyxhQUFRLEdBQW1DLEVBQUUsQ0FBQTtRQWdJN0MsY0FBUyxHQUFtQyxFQUFFLENBQUM7SUE1SC9DLENBQUM7SUFFRCw0Q0FBa0IsR0FBbEIsVUFBbUIsR0FBVTs7UUFBQyx1QkFBOEI7YUFBOUIsVUFBOEIsRUFBOUIscUJBQThCLEVBQTlCLElBQThCO1lBQTlCLHNDQUE4Qjs7O1lBQzFELEtBQWEsSUFBQSxrQkFBQSxTQUFBLGFBQWEsQ0FBQSw0Q0FBQSx1RUFBQztnQkFBdkIsSUFBSSxDQUFDLDBCQUFBO2dCQUNQLElBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQztvQkFDbEIsT0FBTyxDQUFDLENBQUM7aUJBQ1Y7YUFDRjs7Ozs7Ozs7O1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELGdDQUFNLEdBQU4sVUFBTyxJQUFnQixFQUFDLElBQVc7UUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMs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LENBQUMsQ0FBQztnQkFFOUMsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDLENBQUMsRUFBQyxxQkFBUyxFQUFFLEVBQUMsdUJBQVcsRUFBRSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDNUI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Z0JBcEp1QixnQ0FBYzs7SUFKM0IsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQUthLGdDQUFjO09BSjNCLGVBQWUsQ0F5SjNCO0lBQUQsc0JBQUM7Q0FBQSxBQXpKRCxJQXlKQztBQXpKWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hcHBlZExheWVyIH0gZnJvbSAnLi9kYXRhL21hcHBlZC1sYXllcic7XG5pbXBvcnQgeyBEYXBERFgsIERhcERBUywgRGFwRGF0YSB9IGZyb20gJ2RhcC1xdWVyeS1qcy9kaXN0L2RhcC1xdWVyeSc7XG5pbXBvcnQgeyBPcGVuZGFwU2VydmljZSB9IGZyb20gJy4vb3BlbmRhcC5zZXJ2aWNlJztcbmltcG9ydCB7IEJvdW5kcyB9IGZyb20gJy4vZGF0YS9ib3VuZHMnO1xuXG5pbXBvcnQgeyBDYXRhbG9nSG9zdCB9IGZyb20gJy4vZGF0YS9jYXRhbG9nJztcbmltcG9ydCB7IGZvcmtKb2luLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCBwdWJsaXNoUmVwbGF5LCByZWZDb3VudCwgbWFwLCBzd2l0Y2hBbGwsIHRhcCwgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBMQVRfTkFNRVM9WydsYXRpdHVkZScsJ2xhdCddO1xuZXhwb3J0IGNvbnN0IExOR19OQU1FUz1bJ2xvbmdpdHVkZScsJ2xuZycsJ2xvbiddO1xuZXhwb3J0IGNvbnN0IFRJTUVfTkFNRVM9Wyd0aW1lJywndCddO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWV0YWRhdGFTZXJ2aWNlIHtcbiAgZGR4Q2FjaGU6e1trZXk6c3RyaW5nXTpPYnNlcnZhYmxlPERhcEREWD59PXt9XG4gIGRhc0NhY2hlOntba2V5OnN0cmluZ106T2JzZXJ2YWJsZTxEYXBEQVM+fT17fVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGFwOk9wZW5kYXBTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIGlkZW50aWZ5Q29vcmRpbmF0ZShkZHg6RGFwRERYLC4uLnBvc3NpYmxlTmFtZXM6QXJyYXk8c3RyaW5nPik6c3RyaW5ne1xuICAgIGZvcihsZXQgbiBvZiBwb3NzaWJsZU5hbWVzKXtcbiAgICAgIGlmKGRkeC52YXJpYWJsZXNbbl0pe1xuICAgICAgICByZXR1cm4gbjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldEREWChob3N0OkNhdGFsb2dIb3N0LGZpbGU6c3RyaW5nKTpPYnNlcnZhYmxlPERhcEREWD57XG4gICAgdmFyIHVybCA9IHRoaXMuZGFwLm1ha2VVUkwoaG9zdCxmaWxlKTtcblxuICAgIHJldHVybiB0aGlzLmRkeEZvclVybCh1cmwpO1xuICB9XG5cbiAgZGR4Rm9yVXJsKHVybDpzdHJpbmcpOk9ic2VydmFibGU8RGFwRERYPntcbiAgICBpZighdGhpcy5kZHhDYWNoZVt1cmxdKXtcbiAgICAgIHRoaXMuZGR4Q2FjaGVbdXJsXSA9XG4gICAgICAgIHRoaXMuZGFwLmdldEREWCh1cmwpLnBpcGUocHVibGlzaFJlcGxheSgpLHJlZkNvdW50KCkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRkeENhY2hlW3VybF07XG59XG5cbiAgZ2V0RERYRm9yTGF5ZXIobWw6TWFwcGVkTGF5ZXIpOk9ic2VydmFibGU8RGFwRERYPntcbiAgICByZXR1cm4gdGhpcy5nZXRERFgobWwuZmxhdHRlbmVkU2V0dGluZ3MuaG9zdCxtbC5pbnRlcnBvbGF0ZWRGaWxlKTtcbiAgfVxuXG4gIGdldERBUyhob3N0OkNhdGFsb2dIb3N0LGZpbGU6c3RyaW5nKTpPYnNlcnZhYmxlPERhcERBUz57XG4gICAgdmFyIHVybCA9IHRoaXMuZGFwLm1ha2VVUkwoaG9zdCxmaWxlKTtcbiAgICByZXR1cm4gdGhpcy5kYXNGb3JVcmwodXJsKTtcbiAgfVxuXG4gIGRhc0ZvclVybCh1cmw6c3RyaW5nKTpPYnNlcnZhYmxlPERhcERBUz57XG4gICAgaWYoIXRoaXMuZGFzQ2FjaGVbdXJsXSl7XG4gICAgICB0aGlzLmRhc0NhY2hlW3VybF0gPVxuICAgICAgICB0aGlzLmRhcC5nZXREQVModXJsKS5waXBlKHB1Ymxpc2hSZXBsYXkoKSxyZWZDb3VudCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5kYXNDYWNoZVt1cmxdO1xuICB9XG5cbiAgZ2V0REFTRm9yTGF5ZXIobWw6TWFwcGVkTGF5ZXIpOk9ic2VydmFibGU8RGFwREFTPntcbiAgICByZXR1cm4gdGhpcy5nZXREQVMobWwuZmxhdHRlbmVkU2V0dGluZ3MuaG9zdCxtbC5pbnRlcnBvbGF0ZWRGaWxlKTtcbiAgfVxuXG4gIGdldE1ldGFkYXRhKG1sOk1hcHBlZExheWVyKTpPYnNlcnZhYmxlPGFueT57XG4gICAgaWYobWwuZmxhdHRlbmVkU2V0dGluZ3MuaG9zdC5zb2Z0d2FyZSAhPT0ndGRzJyl7XG4gICAgICByZXR1cm4gb2Yoe30pO1xuICAgIH1cblxuICAgIHJldHVybiBmb3JrSm9pbihbdGhpcy5nZXREQVNGb3JMYXllcihtbCksdGhpcy5nZXRERFhGb3JMYXllcihtbCldKS5waXBlKFxuICAgICAgbWFwKG1ldGE9PntcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkYXM6IDxEYXBEQVM+bWV0YVswXSxcbiAgICAgICAgICBkZHg6IDxEYXBERFg+bWV0YVsxXVxuICAgICAgICB9O1xuICAgICAgfSksXG4gICAgICBtYXAobWV0YT0+e1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXMuYXR0cnx8e30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuZGR4LnZhcmlhYmxlc1ttbC5mbGF0dGVuZWRTZXR0aW5ncy5sYXllcnx8bWwuZmxhdHRlbmVkU2V0dGluZ3MudmFyaWFibGVdfHx7fSk7XG4gICAgICB9KSk7XG4gIH1cblxuICBwb3B1bGF0ZU1ldGFkYXRhKG1sOk1hcHBlZExheWVyKXtcbiAgICB0aGlzLmdldE1ldGFkYXRhKG1sKS5zdWJzY3JpYmUoZW50cnk9PntcbiAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgbWwucmV0cmlldmVkTWV0YWRhdGEgPSBlbnRyeTtcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICBnZXRHcmlkKGhvc3Q6Q2F0YWxvZ0hvc3QsZmlsZTpzdHJpbmcpOk9ic2VydmFibGU8bnVtYmVyW11bXT57XG4gICAgY29uc3QgdXJsID0gdGhpcy5kYXAubWFrZVVSTChob3N0LGZpbGUpO1xuICAgIHJldHVybiB0aGlzLmdldEdyaWRGb3JVUkwodXJsKTtcbiAgfVxuXG4gIGdldEdyaWRGb3JVUkwodXJsOnN0cmluZyk6T2JzZXJ2YWJsZTxudW1iZXJbXVtdPntcbiAgICBjb25zdCBkZHgkID0gdGhpcy5kZHhGb3JVcmwodXJsKTtcbiAgICBjb25zdCBkYXMkID0gdGhpcy5kYXNGb3JVcmwodXJsKTtcbiAgICBjb25zdCByZXMkID0gPE9ic2VydmFibGU8bnVtYmVyW11bXT4+Zm9ya0pvaW4oW2RkeCQsZGFzJF0pLnBpcGUoXG4gICAgICBtYXAoKG1ldGFkYXRhOmFueVtdKT0+e1xuICAgICAgICBjb25zdCBkZHg6RGFwRERYID0gbWV0YWRhdGFbMF07XG4gICAgICAgIGNvbnN0IGRhczpEYXBEQVMgPSBtZXRhZGF0YVsxXTtcblxuICAgICAgICBjb25zdCBsYXRDb29yZCA9IHRoaXMuaWRlbnRpZnlDb29yZGluYXRlKGRkeCwuLi5MQVRfTkFNRVMpO1xuICAgICAgICBjb25zdCBsbmdDb29yZCA9IHRoaXMuaWRlbnRpZnlDb29yZGluYXRlKGRkeCwuLi5MTkdfTkFNRVMpO1xuXG4gICAgICAgIGNvbnN0IGxhdCQgPVxuICAgICAgICAgIHRoaXMuZGFwLmdldERhdGEoYCR7dXJsfS5hc2NpaT8ke2xhdENvb3JkfWAsZGFzKS5waXBlKFxuICAgICAgICAgICAgbWFwKChkZDpEYXBEYXRhKT0+PG51bWJlcltdPmRkW2xhdENvb3JkXSkpO1xuICAgICAgICBjb25zdCBsbmckID1cbiAgICAgICAgICB0aGlzLmRhcC5nZXREYXRhKGAke3VybH0uYXNjaWk/JHtsbmdDb29yZH1gLGRhcykucGlwZShcbiAgICAgICAgICAgIG1hcCgoZGQ6RGFwRGF0YSk9PjxudW1iZXJbXT5kZFtsbmdDb29yZF0pKTtcblxuICAgICAgICByZXR1cm4gZm9ya0pvaW48bnVtYmVyW10+KGxhdCQsbG5nJCk7XG4gICAgICB9KSxzd2l0Y2hBbGwoKSxwdWJsaXNoUmVwbGF5KCkscmVmQ291bnQoKSk7XG4gICAgICByZXR1cm4gcmVzJDtcbiAgfVxuXG4gIGdldEdyaWRGb3JMYXllcihtbDpNYXBwZWRMYXllcik6T2JzZXJ2YWJsZTxBcnJheTxBcnJheTxudW1iZXI+Pj57XG4gICAgcmV0dXJuIHRoaXMuZ2V0R3JpZChtbC5mbGF0dGVuZWRTZXR0aW5ncy5ob3N0LG1sLmludGVycG9sYXRlZEZpbGUpO1xuICB9XG5cbiAgZ2V0U3BhdGlhbEV4dGVudChtbDpNYXBwZWRMYXllcik6T2JzZXJ2YWJsZTxCb3VuZHM+e1xuICAgIHJldHVybiB0aGlzLmdldEdyaWRGb3JMYXllcihtbCkucGlwZShtYXAoKFtsYXRzLGxuZ3NdKT0+e1xuICAgICAgdmFyIHJlc3VsdDpCb3VuZHMgPSB7XG4gICAgICAgIGVhc3Q6IE1hdGgubWF4KC4uLmxuZ3MpLFxuICAgICAgICB3ZXN0OiBNYXRoLm1pbiguLi5sbmdzKSxcbiAgICAgICAgbm9ydGg6IE1hdGgubWF4KC4uLmxhdHMpLFxuICAgICAgICBzb3V0aDogTWF0aC5taW4oLi4ubGF0cylcbiAgICAgIH07XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pKS5waXBlKHB1Ymxpc2hSZXBsYXkoKSwgcmVmQ291bnQoKSk7XG4gIH1cblxuICBnZXRUaW1lRGltZW5zaW9uKGhvc3Q6Q2F0YWxvZ0hvc3QsZmlsZTpzdHJpbmcpOk9ic2VydmFibGU8RGF0ZVtdPntcbiAgICBjb25zdCB1cmwgPSB0aGlzLmRhcC5tYWtlVVJMKGhvc3QsZmlsZSk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGltZURpbWVuc2lvbkZvclVSTCh1cmwpO1xuICB9XG5cbiAgdGltZUNhY2hlOntba2V5OnN0cmluZ106T2JzZXJ2YWJsZTxEYXRlW10+fT17fTtcblxuICBnZXRUaW1lRGltZW5zaW9uRm9yVVJMKHVybDpzdHJpbmcpOk9ic2VydmFibGU8RGF0ZVtdPntcbiAgICBpZighdGhpcy50aW1lQ2FjaGVbdXJsXSl7XG4gICAgICBjb25zdCBkZHgkID0gdGhpcy5kZHhGb3JVcmwodXJsKTtcbiAgICAgIGNvbnN0IGRhcyQgPSB0aGlzLmRhc0ZvclVybCh1cmwpO1xuICAgICAgY29uc3QgcmVzJCA9IDxPYnNlcnZhYmxlPERhdGVbXT4+Zm9ya0pvaW4oW2RkeCQsZGFzJF0pLnBpcGUoXG4gICAgICAgIG1hcCgobWV0YWRhdGE6YW55W10pPT57XG4gICAgICAgICAgY29uc3QgZGR4OkRhcEREWCA9IG1ldGFkYXRhWzBdO1xuICAgICAgICAgIGNvbnN0IGRhczpEYXBEQVMgPSBtZXRhZGF0YVsxXTtcblxuICAgICAgICAgIGNvbnN0IHRpbWVDb29yZCA9IHRoaXMuaWRlbnRpZnlDb29yZGluYXRlKGRkeCwuLi5USU1FX05BTUVTKTtcblxuICAgICAgICAgIGNvbnN0IHRpbWUkID1cbiAgICAgICAgICAgIHRoaXMuZGFwLmdldERhdGEoYCR7dXJsfS5hc2NpaT8ke3RpbWVDb29yZH1gLGRhcykucGlwZShcbiAgICAgICAgICAgICAgbWFwKChkZDpEYXBEYXRhKT0+PERhdGVbXT5kZFt0aW1lQ29vcmRdKSk7XG5cbiAgICAgICAgICByZXR1cm4gdGltZSQ7XG4gICAgICAgIH0pLHN3aXRjaEFsbCgpLHNoYXJlUmVwbGF5KCkpO1xuICAgICAgdGhpcy50aW1lQ2FjaGVbdXJsXSA9IHJlcyQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRpbWVDYWNoZVt1cmxdO1xuICB9XG59XG4iXX0=