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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const operators_1 = require("rxjs/operators");
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
            this.cache[url] = this.http.get(uniqueUrl).pipe(operators_1.publishReplay(), operators_1.refCount());
        }
        return this.cache[url];
    }
};
StaticDataService.ctorParameters = () => [
    { type: http_1.HttpClient }
];
StaticDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], StaticDataService);
exports.StaticDataService = StaticDataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsic3RhdGljLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQywrQ0FBa0Q7QUFHbEQsOENBQXlEO0FBR3pELElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBRzVCLFlBQW9CLElBQWU7UUFBZixTQUFJLEdBQUosSUFBSSxDQUFXO1FBRm5DLFVBQUssR0FBZ0MsRUFBRSxDQUFDO0lBSXhDLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBZ0IsRUFBQyxJQUFXO1FBQzlCLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUMvQixJQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQztZQUNsQixJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUM7WUFDcEIsSUFBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsRUFBQztnQkFDMUIsU0FBUyxJQUFJLEdBQUcsQ0FBQzthQUNsQjtpQkFBTTtnQkFDTCxTQUFTLElBQUksR0FBRyxDQUFBO2FBQ2pCO1lBQ0QsU0FBUyxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBRTVDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUM3Qyx5QkFBYSxFQUFFLEVBQUMsb0JBQVEsRUFBRSxDQUFDLENBQUM7U0FDL0I7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztDQUNGLENBQUE7O1lBckIwQixpQkFBVTs7QUFIeEIsaUJBQWlCO0lBRDdCLGlCQUFVLEVBQUU7cUNBSWMsaUJBQVU7R0FIeEIsaUJBQWlCLENBd0I3QjtBQXhCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ2F0YWxvZ0hvc3QgfSBmcm9tICcuL2RhdGEvY2F0YWxvZyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBwdWJsaXNoUmVwbGF5LCByZWZDb3VudCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0YXRpY0RhdGFTZXJ2aWNlIHtcbiAgY2FjaGU6e1trZXk6c3RyaW5nXTpPYnNlcnZhYmxlPGFueT59PXt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDpIdHRwQ2xpZW50KSB7XG5cbiAgfVxuXG4gIGdldChob3N0OkNhdGFsb2dIb3N0LHBhdGg6c3RyaW5nKTpPYnNlcnZhYmxlPGFueT57XG4gICAgdmFyIHVybCA9IGAke2hvc3QudXJsfSR7cGF0aH1gO1xuICAgIGlmKCF0aGlzLmNhY2hlW3VybF0pe1xuICAgICAgbGV0IHVuaXF1ZVVybCA9IHVybDtcbiAgICAgIGlmKHVuaXF1ZVVybC5pbmRleE9mKCc/Jyk8MCl7XG4gICAgICAgIHVuaXF1ZVVybCArPSAnPyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1bmlxdWVVcmwgKz0gJyYnXG4gICAgICB9XG4gICAgICB1bmlxdWVVcmwgKz0gYHRpbWU9JHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1gO1xuXG4gICAgICB0aGlzLmNhY2hlW3VybF0gPSB0aGlzLmh0dHAuZ2V0KHVuaXF1ZVVybCkucGlwZShcbiAgICAgICAgcHVibGlzaFJlcGxheSgpLHJlZkNvdW50KCkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNhY2hlW3VybF07XG4gIH1cbn1cbiJdfQ==