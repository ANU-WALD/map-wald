import * as tslib_1 from "tslib";
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
        for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsiZGF0YS9jYXRhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxJQUFNLGFBQWEsR0FBdUI7SUFDeEMsSUFBSSxFQUFDLFlBQVk7SUFDakIsUUFBUSxFQUFDLGdCQUFnQjtDQUMxQixDQUFBO0FBRUQsU0FBUyxLQUFLLENBQUMsQ0FBSztJQUNsQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFFRCxTQUFTLG9CQUFvQixDQUFDLElBQWtCLEVBQUMsR0FBTyxFQUFDLEdBQU87OztRQUM5RCxLQUFhLElBQUEsU0FBQSxpQkFBQSxJQUFJLENBQUEsMEJBQUEsNENBQUM7WUFBZCxJQUFJLENBQUMsaUJBQUE7WUFDUCxJQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ2hCLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4QjtTQUNGOzs7Ozs7Ozs7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFDLElBQWtCO0lBQUMsaUJBQW9DO1NBQXBDLFVBQW9DLEVBQXBDLHFCQUFvQyxFQUFwQyxJQUFvQztRQUFwQyxnQ0FBb0M7O0lBQ2hGLElBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFDO1FBQ2pCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxJQUFJLE1BQU0sR0FBZ0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBRSxPQUFBLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7SUFFeEUsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7UUFDL0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQzlCLElBQUksV0FBVyxHQUFlLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBTyxJQUFHLE9BQUEsb0JBQW9CLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxXQUFXLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQyxDQUFDO1lBQ3BGLElBQUcsS0FBSyxJQUFFLENBQUMsRUFBQztnQkFDVixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBQyxXQUFXLENBQUMsT0FBTyxJQUFFLEVBQUUsRUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxJQUFFLEVBQUUsQ0FBQyxDQUFBO2dCQUNqRixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsRUFBRSxFQUFDLFdBQVcsRUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDM0UsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7YUFDakM7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xEO1NBQ0Y7S0FDRjtJQUNELE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFFLE9BQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFQLENBQU8sQ0FBQyxDQUFDO0lBQ25DLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxNQUFVLEVBQUMsTUFBVSxFQUFDLGdCQUF5QjtJQUNoRSxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUUsRUFBRSxFQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUUsRUFBRSxDQUFDLENBQUM7SUFFekUsSUFBRyxDQUFDLGdCQUFnQixFQUFDO1FBQ25CLE1BQU0sQ0FBQyxZQUFZLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxVQUFVLEVBQUMsT0FBTyxDQUFDLEVBQUMsTUFBTSxDQUFDLFlBQVksSUFBRSxFQUFFLEVBQUMsTUFBTSxDQUFDLFlBQVksSUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsSCx1Q0FBdUM7S0FDcEM7QUFDSCxDQUFDO0FBRUQsU0FBUyx1QkFBdUIsQ0FBQyxJQUFRLEVBQUMsTUFBVTtJQUNsRCxLQUFJLElBQUksR0FBRyxJQUFJLGFBQWEsRUFBQztRQUMzQixJQUFNLFNBQVMsR0FBVSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUMsSUFBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBQztZQUNwQixTQUFTO1NBQ1Y7UUFFRCxJQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFFLENBQUMsT0FBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFHLFFBQVEsQ0FBQyxFQUFDO1lBQzVDLFNBQVM7U0FDVjtRQUVELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZDO0FBQ0gsQ0FBQztBQVFEO0lBQUE7SUFtQkEsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQzs7QUFFRDtJQU1FLGlCQUFZLE1BQVc7UUFKdkIsV0FBTSxHQUFnQixFQUFFLENBQUM7UUFLdkIsSUFBRyxDQUFDLE1BQU0sRUFBQztZQUNULE9BQU87U0FDUjtRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFLLElBQUcsT0FBQSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBWixDQUFZLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsa0NBQWdCLEdBQWhCO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFDbkIsU0FBUyxDQUFDLENBQUMsRUFBQyxLQUFJLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx5Q0FBdUIsR0FBdkI7UUFBQSxpQkFLQztRQUpDLElBQUcsSUFBSSxDQUFDLFlBQVksRUFBQztZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBRSxPQUFBLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFJLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO1NBQy9EO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxDQUFDLENBQUMsdUJBQXVCLENBQUMsS0FBSSxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsMkJBQVMsR0FBVDtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxDQUFDLENBQUMsTUFBTSxFQUFSLENBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBQyxJQUFJLElBQUcsT0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFqQixDQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQzs7QUFFRDtJQVNFLGVBQVksTUFBVztRQUx2QixXQUFNLEdBQWdCLEVBQUUsQ0FBQztRQU12QixJQUFHLENBQUMsTUFBTSxFQUFDO1lBQ1QsT0FBTztTQUNSO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0IsSUFBRyxNQUFNLENBQUMsTUFBTSxFQUFDO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUssSUFBRyxPQUFBLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFaLENBQVksQ0FBQyxDQUFDO1NBQ3hEO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNsQjtJQUNILENBQUM7SUFFRCxnQ0FBZ0IsR0FBaEI7UUFBQSxpQkFNQztRQUxDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUNuQixTQUFTLENBQUMsQ0FBQyxFQUFDLEtBQUksQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLFdBQVcsSUFBSSxLQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHVDQUF1QixHQUF2QixVQUF3QixNQUFVO1FBQ2hDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxDQUFDLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBRSxPQUFBLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFSCxZQUFDO0FBQUQsQ0FBQyxBQXBDRCxJQW9DQzs7QUFFRDtJQVdFLGVBQVksTUFBVztRQVZ2QixpQkFBWSxHQUFzQixFQUFFLENBQUM7UUFFckMsWUFBTyxHQUFrQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBUzVDLElBQUcsQ0FBQyxNQUFNLEVBQUM7WUFDVCxPQUFPO1NBQ1I7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixJQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUM7WUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUssSUFBRyxPQUFBLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7U0FDMUU7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVELGdDQUFnQixHQUFoQjtRQUFBLGlCQUlDO1FBSEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1lBQ3pCLFNBQVMsQ0FBQyxDQUFDLEVBQUMsS0FBSSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELHVDQUF1QixHQUF2QixVQUF3QixNQUFVO1FBQ2hDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxDQUFDLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBQ0gsWUFBQztBQUFELENBQUMsQUFqQ0QsSUFpQ0M7O0FBRUQ7SUFTRSxxQkFBWSxNQUFXO1FBSHZCLFlBQU8sR0FBa0IsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUk1QyxJQUFHLENBQUMsTUFBTSxFQUFDO1lBQ1QsT0FBTztTQUNSO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDZDQUF1QixHQUF2QixVQUF3QixNQUFVO1FBQ2hDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgQm91bmRzIH0gZnJvbSAnLi9ib3VuZHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5jb25zdCBOQU1FRF9PUFRJT05TOntba2V5OnN0cmluZ106c3RyaW5nfT17XG4gIGhvc3Q6J25hbWVkSG9zdHMnLFxuICBpbnRlcnZhbDonbmFtZWRJbnRlcnZhbHMnXG59XG5cbmZ1bmN0aW9uIGNsb25lKHY6YW55KTphbnl7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHYpKTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hGaXJzdERlZmluZWRLZXkoa2V5czpBcnJheTxzdHJpbmc+LGxoczphbnkscmhzOmFueSk6Ym9vbGVhbntcbiAgZm9yKGxldCBrIG9mIGtleXMpe1xuICAgIGlmKGxoc1trXSYmcmhzW2tdKXtcbiAgICAgIHJldHVybiBsaHNba109PT1yaHNba107XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VBcnJheXNCeUtleXMoa2V5czpBcnJheTxzdHJpbmc+LC4uLnNvdXJjZXM6QXJyYXk8QXJyYXk8UHVibGljYXRpb24+Pik6QXJyYXk8YW55PntcbiAgaWYoIXNvdXJjZXMubGVuZ3RoKXtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gKDxBcnJheTxhbnk+PmNsb25lKHNvdXJjZXNbMF0pKS5tYXAocD0+bmV3IFB1YmxpY2F0aW9uKHApKTtcblxuICBmb3IodmFyIGk9MTtpPHNvdXJjZXMubGVuZ3RoO2krKyl7XG4gICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaV07XG4gICAgZm9yKHZhciBqPTA7ajxzb3VyY2UubGVuZ3RoO2orKyl7XG4gICAgICB2YXIgcHVibGljYXRpb246UHVibGljYXRpb24gPSBzb3VyY2Vbal07XG4gICAgICB2YXIgbWF0Y2ggPSByZXN1bHQuZmluZEluZGV4KChwdWI6YW55KT0+bWF0Y2hGaXJzdERlZmluZWRLZXkoa2V5cyxwdWIscHVibGljYXRpb24pKTtcbiAgICAgIGlmKG1hdGNoPj0wKXtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LHB1YmxpY2F0aW9uLm9wdGlvbnN8fHt9LHJlc3VsdFttYXRjaF0ub3B0aW9uc3x8e30pXG4gICAgICAgIHJlc3VsdFttYXRjaF0gPSBPYmplY3QuYXNzaWduKG5ldyBQdWJsaWNhdGlvbigpLHB1YmxpY2F0aW9uLHJlc3VsdFttYXRjaF0pO1xuICAgICAgICByZXN1bHRbbWF0Y2hdLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0LnB1c2gobmV3IFB1YmxpY2F0aW9uKGNsb25lKHB1YmxpY2F0aW9uKSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXN1bHQgPSByZXN1bHQuZmlsdGVyKHA9PiFwLnNraXApO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBwcm9wYWdhdGUodGFyZ2V0OmFueSxzb3VyY2U6YW55LHNraXBQdWJsaWNhdGlvbnM/OmJvb2xlYW4pe1xuICB0YXJnZXQub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sc291cmNlLm9wdGlvbnN8fHt9LHRhcmdldC5vcHRpb25zfHx7fSk7XG5cbiAgaWYoIXNraXBQdWJsaWNhdGlvbnMpe1xuICAgIHRhcmdldC5wdWJsaWNhdGlvbnMgPSBtZXJnZUFycmF5c0J5S2V5cyhbJ3RpbWVzdGVwJywnbGFiZWwnXSx0YXJnZXQucHVibGljYXRpb25zfHxbXSxzb3VyY2UucHVibGljYXRpb25zfHxbXSk7XG4vLyAgICBjb25zb2xlLmxvZyh0YXJnZXQucHVibGljYXRpb25zKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnN0YW50aWF0ZU5hbWVkT3B0aW9ucyhkZXN0OmFueSxzb3VyY2U6YW55KXtcbiAgZm9yKHZhciBrZXkgaW4gTkFNRURfT1BUSU9OUyl7XG4gICAgY29uc3QgY29uZmlnS2V5OnN0cmluZyA9IE5BTUVEX09QVElPTlNba2V5XTtcbiAgICBpZighc291cmNlW2NvbmZpZ0tleV0pe1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYoIWRlc3Rba2V5XXx8KHR5cGVvZihkZXN0W2tleV0pIT09J3N0cmluZycpKXtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGxvb2t1cCA9IGRlc3Rba2V5XTtcbiAgICBkZXN0W2tleV0gPSBzb3VyY2VbY29uZmlnS2V5XVtsb29rdXBdO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2F0YWxvZ0hvc3R7XG4gIHVybD86c3RyaW5nO1xuICBzb2Z0d2FyZT86c3RyaW5nO1xuICBkb3dubG9hZExpbms/OnN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIENhdGFsb2dPcHRpb25ze1xuICBob3N0PzpDYXRhbG9nSG9zdDtcbiAgZG93bmxvYWRQYXRoPzpzdHJpbmc7XG4gIGZpbGVwYXRoPzpzdHJpbmc7XG4gIHBhbGV0dGU/OnN0cmluZztcbiAgY29sb3JzY2FsZXJhbmdlPzpBcnJheTxudW1iZXI+O1xuICBsZWdlbmQ/OnN0cmluZztcbiAgbWFwT3B0aW9ucz86YW55O1xuICB0aW1lRm9ybWF0PzpzdHJpbmc7XG4gIHB1Ymxpc2hlcj86c3RyaW5nO1xuICBwdWJsaXNoZXJVUkw/OnN0cmluZztcbiAgdW5pdHM/OnN0cmluZztcbiAgc21hbGxFeHRlbnQ/OmJvb2xlYW47XG4gIHZlY3RvcnM/OlwicG9pbnRcInxcImxpbmVcInxcInBvbHlnb25cIjtcbiAgc3R5bGVzPzphbnk7XG4gIHB1YmxpY2F0aW9uTGFiZWw/OnN0cmluZztcbiAgdmFyaWFibGU/OnN0cmluZztcbiAgc3RhcnQ/OnN0cmluZztcbiAgZW5kPzpzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBDYXRhbG9ne1xuICBuYW1lOnN0cmluZztcbiAgdGhlbWVzOkFycmF5PFRoZW1lPiA9IFtdO1xuICBvcHRpb25zOkNhdGFsb2dPcHRpb25zO1xuICBwdWJsaWNhdGlvbnM6QXJyYXk8UHVibGljYXRpb24+O1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZz86YW55KXtcbiAgICBpZighY29uZmlnKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLGNvbmZpZyk7XG4gICAgdGhpcy50aGVtZXMgPSBjb25maWcudGhlbWVzLm1hcCgodDphbnkpPT5uZXcgVGhlbWUodCkpO1xuICAgIHRoaXMucHJvcGFnYXRlT3B0aW9ucygpO1xuICAgIHRoaXMuaW5zdGFudGlhdGVOYW1lZE9wdGlvbnMoKTtcbiAgfVxuXG4gIHByb3BhZ2F0ZU9wdGlvbnMoKXtcbiAgICB0aGlzLnRoZW1lcy5mb3JFYWNoKHQ9PntcbiAgICAgIHByb3BhZ2F0ZSh0LHRoaXMpO1xuICAgICAgdC5wcm9wYWdhdGVPcHRpb25zKCk7XG4gICAgfSk7XG4gIH1cblxuICBpbnN0YW50aWF0ZU5hbWVkT3B0aW9ucygpe1xuICAgIGlmKHRoaXMucHVibGljYXRpb25zKXtcbiAgICAgIHRoaXMucHVibGljYXRpb25zLmZvckVhY2gocD0+cC5pbnN0YW50aWF0ZU5hbWVkT3B0aW9ucyh0aGlzKSk7XG4gICAgfVxuICAgIHRoaXMudGhlbWVzLmZvckVhY2godD0+dC5pbnN0YW50aWF0ZU5hbWVkT3B0aW9ucyh0aGlzKSk7XG4gIH1cblxuICBhbGxMYXllcnMoKTpBcnJheTxMYXllcj57XG4gICAgcmV0dXJuIHRoaXMudGhlbWVzLm1hcCh0PT50LmxheWVycykucmVkdWNlKChwcmV2LGN1cnIpPT5wcmV2LmNvbmNhdChjdXJyKSwgW10pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUaGVtZXtcbiAgbmFtZTpzdHJpbmc7XG4gIGRhdGFDcmVhdG9yPzpzdHJpbmc7XG4gIHNraXA6Ym9vbGVhbjtcbiAgbGF5ZXJzOkFycmF5PExheWVyPiA9IFtdO1xuICBwYXRoOnN0cmluZztcbiAgb3B0aW9uczpDYXRhbG9nT3B0aW9ucztcbiAgcHVibGljYXRpb25zOkFycmF5PFB1YmxpY2F0aW9uPjtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc/OmFueSl7XG4gICAgaWYoIWNvbmZpZyl7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIE9iamVjdC5hc3NpZ24odGhpcyxjb25maWcpO1xuXG4gICAgaWYoY29uZmlnLmxheWVycyl7XG4gICAgICB0aGlzLmxheWVycyA9IGNvbmZpZy5sYXllcnMubWFwKChsOmFueSk9Pm5ldyBMYXllcihsKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGF5ZXJzID0gW107XG4gICAgfVxuICB9XG5cbiAgcHJvcGFnYXRlT3B0aW9ucygpe1xuICAgIHRoaXMubGF5ZXJzLmZvckVhY2gobD0+e1xuICAgICAgcHJvcGFnYXRlKGwsdGhpcyk7XG4gICAgICBsLnByb3BhZ2F0ZU9wdGlvbnMoKTtcbiAgICAgIGwuZGF0YUNyZWF0b3IgPSBsLmRhdGFDcmVhdG9yIHx8IHRoaXMuZGF0YUNyZWF0b3I7XG4gICAgfSk7XG4gIH1cblxuICBpbnN0YW50aWF0ZU5hbWVkT3B0aW9ucyhzb3VyY2U6YW55KXtcbiAgICBpbnN0YW50aWF0ZU5hbWVkT3B0aW9ucyh0aGlzLm9wdGlvbnMsc291cmNlKTtcbiAgICB0aGlzLnB1YmxpY2F0aW9ucy5mb3JFYWNoKHA9PnAuaW5zdGFudGlhdGVOYW1lZE9wdGlvbnMoc291cmNlKSk7XG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaChsPT5sLmluc3RhbnRpYXRlTmFtZWRPcHRpb25zKHNvdXJjZSkpO1xuICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIExheWVye1xuICBwdWJsaWNhdGlvbnM6QXJyYXk8UHVibGljYXRpb24+ID0gW107XG4gIHNraXA6Ym9vbGVhbjtcbiAgb3B0aW9uczpDYXRhbG9nT3B0aW9ucyA9IG5ldyBDYXRhbG9nT3B0aW9ucygpO1xuICBwbGFjZWhvbGRlcjpib29sZWFuO1xuICBuYW1lOnN0cmluZztcbiAgZGF0YUNyZWF0b3I/OnN0cmluZztcbiAgcGF0aDpzdHJpbmc7XG4gIFtrZXk6c3RyaW5nXTphbnk7XG4gIHNwYXRpYWxFeHRlbnQ6IE9ic2VydmFibGU8Qm91bmRzPjtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc/OmFueSl7XG4gICAgaWYoIWNvbmZpZyl7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIE9iamVjdC5hc3NpZ24odGhpcyxjb25maWcpO1xuICAgIGlmKGNvbmZpZy5wdWJsaWNhdGlvbnMpe1xuICAgICAgdGhpcy5wdWJsaWNhdGlvbnMgPSBjb25maWcucHVibGljYXRpb25zLm1hcCgocDphbnkpPT5uZXcgUHVibGljYXRpb24ocCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnB1YmxpY2F0aW9ucyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIHByb3BhZ2F0ZU9wdGlvbnMoKXtcbiAgICB0aGlzLnB1YmxpY2F0aW9ucy5mb3JFYWNoKHA9PntcbiAgICAgIHByb3BhZ2F0ZShwLHRoaXMsdHJ1ZSk7XG4gICAgfSlcbiAgfVxuXG4gIGluc3RhbnRpYXRlTmFtZWRPcHRpb25zKHNvdXJjZTphbnkpe1xuICAgIGluc3RhbnRpYXRlTmFtZWRPcHRpb25zKHRoaXMub3B0aW9ucyxzb3VyY2UpO1xuICAgIHRoaXMucHVibGljYXRpb25zLmZvckVhY2gocD0+cC5pbnN0YW50aWF0ZU5hbWVkT3B0aW9ucyhzb3VyY2UpKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHVibGljYXRpb257XG4gIHRpbWVzdGVwOnN0cmluZztcbiAgdGltZXN0ZXBNdWx0aXBsaWVyOm51bWJlcjtcbiAgdGltZXN0ZXBSZWZlcmVuY2U6c3RyaW5nO1xuICBsYWJlbDpzdHJpbmc7XG4gIHNraXA6Ym9vbGVhbjtcbiAgb3B0aW9uczpDYXRhbG9nT3B0aW9ucyA9IG5ldyBDYXRhbG9nT3B0aW9ucygpO1xuICBwb2ludGRhdGE/OlBvaW50RGF0YTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc/OmFueSl7XG4gICAgaWYoIWNvbmZpZyl7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIE9iamVjdC5hc3NpZ24odGhpcyxjb25maWcpO1xuICB9XG5cbiAgaW5zdGFudGlhdGVOYW1lZE9wdGlvbnMoc291cmNlOmFueSl7XG4gICAgaW5zdGFudGlhdGVOYW1lZE9wdGlvbnModGhpcy5vcHRpb25zLHNvdXJjZSk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQb2ludERhdGF7XG4gIHByb3RvY29sOnN0cmluZztcbiAgdXJsOnN0cmluZztcbiAgY29vcmRpbmF0ZXM6e1trZXk6c3RyaW5nXTpudW1iZXJ9O1xuICB0YWdzOntba2V5OnN0cmluZ106QXJyYXk8c3RyaW5nfExheWVyVGFnVmFsdWU+fTtcbiAgbGFiZWxzPzpzdHJpbmdbXTtcbiAgZGVmYXVsdFZhcmlhYmxlOnN0cmluZztcbiAgZGlzcGxheUZvcm1hdD86c3RyaW5nO1xuICBjaGFydD86c3RyaW5nO1xuICBleGNsdWRlPzpzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMYXllclByb3BlcnR5U3R5bGV7XG4gIGh5cGVybGluaz86Ym9vbGVhbjtcbiAgcGxhY2Vob2xkZXI/OnN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMYXllclRhZ1ZhbHVle1xuICB2YWx1ZTpzdHJpbmc7XG4gIGxhYmVsOnN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMYXllclRhZ01hcHtcbiAgW2tleTpzdHJpbmddOkxheWVyVGFnVmFsdWVbXVxufVxuIl19