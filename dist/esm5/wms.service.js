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
var core_1 = require("@angular/core");
//const proj4 = require('proj4');
//const Proj = proj4.Proj;
//const defs = proj4.defs;
//proj4.InterfaceProjection;
//const InterfaceCoordinates = proj4.InterfaceCoordinates;
//const TemplateCoordinates = proj4.TemplateCoordinates;
//const proj4 = require('proj4').default;
var proj4 = require("proj4");
var D2R = Math.PI / 180;
var WMSService = /** @class */ (function () {
    function WMSService() {
        this.webMercator = (proj4.default || proj4).Proj('EPSG:3857');
        //this.webMercator = proj4.Proj(proj4.defs('EPSG:3857'));
    }
    WMSService_1 = WMSService;
    WMSService.prototype.pointToWebMercator = function (pt) {
        var ptRadians = { x: pt.lng() * D2R, y: pt.lat() * D2R };
        var ptWM = this.webMercator.forward({ x: ptRadians.x, y: ptRadians.y });
        return ptWM;
    };
    ;
    WMSService.prototype.computeTileBounds = function (map, coord, zoom) {
        var proj = map.getProjection();
        var zfactor = Math.pow(2, zoom);
        var xScale = WMSService_1.TILE_WIDTH / zfactor;
        var yScale = WMSService_1.TILE_HEIGHT / zfactor;
        var topLeftLatLng = proj.fromPointToLatLng({ x: coord.x * xScale, y: coord.y * yScale });
        var bottomRightLatLng = proj.fromPointToLatLng({ x: (coord.x + 1) * xScale, y: (coord.y + 1) * yScale });
        var topLeftWebMercator = this.pointToWebMercator(topLeftLatLng);
        var bottomRightWebMercator = this.pointToWebMercator(bottomRightLatLng);
        if (topLeftWebMercator.x > bottomRightWebMercator.x) {
            if (topLeftLatLng.lng() === 180.0) {
                topLeftWebMercator.x = -topLeftWebMercator.x;
            }
            else {
                bottomRightWebMercator.x = -bottomRightWebMercator.x;
            }
        }
        var bbox = [topLeftWebMercator.x, bottomRightWebMercator.y, bottomRightWebMercator.x, topLeftWebMercator.y];
        var bboxTxt = bbox.map(function (n) { return n.toFixed(20).replace(/\.?0+$/, ""); }); // Avoid e notation on small numbers
        return bboxTxt.join(',');
    };
    ;
    WMSService.prototype.buildImageMap = function (getMap, getURL, getOptions, getOpacity) {
        var me = this;
        return new window.google.maps.ImageMapType({
            getTileUrl: function (coord, zoom) {
                var theMap = getMap();
                if (!theMap) {
                    return '';
                }
                var bbox = me.computeTileBounds(theMap, coord, zoom);
                var url = getURL(zoom) + '&service=WMS&version=1.1.1&request=GetMap';
                url += "&BBOX=" + bbox; // set bounding box
                url += "&FORMAT=image/png"; //WMS format
                var layerParams = getOptions ? getOptions(zoom) : {};
                layerParams.width = WMSService_1.TILE_WIDTH;
                layerParams.height = WMSService_1.TILE_HEIGHT;
                for (var key in layerParams) {
                    url += '&' + key + '=' + layerParams[key];
                }
                url += "&SRS=EPSG:3857"; //set Web Mercator
                return url;
            },
            tileSize: new window.google.maps.Size(WMSService_1.TILE_SIZE, WMSService_1.TILE_SIZE),
            isPng: true,
            opacity: getOpacity ? getOpacity() : 1.0
        });
    };
    ;
    var WMSService_1;
    WMSService.TILE_SIZE = 256;
    WMSService.TILE_WIDTH = WMSService_1.TILE_SIZE;
    WMSService.TILE_HEIGHT = WMSService_1.TILE_SIZE;
    WMSService = WMSService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], WMSService);
    return WMSService;
}());
exports.WMSService = WMSService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbIndtcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLGlDQUFpQztBQUNqQywwQkFBMEI7QUFDMUIsMEJBQTBCO0FBQzFCLDRCQUE0QjtBQUM1QiwwREFBMEQ7QUFDMUQsd0RBQXdEO0FBRXhELHlDQUF5QztBQUN6Qyw2QkFBK0I7QUFDL0IsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLENBQUM7QUFHeEI7SUFNRTtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBTyxLQUFNLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyRSx5REFBeUQ7SUFDM0QsQ0FBQzttQkFUVSxVQUFVO0lBYWQsdUNBQWtCLEdBQXpCLFVBQTBCLEVBQU07UUFDOUIsSUFBSSxTQUFTLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFDLEdBQUcsRUFBQyxDQUFDO1FBQ2hELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ25FLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUFBLENBQUM7SUFFSyxzQ0FBaUIsR0FBeEIsVUFBeUIsR0FBTyxFQUFDLEtBQVMsRUFBQyxJQUFXO1FBQ3BELElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMvQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJ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Q0FBQyxXQUFXLENBQUM7Z0JBQzVDLEtBQUksSUFBSSxHQUFHLElBQUksV0FBVyxFQUFDO29CQUN6QixHQUFHLElBQUksR0FBRyxHQUFDLEdBQUcsR0FBQyxHQUFHLEdBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNyQztnQkFDRCxHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBSyxrQkFBa0I7Z0JBQy9DLE9BQU8sR0FBRyxDQUFDO1lBQ2IsQ0FBQztZQUNELFFBQVEsRUFBQyxJQUFVLE1BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFVLENBQUMsU0FBUyxFQUFDLFlBQVUsQ0FBQyxTQUFTLENBQUM7WUFDdEYsS0FBSyxFQUFDLElBQUk7WUFDVixPQUFPLEVBQUMsVUFBVSxDQUFBLENBQUMsQ0FBQSxVQUFVLEVBQUUsQ0FBQSxDQUFDLENBQUEsR0FBRztTQUNwQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQUEsQ0FBQzs7SUF6RUssb0JBQVMsR0FBQyxHQUFHLENBQUM7SUFDZCxxQkFBVSxHQUFDLFlBQVUsQ0FBQyxTQUFTLENBQUM7SUFDaEMsc0JBQVcsR0FBQyxZQUFVLENBQUMsU0FBUyxDQUFDO0lBSjdCLFVBQVU7UUFEdEIsaUJBQVUsRUFBRTs7T0FDQSxVQUFVLENBNkV0QjtJQUFELGlCQUFDO0NBQUEsQUE3RUQsSUE2RUM7QUE3RVksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vL2NvbnN0IHByb2o0ID0gcmVxdWlyZSgncHJvajQnKTtcbi8vY29uc3QgUHJvaiA9IHByb2o0LlByb2o7XG4vL2NvbnN0IGRlZnMgPSBwcm9qNC5kZWZzO1xuLy9wcm9qNC5JbnRlcmZhY2VQcm9qZWN0aW9uO1xuLy9jb25zdCBJbnRlcmZhY2VDb29yZGluYXRlcyA9IHByb2o0LkludGVyZmFjZUNvb3JkaW5hdGVzO1xuLy9jb25zdCBUZW1wbGF0ZUNvb3JkaW5hdGVzID0gcHJvajQuVGVtcGxhdGVDb29yZGluYXRlcztcblxuLy9jb25zdCBwcm9qNCA9IHJlcXVpcmUoJ3Byb2o0JykuZGVmYXVsdDtcbmltcG9ydCAqIGFzIHByb2o0IGZyb20gJ3Byb2o0JztcbmNvbnN0IEQyUiA9IE1hdGguUEkvMTgwO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV01TU2VydmljZSB7XG5cbiAgc3RhdGljIFRJTEVfU0laRT0yNTY7XG4gIHN0YXRpYyBUSUxFX1dJRFRIPVdNU1NlcnZpY2UuVElMRV9TSVpFO1xuICBzdGF0aWMgVElMRV9IRUlHSFQ9V01TU2VydmljZS5USUxFX1NJWkU7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy53ZWJNZXJjYXRvciA9ICgoPGFueT5wcm9qNCkuZGVmYXVsdCB8fCBwcm9qNCkuUHJvaignRVBTRzozODU3Jyk7XG4gICAgLy90aGlzLndlYk1lcmNhdG9yID0gcHJvajQuUHJvaihwcm9qNC5kZWZzKCdFUFNHOjM4NTcnKSk7XG4gIH1cblxuICBwdWJsaWMgd2ViTWVyY2F0b3I6IGFueTtcblxuICBwdWJsaWMgcG9pbnRUb1dlYk1lcmNhdG9yKHB0OmFueSk6e3g6bnVtYmVyLHk6bnVtYmVyfXtcbiAgICB2YXIgcHRSYWRpYW5zID0ge3g6cHQubG5nKCkqRDJSLHk6cHQubGF0KCkqRDJSfTtcbiAgICB2YXIgcHRXTSA9IHRoaXMud2ViTWVyY2F0b3IuZm9yd2FyZCh7eDpwdFJhZGlhbnMueCx5OnB0UmFkaWFucy55fSk7XG4gICAgcmV0dXJuIHB0V007XG4gIH07XG5cbiAgcHVibGljIGNvbXB1dGVUaWxlQm91bmRzKG1hcDphbnksY29vcmQ6YW55LHpvb206bnVtYmVyKTpzdHJpbmd7XG4gICAgdmFyIHByb2ogPSBtYXAuZ2V0UHJvamVjdGlvbigpO1xuICAgIHZhciB6ZmFjdG9yID0gTWF0aC5wb3coMiwgem9vbSk7XG4gICAgdmFyIHhTY2FsZSA9IFdNU1NlcnZpY2UuVElMRV9XSURUSC96ZmFjdG9yO1xuICAgIHZhciB5U2NhbGUgPSBXTVNTZXJ2aWNlLlRJTEVfSEVJR0hUL3pmYWN0b3I7XG5cbiAgICB2YXIgdG9wTGVmdExhdExuZyA9IHByb2ouZnJvbVBvaW50VG9MYXRMbmcoe3g6Y29vcmQueCAqIHhTY2FsZSwgeTpjb29yZC55ICogeVNjYWxlfSk7XG4gICAgdmFyIGJvdHRvbVJpZ2h0TGF0TG5nID0gcHJvai5mcm9tUG9pbnRUb0xhdExuZyh7eDooY29vcmQueCArIDEpICogeFNjYWxlLCB5Oihjb29yZC55ICsgMSkgKiB5U2NhbGV9KTtcblxuICAgIHZhciB0b3BMZWZ0V2ViTWVyY2F0b3IgPSB0aGlzLnBvaW50VG9XZWJNZXJjYXRvcih0b3BMZWZ0TGF0TG5nKTtcbiAgICB2YXIgYm90dG9tUmlnaHRXZWJNZXJjYXRvciA9IHRoaXMucG9pbnRUb1dlYk1lcmNhdG9yKGJvdHRvbVJpZ2h0TGF0TG5nKTtcblxuICAgIGlmKHRvcExlZnRXZWJNZXJjYXRvci54ID4gYm90dG9tUmlnaHRXZWJNZXJjYXRvci54KXtcbiAgICAgIGlmKHRvcExlZnRMYXRMbmcubG5nKCk9PT0xODAuMCl7XG4gICAgICAgIHRvcExlZnRXZWJNZXJjYXRvci54ID0gLXRvcExlZnRXZWJNZXJjYXRvci54O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm90dG9tUmlnaHRXZWJNZXJjYXRvci54ID0gLWJvdHRvbVJpZ2h0V2ViTWVyY2F0b3IueDtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGJib3ggPSBbdG9wTGVmdFdlYk1lcmNhdG9yLngsYm90dG9tUmlnaHRXZWJNZXJjYXRvci55LGJvdHRvbVJpZ2h0V2ViTWVyY2F0b3IueCx0b3BMZWZ0V2ViTWVyY2F0b3IueV07XG4gICAgdmFyIGJib3hUeHQgPSBiYm94Lm1hcCgobik9Pm4udG9GaXhlZCgyMCkucmVwbGFjZSgvXFwuPzArJC8sXCJcIikpOyAvLyBBdm9pZCBlIG5vdGF0aW9uIG9uIHNtYWxsIG51bWJlcnNcbiAgICByZXR1cm4gYmJveFR4dC5qb2luKCcsJyk7XG4gIH07XG5cbiAgcHVibGljIGJ1aWxkSW1hZ2VNYXAoZ2V0TWFwOigpPT5hbnksXG4gICAgICAgICAgICAgICAgICAgICAgIGdldFVSTDooem9vbTpudW1iZXIpPT5zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgIGdldE9wdGlvbnM/Oih6b29tOm51bWJlcik9PmFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgZ2V0T3BhY2l0eT86KCk9Pm51bWJlcik6YW55e1xuICAgIHZhciBtZSA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyAoPGFueT53aW5kb3cpLmdvb2dsZS5tYXBzLkltYWdlTWFwVHlwZSh7XG4gICAgICBnZXRUaWxlVXJsOiBmdW5jdGlvbihjb29yZDphbnksem9vbTpudW1iZXIpOnN0cmluZ3tcbiAgICAgICAgdmFyIHRoZU1hcCA9IGdldE1hcCgpO1xuICAgICAgICBpZighdGhlTWFwKXtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHZhciBiYm94ID0gbWUuY29tcHV0ZVRpbGVCb3VuZHModGhlTWFwLGNvb3JkLHpvb20pO1xuXG4gICAgICAgIHZhciB1cmwgPSBnZXRVUkwoem9vbSkgKyAnJnNlcnZpY2U9V01TJnZlcnNpb249MS4xLjEmcmVxdWVzdD1HZXRNYXAnO1xuICAgICAgICB1cmwgKz0gXCImQkJPWD1cIiArIGJib3g7ICAgICAgLy8gc2V0IGJvdW5kaW5nIGJveFxuICAgICAgICB1cmwgKz0gXCImRk9STUFUPWltYWdlL3BuZ1wiIDsgLy9XTVMgZm9ybWF0XG5cbiAgICAgICAgdmFyIGxheWVyUGFyYW1zID0gZ2V0T3B0aW9ucz9nZXRPcHRpb25zKHpvb20pOnt9O1xuICAgICAgICBsYXllclBhcmFtcy53aWR0aCA9IFdNU1NlcnZpY2UuVElMRV9XSURUSDtcbiAgICAgICAgbGF5ZXJQYXJhbXMuaGVpZ2h0ID0gV01TU2VydmljZS5USUxFX0hFSUdIVDtcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gbGF5ZXJQYXJhbXMpe1xuICAgICAgICAgIHVybCArPSAnJicra2V5Kyc9JytsYXllclBhcmFtc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIHVybCArPSBcIiZTUlM9RVBTRzozODU3XCI7ICAgICAvL3NldCBXZWIgTWVyY2F0b3JcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgIH0sXG4gICAgICB0aWxlU2l6ZTpuZXcgKDxhbnk+d2luZG93KS5nb29nbGUubWFwcy5TaXplKFdNU1NlcnZpY2UuVElMRV9TSVpFLFdNU1NlcnZpY2UuVElMRV9TSVpFKSxcbiAgICAgIGlzUG5nOnRydWUsXG4gICAgICBvcGFjaXR5OmdldE9wYWNpdHk/Z2V0T3BhY2l0eSgpOjEuMFxuICAgIH0pO1xuICB9O1xuXG59XG4iXX0=