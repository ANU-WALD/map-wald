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
const colorbrewer_1 = require("./colorbrewer");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const DEFAULT_NUM_COLOURS = 3;
let PaletteService = class PaletteService {
    constructor(_http) {
        this._http = _http;
        this.namedPalettes = {};
        this._source = '';
    }
    set source(val) {
        this._source = val;
    }
    getPalette(name, reverse, numColours) {
        var palette = null;
        if (this.namedPalettes[name]) {
            palette = this.namedPalettes[name];
        }
        else if (colorbrewer_1.palettes[name]) {
            palette = colorbrewer_1.palettes[name][numColours || DEFAULT_NUM_COLOURS];
        }
        if (palette) {
            if (reverse) {
                return rxjs_1.of(palette.slice().reverse());
            }
            return rxjs_1.of(palette.slice());
        }
        return this._http.get(this._source + '/' + name + '.pal', { responseType: 'text' }).pipe(operators_1.map((text) => this.parseNCWMSPalette(text)));
    }
    parseNCWMSPalette(txt) {
        return txt.split('\n')
            .map(ln => ln.replace(/\#.*/g, '').trim().replace(/ +/g, ' '))
            .filter(ln => ln.length)
            .map(e => `rgb(${e.split(' ').join(',')})`);
    }
    colourIndex(val, min, max, count) {
        let point = (val - min) / (max - min);
        let pos = Math.round(point * (count - 1));
        return pos;
    }
};
PaletteService.ctorParameters = () => [
    { type: http_1.HttpClient }
];
PaletteService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], PaletteService);
exports.PaletteService = PaletteService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJwYWxldHRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFDM0MsK0NBQXVDO0FBQ3ZDLCtDQUFrRDtBQUNsRCwrQkFBc0M7QUFDdEMsOENBQXFDO0FBTXJDLE1BQU0sbUJBQW1CLEdBQUMsQ0FBQyxDQUFDO0FBRzVCLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFHekIsWUFBb0IsS0FBZ0I7UUFBaEIsVUFBSyxHQUFMLEtBQUssQ0FBVztRQUZwQyxrQkFBYSxHQUFnQyxFQUFFLENBQUM7UUFNeEMsWUFBTyxHQUFRLEVBQUUsQ0FBQztJQUYxQixDQUFDO0lBR0QsSUFBSSxNQUFNLENBQUMsR0FBVTtRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVcsRUFBQyxPQUFnQixFQUFDLFVBQWtCO1FBQ3hELElBQUksT0FBTyxHQUFzQixJQUFJLENBQUM7UUFDdEMsSUFBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFDO1lBQzFCLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBRyxzQkFBUSxDQUFDLElBQUksQ0FBQyxFQUFDO1lBQ3ZCLE9BQU8sR0FBRyxzQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsSUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1NBQzNEO1FBRUQsSUFBRyxPQUFPLEVBQUM7WUFDVCxJQUFHLE9BQU8sRUFBQztnQkFDVCxPQUFPLFNBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzthQUN0QztZQUNELE9BQU8sU0FBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzVCO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsR0FBQyxJQUFJLEdBQUMsTUFBTSxFQUFDLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUMvRSxlQUFHLENBQUMsQ0FBQyxJQUFXLEVBQUMsRUFBRSxDQUFBLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELGlCQUFpQixDQUFDLEdBQVU7UUFDMUIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNuQixHQUFHLENBQUMsRUFBRSxDQUFBLEVBQUUsQ0FBQSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3pELE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7YUFDdkIsR0FBRyxDQUFDLENBQUMsQ0FBQSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUFVLEVBQUMsR0FBVSxFQUFDLEdBQVUsRUFBQyxLQUFZO1FBQ3ZELElBQUksS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFDLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQ0YsQ0FBQTs7WUF4QzJCLGlCQUFVOztBQUh6QixjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBSWUsaUJBQVU7R0FIekIsY0FBYyxDQTJDMUI7QUEzQ1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3BhbGV0dGVzfSBmcm9tICcuL2NvbG9yYnJld2VyJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgdHlwZSBDb2xvdXJTcGVjaWZpY2F0aW9uID0gc3RyaW5nO1xuZXhwb3J0IHR5cGUgQ29sb3VyUGFsZXR0ZSA9IEFycmF5PENvbG91clNwZWNpZmljYXRpb24+O1xuXG5cbmNvbnN0IERFRkFVTFRfTlVNX0NPTE9VUlM9MztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhbGV0dGVTZXJ2aWNlIHtcbiAgbmFtZWRQYWxldHRlczp7W2tleTpzdHJpbmddOkNvbG91clBhbGV0dGV9ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDpIdHRwQ2xpZW50KSB7XG5cbiAgfVxuXG4gIHByaXZhdGUgX3NvdXJjZTpzdHJpbmc9Jyc7XG4gIHNldCBzb3VyY2UodmFsOnN0cmluZyl7XG4gICAgdGhpcy5fc291cmNlPXZhbDtcbiAgfVxuXG4gIGdldFBhbGV0dGUobmFtZTpzdHJpbmcscmV2ZXJzZT86Ym9vbGVhbixudW1Db2xvdXJzPzpudW1iZXIpOk9ic2VydmFibGU8Q29sb3VyUGFsZXR0ZT57XG4gICAgdmFyIHBhbGV0dGU6KENvbG91clBhbGV0dGV8bnVsbCk9bnVsbDtcbiAgICBpZih0aGlzLm5hbWVkUGFsZXR0ZXNbbmFtZV0pe1xuICAgICAgcGFsZXR0ZSA9IHRoaXMubmFtZWRQYWxldHRlc1tuYW1lXTtcbiAgICB9IGVsc2UgaWYocGFsZXR0ZXNbbmFtZV0pe1xuICAgICAgcGFsZXR0ZSA9IHBhbGV0dGVzW25hbWVdW251bUNvbG91cnN8fERFRkFVTFRfTlVNX0NPTE9VUlNdO1xuICAgIH1cblxuICAgIGlmKHBhbGV0dGUpe1xuICAgICAgaWYocmV2ZXJzZSl7XG4gICAgICAgIHJldHVybiBvZihwYWxldHRlLnNsaWNlKCkucmV2ZXJzZSgpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvZihwYWxldHRlLnNsaWNlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLl9zb3VyY2UrJy8nK25hbWUrJy5wYWwnLHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSkucGlwZShcbiAgICAgIG1hcCgodGV4dDpzdHJpbmcpPT50aGlzLnBhcnNlTkNXTVNQYWxldHRlKHRleHQpKSk7XG4gIH1cblxuICBwYXJzZU5DV01TUGFsZXR0ZSh0eHQ6c3RyaW5nKTpDb2xvdXJQYWxldHRle1xuICAgIHJldHVybiB0eHQuc3BsaXQoJ1xcbicpXG4gICAgICAubWFwKGxuPT5sbi5yZXBsYWNlKC9cXCMuKi9nLCcnKS50cmltKCkucmVwbGFjZSgvICsvZywnICcpKVxuICAgICAgLmZpbHRlcihsbiA9PiBsbi5sZW5ndGgpXG4gICAgICAubWFwKGU9PiBgcmdiKCR7ZS5zcGxpdCgnICcpLmpvaW4oJywnKX0pYCk7XG4gIH1cblxuICBjb2xvdXJJbmRleCh2YWw6bnVtYmVyLG1pbjpudW1iZXIsbWF4Om51bWJlcixjb3VudDpudW1iZXIpOm51bWJlcntcbiAgICBsZXQgcG9pbnQgPSAodmFsLW1pbikvKG1heC1taW4pO1xuICAgIGxldCBwb3MgPSBNYXRoLnJvdW5kKHBvaW50Kihjb3VudC0xKSk7XG4gICAgcmV0dXJuIHBvcztcbiAgfVxufVxuIl19