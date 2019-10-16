var MapViewParameterService_1;
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
let MapViewParameterService = MapViewParameterService_1 = class MapViewParameterService {
    constructor(_location) {
        this._location = _location;
    }
    current() {
        if (!this._location) {
            return {};
        }
        let path = this._location.path().split('/');
        if (path.length > MapViewParameterService_1.parameterNames.length) {
            path.shift();
        }
        let result = {};
        MapViewParameterService_1.parameterNames.forEach((p, i) => result[p] = path[i] || '_');
        return result;
    }
    update(changes) {
        if (!this._location) {
            return;
        }
        let updated = this.current();
        Object.assign(updated, changes);
        this._location.go(this.constructRoute(updated));
    }
    retrieveFromRoute(route) {
        let result = {};
        for (let name of MapViewParameterService_1.parameterNames) {
            result[name] = route.snapshot.params[name];
        }
        return result;
    }
    ;
    constructRoute(parameters) {
        return MapViewParameterService_1.parameterNames.map(n => parameters[n] || '_').join('/');
    }
    routerPaths( /*component:any*/) {
        let result = [];
        let path = '';
        result.push(path);
        //    result.push({path:path,component:component});
        for (let name of MapViewParameterService_1.parameterNames) {
            path += `:${name}`;
            //      result.unshift({path:path,component:component});
            result.unshift(path);
            path += '/';
        }
        return result;
    }
};
MapViewParameterService.ctorParameters = () => [
    { type: Location }
];
MapViewParameterService.parameterNames = [];
MapViewParameterService = MapViewParameterService_1 = tslib_1.__decorate([
    Injectable()
], MapViewParameterService);
export { MapViewParameterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsibWFwLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBR3pDLElBQWEsdUJBQXVCLCtCQUFwQyxNQUFhLHVCQUF1QjtJQUNsQyxZQUFvQixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO0lBRXhDLENBQUM7SUFJRCxPQUFPO1FBQ0wsSUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUM7WUFDakIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLElBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyx5QkFBdUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFDO1lBQzNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO1FBQ0QsSUFBSSxNQUFNLEdBQU8sRUFBRSxDQUFDO1FBQ3BCLHlCQUF1QixDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlFLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBVztRQUNoQixJQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQztZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFTO1FBQ3pCLElBQUksTUFBTSxHQUFPLEVBQUUsQ0FBQztRQUNwQixLQUFJLElBQUksSUFBSSxJQUFJLHlCQUF1QixDQUFDLGNBQWMsRUFBQztZQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQUEsQ0FBQztJQUVGLGNBQWMsQ0FBQyxVQUFjO1FBQzNCLE9BQU8seUJBQXVCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVELFdBQVcsRUFBQyxpQkFBaUI7UUFDM0IsSUFBSSxNQUFNLEdBQWMsRUFBRSxDQUFDO1FBQzNCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsbURBQW1EO1FBQy9DLEtBQUksSUFBSSxJQUFJLElBQUkseUJBQXVCLENBQUMsY0FBYyxFQUFDO1lBQ3JELElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3pCLHdEQUF3RDtZQUNsRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLElBQUksSUFBSSxHQUFHLENBQUM7U0FDYjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRixDQUFBOztZQXZEaUMsUUFBUTs7QUFJakMsc0NBQWMsR0FBaUIsRUFBRSxDQUFDO0FBTDlCLHVCQUF1QjtJQURuQyxVQUFVLEVBQUU7R0FDQSx1QkFBdUIsQ0F3RG5DO1NBeERZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFwVmlld1BhcmFtZXRlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sb2NhdGlvbj86IExvY2F0aW9uKSB7XG5cbiAgfVxuXG4gIHN0YXRpYyBwYXJhbWV0ZXJOYW1lczpBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgY3VycmVudCgpOmFueXtcbiAgICBpZighdGhpcy5fbG9jYXRpb24pe1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIGxldCBwYXRoID0gdGhpcy5fbG9jYXRpb24ucGF0aCgpLnNwbGl0KCcvJyk7XG4gICAgaWYocGF0aC5sZW5ndGg+TWFwVmlld1BhcmFtZXRlclNlcnZpY2UucGFyYW1ldGVyTmFtZXMubGVuZ3RoKXtcbiAgICAgIHBhdGguc2hpZnQoKTtcbiAgICB9XG4gICAgbGV0IHJlc3VsdDphbnkgPSB7fTtcbiAgICBNYXBWaWV3UGFyYW1ldGVyU2VydmljZS5wYXJhbWV0ZXJOYW1lcy5mb3JFYWNoKChwLGkpPT5yZXN1bHRbcF09cGF0aFtpXXx8J18nKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdXBkYXRlKGNoYW5nZXM6YW55KXtcbiAgICBpZighdGhpcy5fbG9jYXRpb24pe1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB1cGRhdGVkID0gdGhpcy5jdXJyZW50KCk7XG4gICAgT2JqZWN0LmFzc2lnbih1cGRhdGVkLGNoYW5nZXMpO1xuICAgIHRoaXMuX2xvY2F0aW9uLmdvKHRoaXMuY29uc3RydWN0Um91dGUodXBkYXRlZCkpO1xuICB9XG5cbiAgcmV0cmlldmVGcm9tUm91dGUocm91dGU6YW55KXtcbiAgICBsZXQgcmVzdWx0OmFueSA9IHt9O1xuICAgIGZvcihsZXQgbmFtZSBvZiBNYXBWaWV3UGFyYW1ldGVyU2VydmljZS5wYXJhbWV0ZXJOYW1lcyl7XG4gICAgICAgIHJlc3VsdFtuYW1lXSA9IHJvdXRlLnNuYXBzaG90LnBhcmFtc1tuYW1lXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBjb25zdHJ1Y3RSb3V0ZShwYXJhbWV0ZXJzOmFueSl7XG4gICAgcmV0dXJuIE1hcFZpZXdQYXJhbWV0ZXJTZXJ2aWNlLnBhcmFtZXRlck5hbWVzLm1hcChuPT5wYXJhbWV0ZXJzW25dfHwnXycpLmpvaW4oJy8nKTtcbiAgfVxuXG4gIHJvdXRlclBhdGhzKC8qY29tcG9uZW50OmFueSovKTpBcnJheTxhbnk+e1xuICAgIGxldCByZXN1bHQ6QXJyYXk8YW55PiA9IFtdO1xuICAgIGxldCBwYXRoID0gJyc7XG4gICAgcmVzdWx0LnB1c2gocGF0aCk7XG4vLyAgICByZXN1bHQucHVzaCh7cGF0aDpwYXRoLGNvbXBvbmVudDpjb21wb25lbnR9KTtcbiAgICBmb3IobGV0IG5hbWUgb2YgTWFwVmlld1BhcmFtZXRlclNlcnZpY2UucGFyYW1ldGVyTmFtZXMpe1xuICAgICAgcGF0aCArPSBgOiR7bmFtZX1gO1xuLy8gICAgICByZXN1bHQudW5zaGlmdCh7cGF0aDpwYXRoLGNvbXBvbmVudDpjb21wb25lbnR9KTtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KHBhdGgpO1xuICAgICAgcGF0aCArPSAnLyc7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==