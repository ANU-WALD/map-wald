import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { OpendapService } from './opendap.service';
import { forkJoin, of } from 'rxjs';
import { publishReplay, refCount, map, switchAll, shareReplay } from 'rxjs/operators';
export const LAT_NAMES = ['latitude', 'lat'];
export const LNG_NAMES = ['longitude', 'lng', 'lon'];
export const TIME_NAMES = ['time', 't'];
let MetadataService = class MetadataService {
    constructor(dap) {
        this.dap = dap;
        this.ddxCache = {};
        this.dasCache = {};
        this.timeCache = {};
    }
    identifyCoordinate(ddx, ...possibleNames) {
        for (let n of possibleNames) {
            if (ddx.variables[n]) {
                return n;
            }
        }
        return undefined;
    }
    getDDX(host, file) {
        var url = this.dap.makeURL(host, file);
        return this.ddxForUrl(url);
    }
    ddxForUrl(url) {
        if (!this.ddxCache[url]) {
            this.ddxCache[url] =
                this.dap.getDDX(url).pipe(publishReplay(), refCount());
        }
        return this.ddxCache[url];
    }
    getDDXForLayer(ml) {
        return this.getDDX(ml.flattenedSettings.host, ml.interpolatedFile);
    }
    getDAS(host, file) {
        var url = this.dap.makeURL(host, file);
        return this.dasForUrl(url);
    }
    dasForUrl(url) {
        if (!this.dasCache[url]) {
            this.dasCache[url] =
                this.dap.getDAS(url).pipe(publishReplay(), refCount());
        }
        return this.dasCache[url];
    }
    getDASForLayer(ml) {
        return this.getDAS(ml.flattenedSettings.host, ml.interpolatedFile);
    }
    getMetadata(ml) {
        if (ml.flattenedSettings.host.software !== 'tds') {
            return of({});
        }
        return forkJoin([this.getDASForLayer(ml), this.getDDXForLayer(ml)]).pipe(map(meta => {
            return {
                das: meta[0],
                ddx: meta[1]
            };
        }), map(meta => {
            return Object.assign({}, meta.das.attr || {}, meta.ddx.variables[ml.flattenedSettings.layer || ml.flattenedSettings.variable] || {});
        }));
    }
    populateMetadata(ml) {
        this.getMetadata(ml).subscribe(entry => {
            setTimeout(() => {
                ml.retrievedMetadata = entry;
            });
        });
    }
    getGrid(host, file) {
        const url = this.dap.makeURL(host, file);
        return this.getGridForURL(url);
    }
    getGridForURL(url) {
        const ddx$ = this.ddxForUrl(url);
        const das$ = this.dasForUrl(url);
        const res$ = forkJoin([ddx$, das$]).pipe(map((metadata) => {
            const ddx = metadata[0];
            const das = metadata[1];
            const latCoord = this.identifyCoordinate(ddx, ...LAT_NAMES);
            const lngCoord = this.identifyCoordinate(ddx, ...LNG_NAMES);
            const lat$ = this.dap.getData(`${url}.ascii?${latCoord}`, das).pipe(map((dd) => dd[latCoord]));
            const lng$ = this.dap.getData(`${url}.ascii?${lngCoord}`, das).pipe(map((dd) => dd[lngCoord]));
            return forkJoin(lat$, lng$);
        }), switchAll(), publishReplay(), refCount());
        return res$;
    }
    getGridForLayer(ml) {
        return this.getGrid(ml.flattenedSettings.host, ml.interpolatedFile);
    }
    getSpatialExtent(ml) {
        return this.getGridForLayer(ml).pipe(map(([lats, lngs]) => {
            var result = {
                east: Math.max(...lngs),
                west: Math.min(...lngs),
                north: Math.max(...lats),
                south: Math.min(...lats)
            };
            return result;
        })).pipe(publishReplay(), refCount());
    }
    getTimeDimension(host, file) {
        const url = this.dap.makeURL(host, file);
        return this.getTimeDimensionForURL(url);
    }
    getTimeDimensionForURL(url) {
        if (!this.timeCache[url]) {
            const ddx$ = this.ddxForUrl(url);
            const das$ = this.dasForUrl(url);
            const res$ = forkJoin([ddx$, das$]).pipe(map((metadata) => {
                const ddx = metadata[0];
                const das = metadata[1];
                const timeCoord = this.identifyCoordinate(ddx, ...TIME_NAMES);
                const time$ = this.dap.getData(`${url}.ascii?${timeCoord}`, das).pipe(map((dd) => dd[timeCoord]));
                return time$;
            }), switchAll(), shareReplay());
            this.timeCache[url] = res$;
        }
        return this.timeCache[url];
    }
};
MetadataService.ctorParameters = () => [
    { type: OpendapService }
];
MetadataService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [OpendapService])
], MetadataService);
export { MetadataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsibWV0YWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFJbkQsT0FBTyxFQUFFLFFBQVEsRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFhLGFBQWEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBTyxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUMsQ0FBQyxVQUFVLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUMsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFDLENBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQztBQUNqRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUMsQ0FBQyxNQUFNLEVBQUMsR0FBRyxDQUFDLENBQUM7QUFHckMsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQUkxQixZQUFvQixHQUFrQjtRQUFsQixRQUFHLEdBQUgsR0FBRyxDQUFlO1FBSHRDLGFBQVEsR0FBbUMsRUFBRSxDQUFBO1FBQzdDLGFBQVEsR0FBbUMsRUFBRSxDQUFBO1FBZ0k3QyxjQUFTLEdBQW1DLEVBQUUsQ0FBQztJQTVIL0MsQ0FBQztJQUVELGtCQUFrQixDQUFDLEdBQVUsRUFBQyxHQUFHLGFBQTJCO1FBQzFELEtBQUksSUFBSSxDQUFDLElBQUksYUFBYSxFQUFDO1lBQ3pCLElBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFDbEIsT0FBTyxDQUFDLENBQUM7YUFDVjtTQUNGO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELE1B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Q2YsQ0FBQyxDQUFDLEVBQUMsU0FBUyxFQUFFLEVBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUM1QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0YsQ0FBQTs7WUFySnlCLGNBQWM7O0FBSjNCLGVBQWU7SUFEM0IsVUFBVSxFQUFFOzZDQUthLGNBQWM7R0FKM0IsZUFBZSxDQXlKM0I7U0F6SlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hcHBlZExheWVyIH0gZnJvbSAnLi9kYXRhL21hcHBlZC1sYXllcic7XG5pbXBvcnQgeyBEYXBERFgsIERhcERBUywgRGFwRGF0YSB9IGZyb20gJ2RhcC1xdWVyeS1qcy9kaXN0L2RhcC1xdWVyeSc7XG5pbXBvcnQgeyBPcGVuZGFwU2VydmljZSB9IGZyb20gJy4vb3BlbmRhcC5zZXJ2aWNlJztcbmltcG9ydCB7IEJvdW5kcyB9IGZyb20gJy4vZGF0YS9ib3VuZHMnO1xuXG5pbXBvcnQgeyBDYXRhbG9nSG9zdCB9IGZyb20gJy4vZGF0YS9jYXRhbG9nJztcbmltcG9ydCB7IGZvcmtKb2luLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCBwdWJsaXNoUmVwbGF5LCByZWZDb3VudCwgbWFwLCBzd2l0Y2hBbGwsIHRhcCwgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBMQVRfTkFNRVM9WydsYXRpdHVkZScsJ2xhdCddO1xuZXhwb3J0IGNvbnN0IExOR19OQU1FUz1bJ2xvbmdpdHVkZScsJ2xuZycsJ2xvbiddO1xuZXhwb3J0IGNvbnN0IFRJTUVfTkFNRVM9Wyd0aW1lJywndCddO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWV0YWRhdGFTZXJ2aWNlIHtcbiAgZGR4Q2FjaGU6e1trZXk6c3RyaW5nXTpPYnNlcnZhYmxlPERhcEREWD59PXt9XG4gIGRhc0NhY2hlOntba2V5OnN0cmluZ106T2JzZXJ2YWJsZTxEYXBEQVM+fT17fVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGFwOk9wZW5kYXBTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIGlkZW50aWZ5Q29vcmRpbmF0ZShkZHg6RGFwRERYLC4uLnBvc3NpYmxlTmFtZXM6QXJyYXk8c3RyaW5nPik6c3RyaW5ne1xuICAgIGZvcihsZXQgbiBvZiBwb3NzaWJsZU5hbWVzKXtcbiAgICAgIGlmKGRkeC52YXJpYWJsZXNbbl0pe1xuICAgICAgICByZXR1cm4gbjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldEREWChob3N0OkNhdGFsb2dIb3N0LGZpbGU6c3RyaW5nKTpPYnNlcnZhYmxlPERhcEREWD57XG4gICAgdmFyIHVybCA9IHRoaXMuZGFwLm1ha2VVUkwoaG9zdCxmaWxlKTtcblxuICAgIHJldHVybiB0aGlzLmRkeEZvclVybCh1cmwpO1xuICB9XG5cbiAgZGR4Rm9yVXJsKHVybDpzdHJpbmcpOk9ic2VydmFibGU8RGFwRERYPntcbiAgICBpZighdGhpcy5kZHhDYWNoZVt1cmxdKXtcbiAgICAgIHRoaXMuZGR4Q2FjaGVbdXJsXSA9XG4gICAgICAgIHRoaXMuZGFwLmdldEREWCh1cmwpLnBpcGUocHVibGlzaFJlcGxheSgpLHJlZkNvdW50KCkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRkeENhY2hlW3VybF07XG59XG5cbiAgZ2V0RERYRm9yTGF5ZXIobWw6TWFwcGVkTGF5ZXIpOk9ic2VydmFibGU8RGFwRERYPntcbiAgICByZXR1cm4gdGhpcy5nZXRERFgobWwuZmxhdHRlbmVkU2V0dGluZ3MuaG9zdCxtbC5pbnRlcnBvbGF0ZWRGaWxlKTtcbiAgfVxuXG4gIGdldERBUyhob3N0OkNhdGFsb2dIb3N0LGZpbGU6c3RyaW5nKTpPYnNlcnZhYmxlPERhcERBUz57XG4gICAgdmFyIHVybCA9IHRoaXMuZGFwLm1ha2VVUkwoaG9zdCxmaWxlKTtcbiAgICByZXR1cm4gdGhpcy5kYXNGb3JVcmwodXJsKTtcbiAgfVxuXG4gIGRhc0ZvclVybCh1cmw6c3RyaW5nKTpPYnNlcnZhYmxlPERhcERBUz57XG4gICAgaWYoIXRoaXMuZGFzQ2FjaGVbdXJsXSl7XG4gICAgICB0aGlzLmRhc0NhY2hlW3VybF0gPVxuICAgICAgICB0aGlzLmRhcC5nZXREQVModXJsKS5waXBlKHB1Ymxpc2hSZXBsYXkoKSxyZWZDb3VudCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5kYXNDYWNoZVt1cmxdO1xuICB9XG5cbiAgZ2V0REFTRm9yTGF5ZXIobWw6TWFwcGVkTGF5ZXIpOk9ic2VydmFibGU8RGFwREFTPntcbiAgICByZXR1cm4gdGhpcy5nZXREQVMobWwuZmxhdHRlbmVkU2V0dGluZ3MuaG9zdCxtbC5pbnRlcnBvbGF0ZWRGaWxlKTtcbiAgfVxuXG4gIGdldE1ldGFkYXRhKG1sOk1hcHBlZExheWVyKTpPYnNlcnZhYmxlPGFueT57XG4gICAgaWYobWwuZmxhdHRlbmVkU2V0dGluZ3MuaG9zdC5zb2Z0d2FyZSAhPT0ndGRzJyl7XG4gICAgICByZXR1cm4gb2Yoe30pO1xuICAgIH1cblxuICAgIHJldHVybiBmb3JrSm9pbihbdGhpcy5nZXREQVNGb3JMYXllcihtbCksdGhpcy5nZXRERFhGb3JMYXllcihtbCldKS5waXBlKFxuICAgICAgbWFwKG1ldGE9PntcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkYXM6IDxEYXBEQVM+bWV0YVswXSxcbiAgICAgICAgICBkZHg6IDxEYXBERFg+bWV0YVsxXVxuICAgICAgICB9O1xuICAgICAgfSksXG4gICAgICBtYXAobWV0YT0+e1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXMuYXR0cnx8e30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuZGR4LnZhcmlhYmxlc1ttbC5mbGF0dGVuZWRTZXR0aW5ncy5sYXllcnx8bWwuZmxhdHRlbmVkU2V0dGluZ3MudmFyaWFibGVdfHx7fSk7XG4gICAgICB9KSk7XG4gIH1cblxuICBwb3B1bGF0ZU1ldGFkYXRhKG1sOk1hcHBlZExheWVyKXtcbiAgICB0aGlzLmdldE1ldGFkYXRhKG1sKS5zdWJzY3JpYmUoZW50cnk9PntcbiAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgbWwucmV0cmlldmVkTWV0YWRhdGEgPSBlbnRyeTtcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICBnZXRHcmlkKGhvc3Q6Q2F0YWxvZ0hvc3QsZmlsZTpzdHJpbmcpOk9ic2VydmFibGU8bnVtYmVyW11bXT57XG4gICAgY29uc3QgdXJsID0gdGhpcy5kYXAubWFrZVVSTChob3N0LGZpbGUpO1xuICAgIHJldHVybiB0aGlzLmdldEdyaWRGb3JVUkwodXJsKTtcbiAgfVxuXG4gIGdldEdyaWRGb3JVUkwodXJsOnN0cmluZyk6T2JzZXJ2YWJsZTxudW1iZXJbXVtdPntcbiAgICBjb25zdCBkZHgkID0gdGhpcy5kZHhGb3JVcmwodXJsKTtcbiAgICBjb25zdCBkYXMkID0gdGhpcy5kYXNGb3JVcmwodXJsKTtcbiAgICBjb25zdCByZXMkID0gPE9ic2VydmFibGU8bnVtYmVyW11bXT4+Zm9ya0pvaW4oW2RkeCQsZGFzJF0pLnBpcGUoXG4gICAgICBtYXAoKG1ldGFkYXRhOmFueVtdKT0+e1xuICAgICAgICBjb25zdCBkZHg6RGFwRERYID0gbWV0YWRhdGFbMF07XG4gICAgICAgIGNvbnN0IGRhczpEYXBEQVMgPSBtZXRhZGF0YVsxXTtcblxuICAgICAgICBjb25zdCBsYXRDb29yZCA9IHRoaXMuaWRlbnRpZnlDb29yZGluYXRlKGRkeCwuLi5MQVRfTkFNRVMpO1xuICAgICAgICBjb25zdCBsbmdDb29yZCA9IHRoaXMuaWRlbnRpZnlDb29yZGluYXRlKGRkeCwuLi5MTkdfTkFNRVMpO1xuXG4gICAgICAgIGNvbnN0IGxhdCQgPVxuICAgICAgICAgIHRoaXMuZGFwLmdldERhdGEoYCR7dXJsfS5hc2NpaT8ke2xhdENvb3JkfWAsZGFzKS5waXBlKFxuICAgICAgICAgICAgbWFwKChkZDpEYXBEYXRhKT0+PG51bWJlcltdPmRkW2xhdENvb3JkXSkpO1xuICAgICAgICBjb25zdCBsbmckID1cbiAgICAgICAgICB0aGlzLmRhcC5nZXREYXRhKGAke3VybH0uYXNjaWk/JHtsbmdDb29yZH1gLGRhcykucGlwZShcbiAgICAgICAgICAgIG1hcCgoZGQ6RGFwRGF0YSk9PjxudW1iZXJbXT5kZFtsbmdDb29yZF0pKTtcblxuICAgICAgICByZXR1cm4gZm9ya0pvaW48bnVtYmVyW10+KGxhdCQsbG5nJCk7XG4gICAgICB9KSxzd2l0Y2hBbGwoKSxwdWJsaXNoUmVwbGF5KCkscmVmQ291bnQoKSk7XG4gICAgICByZXR1cm4gcmVzJDtcbiAgfVxuXG4gIGdldEdyaWRGb3JMYXllcihtbDpNYXBwZWRMYXllcik6T2JzZXJ2YWJsZTxBcnJheTxBcnJheTxudW1iZXI+Pj57XG4gICAgcmV0dXJuIHRoaXMuZ2V0R3JpZChtbC5mbGF0dGVuZWRTZXR0aW5ncy5ob3N0LG1sLmludGVycG9sYXRlZEZpbGUpO1xuICB9XG5cbiAgZ2V0U3BhdGlhbEV4dGVudChtbDpNYXBwZWRMYXllcik6T2JzZXJ2YWJsZTxCb3VuZHM+e1xuICAgIHJldHVybiB0aGlzLmdldEdyaWRGb3JMYXllcihtbCkucGlwZShtYXAoKFtsYXRzLGxuZ3NdKT0+e1xuICAgICAgdmFyIHJlc3VsdDpCb3VuZHMgPSB7XG4gICAgICAgIGVhc3Q6IE1hdGgubWF4KC4uLmxuZ3MpLFxuICAgICAgICB3ZXN0OiBNYXRoLm1pbiguLi5sbmdzKSxcbiAgICAgICAgbm9ydGg6IE1hdGgubWF4KC4uLmxhdHMpLFxuICAgICAgICBzb3V0aDogTWF0aC5taW4oLi4ubGF0cylcbiAgICAgIH07XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pKS5waXBlKHB1Ymxpc2hSZXBsYXkoKSwgcmVmQ291bnQoKSk7XG4gIH1cblxuICBnZXRUaW1lRGltZW5zaW9uKGhvc3Q6Q2F0YWxvZ0hvc3QsZmlsZTpzdHJpbmcpOk9ic2VydmFibGU8RGF0ZVtdPntcbiAgICBjb25zdCB1cmwgPSB0aGlzLmRhcC5tYWtlVVJMKGhvc3QsZmlsZSk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGltZURpbWVuc2lvbkZvclVSTCh1cmwpO1xuICB9XG5cbiAgdGltZUNhY2hlOntba2V5OnN0cmluZ106T2JzZXJ2YWJsZTxEYXRlW10+fT17fTtcblxuICBnZXRUaW1lRGltZW5zaW9uRm9yVVJMKHVybDpzdHJpbmcpOk9ic2VydmFibGU8RGF0ZVtdPntcbiAgICBpZighdGhpcy50aW1lQ2FjaGVbdXJsXSl7XG4gICAgICBjb25zdCBkZHgkID0gdGhpcy5kZHhGb3JVcmwodXJsKTtcbiAgICAgIGNvbnN0IGRhcyQgPSB0aGlzLmRhc0ZvclVybCh1cmwpO1xuICAgICAgY29uc3QgcmVzJCA9IDxPYnNlcnZhYmxlPERhdGVbXT4+Zm9ya0pvaW4oW2RkeCQsZGFzJF0pLnBpcGUoXG4gICAgICAgIG1hcCgobWV0YWRhdGE6YW55W10pPT57XG4gICAgICAgICAgY29uc3QgZGR4OkRhcEREWCA9IG1ldGFkYXRhWzBdO1xuICAgICAgICAgIGNvbnN0IGRhczpEYXBEQVMgPSBtZXRhZGF0YVsxXTtcblxuICAgICAgICAgIGNvbnN0IHRpbWVDb29yZCA9IHRoaXMuaWRlbnRpZnlDb29yZGluYXRlKGRkeCwuLi5USU1FX05BTUVTKTtcblxuICAgICAgICAgIGNvbnN0IHRpbWUkID1cbiAgICAgICAgICAgIHRoaXMuZGFwLmdldERhdGEoYCR7dXJsfS5hc2NpaT8ke3RpbWVDb29yZH1gLGRhcykucGlwZShcbiAgICAgICAgICAgICAgbWFwKChkZDpEYXBEYXRhKT0+PERhdGVbXT5kZFt0aW1lQ29vcmRdKSk7XG5cbiAgICAgICAgICByZXR1cm4gdGltZSQ7XG4gICAgICAgIH0pLHN3aXRjaEFsbCgpLHNoYXJlUmVwbGF5KCkpO1xuICAgICAgdGhpcy50aW1lQ2FjaGVbdXJsXSA9IHJlcyQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRpbWVDYWNoZVt1cmxdO1xuICB9XG59XG4iXX0=