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
var MapViewParameterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
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
    { type: common_1.Location }
];
MapViewParameterService.parameterNames = [];
MapViewParameterService = MapViewParameterService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [common_1.Location])
], MapViewParameterService);
exports.MapViewParameterService = MapViewParameterService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsibWFwLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFFM0MsNENBQXlDO0FBR3pDLElBQWEsdUJBQXVCLCtCQUFwQyxNQUFhLHVCQUF1QjtJQUNsQyxZQUFvQixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO0lBRXhDLENBQUM7SUFJRCxPQUFPO1FBQ0wsSUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUM7WUFDakIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLElBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyx5QkFBdUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFDO1lBQzNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO1FBQ0QsSUFBSSxNQUFNLEdBQU8sRUFBRSxDQUFDO1FBQ3BCLHlCQUF1QixDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlFLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBVztRQUNoQixJQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQztZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFTO1FBQ3pCLElBQUksTUFBTSxHQUFPLEVBQUUsQ0FBQztRQUNwQixLQUFJLElBQUksSUFBSSxJQUFJLHlCQUF1QixDQUFDLGNBQWMsRUFBQztZQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQUEsQ0FBQztJQUVGLGNBQWMsQ0FBQyxVQUFjO1FBQzNCLE9BQU8seUJBQXVCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVELFdBQVcsRUFBQyxpQkFBaUI7UUFDM0IsSUFBSSxNQUFNLEdBQWMsRUFBRSxDQUFDO1FBQzNCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsbURBQW1EO1FBQy9DLEtBQUksSUFBSSxJQUFJLElBQUkseUJBQXVCLENBQUMsY0FBYyxFQUFDO1lBQ3JELElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3pCLHdEQUF3RDtZQUNsRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLElBQUksSUFBSSxHQUFHLENBQUM7U0FDYjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRixDQUFBOztZQXZEaUMsaUJBQVE7O0FBSWpDLHNDQUFjLEdBQWlCLEVBQUUsQ0FBQztBQUw5Qix1QkFBdUI7SUFEbkMsaUJBQVUsRUFBRTtxQ0FFcUIsaUJBQVE7R0FEN0IsdUJBQXVCLENBd0RuQztBQXhEWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcFZpZXdQYXJhbWV0ZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9jYXRpb24/OiBMb2NhdGlvbikge1xuXG4gIH1cblxuICBzdGF0aWMgcGFyYW1ldGVyTmFtZXM6QXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gIGN1cnJlbnQoKTphbnl7XG4gICAgaWYoIXRoaXMuX2xvY2F0aW9uKXtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBsZXQgcGF0aCA9IHRoaXMuX2xvY2F0aW9uLnBhdGgoKS5zcGxpdCgnLycpO1xuICAgIGlmKHBhdGgubGVuZ3RoPk1hcFZpZXdQYXJhbWV0ZXJTZXJ2aWNlLnBhcmFtZXRlck5hbWVzLmxlbmd0aCl7XG4gICAgICBwYXRoLnNoaWZ0KCk7XG4gICAgfVxuICAgIGxldCByZXN1bHQ6YW55ID0ge307XG4gICAgTWFwVmlld1BhcmFtZXRlclNlcnZpY2UucGFyYW1ldGVyTmFtZXMuZm9yRWFjaCgocCxpKT0+cmVzdWx0W3BdPXBhdGhbaV18fCdfJyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHVwZGF0ZShjaGFuZ2VzOmFueSl7XG4gICAgaWYoIXRoaXMuX2xvY2F0aW9uKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgdXBkYXRlZCA9IHRoaXMuY3VycmVudCgpO1xuICAgIE9iamVjdC5hc3NpZ24odXBkYXRlZCxjaGFuZ2VzKTtcbiAgICB0aGlzLl9sb2NhdGlvbi5nbyh0aGlzLmNvbnN0cnVjdFJvdXRlKHVwZGF0ZWQpKTtcbiAgfVxuXG4gIHJldHJpZXZlRnJvbVJvdXRlKHJvdXRlOmFueSl7XG4gICAgbGV0IHJlc3VsdDphbnkgPSB7fTtcbiAgICBmb3IobGV0IG5hbWUgb2YgTWFwVmlld1BhcmFtZXRlclNlcnZpY2UucGFyYW1ldGVyTmFtZXMpe1xuICAgICAgICByZXN1bHRbbmFtZV0gPSByb3V0ZS5zbmFwc2hvdC5wYXJhbXNbbmFtZV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgY29uc3RydWN0Um91dGUocGFyYW1ldGVyczphbnkpe1xuICAgIHJldHVybiBNYXBWaWV3UGFyYW1ldGVyU2VydmljZS5wYXJhbWV0ZXJOYW1lcy5tYXAobj0+cGFyYW1ldGVyc1tuXXx8J18nKS5qb2luKCcvJyk7XG4gIH1cblxuICByb3V0ZXJQYXRocygvKmNvbXBvbmVudDphbnkqLyk6QXJyYXk8YW55PntcbiAgICBsZXQgcmVzdWx0OkFycmF5PGFueT4gPSBbXTtcbiAgICBsZXQgcGF0aCA9ICcnO1xuICAgIHJlc3VsdC5wdXNoKHBhdGgpO1xuLy8gICAgcmVzdWx0LnB1c2goe3BhdGg6cGF0aCxjb21wb25lbnQ6Y29tcG9uZW50fSk7XG4gICAgZm9yKGxldCBuYW1lIG9mIE1hcFZpZXdQYXJhbWV0ZXJTZXJ2aWNlLnBhcmFtZXRlck5hbWVzKXtcbiAgICAgIHBhdGggKz0gYDoke25hbWV9YDtcbi8vICAgICAgcmVzdWx0LnVuc2hpZnQoe3BhdGg6cGF0aCxjb21wb25lbnQ6Y29tcG9uZW50fSk7XG4gICAgICByZXN1bHQudW5zaGlmdChwYXRoKTtcbiAgICAgIHBhdGggKz0gJy8nO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=