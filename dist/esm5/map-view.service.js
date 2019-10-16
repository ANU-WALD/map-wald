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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var MapViewParameterService = /** @class */ (function () {
    function MapViewParameterService(_location) {
        this._location = _location;
    }
    MapViewParameterService_1 = MapViewParameterService;
    MapViewParameterService.prototype.current = function () {
        if (!this._location) {
            return {};
        }
        var path = this._location.path().split('/');
        if (path.length > MapViewParameterService_1.parameterNames.length) {
            path.shift();
        }
        var result = {};
        MapViewParameterService_1.parameterNames.forEach(function (p, i) { return result[p] = path[i] || '_'; });
        return result;
    };
    MapViewParameterService.prototype.update = function (changes) {
        if (!this._location) {
            return;
        }
        var updated = this.current();
        Object.assign(updated, changes);
        this._location.go(this.constructRoute(updated));
    };
    MapViewParameterService.prototype.retrieveFromRoute = function (route) {
        var e_1, _a;
        var result = {};
        try {
            for (var _b = __values(MapViewParameterService_1.parameterNames), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_1 = _c.value;
                result[name_1] = route.snapshot.params[name_1];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    };
    ;
    MapViewParameterService.prototype.constructRoute = function (parameters) {
        return MapViewParameterService_1.parameterNames.map(function (n) { return parameters[n] || '_'; }).join('/');
    };
    MapViewParameterService.prototype.routerPaths = function ( /*component:any*/) {
        var e_2, _a;
        var result = [];
        var path = '';
        result.push(path);
        try {
            //    result.push({path:path,component:component});
            for (var _b = __values(MapViewParameterService_1.parameterNames), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_2 = _c.value;
                path += ":" + name_2;
                //      result.unshift({path:path,component:component});
                result.unshift(path);
                path += '/';
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    };
    var MapViewParameterService_1;
    MapViewParameterService.ctorParameters = function () { return [
        { type: common_1.Location }
    ]; };
    MapViewParameterService.parameterNames = [];
    MapViewParameterService = MapViewParameterService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [common_1.Location])
    ], MapViewParameterService);
    return MapViewParameterService;
}());
exports.MapViewParameterService = MapViewParameterService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsibWFwLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFFM0MsMENBQXlDO0FBR3pDO0lBQ0UsaUNBQW9CLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFFeEMsQ0FBQztnQ0FIVSx1QkFBdUI7SUFPbEMseUNBQU8sR0FBUDtRQUNFLElBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDO1lBQ2pCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxJQUFHLElBQUksQ0FBQyxNQUFNLEdBQUMseUJBQXVCLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBQztZQUMzRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtRQUNELElBQUksTUFBTSxHQUFPLEVBQUUsQ0FBQztRQUNwQix5QkFBdUIsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRyxPQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUF0QixDQUFzQixDQUFDLENBQUM7UUFDOUUsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELHdDQUFNLEdBQU4sVUFBTyxPQUFXO1FBQ2hCLElBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELG1EQUFpQixHQUFqQixVQUFrQixLQUFTOztRQUN6QixJQUFJLE1BQU0sR0FBTyxFQUFFLENBQUM7O1lBQ3BCLEtBQWdCLElBQUEsS0FBQSxTQUFBLHlCQUF1QixDQUFDLGNBQWMsQ0FBQSxnQkFBQSw0QkFBQztnQkFBbkQsSUFBSSxNQUFJLFdBQUE7Z0JBQ1IsTUFBTSxDQUFDLE1BQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQUksQ0FBQyxDQUFDO2FBQzlDOzs7Ozs7Ozs7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQUEsQ0FBQztJQUVGLGdEQUFjLEdBQWQsVUFBZSxVQUFjO1FBQzNCLE9BQU8seUJBQXVCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBRSxPQUFBLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBRSxHQUFHLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVELDZDQUFXLEdBQVgsV0FBWSxpQkFBaUI7O1FBQzNCLElBQUksTUFBTSxHQUFjLEVBQUUsQ0FBQztRQUMzQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztZQUN0QixtREFBbUQ7WUFDL0MsS0FBZ0IsSUFBQSxLQUFBLFNBQUEseUJBQXVCLENBQUMsY0FBYyxDQUFBLGdCQUFBLDRCQUFDO2dCQUFuRCxJQUFJLE1BQUksV0FBQTtnQkFDVixJQUFJLElBQUksTUFBSSxNQUFNLENBQUM7Z0JBQ3pCLHdEQUF3RDtnQkFDbEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckIsSUFBSSxJQUFJLEdBQUcsQ0FBQzthQUNiOzs7Ozs7Ozs7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7Z0JBdEQrQixpQkFBUTs7SUFJakMsc0NBQWMsR0FBaUIsRUFBRSxDQUFDO0lBTDlCLHVCQUF1QjtRQURuQyxpQkFBVSxFQUFFO3lDQUVxQixpQkFBUTtPQUQ3Qix1QkFBdUIsQ0F3RG5DO0lBQUQsOEJBQUM7Q0FBQSxBQXhERCxJQXdEQztBQXhEWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcFZpZXdQYXJhbWV0ZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9jYXRpb24/OiBMb2NhdGlvbikge1xuXG4gIH1cblxuICBzdGF0aWMgcGFyYW1ldGVyTmFtZXM6QXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gIGN1cnJlbnQoKTphbnl7XG4gICAgaWYoIXRoaXMuX2xvY2F0aW9uKXtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBsZXQgcGF0aCA9IHRoaXMuX2xvY2F0aW9uLnBhdGgoKS5zcGxpdCgnLycpO1xuICAgIGlmKHBhdGgubGVuZ3RoPk1hcFZpZXdQYXJhbWV0ZXJTZXJ2aWNlLnBhcmFtZXRlck5hbWVzLmxlbmd0aCl7XG4gICAgICBwYXRoLnNoaWZ0KCk7XG4gICAgfVxuICAgIGxldCByZXN1bHQ6YW55ID0ge307XG4gICAgTWFwVmlld1BhcmFtZXRlclNlcnZpY2UucGFyYW1ldGVyTmFtZXMuZm9yRWFjaCgocCxpKT0+cmVzdWx0W3BdPXBhdGhbaV18fCdfJyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHVwZGF0ZShjaGFuZ2VzOmFueSl7XG4gICAgaWYoIXRoaXMuX2xvY2F0aW9uKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgdXBkYXRlZCA9IHRoaXMuY3VycmVudCgpO1xuICAgIE9iamVjdC5hc3NpZ24odXBkYXRlZCxjaGFuZ2VzKTtcbiAgICB0aGlzLl9sb2NhdGlvbi5nbyh0aGlzLmNvbnN0cnVjdFJvdXRlKHVwZGF0ZWQpKTtcbiAgfVxuXG4gIHJldHJpZXZlRnJvbVJvdXRlKHJvdXRlOmFueSl7XG4gICAgbGV0IHJlc3VsdDphbnkgPSB7fTtcbiAgICBmb3IobGV0IG5hbWUgb2YgTWFwVmlld1BhcmFtZXRlclNlcnZpY2UucGFyYW1ldGVyTmFtZXMpe1xuICAgICAgICByZXN1bHRbbmFtZV0gPSByb3V0ZS5zbmFwc2hvdC5wYXJhbXNbbmFtZV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgY29uc3RydWN0Um91dGUocGFyYW1ldGVyczphbnkpe1xuICAgIHJldHVybiBNYXBWaWV3UGFyYW1ldGVyU2VydmljZS5wYXJhbWV0ZXJOYW1lcy5tYXAobj0+cGFyYW1ldGVyc1tuXXx8J18nKS5qb2luKCcvJyk7XG4gIH1cblxuICByb3V0ZXJQYXRocygvKmNvbXBvbmVudDphbnkqLyk6QXJyYXk8YW55PntcbiAgICBsZXQgcmVzdWx0OkFycmF5PGFueT4gPSBbXTtcbiAgICBsZXQgcGF0aCA9ICcnO1xuICAgIHJlc3VsdC5wdXNoKHBhdGgpO1xuLy8gICAgcmVzdWx0LnB1c2goe3BhdGg6cGF0aCxjb21wb25lbnQ6Y29tcG9uZW50fSk7XG4gICAgZm9yKGxldCBuYW1lIG9mIE1hcFZpZXdQYXJhbWV0ZXJTZXJ2aWNlLnBhcmFtZXRlck5hbWVzKXtcbiAgICAgIHBhdGggKz0gYDoke25hbWV9YDtcbi8vICAgICAgcmVzdWx0LnVuc2hpZnQoe3BhdGg6cGF0aCxjb21wb25lbnQ6Y29tcG9uZW50fSk7XG4gICAgICByZXN1bHQudW5zaGlmdChwYXRoKTtcbiAgICAgIHBhdGggKz0gJy8nO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=