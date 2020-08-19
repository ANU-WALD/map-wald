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
    StaticDataService.decorators = [
        { type: Injectable }
    ];
    StaticDataService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return StaticDataService;
}());
export { StaticDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsic3RhdGljLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpEO0lBSUUsMkJBQW9CLElBQWU7UUFBZixTQUFJLEdBQUosSUFBSSxDQUFXO1FBRm5DLFVBQUssR0FBZ0MsRUFBRSxDQUFDO0lBSXhDLENBQUM7SUFFRCwrQkFBRyxHQUFILFVBQUksSUFBZ0IsRUFBQyxJQUFXO1FBQzlCLElBQUksR0FBRyxHQUFHLEtBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFNLENBQUM7UUFDL0IsSUFBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUM7WUFDbEIsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDO1lBQ3BCLElBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLEVBQUM7Z0JBQzFCLFNBQVMsSUFBSSxHQUFHLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0wsU0FBUyxJQUFJLEdBQUcsQ0FBQTthQUNqQjtZQUNELFNBQVMsSUFBSSxVQUFRLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFJLENBQUM7WUFFNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQzdDLGFBQWEsRUFBRSxFQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDL0I7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7Z0JBcEJ3QixVQUFVOzs7Z0JBSnBDLFVBQVU7OztnQkFMRixVQUFVOztJQThCbkIsd0JBQUM7Q0FBQSxBQXpCRCxJQXlCQztTQXhCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ2F0YWxvZ0hvc3QgfSBmcm9tICcuL2RhdGEvY2F0YWxvZyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBwdWJsaXNoUmVwbGF5LCByZWZDb3VudCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0YXRpY0RhdGFTZXJ2aWNlIHtcbiAgY2FjaGU6e1trZXk6c3RyaW5nXTpPYnNlcnZhYmxlPGFueT59PXt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDpIdHRwQ2xpZW50KSB7XG5cbiAgfVxuXG4gIGdldChob3N0OkNhdGFsb2dIb3N0LHBhdGg6c3RyaW5nKTpPYnNlcnZhYmxlPGFueT57XG4gICAgdmFyIHVybCA9IGAke2hvc3QudXJsfSR7cGF0aH1gO1xuICAgIGlmKCF0aGlzLmNhY2hlW3VybF0pe1xuICAgICAgbGV0IHVuaXF1ZVVybCA9IHVybDtcbiAgICAgIGlmKHVuaXF1ZVVybC5pbmRleE9mKCc/Jyk8MCl7XG4gICAgICAgIHVuaXF1ZVVybCArPSAnPyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1bmlxdWVVcmwgKz0gJyYnXG4gICAgICB9XG4gICAgICB1bmlxdWVVcmwgKz0gYHRpbWU9JHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1gO1xuXG4gICAgICB0aGlzLmNhY2hlW3VybF0gPSB0aGlzLmh0dHAuZ2V0KHVuaXF1ZVVybCkucGlwZShcbiAgICAgICAgcHVibGlzaFJlcGxheSgpLHJlZkNvdW50KCkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNhY2hlW3VybF07XG4gIH1cbn1cbiJdfQ==