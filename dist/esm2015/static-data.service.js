import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { publishReplay, refCount } from 'rxjs/operators';
export class StaticDataService {
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
}
StaticDataService.ctorParameters = () => [
    { type: HttpClient }
];
StaticDataService.decorators = [
    { type: Injectable }
];
StaticDataService.ctorParameters = () => [
    { type: HttpClient }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsic3RhdGljLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3pELE1BQU0sT0FBTyxpQkFBaUI7SUFHNUIsWUFBb0IsSUFBZTtRQUFmLFNBQUksR0FBSixJQUFJLENBQVc7UUFGbkMsVUFBSyxHQUFnQyxFQUFFLENBQUM7SUFJeEMsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFnQixFQUFDLElBQVc7UUFDOUIsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDO1FBQy9CLElBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFDO1lBQ2xCLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUNwQixJQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxFQUFDO2dCQUMxQixTQUFTLElBQUksR0FBRyxDQUFDO2FBQ2xCO2lCQUFNO2dCQUNMLFNBQVMsSUFBSSxHQUFHLENBQUE7YUFDakI7WUFDRCxTQUFTLElBQUksUUFBUSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7WUFFNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQzdDLGFBQWEsRUFBRSxFQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDL0I7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7O1lBcEJ3QixVQUFVOzs7WUFKcEMsVUFBVTs7O1lBTEYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDYXRhbG9nSG9zdCB9IGZyb20gJy4vZGF0YS9jYXRhbG9nJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHB1Ymxpc2hSZXBsYXksIHJlZkNvdW50IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RhdGljRGF0YVNlcnZpY2Uge1xuICBjYWNoZTp7W2tleTpzdHJpbmddOk9ic2VydmFibGU8YW55Pn09e307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOkh0dHBDbGllbnQpIHtcblxuICB9XG5cbiAgZ2V0KGhvc3Q6Q2F0YWxvZ0hvc3QscGF0aDpzdHJpbmcpOk9ic2VydmFibGU8YW55PntcbiAgICB2YXIgdXJsID0gYCR7aG9zdC51cmx9JHtwYXRofWA7XG4gICAgaWYoIXRoaXMuY2FjaGVbdXJsXSl7XG4gICAgICBsZXQgdW5pcXVlVXJsID0gdXJsO1xuICAgICAgaWYodW5pcXVlVXJsLmluZGV4T2YoJz8nKTwwKXtcbiAgICAgICAgdW5pcXVlVXJsICs9ICc/JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVuaXF1ZVVybCArPSAnJidcbiAgICAgIH1cbiAgICAgIHVuaXF1ZVVybCArPSBgdGltZT0ke25ldyBEYXRlKCkuZ2V0VGltZSgpfWA7XG5cbiAgICAgIHRoaXMuY2FjaGVbdXJsXSA9IHRoaXMuaHR0cC5nZXQodW5pcXVlVXJsKS5waXBlKFxuICAgICAgICBwdWJsaXNoUmVwbGF5KCkscmVmQ291bnQoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2FjaGVbdXJsXTtcbiAgfVxufVxuIl19