import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { publishReplay, refCount } from 'rxjs/operators';
let StaticDataService = class StaticDataService {
    constructor(http) {
        this.http = http;
        this.cache = {};
    }
    get(host, path) {
        var url = `${host.url}${path}`;
        if (!this.cache[url]) {
            let uniqueUrl = url;
            if (uniqueUrl.indexOf('?') < 0) {
                uniqueUrl += '?';
            }
            else {
                uniqueUrl += '&';
            }
            uniqueUrl += `time=${new Date().getTime()}`;
            this.cache[url] = this.http.get(uniqueUrl).pipe(publishReplay(), refCount());
        }
        return this.cache[url];
    }
};
StaticDataService.ctorParameters = () => [
    { type: HttpClient }
];
StaticDataService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], StaticDataService);
export { StaticDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsic3RhdGljLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd6RCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUc1QixZQUFvQixJQUFlO1FBQWYsU0FBSSxHQUFKLElBQUksQ0FBVztRQUZuQyxVQUFLLEdBQWdDLEVBQUUsQ0FBQztJQUl4QyxDQUFDO0lBRUQsR0FBRyxDQUFDLElBQWdCLEVBQUMsSUFBVztRQUM5QixJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUM7WUFDbEIsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDO1lBQ3BCLElBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLEVBQUM7Z0JBQzFCLFNBQVMsSUFBSSxHQUFHLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0wsU0FBUyxJQUFJLEdBQUcsQ0FBQTthQUNqQjtZQUNELFNBQVMsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztZQUU1QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FDN0MsYUFBYSxFQUFFLEVBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUMvQjtRQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0NBQ0YsQ0FBQTs7WUFyQjBCLFVBQVU7O0FBSHhCLGlCQUFpQjtJQUQ3QixVQUFVLEVBQUU7NkNBSWMsVUFBVTtHQUh4QixpQkFBaUIsQ0F3QjdCO1NBeEJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDYXRhbG9nSG9zdCB9IGZyb20gJy4vZGF0YS9jYXRhbG9nJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHB1Ymxpc2hSZXBsYXksIHJlZkNvdW50IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RhdGljRGF0YVNlcnZpY2Uge1xuICBjYWNoZTp7W2tleTpzdHJpbmddOk9ic2VydmFibGU8YW55Pn09e307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOkh0dHBDbGllbnQpIHtcblxuICB9XG5cbiAgZ2V0KGhvc3Q6Q2F0YWxvZ0hvc3QscGF0aDpzdHJpbmcpOk9ic2VydmFibGU8YW55PntcbiAgICB2YXIgdXJsID0gYCR7aG9zdC51cmx9JHtwYXRofWA7XG4gICAgaWYoIXRoaXMuY2FjaGVbdXJsXSl7XG4gICAgICBsZXQgdW5pcXVlVXJsID0gdXJsO1xuICAgICAgaWYodW5pcXVlVXJsLmluZGV4T2YoJz8nKTwwKXtcbiAgICAgICAgdW5pcXVlVXJsICs9ICc/JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVuaXF1ZVVybCArPSAnJidcbiAgICAgIH1cbiAgICAgIHVuaXF1ZVVybCArPSBgdGltZT0ke25ldyBEYXRlKCkuZ2V0VGltZSgpfWA7XG5cbiAgICAgIHRoaXMuY2FjaGVbdXJsXSA9IHRoaXMuaHR0cC5nZXQodW5pcXVlVXJsKS5waXBlKFxuICAgICAgICBwdWJsaXNoUmVwbGF5KCkscmVmQ291bnQoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2FjaGVbdXJsXTtcbiAgfVxufVxuIl19