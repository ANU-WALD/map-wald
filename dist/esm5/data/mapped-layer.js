import { InterpolationService } from '../interpolation.service';
var PUBLICATION_PRIORITY_ORDER = [
    'annual',
    'monthly',
    'daily'
];
var ɵ0 = function (host, fn) {
    var components = fn.split('/');
    components.pop();
    return host + "/catalog/" + components.join('/') + "/catalog.html";
}, ɵ1 = function (host, fn, ml) {
    return ml.layer.options.downloadPath || "" + host + fn;
};
var MAKE_DOWNLOAD_URL = {
    tds: ɵ0,
    static: ɵ1
};
export var WMS_PARAMETER_NAMES = {
    tds: [
        'layers',
        'styles',
        'colorscalerange',
        'abovemaxcolor',
        'belowmincolor',
        'time',
        'transparent',
        'logscale'
    ],
    geoserver: [
        'transparent',
        'layers'
    ],
    esri: [
        'layers',
        'styles',
        'transparent'
    ]
};
export var WMS_URL_FORMAT = {
    tds: '/wms/',
    geoserver: '/wms/',
    esri: '/'
};
export var INTERPOLATED_PARAMETERS = [
    'styles',
    'layers'
];
var MappedLayer = /** @class */ (function () {
    function MappedLayer(data) {
        this.options = {
            date: new Date(2019, 0, 1) // Set to most recent available date
        };
        this.retrievedMetadata = {};
        this.wmsParameters = {};
        this.flattenedSettings = {};
        this.opacity = 1.0;
        Object.assign(this, data || {});
        if (this.layerType === undefined) {
            this.layerType = this.wmsParameters ? 'wms' : undefined;
        }
    }
    MappedLayer.prototype.description = function () {
        return this.layer.description ||
            (this.retrievedMetadata &&
                this.retrievedMetadata[this.layer.descriptionField || 'long_name']);
    };
    MappedLayer.prototype.leading0 = function (n) {
        if (n < 10) {
            return '0' + n;
        }
        return '' + n;
    };
    MappedLayer.prototype.defaultPublication = function () {
        var _this = this;
        var priorityPublication = PUBLICATION_PRIORITY_ORDER.find(function (pp) { return _this.layer.publications.findIndex(function (lp) { return (lp.timestep === pp) || (lp.label === pp); }) >= 0; });
        if (priorityPublication) {
            return this.layer.publications.findIndex(function (p) { return (p.label === priorityPublication) || (p.timestep === priorityPublication); });
        }
        return this.layer.publications.findIndex(function (p) { return !p.skip; });
    };
    MappedLayer.prototype.update = function () {
        var _this = this;
        this.options.publication = (this.options.publication === undefined) ?
            this.defaultPublication() :
            this.options.publication;
        var publication = this.layer.publications[this.options.publication];
        var host = publication.options.host || {};
        var baseURL = host.url;
        var software = host.software || 'tds';
        this.interpolatedFile = (publication.options.filepath || '');
        var mapParams = Object.assign({}, this.layer, publication.options, publication.options.mapOptions || {}, this.options.date ? {
            decade: decadeText(this.options.date),
            year: this.options.date.getFullYear(),
            month: this.leading0(this.options.date.getMonth() + 1),
            day: this.leading0(this.options.date.getDate()),
        } : {}, this.options, this.options.tags || {});
        if (mapParams.timeFormat) {
            mapParams['time'] = InterpolationService.interpolate(mapParams.timeFormat, mapParams);
        }
        mapParams.layers = mapParams.layers || mapParams.layer || mapParams.variable;
        INTERPOLATED_PARAMETERS.forEach(function (p) {
            if (mapParams[p]) {
                mapParams[p] = InterpolationService.interpolate(mapParams[p], mapParams);
            }
        });
        this.interpolatedFile = InterpolationService.interpolate(this.interpolatedFile, mapParams);
        this.url = baseURL + WMS_URL_FORMAT[software] + this.interpolatedFile;
        if (MAKE_DOWNLOAD_URL[software]) {
            this.interpolatedDownloadURL = MAKE_DOWNLOAD_URL[software](host.downloadLink || baseURL, this.interpolatedFile, this);
        }
        else {
            this.interpolatedDownloadURL = host.downloadLink || null;
        }
        if (this.layer.options.legend === 'wms') {
            this.legendURL = this.url + '?service=WMS&request=GetLegendGraphic&format=image/png';
            this.legendURL += "&layer=" + InterpolationService.interpolate(mapParams.layers, mapParams);
            this.legendURL += '&version=1.1.1';
            this.options.legend = true;
        }
        else {
            this.legendURL = null;
        }
        if (mapParams.vectors) {
            this.wmsParameters = null;
            this.layerType = 'vector';
            var styles_1 = mapParams.styles || {};
            this._styleFunc = function (f) {
                return styles_1;
            };
            if (mapParams.vectors === 'point' && mapParams.styles) {
                this.layerType = 'circle';
            }
        }
        else {
            this.layerType = 'wms';
            this.wmsParameters = {};
            WMS_PARAMETER_NAMES[software].forEach(function (param) {
                if (mapParams[param]) {
                    _this.wmsParameters[param] = mapParams[param];
                }
            });
        }
        this.flattenedSettings = mapParams;
        if (mapParams.titleFormat) {
            this.title = InterpolationService.interpolate(mapParams.titleFormat, mapParams);
        }
        else {
            this.title = this.layer.name;
        }
    };
    return MappedLayer;
}());
export { MappedLayer };
function decadeText(d) {
    var decade = d.getFullYear().toString().slice(0, 3);
    return decade + "0-" + decade + "9";
}
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcGVkLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJkYXRhL21hcHBlZC1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVloRSxJQUFNLDBCQUEwQixHQUFHO0lBQ2pDLFFBQVE7SUFDUixTQUFTO0lBQ1QsT0FBTztDQUNSLENBQUM7U0FHSSxVQUFDLElBQVcsRUFBQyxFQUFTO0lBQ3hCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLE9BQVUsSUFBSSxpQkFBWSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBZSxDQUFDO0FBQ2hFLENBQUMsT0FDTSxVQUFDLElBQVcsRUFBQyxFQUFTLEVBQUMsRUFBYztJQUMxQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksSUFBSSxLQUFHLElBQUksR0FBRyxFQUFJLENBQUM7QUFDekQsQ0FBQztBQVJILElBQU0saUJBQWlCLEdBQTZEO0lBQ2xGLEdBQUcsSUFJRjtJQUNELE1BQU0sSUFFTDtDQUNGLENBQUE7QUFFRCxNQUFNLENBQUMsSUFBTSxtQkFBbUIsR0FBZ0M7SUFDOUQsR0FBRyxFQUFFO1FBQ0gsUUFBUTtRQUNSLFFBQVE7UUFDUixpQkFBaUI7UUFDakIsZUFBZTtRQUNmLGVBQWU7UUFDZixNQUFNO1FBQ04sYUFBYTtRQUNiLFVBQVU7S0FDWDtJQUNELFNBQVMsRUFBRTtRQUNULGFBQWE7UUFDYixRQUFRO0tBQ1Q7SUFDRCxJQUFJLEVBQUU7UUFDSixRQUFRO1FBQ1IsUUFBUTtRQUNSLGFBQWE7S0FDZDtDQUNGLENBQUM7QUFFRixNQUFNLENBQUMsSUFBTSxjQUFjLEdBQXlCO0lBQ2xELEdBQUcsRUFBQyxPQUFPO0lBQ1gs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a0JBQUM7QUFBRCxDQUFDLEFBbklELElBbUlDOztBQUVELFNBQVMsVUFBVSxDQUFDLENBQU87SUFDekIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEQsT0FBVSxNQUFNLFVBQUssTUFBTSxNQUFHLENBQUM7QUFDakMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExheWVyIH0gZnJvbSAnLi9jYXRhbG9nJztcbmltcG9ydCB7IEludGVycG9sYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vaW50ZXJwb2xhdGlvbi5zZXJ2aWNlJztcblxuZXhwb3J0IHR5cGUgTWFwcGVkTGF5ZXJUeXBlcyA9ICd3bXMnIHwgJ3ZlY3RvcicgfCAnY2lyY2xlJztcblxuZXhwb3J0IGludGVyZmFjZSBNYXBwZWRMYXllck9wdGlvbnMge1xuICBsZWdlbmQ/OiBib29sZWFuO1xuICBwdWJsaWNhdGlvbj86IG51bWJlcjtcbiAgZGF0ZT86IERhdGUsXG5cbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5jb25zdCBQVUJMSUNBVElPTl9QUklPUklUWV9PUkRFUiA9IFtcbiAgJ2FubnVhbCcsXG4gICdtb250aGx5JyxcbiAgJ2RhaWx5J1xuXTtcblxuY29uc3QgTUFLRV9ET1dOTE9BRF9VUkw6e1trZXk6c3RyaW5nXTooYTpzdHJpbmcsczpzdHJpbmcsbWw6TWFwcGVkTGF5ZXIpPT5zdHJpbmd9ID0ge1xuICB0ZHM6KGhvc3Q6c3RyaW5nLGZuOnN0cmluZyk9PntcbiAgICBsZXQgY29tcG9uZW50cyA9IGZuLnNwbGl0KCcvJyk7XG4gICAgY29tcG9uZW50cy5wb3AoKTtcbiAgICByZXR1cm4gYCR7aG9zdH0vY2F0YWxvZy8ke2NvbXBvbmVudHMuam9pbignLycpfS9jYXRhbG9nLmh0bWxgO1xuICB9LFxuICBzdGF0aWM6KGhvc3Q6c3RyaW5nLGZuOnN0cmluZyxtbDpNYXBwZWRMYXllcik9PntcbiAgICByZXR1cm4gbWwubGF5ZXIub3B0aW9ucy5kb3dubG9hZFBhdGggfHwgYCR7aG9zdH0ke2ZufWA7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFdNU19QQVJBTUVURVJfTkFNRVM6e1trZXk6c3RyaW5nXTpBcnJheTxzdHJpbmc+fSA9IHtcbiAgdGRzOiBbXG4gICAgJ2xheWVycycsXG4gICAgJ3N0eWxlcycsXG4gICAgJ2NvbG9yc2NhbGVyYW5nZScsXG4gICAgJ2Fib3ZlbWF4Y29sb3InLFxuICAgICdiZWxvd21pbmNvbG9yJyxcbiAgICAndGltZScsXG4gICAgJ3RyYW5zcGFyZW50JyxcbiAgICAnbG9nc2NhbGUnXG4gIF0sXG4gIGdlb3NlcnZlcjogW1xuICAgICd0cmFuc3BhcmVudCcsXG4gICAgJ2xheWVycydcbiAgXSxcbiAgZXNyaTogW1xuICAgICdsYXllcnMnLFxuICAgICdzdHlsZXMnLFxuICAgICd0cmFuc3BhcmVudCdcbiAgXVxufTtcblxuZXhwb3J0IGNvbnN0IFdNU19VUkxfRk9STUFUOntba2V5OnN0cmluZ106c3RyaW5nfSA9IHtcbiAgdGRzOicvd21zLycsXG4gIGdlb3NlcnZlcjonL3dtcy8nLFxuICBlc3JpOicvJ1xufTtcblxuZXhwb3J0IGNvbnN0IElOVEVSUE9MQVRFRF9QQVJBTUVURVJTID0gW1xuICAnc3R5bGVzJyxcbiAgJ2xheWVycydcbl07XG5cbmV4cG9ydCBjbGFzcyBNYXBwZWRMYXllciB7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OmFueSl7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLGRhdGF8fHt9KTtcbiAgICBpZih0aGlzLmxheWVyVHlwZT09PXVuZGVmaW5lZCl7XG4gICAgICB0aGlzLmxheWVyVHlwZSA9IHRoaXMud21zUGFyYW1ldGVycz8nd21zJzp1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgdGl0bGU6c3RyaW5nO1xuXG4gIGxheWVyOiBMYXllcjtcbiAgb3B0aW9uczogTWFwcGVkTGF5ZXJPcHRpb25zID0ge1xuICAgIGRhdGU6IG5ldyBEYXRlKDIwMTksIDAsIDEpIC8vIFNldCB0byBtb3N0IHJlY2VudCBhdmFpbGFibGUgZGF0ZVxuICB9O1xuXG4gIGxlZ2VuZFVSTDpzdHJpbmc7XG4gIGxheWVyVHlwZTogTWFwcGVkTGF5ZXJUeXBlcztcbiAgcmV0cmlldmVkTWV0YWRhdGE6IHtba2V5OnN0cmluZ106YW55fSA9IHt9O1xuXG4gIGludGVycG9sYXRlZEZpbGU6c3RyaW5nO1xuICBpbnRlcnBvbGF0ZWREb3dubG9hZFVSTDpzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xuICB3bXNQYXJhbWV0ZXJzOiBhbnkgPSB7fTtcbiAgZmxhdHRlbmVkU2V0dGluZ3M6IGFueSA9IHt9O1xuICBzdGF0aWNEYXRhOmFueTtcbiAgb3BhY2l0eSA9IDEuMDtcblxuICBfc3R5bGVGdW5jOiAoZjphbnkpPT52b2lkO1xuXG4gIGRlc2NyaXB0aW9uKCk6c3RyaW5ne1xuICAgIHJldHVybiB0aGlzLmxheWVyLmRlc2NyaXB0aW9uIHx8XG4gICAgICAodGhpcy5yZXRyaWV2ZWRNZXRhZGF0YSAmJlxuICAgICAgIHRoaXMucmV0cmlldmVkTWV0YWRhdGFbdGhpcy5sYXllci5kZXNjcmlwdGlvbkZpZWxkfHwnbG9uZ19uYW1lJ10pO1xuICB9XG5cbiAgbGVhZGluZzAobjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAobiA8IDEwKSB7XG4gICAgICByZXR1cm4gJzAnICsgbjtcbiAgICB9XG4gICAgcmV0dXJuICcnICsgbjtcbiAgfVxuXG4gIGRlZmF1bHRQdWJsaWNhdGlvbigpOm51bWJlcntcbiAgICBjb25zdCBwcmlvcml0eVB1YmxpY2F0aW9uID0gUFVCTElDQVRJT05fUFJJT1JJVFlfT1JERVIuZmluZChcbiAgICAgIHBwPT50aGlzLmxheWVyLnB1YmxpY2F0aW9ucy5maW5kSW5kZXgobHA9PihscC50aW1lc3RlcD09PXBwKXx8KGxwLmxhYmVsPT09cHApKT49MCk7XG4gICAgaWYocHJpb3JpdHlQdWJsaWNhdGlvbil7XG4gICAgICByZXR1cm4gdGhpcy5sYXllci5wdWJsaWNhdGlvbnMuZmluZEluZGV4KHA9PihwLmxhYmVsPT09cHJpb3JpdHlQdWJsaWNhdGlvbil8fChwLnRpbWVzdGVwPT09cHJpb3JpdHlQdWJsaWNhdGlvbikpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sYXllci5wdWJsaWNhdGlvbnMuZmluZEluZGV4KHAgPT4gIXAuc2tpcCk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5vcHRpb25zLnB1YmxpY2F0aW9uID0gKHRoaXMub3B0aW9ucy5wdWJsaWNhdGlvbiA9PT0gdW5kZWZpbmVkKSA/XG4gICAgICB0aGlzLmRlZmF1bHRQdWJsaWNhdGlvbigpIDpcbiAgICAgIHRoaXMub3B0aW9ucy5wdWJsaWNhdGlvbjtcblxuICAgIGNvbnN0IHB1YmxpY2F0aW9uID0gdGhpcy5sYXllci5wdWJsaWNhdGlvbnNbdGhpcy5vcHRpb25zLnB1YmxpY2F0aW9uXTtcblxuICAgIGNvbnN0IGhvc3QgPSBwdWJsaWNhdGlvbi5vcHRpb25zLmhvc3QgfHwge307XG4gICAgY29uc3QgYmFzZVVSTCA9IGhvc3QudXJsO1xuXG4gICAgY29uc3Qgc29mdHdhcmUgPSBob3N0LnNvZnR3YXJlIHx8ICd0ZHMnO1xuXG4gICAgdGhpcy5pbnRlcnBvbGF0ZWRGaWxlID0gKHB1YmxpY2F0aW9uLm9wdGlvbnMuZmlsZXBhdGggfHwgJycpXG4gICAgY29uc3QgbWFwUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgIHRoaXMubGF5ZXIsXG4gICAgICBwdWJsaWNhdGlvbi5vcHRpb25zLFxuICAgICAgcHVibGljYXRpb24ub3B0aW9ucy5tYXBPcHRpb25zIHx8IHt9LFxuICAgICAgdGhpcy5vcHRpb25zLmRhdGUgPyB7XG4gICAgICAgIGRlY2FkZTogZGVjYWRlVGV4dCh0aGlzLm9wdGlvbnMuZGF0ZSksXG4gICAgICAgIHllYXI6IHRoaXMub3B0aW9ucy5kYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgIG1vbnRoOiB0aGlzLmxlYWRpbmcwKHRoaXMub3B0aW9ucy5kYXRlLmdldE1vbnRoKCkgKyAxKSxcbiAgICAgICAgZGF5OiB0aGlzLmxlYWRpbmcwKHRoaXMub3B0aW9ucy5kYXRlLmdldERhdGUoKSksXG4gICAgICB9IDoge30sXG4gICAgICB0aGlzLm9wdGlvbnMsXG4gICAgICB0aGlzLm9wdGlvbnMudGFncyB8fCB7fSk7XG5cbiAgICBpZiAobWFwUGFyYW1zLnRpbWVGb3JtYXQpIHtcbiAgICAgIG1hcFBhcmFtc1sndGltZSddID0gSW50ZXJwb2xhdGlvblNlcnZpY2UuaW50ZXJwb2xhdGUobWFwUGFyYW1zLnRpbWVGb3JtYXQsIG1hcFBhcmFtcyk7XG4gICAgfVxuICAgIG1hcFBhcmFtcy5sYXllcnMgPSBtYXBQYXJhbXMubGF5ZXJzIHx8IG1hcFBhcmFtcy5sYXllciB8fCBtYXBQYXJhbXMudmFyaWFibGU7XG4gICAgSU5URVJQT0xBVEVEX1BBUkFNRVRFUlMuZm9yRWFjaChwPT57XG4gICAgICBpZihtYXBQYXJhbXNbcF0pe1xuICAgICAgICBtYXBQYXJhbXNbcF0gPSBJbnRlcnBvbGF0aW9uU2VydmljZS5pbnRlcnBvbGF0ZShtYXBQYXJhbXNbcF0sbWFwUGFyYW1zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmludGVycG9sYXRlZEZpbGUgPSBJbnRlcnBvbGF0aW9uU2VydmljZS5pbnRlcnBvbGF0ZSh0aGlzLmludGVycG9sYXRlZEZpbGUsIG1hcFBhcmFtcyk7XG4gICAgdGhpcy51cmwgPSBiYXNlVVJMICsgV01TX1VSTF9GT1JNQVRbc29mdHdhcmVdICsgdGhpcy5pbnRlcnBvbGF0ZWRGaWxlO1xuICAgIGlmKE1BS0VfRE9XTkxPQURfVVJMW3NvZnR3YXJlXSl7XG4gICAgICB0aGlzLmludGVycG9sYXRlZERvd25sb2FkVVJMPU1BS0VfRE9XTkxPQURfVVJMW3NvZnR3YXJlXShob3N0LmRvd25sb2FkTGlua3x8YmFzZVVSTCx0aGlzLmludGVycG9sYXRlZEZpbGUsdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW50ZXJwb2xhdGVkRG93bmxvYWRVUkw9aG9zdC5kb3dubG9hZExpbmt8fG51bGw7XG4gICAgfVxuXG4gICAgaWYodGhpcy5sYXllci5vcHRpb25zLmxlZ2VuZD09PSd3bXMnKXtcbiAgICAgIHRoaXMubGVnZW5kVVJMID0gdGhpcy51cmwgKyAnP3NlcnZpY2U9V01TJnJlcXVlc3Q9R2V0TGVnZW5kR3JhcGhpYyZmb3JtYXQ9aW1hZ2UvcG5nJztcbiAgICAgIHRoaXMubGVnZW5kVVJMICs9IGAmbGF5ZXI9JHtJbnRlcnBvbGF0aW9uU2VydmljZS5pbnRlcnBvbGF0ZShtYXBQYXJhbXMubGF5ZXJzLG1hcFBhcmFtcyl9YDtcbiAgICAgIHRoaXMubGVnZW5kVVJMICs9ICcmdmVyc2lvbj0xLjEuMSc7XG4gICAgICB0aGlzLm9wdGlvbnMubGVnZW5kPXRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGVnZW5kVVJMPW51bGw7XG4gICAgfVxuXG4gICAgaWYgKG1hcFBhcmFtcy52ZWN0b3JzKSB7XG4gICAgICB0aGlzLndtc1BhcmFtZXRlcnMgPSBudWxsO1xuICAgICAgdGhpcy5sYXllclR5cGUgPSAndmVjdG9yJztcbiAgICAgIGxldCBzdHlsZXMgPSBtYXBQYXJhbXMuc3R5bGVzIHx8IHt9O1xuICAgICAgdGhpcy5fc3R5bGVGdW5jID0gKGY6YW55KT0+e1xuICAgICAgICByZXR1cm4gc3R5bGVzO1xuICAgICAgfVxuXG4gICAgICBpZihtYXBQYXJhbXMudmVjdG9ycz09PSdwb2ludCcgJiYgbWFwUGFyYW1zLnN0eWxlcyl7XG4gICAgICAgIHRoaXMubGF5ZXJUeXBlID0gJ2NpcmNsZSc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGF5ZXJUeXBlID0gJ3dtcyc7XG4gICAgICB0aGlzLndtc1BhcmFtZXRlcnMgPSB7fTtcbiAgICAgIFdNU19QQVJBTUVURVJfTkFNRVNbc29mdHdhcmVdLmZvckVhY2gocGFyYW0gPT4ge1xuICAgICAgICBpZiAobWFwUGFyYW1zW3BhcmFtXSkge1xuICAgICAgICAgIHRoaXMud21zUGFyYW1ldGVyc1twYXJhbV0gPSBtYXBQYXJhbXNbcGFyYW1dO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5mbGF0dGVuZWRTZXR0aW5ncyA9IG1hcFBhcmFtcztcblxuICAgIGlmKG1hcFBhcmFtcy50aXRsZUZvcm1hdCl7XG4gICAgICB0aGlzLnRpdGxlID0gSW50ZXJwb2xhdGlvblNlcnZpY2UuaW50ZXJwb2xhdGUobWFwUGFyYW1zLnRpdGxlRm9ybWF0LG1hcFBhcmFtcylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aXRsZSA9IHRoaXMubGF5ZXIubmFtZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVjYWRlVGV4dChkOiBEYXRlKTogc3RyaW5nIHtcbiAgbGV0IGRlY2FkZSA9IGQuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpLnNsaWNlKDAsIDMpO1xuICByZXR1cm4gYCR7ZGVjYWRlfTAtJHtkZWNhZGV9OWA7XG59XG4iXX0=