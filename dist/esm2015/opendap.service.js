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
const dap_query_1 = require("dap-query-js/dist/dap-query");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
let OpendapService = class OpendapService {
    constructor(http) {
        this.http = http;
    }
    makeURL(host, filepath) {
        return host.url + '/dodsC/' + filepath;
    }
    get(url) {
        return this.http.get(url, { responseType: 'text' });
    }
    getData(queryUrl, das) {
        return this.get(queryUrl).pipe(operators_1.map((txt) => dap_query_1.simplify(dap_query_1.parseData(txt, das))));
    }
    getDAS(url) {
        return this.get(url + '.das').pipe(operators_1.map(dap_query_1.parseDAS));
    }
    getDDX(url) {
        return this.get(url + '.ddx').pipe(operators_1.map(dap_query_1.parseDDX));
    }
    getExtent(url) {
        console.log(url);
        return rxjs_1.forkJoin([
            this.getDAS(url),
            this.getDDX(url)
        ]).pipe(operators_1.switchMap(([theDAS, theDDX]) => {
            var das = theDAS;
            return rxjs_1.forkJoin([
                this.getData(url + '.ascii?latitude', das),
                this.getData(url + '.ascii?longitude', das)
            ]);
        }), operators_1.map((ll) => {
            var lats = ll[0].latitude;
            var lons = ll[1].longitude;
            return [lats[0], lats[lats.length - 1],
                lons[0], lons[lons.length - 1]];
        }));
    }
    dapRangeQuery(from, to, step) {
        step = step || 1;
        if (to === undefined) {
            to = from;
        }
        return '[' + from + ':' + step + ':' + to + ']';
    }
};
OpendapService.ctorParameters = () => [
    { type: http_1.HttpClient }
];
OpendapService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], OpendapService);
exports.OpendapService = OpendapService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlbmRhcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJvcGVuZGFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFDM0MsK0NBQWtEO0FBQ2xELDJEQUMrRjtBQUUvRiw4Q0FBZ0Q7QUFDaEQsK0JBQTJDO0FBRzNDLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFFekIsWUFBb0IsSUFBZTtRQUFmLFNBQUksR0FBSixJQUFJLENBQVc7SUFFbkMsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFnQixFQUFDLFFBQWU7UUFDdEMsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDekMsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0lBRUQsT0FBTyxDQUFDLFFBQWUsRUFBQyxHQUFVO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQzVCLGVBQUcsQ0FBQyxDQUFDLEdBQVUsRUFBQyxFQUFFLENBQUEsb0JBQVEsQ0FBQyxxQkFBUyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDOUIsZUFBRyxDQUFDLG9CQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUM5QixlQUFHLENBQUMsb0JBQVEsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUFVO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBTyxlQUFRLENBQUM7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsRUFBQyxFQUFFO1lBQ25DLElBQUksR0FBRyxHQUFrQixNQUFNLENBQUM7WUFDaEMsT0FBTyxlQUFRLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUMsaUJBQWlCLEVBQUMsR0FBRyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBQyxrQkFBa0IsRUFBQyxHQUFHLENBQUM7YUFDekMsQ0FBQyxDQUFBO1FBQUEsQ0FBQyxDQUFDLEVBQ0osZUFBRyxDQUFDLENBQUMsRUFBWSxFQUFDLEVBQUU7WUFDbEIsSUFBSSxJQUFJLEdBQXlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDaEQsSUFBSSxJQUFJLEdBQXlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDakQsT0FBTyxDQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQsYUFBYSxDQUFDLElBQVcsRUFBQyxFQUFVLEVBQUMsSUFBWTtRQUMvQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUNqQixJQUFHLEVBQUUsS0FBRyxTQUFTLEVBQUM7WUFDaEIsRUFBRSxHQUFHLElBQUksQ0FBQztTQUNYO1FBQ0QsT0FBTyxHQUFHLEdBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxJQUFJLEdBQUMsR0FBRyxHQUFDLEVBQUUsR0FBQyxHQUFHLENBQUM7SUFDdEMsQ0FBQztDQUNGLENBQUE7O1lBckQwQixpQkFBVTs7QUFGeEIsY0FBYztJQUQxQixpQkFBVSxFQUFFO3FDQUdjLGlCQUFVO0dBRnhCLGNBQWMsQ0F1RDFCO0FBdkRZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IHBhcnNlRGF0YSwgcGFyc2VEQVMscGFyc2VERFgsXG4gIHNpbXBsaWZ5LCBEYXBEYXRhLCBEYXBEQVMsIERhcEREWCwgRGFwVmFyaWFibGVEYXRhQXJyYXkgfSBmcm9tICdkYXAtcXVlcnktanMvZGlzdC9kYXAtcXVlcnknO1xuaW1wb3J0IHsgQ2F0YWxvZ0hvc3QgfSBmcm9tICcuL2RhdGEvY2F0YWxvZyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUsZm9ya0pvaW4gfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9wZW5kYXBTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6SHR0cENsaWVudCkge1xuXG4gIH1cblxuICBtYWtlVVJMKGhvc3Q6Q2F0YWxvZ0hvc3QsZmlsZXBhdGg6c3RyaW5nKTpzdHJpbmd7XG4gICAgcmV0dXJuIGhvc3QudXJsICsgJy9kb2RzQy8nICsgZmlsZXBhdGg7XG4gIH1cblxuICBnZXQodXJsOnN0cmluZyk6T2JzZXJ2YWJsZTxzdHJpbmc+e1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCx7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXG4gIH1cblxuICBnZXREYXRhKHF1ZXJ5VXJsOnN0cmluZyxkYXM6RGFwREFTKTpPYnNlcnZhYmxlPERhcERhdGE+e1xuICAgIHJldHVybiB0aGlzLmdldChxdWVyeVVybCkucGlwZShcbiAgICAgIG1hcCgodHh0OnN0cmluZyk9PnNpbXBsaWZ5KHBhcnNlRGF0YSh0eHQsZGFzKSkpKTtcbiAgfVxuXG4gIGdldERBUyh1cmw6c3RyaW5nKTpPYnNlcnZhYmxlPERhcERBUz57XG4gICAgcmV0dXJuIHRoaXMuZ2V0KHVybCsnLmRhcycpLnBpcGUoXG4gICAgICBtYXAocGFyc2VEQVMpKTtcbiAgfVxuXG4gIGdldEREWCh1cmw6c3RyaW5nKTpPYnNlcnZhYmxlPERhcEREWD57XG4gICAgcmV0dXJuIHRoaXMuZ2V0KHVybCsnLmRkeCcpLnBpcGUoXG4gICAgICBtYXAocGFyc2VERFgpKTtcbiAgfVxuXG4gIGdldEV4dGVudCh1cmw6c3RyaW5nKTpPYnNlcnZhYmxlPG51bWJlcltdPntcbiAgICBjb25zb2xlLmxvZyh1cmwpO1xuICAgIHJldHVybiBmb3JrSm9pbihbXG4gICAgICB0aGlzLmdldERBUyh1cmwpLFxuICAgICAgdGhpcy5nZXRERFgodXJsKVxuICAgIF0pLnBpcGUoc3dpdGNoTWFwKChbdGhlREFTLHRoZUREWF0pPT57XG4gICAgICB2YXIgZGFzOkRhcERBUyA9IDxEYXBEQVM+dGhlREFTO1xuICAgICAgcmV0dXJuIGZvcmtKb2luKFtcbiAgICAgICAgdGhpcy5nZXREYXRhKHVybCsnLmFzY2lpP2xhdGl0dWRlJyxkYXMpLFxuICAgICAgICB0aGlzLmdldERhdGEodXJsKycuYXNjaWk/bG9uZ2l0dWRlJyxkYXMpXG4gICAgICBdKX0pLFxuICAgICAgbWFwKChsbDpEYXBEYXRhW10pPT57XG4gICAgICAgIHZhciBsYXRzID0gPERhcFZhcmlhYmxlRGF0YUFycmF5PmxsWzBdLmxhdGl0dWRlO1xuICAgICAgICB2YXIgbG9ucyA9IDxEYXBWYXJpYWJsZURhdGFBcnJheT5sbFsxXS5sb25naXR1ZGU7XG4gICAgICAgIHJldHVybiBbPG51bWJlcj5sYXRzWzBdLDxudW1iZXI+bGF0c1tsYXRzLmxlbmd0aC0xXSxcbiAgICAgICAgICAgICAgICA8bnVtYmVyPmxvbnNbMF0sPG51bWJlcj5sb25zW2xvbnMubGVuZ3RoLTFdXTtcbiAgICAgIH0pKTtcbiAgfVxuXG4gIGRhcFJhbmdlUXVlcnkoZnJvbTpudW1iZXIsdG8/Om51bWJlcixzdGVwPzpudW1iZXIpOnN0cmluZ3tcbiAgICBzdGVwID0gc3RlcCB8fCAxO1xuICAgIGlmKHRvPT09dW5kZWZpbmVkKXtcbiAgICAgIHRvID0gZnJvbTtcbiAgICB9XG4gICAgcmV0dXJuICdbJytmcm9tKyc6JytzdGVwKyc6Jyt0bysnXSc7XG4gIH1cbn1cbiJdfQ==