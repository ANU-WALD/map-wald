import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parseData, parseDAS, parseDDX, simplify } from 'dap-query-js/dist/dap-query';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
export class OpendapService {
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
        return this.get(queryUrl).pipe(map((txt) => simplify(parseData(txt, das))));
    }
    getDAS(url) {
        return this.get(url + '.das').pipe(map(parseDAS));
    }
    getDDX(url) {
        return this.get(url + '.ddx').pipe(map(parseDDX));
    }
    getExtent(url) {
        console.log(url);
        return forkJoin([
            this.getDAS(url),
            this.getDDX(url)
        ]).pipe(switchMap(([theDAS, theDDX]) => {
            var das = theDAS;
            return forkJoin([
                this.getData(url + '.ascii?latitude', das),
                this.getData(url + '.ascii?longitude', das)
            ]);
        }), map((ll) => {
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
}
OpendapService.ctorParameters = () => [
    { type: HttpClient }
];
OpendapService.decorators = [
    { type: Injectable }
];
OpendapService.ctorParameters = () => [
    { type: HttpClient }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlbmRhcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJvcGVuZGFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsUUFBUSxFQUNuQyxRQUFRLEVBQWlELE1BQU0sNkJBQTZCLENBQUM7QUFFL0YsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQWEsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRzNDLE1BQU0sT0FBTyxjQUFjO0lBRXpCLFlBQW9CLElBQWU7UUFBZixTQUFJLEdBQUosSUFBSSxDQUFXO0lBRW5DLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBZ0IsRUFBQyxRQUFlO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUVELE9BQU8sQ0FBQyxRQUFlLEVBQUMsR0FBVTtRQUNoQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUM1QixHQUFHLENBQUMsQ0FBQyxHQUFVLEVBQUMsRUFBRSxDQUFBLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxNQUFNLENBQUMsR0FBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUM5QixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDOUIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUFVO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBTyxRQUFRLENBQUM7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxFQUFDLEVBQUU7WUFDbkMsSUFBSSxHQUFHLEdBQWtCLE1BQU0sQ0FBQztZQUNoQyxPQUFPLFFBQVEsQ0FBQztnQkFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBQyxpQkFBaUIsRUFBQyxHQUFHLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFDLGtCQUFrQixFQUFDLEdBQUcsQ0FBQzthQUN6QyxDQUFDLENBQUE7UUFBQSxDQUFDLENBQUMsRUFDSixHQUFHLENBQUMsQ0FBQyxFQUFZLEVBQUMsRUFBRTtZQUNsQixJQUFJLElBQUksR0FBeUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUNoRCxJQUFJLElBQUksR0FBeUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNqRCxPQUFPLENBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBVyxFQUFDLEVBQVUsRUFBQyxJQUFZO1FBQy9DLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ2pCLElBQUcsRUFBRSxLQUFHLFNBQVMsRUFBQztZQUNoQixFQUFFLEdBQUcsSUFBSSxDQUFDO1NBQ1g7UUFDRCxPQUFPLEdBQUcsR0FBQyxJQUFJLEdBQUMsR0FBRyxHQUFDLElBQUksR0FBQyxHQUFHLEdBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQztJQUN0QyxDQUFDOzs7WUFwRHdCLFVBQVU7OztZQUhwQyxVQUFVOzs7WUFQRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IHBhcnNlRGF0YSwgcGFyc2VEQVMscGFyc2VERFgsXG4gIHNpbXBsaWZ5LCBEYXBEYXRhLCBEYXBEQVMsIERhcEREWCwgRGFwVmFyaWFibGVEYXRhQXJyYXkgfSBmcm9tICdkYXAtcXVlcnktanMvZGlzdC9kYXAtcXVlcnknO1xuaW1wb3J0IHsgQ2F0YWxvZ0hvc3QgfSBmcm9tICcuL2RhdGEvY2F0YWxvZyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUsZm9ya0pvaW4gfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9wZW5kYXBTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6SHR0cENsaWVudCkge1xuXG4gIH1cblxuICBtYWtlVVJMKGhvc3Q6Q2F0YWxvZ0hvc3QsZmlsZXBhdGg6c3RyaW5nKTpzdHJpbmd7XG4gICAgcmV0dXJuIGhvc3QudXJsICsgJy9kb2RzQy8nICsgZmlsZXBhdGg7XG4gIH1cblxuICBnZXQodXJsOnN0cmluZyk6T2JzZXJ2YWJsZTxzdHJpbmc+e1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCx7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXG4gIH1cblxuICBnZXREYXRhKHF1ZXJ5VXJsOnN0cmluZyxkYXM6RGFwREFTKTpPYnNlcnZhYmxlPERhcERhdGE+e1xuICAgIHJldHVybiB0aGlzLmdldChxdWVyeVVybCkucGlwZShcbiAgICAgIG1hcCgodHh0OnN0cmluZyk9PnNpbXBsaWZ5KHBhcnNlRGF0YSh0eHQsZGFzKSkpKTtcbiAgfVxuXG4gIGdldERBUyh1cmw6c3RyaW5nKTpPYnNlcnZhYmxlPERhcERBUz57XG4gICAgcmV0dXJuIHRoaXMuZ2V0KHVybCsnLmRhcycpLnBpcGUoXG4gICAgICBtYXAocGFyc2VEQVMpKTtcbiAgfVxuXG4gIGdldEREWCh1cmw6c3RyaW5nKTpPYnNlcnZhYmxlPERhcEREWD57XG4gICAgcmV0dXJuIHRoaXMuZ2V0KHVybCsnLmRkeCcpLnBpcGUoXG4gICAgICBtYXAocGFyc2VERFgpKTtcbiAgfVxuXG4gIGdldEV4dGVudCh1cmw6c3RyaW5nKTpPYnNlcnZhYmxlPG51bWJlcltdPntcbiAgICBjb25zb2xlLmxvZyh1cmwpO1xuICAgIHJldHVybiBmb3JrSm9pbihbXG4gICAgICB0aGlzLmdldERBUyh1cmwpLFxuICAgICAgdGhpcy5nZXRERFgodXJsKVxuICAgIF0pLnBpcGUoc3dpdGNoTWFwKChbdGhlREFTLHRoZUREWF0pPT57XG4gICAgICB2YXIgZGFzOkRhcERBUyA9IDxEYXBEQVM+dGhlREFTO1xuICAgICAgcmV0dXJuIGZvcmtKb2luKFtcbiAgICAgICAgdGhpcy5nZXREYXRhKHVybCsnLmFzY2lpP2xhdGl0dWRlJyxkYXMpLFxuICAgICAgICB0aGlzLmdldERhdGEodXJsKycuYXNjaWk/bG9uZ2l0dWRlJyxkYXMpXG4gICAgICBdKX0pLFxuICAgICAgbWFwKChsbDpEYXBEYXRhW10pPT57XG4gICAgICAgIHZhciBsYXRzID0gPERhcFZhcmlhYmxlRGF0YUFycmF5PmxsWzBdLmxhdGl0dWRlO1xuICAgICAgICB2YXIgbG9ucyA9IDxEYXBWYXJpYWJsZURhdGFBcnJheT5sbFsxXS5sb25naXR1ZGU7XG4gICAgICAgIHJldHVybiBbPG51bWJlcj5sYXRzWzBdLDxudW1iZXI+bGF0c1tsYXRzLmxlbmd0aC0xXSxcbiAgICAgICAgICAgICAgICA8bnVtYmVyPmxvbnNbMF0sPG51bWJlcj5sb25zW2xvbnMubGVuZ3RoLTFdXTtcbiAgICAgIH0pKTtcbiAgfVxuXG4gIGRhcFJhbmdlUXVlcnkoZnJvbTpudW1iZXIsdG8/Om51bWJlcixzdGVwPzpudW1iZXIpOnN0cmluZ3tcbiAgICBzdGVwID0gc3RlcCB8fCAxO1xuICAgIGlmKHRvPT09dW5kZWZpbmVkKXtcbiAgICAgIHRvID0gZnJvbTtcbiAgICB9XG4gICAgcmV0dXJuICdbJytmcm9tKyc6JytzdGVwKyc6Jyt0bysnXSc7XG4gIH1cbn1cbiJdfQ==