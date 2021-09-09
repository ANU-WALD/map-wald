import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
export class MapViewParameterService {
    constructor(_location) {
        this._location = _location;
    }
    current() {
        if (!this._location) {
            return {};
        }
        let path = this._location.path().split('/');
        if (path.length > MapViewParameterService.parameterNames.length) {
            path.shift();
        }
        let result = {};
        MapViewParameterService.parameterNames.forEach((p, i) => result[p] = path[i] || '_');
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
        for (let name of MapViewParameterService.parameterNames) {
            result[name] = route.snapshot.params[name];
        }
        return result;
    }
    ;
    constructRoute(parameters) {
        return MapViewParameterService.parameterNames.map(n => parameters[n] || '_').join('/');
    }
    routerPaths( /*component:any*/) {
        let result = [];
        let path = '';
        result.push(path);
        //    result.push({path:path,component:component});
        for (let name of MapViewParameterService.parameterNames) {
            path += `:${name}`;
            //      result.unshift({path:path,component:component});
            result.unshift(path);
            path += '/';
        }
        return result;
    }
}
MapViewParameterService.parameterNames = [];
MapViewParameterService.decorators = [
    { type: Injectable }
];
MapViewParameterService.ctorParameters = () => [
    { type: Location }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYXAtdmlldy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBR3pDLE1BQU0sT0FBTyx1QkFBdUI7SUFDbEMsWUFBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUV4QyxDQUFDO0lBSUQsT0FBTztRQUNMLElBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDO1lBQ2pCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxJQUFHLElBQUksQ0FBQyxNQUFNLEdBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBQztZQUMzRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtRQUNELElBQUksTUFBTSxHQUFPLEVBQUUsQ0FBQztRQUNwQix1QkFBdUIsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUEsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5RSxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQVc7UUFDaEIsSUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUM7WUFDakIsT0FBTztTQUNSO1FBRUQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBUztRQUN6QixJQUFJLE1BQU0sR0FBTyxFQUFFLENBQUM7UUFDcEIsS0FBSSxJQUFJLElBQUksSUFBSSx1QkFBdUIsQ0FBQyxjQUFjLEVBQUM7WUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUFBLENBQUM7SUFFRixjQUFjLENBQUMsVUFBYztRQUMzQixPQUFPLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRCxXQUFXLEVBQUMsaUJBQWlCO1FBQzNCLElBQUksTUFBTSxHQUFjLEVBQUUsQ0FBQztRQUMzQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLG1EQUFtRDtRQUMvQyxLQUFJLElBQUksSUFBSSxJQUFJLHVCQUF1QixDQUFDLGNBQWMsRUFBQztZQUNyRCxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN6Qix3REFBd0Q7WUFDbEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixJQUFJLElBQUksR0FBRyxDQUFDO1NBQ2I7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOztBQWxETSxzQ0FBYyxHQUFpQixFQUFFLENBQUM7O1lBTjFDLFVBQVU7OztZQUZILFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcFZpZXdQYXJhbWV0ZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9jYXRpb24/OiBMb2NhdGlvbikge1xuXG4gIH1cblxuICBzdGF0aWMgcGFyYW1ldGVyTmFtZXM6QXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gIGN1cnJlbnQoKTphbnl7XG4gICAgaWYoIXRoaXMuX2xvY2F0aW9uKXtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBsZXQgcGF0aCA9IHRoaXMuX2xvY2F0aW9uLnBhdGgoKS5zcGxpdCgnLycpO1xuICAgIGlmKHBhdGgubGVuZ3RoPk1hcFZpZXdQYXJhbWV0ZXJTZXJ2aWNlLnBhcmFtZXRlck5hbWVzLmxlbmd0aCl7XG4gICAgICBwYXRoLnNoaWZ0KCk7XG4gICAgfVxuICAgIGxldCByZXN1bHQ6YW55ID0ge307XG4gICAgTWFwVmlld1BhcmFtZXRlclNlcnZpY2UucGFyYW1ldGVyTmFtZXMuZm9yRWFjaCgocCxpKT0+cmVzdWx0W3BdPXBhdGhbaV18fCdfJyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHVwZGF0ZShjaGFuZ2VzOmFueSl7XG4gICAgaWYoIXRoaXMuX2xvY2F0aW9uKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgdXBkYXRlZCA9IHRoaXMuY3VycmVudCgpO1xuICAgIE9iamVjdC5hc3NpZ24odXBkYXRlZCxjaGFuZ2VzKTtcbiAgICB0aGlzLl9sb2NhdGlvbi5nbyh0aGlzLmNvbnN0cnVjdFJvdXRlKHVwZGF0ZWQpKTtcbiAgfVxuXG4gIHJldHJpZXZlRnJvbVJvdXRlKHJvdXRlOmFueSl7XG4gICAgbGV0IHJlc3VsdDphbnkgPSB7fTtcbiAgICBmb3IobGV0IG5hbWUgb2YgTWFwVmlld1BhcmFtZXRlclNlcnZpY2UucGFyYW1ldGVyTmFtZXMpe1xuICAgICAgICByZXN1bHRbbmFtZV0gPSByb3V0ZS5zbmFwc2hvdC5wYXJhbXNbbmFtZV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgY29uc3RydWN0Um91dGUocGFyYW1ldGVyczphbnkpe1xuICAgIHJldHVybiBNYXBWaWV3UGFyYW1ldGVyU2VydmljZS5wYXJhbWV0ZXJOYW1lcy5tYXAobj0+cGFyYW1ldGVyc1tuXXx8J18nKS5qb2luKCcvJyk7XG4gIH1cblxuICByb3V0ZXJQYXRocygvKmNvbXBvbmVudDphbnkqLyk6QXJyYXk8YW55PntcbiAgICBsZXQgcmVzdWx0OkFycmF5PGFueT4gPSBbXTtcbiAgICBsZXQgcGF0aCA9ICcnO1xuICAgIHJlc3VsdC5wdXNoKHBhdGgpO1xuLy8gICAgcmVzdWx0LnB1c2goe3BhdGg6cGF0aCxjb21wb25lbnQ6Y29tcG9uZW50fSk7XG4gICAgZm9yKGxldCBuYW1lIG9mIE1hcFZpZXdQYXJhbWV0ZXJTZXJ2aWNlLnBhcmFtZXRlck5hbWVzKXtcbiAgICAgIHBhdGggKz0gYDoke25hbWV9YDtcbi8vICAgICAgcmVzdWx0LnVuc2hpZnQoe3BhdGg6cGF0aCxjb21wb25lbnQ6Y29tcG9uZW50fSk7XG4gICAgICByZXN1bHQudW5zaGlmdChwYXRoKTtcbiAgICAgIHBhdGggKz0gJy8nO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=