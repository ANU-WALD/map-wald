import { __values } from "tslib";
var NAMED_OPTIONS = {
    host: 'namedHosts',
    interval: 'namedIntervals'
};
function clone(v) {
    return JSON.parse(JSON.stringify(v));
}
function matchFirstDefinedKey(keys, lhs, rhs) {
    var e_1, _a;
    try {
        for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
            var k = keys_1_1.value;
            if (lhs[k] && rhs[k]) {
                return lhs[k] === rhs[k];
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return false;
}
function mergeArraysByKeys(keys) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    if (!sources.length) {
        return [];
    }
    var result = clone(sources[0]).map(function (p) { return new Publication(p); });
    for (var i = 1; i < sources.length; i++) {
        var source = sources[i];
        for (var j = 0; j < source.length; j++) {
            var publication = source[j];
            var match = result.findIndex(function (pub) { return matchFirstDefinedKey(keys, pub, publication); });
            if (match >= 0) {
                var options = Object.assign({}, publication.options || {}, result[match].options || {});
                result[match] = Object.assign(new Publication(), publication, result[match]);
                result[match].options = options;
            }
            else {
                result.push(new Publication(clone(publication)));
            }
        }
    }
    result = result.filter(function (p) { return !p.skip; });
    return result;
}
function propagate(target, source, skipPublications) {
    target.options = Object.assign({}, source.options || {}, target.options || {});
    if (!skipPublications) {
        target.publications = mergeArraysByKeys(['timestep', 'label'], target.publications || [], source.publications || []);
        //    console.log(target.publications);
    }
}
function instantiateNamedOptions(dest, source) {
    for (var key in NAMED_OPTIONS) {
        var configKey = NAMED_OPTIONS[key];
        if (!source[configKey]) {
            continue;
        }
        if (!dest[key] || (typeof (dest[key]) !== 'string')) {
            continue;
        }
        var lookup = dest[key];
        dest[key] = source[configKey][lookup];
    }
}
var CatalogOptions = /** @class */ (function () {
    function CatalogOptions() {
    }
    return CatalogOptions;
}());
export { CatalogOptions };
var Catalog = /** @class */ (function () {
    function Catalog(config) {
        this.themes = [];
        if (!config) {
            return;
        }
        Object.assign(this, config);
        this.themes = config.themes.map(function (t) { return new Theme(t); });
        this.propagateOptions();
        this.instantiateNamedOptions();
    }
    Catalog.prototype.propagateOptions = function () {
        var _this = this;
        this.themes.forEach(function (t) {
            propagate(t, _this);
            t.propagateOptions();
        });
    };
    Catalog.prototype.instantiateNamedOptions = function () {
        var _this = this;
        if (this.publications) {
            this.publications.forEach(function (p) { return p.instantiateNamedOptions(_this); });
        }
        this.themes.forEach(function (t) { return t.instantiateNamedOptions(_this); });
    };
    Catalog.prototype.allLayers = function () {
        return this.themes.map(function (t) { return t.layers; }).reduce(function (prev, curr) { return prev.concat(curr); }, []);
    };
    return Catalog;
}());
export { Catalog };
var Theme = /** @class */ (function () {
    function Theme(config) {
        this.layers = [];
        if (!config) {
            return;
        }
        Object.assign(this, config);
        if (config.layers) {
            this.layers = config.layers.map(function (l) { return new Layer(l); });
        }
        else {
            this.layers = [];
        }
    }
    Theme.prototype.propagateOptions = function () {
        var _this = this;
        this.layers.forEach(function (l) {
            propagate(l, _this);
            l.propagateOptions();
            l.dataCreator = l.dataCreator || _this.dataCreator;
        });
    };
    Theme.prototype.instantiateNamedOptions = function (source) {
        instantiateNamedOptions(this.options, source);
        this.publications.forEach(function (p) { return p.instantiateNamedOptions(source); });
        this.layers.forEach(function (l) { return l.instantiateNamedOptions(source); });
    };
    return Theme;
}());
export { Theme };
var Layer = /** @class */ (function () {
    function Layer(config) {
        this.publications = [];
        this.options = new CatalogOptions();
        if (!config) {
            return;
        }
        Object.assign(this, config);
        if (config.publications) {
            this.publications = config.publications.map(function (p) { return new Publication(p); });
        }
        else {
            this.publications = [];
        }
    }
    Layer.prototype.propagateOptions = function () {
        var _this = this;
        this.publications.forEach(function (p) {
            propagate(p, _this, true);
        });
    };
    Layer.prototype.instantiateNamedOptions = function (source) {
        instantiateNamedOptions(this.options, source);
        this.publications.forEach(function (p) { return p.instantiateNamedOptions(source); });
    };
    return Layer;
}());
export { Layer };
var Publication = /** @class */ (function () {
    function Publication(config) {
        this.options = new CatalogOptions();
        if (!config) {
            return;
        }
        Object.assign(this, config);
    }
    Publication.prototype.instantiateNamedOptions = function (source) {
        instantiateNamedOptions(this.options, source);
    };
    return Publication;
}());
export { Publication };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsiZGF0YS9jYXRhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxJQUFNLGFBQWEsR0FBdUI7SUFDeEMsSUFBSSxFQUFDLFlBQVk7SUFDakIsUUFBUSxFQUFDLGdCQUFnQjtDQUMxQixDQUFBO0FBRUQsU0FBUyxLQUFLLENBQUMsQ0FBSztJQUNsQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFFRCxTQUFTLG9CQUFvQixDQUFDLElBQWtCLEVBQUMsR0FBTyxFQUFDLEdBQU87OztRQUM5RCxLQUFhLElBQUEsU0FBQSxTQUFBLElBQUksQ0FBQSwwQkFBQSw0Q0FBQztZQUFkLElBQUksQ0FBQyxpQkFBQTtZQUNQLElBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFDaEIsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hCO1NBQ0Y7Ozs7Ozs7OztJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsSUFBa0I7SUFBQyxpQkFBb0M7U0FBcEMsVUFBb0MsRUFBcEMscUJBQW9DLEVBQXBDLElBQW9DO1FBQXBDLGdDQUFvQzs7SUFDaEYsSUFBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUM7UUFDakIsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUVELElBQUksTUFBTSxHQUFnQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFFLE9BQUEsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUV4RSxLQUFJLElBQUksQ0FB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QUFDO0lBQ2xFLENBQUM7SUFDSCxZQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQzs7QUFFRDtJQVNFLHFCQUFZLE1BQVc7UUFIdkIsWUFBTyxHQUFrQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBSTVDLElBQUcsQ0FBQyxNQUFNLEVBQUM7WUFDVCxPQUFPO1NBQ1I7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsNkNBQXVCLEdBQXZCLFVBQXdCLE1BQVU7UUFDaEMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBCb3VuZHMgfSBmcm9tICcuL2JvdW5kcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmNvbnN0IE5BTUVEX09QVElPTlM6e1trZXk6c3RyaW5nXTpzdHJpbmd9PXtcbiAgaG9zdDonbmFtZWRIb3N0cycsXG4gIGludGVydmFsOiduYW1lZEludGVydmFscydcbn1cblxuZnVuY3Rpb24gY2xvbmUodjphbnkpOmFueXtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodikpO1xufVxuXG5mdW5jdGlvbiBtYXRjaEZpcnN0RGVmaW5lZEtleShrZXlzOkFycmF5PHN0cmluZz4sbGhzOmFueSxyaHM6YW55KTpib29sZWFue1xuICBmb3IobGV0IGsgb2Yga2V5cyl7XG4gICAgaWYobGhzW2tdJiZyaHNba10pe1xuICAgICAgcmV0dXJuIGxoc1trXT09PXJoc1trXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBtZXJnZUFycmF5c0J5S2V5cyhrZXlzOkFycmF5PHN0cmluZz4sLi4uc291cmNlczpBcnJheTxBcnJheTxQdWJsaWNhdGlvbj4+KTpBcnJheTxhbnk+e1xuICBpZighc291cmNlcy5sZW5ndGgpe1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSAoPEFycmF5PGFueT4+Y2xvbmUoc291cmNlc1swXSkpLm1hcChwPT5uZXcgUHVibGljYXRpb24ocCkpO1xuXG4gIGZvcih2YXIgaT0xO2k8c291cmNlcy5sZW5ndGg7aSsrKXtcbiAgICB2YXIgc291cmNlID0gc291cmNlc1tpXTtcbiAgICBmb3IodmFyIGo9MDtqPHNvdXJjZS5sZW5ndGg7aisrKXtcbiAgICAgIHZhciBwdWJsaWNhdGlvbjpQdWJsaWNhdGlvbiA9IHNvdXJjZVtqXTtcbiAgICAgIHZhciBtYXRjaCA9IHJlc3VsdC5maW5kSW5kZXgoKHB1YjphbnkpPT5tYXRjaEZpcnN0RGVmaW5lZEtleShrZXlzLHB1YixwdWJsaWNhdGlvbikpO1xuICAgICAgaWYobWF0Y2g+PTApe1xuICAgICAgICB2YXIgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30scHVibGljYXRpb24ub3B0aW9uc3x8e30scmVzdWx0W21hdGNoXS5vcHRpb25zfHx7fSlcbiAgICAgICAgcmVzdWx0W21hdGNoXSA9IE9iamVjdC5hc3NpZ24obmV3IFB1YmxpY2F0aW9uKCkscHVibGljYXRpb24scmVzdWx0W21hdGNoXSk7XG4gICAgICAgIHJlc3VsdFttYXRjaF0ub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQucHVzaChuZXcgUHVibGljYXRpb24oY2xvbmUocHVibGljYXRpb24pKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc3VsdCA9IHJlc3VsdC5maWx0ZXIocD0+IXAuc2tpcCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHByb3BhZ2F0ZSh0YXJnZXQ6YW55LHNvdXJjZTphbnksc2tpcFB1YmxpY2F0aW9ucz86Ym9vbGVhbil7XG4gIHRhcmdldC5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSxzb3VyY2Uub3B0aW9uc3x8e30sdGFyZ2V0Lm9wdGlvbnN8fHt9KTtcblxuICBpZighc2tpcFB1YmxpY2F0aW9ucyl7XG4gICAgdGFyZ2V0LnB1YmxpY2F0aW9ucyA9IG1lcmdlQXJyYXlzQnlLZXlzKFsndGltZXN0ZXAnLCdsYWJlbCddLHRhcmdldC5wdWJsaWNhdGlvbnN8fFtdLHNvdXJjZS5wdWJsaWNhdGlvbnN8fFtdKTtcbi8vICAgIGNvbnNvbGUubG9nKHRhcmdldC5wdWJsaWNhdGlvbnMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluc3RhbnRpYXRlTmFtZWRPcHRpb25zKGRlc3Q6YW55LHNvdXJjZTphbnkpe1xuICBmb3IodmFyIGtleSBpbiBOQU1FRF9PUFRJT05TKXtcbiAgICBjb25zdCBjb25maWdLZXk6c3RyaW5nID0gTkFNRURfT1BUSU9OU1trZXldO1xuICAgIGlmKCFzb3VyY2VbY29uZmlnS2V5XSl7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZighZGVzdFtrZXldfHwodHlwZW9mKGRlc3Rba2V5XSkhPT0nc3RyaW5nJykpe1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3QgbG9va3VwID0gZGVzdFtrZXldO1xuICAgIGRlc3Rba2V5XSA9IHNvdXJjZVtjb25maWdLZXldW2xvb2t1cF07XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYXRhbG9nSG9zdHtcbiAgdXJsPzpzdHJpbmc7XG4gIHNvZnR3YXJlPzpzdHJpbmc7XG4gIGRvd25sb2FkTGluaz86c3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgQ2F0YWxvZ09wdGlvbnN7XG4gIGhvc3Q/OkNhdGFsb2dIb3N0O1xuICBkb3dubG9hZFBhdGg/OnN0cmluZztcbiAgZmlsZXBhdGg/OnN0cmluZztcbiAgcGFsZXR0ZT86c3RyaW5nO1xuICBjb2xvcnNjYWxlcmFuZ2U/OkFycmF5PG51bWJlcj47XG4gIGxlZ2VuZD86c3RyaW5nO1xuICBtYXBPcHRpb25zPzphbnk7XG4gIHRpbWVGb3JtYXQ/OnN0cmluZztcbiAgcHVibGlzaGVyPzpzdHJpbmc7XG4gIHB1Ymxpc2hlclVSTD86c3RyaW5nO1xuICB1bml0cz86c3RyaW5nO1xuICBzbWFsbEV4dGVudD86Ym9vbGVhbjtcbiAgdmVjdG9ycz86XCJwb2ludFwifFwibGluZVwifFwicG9seWdvblwiO1xuICBzdHlsZXM/OmFueTtcbiAgcHVibGljYXRpb25MYWJlbD86c3RyaW5nO1xuICB2YXJpYWJsZT86c3RyaW5nO1xuICBzdGFydD86c3RyaW5nO1xuICBlbmQ/OnN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIENhdGFsb2d7XG4gIG5hbWU6c3RyaW5nO1xuICB0aGVtZXM6QXJyYXk8VGhlbWU+ID0gW107XG4gIG9wdGlvbnM6Q2F0YWxvZ09wdGlvbnM7XG4gIHB1YmxpY2F0aW9uczpBcnJheTxQdWJsaWNhdGlvbj47XG5cbiAgY29uc3RydWN0b3IoY29uZmlnPzphbnkpe1xuICAgIGlmKCFjb25maWcpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsY29uZmlnKTtcbiAgICB0aGlzLnRoZW1lcyA9IGNvbmZpZy50aGVtZXMubWFwKCh0OmFueSk9Pm5ldyBUaGVtZSh0KSk7XG4gICAgdGhpcy5wcm9wYWdhdGVPcHRpb25zKCk7XG4gICAgdGhpcy5pbnN0YW50aWF0ZU5hbWVkT3B0aW9ucygpO1xuICB9XG5cbiAgcHJvcGFnYXRlT3B0aW9ucygpe1xuICAgIHRoaXMudGhlbWVzLmZvckVhY2godD0+e1xuICAgICAgcHJvcGFnYXRlKHQsdGhpcyk7XG4gICAgICB0LnByb3BhZ2F0ZU9wdGlvbnMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluc3RhbnRpYXRlTmFtZWRPcHRpb25zKCl7XG4gICAgaWYodGhpcy5wdWJsaWNhdGlvbnMpe1xuICAgICAgdGhpcy5wdWJsaWNhdGlvbnMuZm9yRWFjaChwPT5wLmluc3RhbnRpYXRlTmFtZWRPcHRpb25zKHRoaXMpKTtcbiAgICB9XG4gICAgdGhpcy50aGVtZXMuZm9yRWFjaCh0PT50Lmluc3RhbnRpYXRlTmFtZWRPcHRpb25zKHRoaXMpKTtcbiAgfVxuXG4gIGFsbExheWVycygpOkFycmF5PExheWVyPntcbiAgICByZXR1cm4gdGhpcy50aGVtZXMubWFwKHQ9PnQubGF5ZXJzKS5yZWR1Y2UoKHByZXYsY3Vycik9PnByZXYuY29uY2F0KGN1cnIpLCBbXSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRoZW1le1xuICBuYW1lOnN0cmluZztcbiAgZGF0YUNyZWF0b3I/OnN0cmluZztcbiAgc2tpcDpib29sZWFuO1xuICBsYXllcnM6QXJyYXk8TGF5ZXI+ID0gW107XG4gIHBhdGg6c3RyaW5nO1xuICBvcHRpb25zOkNhdGFsb2dPcHRpb25zO1xuICBwdWJsaWNhdGlvbnM6QXJyYXk8UHVibGljYXRpb24+O1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZz86YW55KXtcbiAgICBpZighY29uZmlnKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLGNvbmZpZyk7XG5cbiAgICBpZihjb25maWcubGF5ZXJzKXtcbiAgICAgIHRoaXMubGF5ZXJzID0gY29uZmlnLmxheWVycy5tYXAoKGw6YW55KT0+bmV3IExheWVyKGwpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sYXllcnMgPSBbXTtcbiAgICB9XG4gIH1cblxuICBwcm9wYWdhdGVPcHRpb25zKCl7XG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaChsPT57XG4gICAgICBwcm9wYWdhdGUobCx0aGlzKTtcbiAgICAgIGwucHJvcGFnYXRlT3B0aW9ucygpO1xuICAgICAgbC5kYXRhQ3JlYXRvciA9IGwuZGF0YUNyZWF0b3IgfHwgdGhpcy5kYXRhQ3JlYXRvcjtcbiAgICB9KTtcbiAgfVxuXG4gIGluc3RhbnRpYXRlTmFtZWRPcHRpb25zKHNvdXJjZTphbnkpe1xuICAgIGluc3RhbnRpYXRlTmFtZWRPcHRpb25zKHRoaXMub3B0aW9ucyxzb3VyY2UpO1xuICAgIHRoaXMucHVibGljYXRpb25zLmZvckVhY2gocD0+cC5pbnN0YW50aWF0ZU5hbWVkT3B0aW9ucyhzb3VyY2UpKTtcbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKGw9PmwuaW5zdGFudGlhdGVOYW1lZE9wdGlvbnMoc291cmNlKSk7XG4gIH1cblxufVxuXG5leHBvcnQgY2xhc3MgTGF5ZXJ7XG4gIHB1YmxpY2F0aW9uczpBcnJheTxQdWJsaWNhdGlvbj4gPSBbXTtcbiAgc2tpcDpib29sZWFuO1xuICBvcHRpb25zOkNhdGFsb2dPcHRpb25zID0gbmV3IENhdGFsb2dPcHRpb25zKCk7XG4gIHBsYWNlaG9sZGVyOmJvb2xlYW47XG4gIG5hbWU6c3RyaW5nO1xuICBkYXRhQ3JlYXRvcj86c3RyaW5nO1xuICBwYXRoOnN0cmluZztcbiAgW2tleTpzdHJpbmddOmFueTtcbiAgc3BhdGlhbEV4dGVudDogT2JzZXJ2YWJsZTxCb3VuZHM+O1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZz86YW55KXtcbiAgICBpZighY29uZmlnKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLGNvbmZpZyk7XG4gICAgaWYoY29uZmlnLnB1YmxpY2F0aW9ucyl7XG4gICAgICB0aGlzLnB1YmxpY2F0aW9ucyA9IGNvbmZpZy5wdWJsaWNhdGlvbnMubWFwKChwOmFueSk9Pm5ldyBQdWJsaWNhdGlvbihwKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHVibGljYXRpb25zID0gW107XG4gICAgfVxuICB9XG5cbiAgcHJvcGFnYXRlT3B0aW9ucygpe1xuICAgIHRoaXMucHVibGljYXRpb25zLmZvckVhY2gocD0+e1xuICAgICAgcHJvcGFnYXRlKHAsdGhpcyx0cnVlKTtcbiAgICB9KVxuICB9XG5cbiAgaW5zdGFudGlhdGVOYW1lZE9wdGlvbnMoc291cmNlOmFueSl7XG4gICAgaW5zdGFudGlhdGVOYW1lZE9wdGlvbnModGhpcy5vcHRpb25zLHNvdXJjZSk7XG4gICAgdGhpcy5wdWJsaWNhdGlvbnMuZm9yRWFjaChwPT5wLmluc3RhbnRpYXRlTmFtZWRPcHRpb25zKHNvdXJjZSkpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQdWJsaWNhdGlvbntcbiAgdGltZXN0ZXA6c3RyaW5nO1xuICB0aW1lc3RlcE11bHRpcGxpZXI6bnVtYmVyO1xuICB0aW1lc3RlcFJlZmVyZW5jZTpzdHJpbmc7XG4gIGxhYmVsOnN0cmluZztcbiAgc2tpcDpib29sZWFuO1xuICBvcHRpb25zOkNhdGFsb2dPcHRpb25zID0gbmV3IENhdGFsb2dPcHRpb25zKCk7XG4gIHBvaW50ZGF0YT86UG9pbnREYXRhO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZz86YW55KXtcbiAgICBpZighY29uZmlnKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLGNvbmZpZyk7XG4gIH1cblxuICBpbnN0YW50aWF0ZU5hbWVkT3B0aW9ucyhzb3VyY2U6YW55KXtcbiAgICBpbnN0YW50aWF0ZU5hbWVkT3B0aW9ucyh0aGlzLm9wdGlvbnMsc291cmNlKTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBvaW50RGF0YXtcbiAgcHJvdG9jb2w6c3RyaW5nO1xuICB1cmw6c3RyaW5nO1xuICBjb29yZGluYXRlczp7W2tleTpzdHJpbmddOm51bWJlcn07XG4gIHRhZ3M6e1trZXk6c3RyaW5nXTpBcnJheTxzdHJpbmd8TGF5ZXJUYWdWYWx1ZT59O1xuICBsYWJlbHM/OnN0cmluZ1tdO1xuICBkZWZhdWx0VmFyaWFibGU6c3RyaW5nO1xuICBkaXNwbGF5Rm9ybWF0PzpzdHJpbmc7XG4gIGNoYXJ0PzpzdHJpbmc7XG4gIGV4Y2x1ZGU/OnN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExheWVyUHJvcGVydHlTdHlsZXtcbiAgaHlwZXJsaW5rPzpib29sZWFuO1xuICBwbGFjZWhvbGRlcj86c3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExheWVyVGFnVmFsdWV7XG4gIHZhbHVlOnN0cmluZztcbiAgbGFiZWw6c3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExheWVyVGFnTWFwe1xuICBba2V5OnN0cmluZ106TGF5ZXJUYWdWYWx1ZVtdXG59XG4iXX0=