import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { publishReplay, refCount } from 'rxjs/operators';
var StaticDataService = /** @class */ (function () {
    function StaticDataService(http) {
        this.http = http;
        this.cache = {};
    }
    StaticDataService.prototype.get = function (host, path) {
        var url = "" + host.url + path;
        if (!this.cache[url]) {
            var uniqueUrl = url;
            if (uniqueUrl.indexOf('?') < 0) {
                uniqueUrl += '?';
            }
            else {
                uniqueUrl += '&';
            }
            uniqueUrl += "time=" + new Date().getTime();
            this.cache[url] = this.http.get(uniqueUrl).pipe(publishReplay(), refCount());
        }
        return this.cache[url];
    };
    StaticDataService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    StaticDataService = tslib_1.__decorate([
        Injectable()
    ], StaticDataService);
    return StaticDataService;
}());
export { StaticDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsic3RhdGljLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd6RDtJQUdFLDJCQUFvQixJQUFlO1FBQWYsU0FBSSxHQUFKLElBQUksQ0FBVztRQUZuQyxVQUFLLEdBQWdDLEVBQUUsQ0FBQztJQUl4QyxDQUFDO0lBRUQsK0JBQUcsR0FBSCxVQUFJLElBQWdCLEVBQUMsSUFBVztRQUM5QixJQUFJLEdBQUcsR0FBRyxLQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBTSxDQUFDO1FBQy9CLElBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFDO1lBQ2xCLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUNwQixJQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxFQUFDO2dCQUMxQixTQUFTLElBQUksR0FBRyxDQUFDO2FBQ2xCO2lCQUFNO2dCQUNMLFNBQVMsSUFBSSxHQUFHLENBQUE7YUFDakI7WUFDRCxTQUFTLElBQUksVUFBUSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBSSxDQUFDO1lBRTVDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUM3QyxhQUFhLEVBQUUsRUFBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQy9CO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7O2dCQXBCd0IsVUFBVTs7SUFIeEIsaUJBQWlCO1FBRDdCLFVBQVUsRUFBRTtPQUNBLGlCQUFpQixDQXdCN0I7SUFBRCx3QkFBQztDQUFBLEFBeEJELElBd0JDO1NBeEJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDYXRhbG9nSG9zdCB9IGZyb20gJy4vZGF0YS9jYXRhbG9nJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHB1Ymxpc2hSZXBsYXksIHJlZkNvdW50IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RhdGljRGF0YVNlcnZpY2Uge1xuICBjYWNoZTp7W2tleTpzdHJpbmddOk9ic2VydmFibGU8YW55Pn09e307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOkh0dHBDbGllbnQpIHtcblxuICB9XG5cbiAgZ2V0KGhvc3Q6Q2F0YWxvZ0hvc3QscGF0aDpzdHJpbmcpOk9ic2VydmFibGU8YW55PntcbiAgICB2YXIgdXJsID0gYCR7aG9zdC51cmx9JHtwYXRofWA7XG4gICAgaWYoIXRoaXMuY2FjaGVbdXJsXSl7XG4gICAgICBsZXQgdW5pcXVlVXJsID0gdXJsO1xuICAgICAgaWYodW5pcXVlVXJsLmluZGV4T2YoJz8nKTwwKXtcbiAgICAgICAgdW5pcXVlVXJsICs9ICc/JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVuaXF1ZVVybCArPSAnJidcbiAgICAgIH1cbiAgICAgIHVuaXF1ZVVybCArPSBgdGltZT0ke25ldyBEYXRlKCkuZ2V0VGltZSgpfWA7XG5cbiAgICAgIHRoaXMuY2FjaGVbdXJsXSA9IHRoaXMuaHR0cC5nZXQodW5pcXVlVXJsKS5waXBlKFxuICAgICAgICBwdWJsaXNoUmVwbGF5KCkscmVmQ291bnQoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2FjaGVbdXJsXTtcbiAgfVxufVxuIl19