import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
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
            for (var _b = tslib_1.__values(MapViewParameterService_1.parameterNames), _c = _b.next(); !_c.done; _c = _b.next()) {
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
            for (var _b = tslib_1.__values(MapViewParameterService_1.parameterNames), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        { type: Location }
    ]; };
    MapViewParameterService.parameterNames = [];
    MapViewParameterService = MapViewParameterService_1 = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Location])
    ], MapViewParameterService);
    return MapViewParameterService;
}());
export { MapViewParameterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsibWFwLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFHekM7SUFDRSxpQ0FBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUV4QyxDQUFDO2dDQUhVLHVCQUF1QjtJQU9sQyx5Q0FBTyxHQUFQO1FBQ0UsSUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUM7WUFDakIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLElBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyx5QkFBdUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFDO1lBQzNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO1FBQ0QsSUFBSSxNQUFNLEdBQU8sRUFBRSxDQUFDO1FBQ3BCLHlCQUF1QixDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUMsQ0FBQyxJQUFHLE9BQUEsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRSxHQUFHLEVBQXRCLENBQXNCLENBQUMsQ0FBQztRQUM5RSxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsd0NBQU0sR0FBTixVQUFPLE9BQVc7UUFDaEIsSUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUM7WUFDakIsT0FBTztTQUNSO1FBRUQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsbURBQWlCLEdBQWpCLFVBQWtCLEtBQVM7O1FBQ3pCLElBQUksTUFBTSxHQUFPLEVBQUUsQ0FBQzs7WUFDcEIsS0FBZ0IsSUFBQSxLQUFBLGlCQUFBLHlCQUF1QixDQUFDLGNBQWMsQ0FBQSxnQkFBQSw0QkFBQztnQkFBbkQsSUFBSSxNQUFJLFdBQUE7Z0JBQ1IsTUFBTSxDQUFDLE1BQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQUksQ0FBQyxDQUFDO2FBQzlDOzs7Ozs7Ozs7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQUEsQ0FBQztJQUVGLGdEQUFjLEdBQWQsVUFBZSxVQUFjO1FBQzNCLE9BQU8seUJBQXVCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBRSxPQUFBLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBRSxHQUFHLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVELDZDQUFXLEdBQVgsV0FBWSxpQkFBaUI7O1FBQzNCLElBQUksTUFBTSxHQUFjLEVBQUUsQ0FBQztRQUMzQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztZQUN0QixtREFBbUQ7WUFDL0MsS0FBZ0IsSUFBQSxLQUFBLGlCQUFBLHlCQUF1QixDQUFDLGNBQWMsQ0FBQSxnQkFBQSw0QkFBQztnQkFBbkQsSUFBSSxNQUFJLFdBQUE7Z0JBQ1YsSUFBSSxJQUFJLE1BQUksTUFBTSxDQUFDO2dCQUN6Qix3REFBd0Q7Z0JBQ2xELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JCLElBQUksSUFBSSxHQUFHLENBQUM7YUFDYjs7Ozs7Ozs7O1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7O2dCQXREK0IsUUFBUTs7SUFJakMsc0NBQWMsR0FBaUIsRUFBRSxDQUFDO0lBTDlCLHVCQUF1QjtRQURuQyxVQUFVLEVBQUU7aURBRXFCLFFBQVE7T0FEN0IsdUJBQXVCLENBd0RuQztJQUFELDhCQUFDO0NBQUEsQUF4REQsSUF3REM7U0F4RFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXBWaWV3UGFyYW1ldGVyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xvY2F0aW9uPzogTG9jYXRpb24pIHtcblxuICB9XG5cbiAgc3RhdGljIHBhcmFtZXRlck5hbWVzOkFycmF5PHN0cmluZz4gPSBbXTtcblxuICBjdXJyZW50KCk6YW55e1xuICAgIGlmKCF0aGlzLl9sb2NhdGlvbil7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgbGV0IHBhdGggPSB0aGlzLl9sb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKTtcbiAgICBpZihwYXRoLmxlbmd0aD5NYXBWaWV3UGFyYW1ldGVyU2VydmljZS5wYXJhbWV0ZXJOYW1lcy5sZW5ndGgpe1xuICAgICAgcGF0aC5zaGlmdCgpO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0OmFueSA9IHt9O1xuICAgIE1hcFZpZXdQYXJhbWV0ZXJTZXJ2aWNlLnBhcmFtZXRlck5hbWVzLmZvckVhY2goKHAsaSk9PnJlc3VsdFtwXT1wYXRoW2ldfHwnXycpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB1cGRhdGUoY2hhbmdlczphbnkpe1xuICAgIGlmKCF0aGlzLl9sb2NhdGlvbil7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHVwZGF0ZWQgPSB0aGlzLmN1cnJlbnQoKTtcbiAgICBPYmplY3QuYXNzaWduKHVwZGF0ZWQsY2hhbmdlcyk7XG4gICAgdGhpcy5fbG9jYXRpb24uZ28odGhpcy5jb25zdHJ1Y3RSb3V0ZSh1cGRhdGVkKSk7XG4gIH1cblxuICByZXRyaWV2ZUZyb21Sb3V0ZShyb3V0ZTphbnkpe1xuICAgIGxldCByZXN1bHQ6YW55ID0ge307XG4gICAgZm9yKGxldCBuYW1lIG9mIE1hcFZpZXdQYXJhbWV0ZXJTZXJ2aWNlLnBhcmFtZXRlck5hbWVzKXtcbiAgICAgICAgcmVzdWx0W25hbWVdID0gcm91dGUuc25hcHNob3QucGFyYW1zW25hbWVdO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIGNvbnN0cnVjdFJvdXRlKHBhcmFtZXRlcnM6YW55KXtcbiAgICByZXR1cm4gTWFwVmlld1BhcmFtZXRlclNlcnZpY2UucGFyYW1ldGVyTmFtZXMubWFwKG49PnBhcmFtZXRlcnNbbl18fCdfJykuam9pbignLycpO1xuICB9XG5cbiAgcm91dGVyUGF0aHMoLypjb21wb25lbnQ6YW55Ki8pOkFycmF5PGFueT57XG4gICAgbGV0IHJlc3VsdDpBcnJheTxhbnk+ID0gW107XG4gICAgbGV0IHBhdGggPSAnJztcbiAgICByZXN1bHQucHVzaChwYXRoKTtcbi8vICAgIHJlc3VsdC5wdXNoKHtwYXRoOnBhdGgsY29tcG9uZW50OmNvbXBvbmVudH0pO1xuICAgIGZvcihsZXQgbmFtZSBvZiBNYXBWaWV3UGFyYW1ldGVyU2VydmljZS5wYXJhbWV0ZXJOYW1lcyl7XG4gICAgICBwYXRoICs9IGA6JHtuYW1lfWA7XG4vLyAgICAgIHJlc3VsdC51bnNoaWZ0KHtwYXRoOnBhdGgsY29tcG9uZW50OmNvbXBvbmVudH0pO1xuICAgICAgcmVzdWx0LnVuc2hpZnQocGF0aCk7XG4gICAgICBwYXRoICs9ICcvJztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19