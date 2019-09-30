(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@ng-bootstrap/ng-bootstrap'), require('@angular/common/http'), require('ngx-pipes'), require('@agm/core'), require('@angular/common'), require('rxjs'), require('rxjs/operators'), require('dap-query-js/dist/dap-query'), require('proj4'), require('store'), require('@agm/core/services/google-maps-types'), require('plotly.js/dist/plotly-basic')) :
    typeof define === 'function' && define.amd ? define('map-wald', ['exports', '@angular/core', '@angular/forms', '@ng-bootstrap/ng-bootstrap', '@angular/common/http', 'ngx-pipes', '@agm/core', '@angular/common', 'rxjs', 'rxjs/operators', 'dap-query-js/dist/dap-query', 'proj4', 'store', '@agm/core/services/google-maps-types', 'plotly.js/dist/plotly-basic'], factory) :
    (global = global || self, factory(global['map-wald'] = {}, global.ng.core, global.ng.forms, global.ngBootstrap, global.ng.common.http, global.ngxPipes, global.core$1, global.ng.common, global.rxjs, global.rxjs.operators, global.dapQuery, global.proj4, global.store, global.googleMapsTypes, global.plotlyBasic));
}(this, function (exports, core, forms, ngBootstrap, http, ngxPipes, core$1, common, rxjs, operators, dapQuery, proj4, store, googleMapsTypes, plotlyBasic) { 'use strict';

    var proj4__default = 'default' in proj4 ? proj4['default'] : proj4;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var TreeFilterService = /** @class */ (function () {
        function TreeFilterService() {
        }
        TreeFilterService.prototype.filterTree = function (tree, filterText) {
            var _this = this;
            tree.visible = false;
            filterText = filterText.trim().toLowerCase();
            var containsFilterText = function (label, filterText) { return label.trim().toLowerCase().indexOf(filterText) !== -1; };
            tree.visible = containsFilterText(tree.label, filterText);
            if (tree.hasOwnProperty("children")) {
                if (tree.visible) {
                    tree.children.forEach(function (child) { return _this.showAll(child); });
                }
                else {
                    tree.children.map(function (child) {
                        _this.filterTree(child, filterText);
                        tree.visible = tree.visible || child.visible;
                        tree.expanded = tree.expanded || child.visible || child.expanded;
                    });
                }
            }
            return tree;
        };
        TreeFilterService.prototype.showAll = function (tree) {
            var _this = this;
            tree.visible = true;
            if (tree.hasOwnProperty("children")) {
                tree.children.forEach(function (c) { return _this.showAll(c); });
            }
        };
        TreeFilterService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [])
        ], TreeFilterService);
        return TreeFilterService;
    }());

    var palettes = {
        Accent: {
            3: [
                "rgb(127,201,127)",
                "rgb(190,174,212)",
                "rgb(253,192,134)"
            ],
            4: [
                "rgb(127,201,127)",
                "rgb(190,174,212)",
                "rgb(253,192,134)",
                "rgb(255,255,153)"
            ],
            5: [
                "rgb(127,201,127)",
                "rgb(190,174,212)",
                "rgb(253,192,134)",
                "rgb(255,255,153)",
                "rgb(56,108,176)"
            ],
            6: [
                "rgb(127,201,127)",
                "rgb(190,174,212)",
                "rgb(253,192,134)",
                "rgb(255,255,153)",
                "rgb(56,108,176)",
                "rgb(240,2,127)"
            ],
            7: [
                "rgb(127,201,127)",
                "rgb(190,174,212)",
                "rgb(253,192,134)",
                "rgb(255,255,153)",
                "rgb(56,108,176)",
                "rgb(240,2,127)",
                "rgb(191,91,23)"
            ],
            8: [
                "rgb(127,201,127)",
                "rgb(190,174,212)",
                "rgb(253,192,134)",
                "rgb(255,255,153)",
                "rgb(56,108,176)",
                "rgb(240,2,127)",
                "rgb(191,91,23)",
                "rgb(102,102,102)"
            ],
            type: "qual"
        },
        Blues: {
            3: [
                "rgb(222,235,247)",
                "rgb(158,202,225)",
                "rgb(49,130,189)"
            ],
            4: [
                "rgb(239,243,255)",
                "rgb(189,215,231)",
                "rgb(107,174,214)",
                "rgb(33,113,181)"
            ],
            5: [
                "rgb(239,243,255)",
                "rgb(189,215,231)",
                "rgb(107,174,214)",
                "rgb(49,130,189)",
                "rgb(8,81,156)"
            ],
            6: [
                "rgb(239,243,255)",
                "rgb(198,219,239)",
                "rgb(158,202,225)",
                "rgb(107,174,214)",
                "rgb(49,130,189)",
                "rgb(8,81,156)"
            ],
            7: [
                "rgb(239,243,255)",
                "rgb(198,219,239)",
                "rgb(158,202,225)",
                "rgb(107,174,214)",
                "rgb(66,146,198)",
                "rgb(33,113,181)",
                "rgb(8,69,148)"
            ],
            8: [
                "rgb(247,251,255)",
                "rgb(222,235,247)",
                "rgb(198,219,239)",
                "rgb(158,202,225)",
                "rgb(107,174,214)",
                "rgb(66,146,198)",
                "rgb(33,113,181)",
                "rgb(8,69,148)"
            ],
            9: [
                "rgb(247,251,255)",
                "rgb(222,235,247)",
                "rgb(198,219,239)",
                "rgb(158,202,225)",
                "rgb(107,174,214)",
                "rgb(66,146,198)",
                "rgb(33,113,181)",
                "rgb(8,81,156)",
                "rgb(8,48,107)"
            ],
            type: "seq"
        },
        BrBG: {
            10: [
                "rgb(84,48,5)",
                "rgb(140,81,10)",
                "rgb(191,129,45)",
                "rgb(223,194,125)",
                "rgb(246,232,195)",
                "rgb(199,234,229)",
                "rgb(128,205,193)",
                "rgb(53,151,143)",
                "rgb(1,102,94)",
                "rgb(0,60,48)"
            ],
            11: [
                "rgb(84,48,5)",
                "rgb(140,81,10)",
                "rgb(191,129,45)",
                "rgb(223,194,125)",
                "rgb(246,232,195)",
                "rgb(245,245,245)",
                "rgb(199,234,229)",
                "rgb(128,205,193)",
                "rgb(53,151,143)",
                "rgb(1,102,94)",
                "rgb(0,60,48)"
            ],
            3: [
                "rgb(216,179,101)",
                "rgb(245,245,245)",
                "rgb(90,180,172)"
            ],
            4: [
                "rgb(166,97,26)",
                "rgb(223,194,125)",
                "rgb(128,205,193)",
                "rgb(1,133,113)"
            ],
            5: [
                "rgb(166,97,26)",
                "rgb(223,194,125)",
                "rgb(245,245,245)",
                "rgb(128,205,193)",
                "rgb(1,133,113)"
            ],
            6: [
                "rgb(140,81,10)",
                "rgb(216,179,101)",
                "rgb(246,232,195)",
                "rgb(199,234,229)",
                "rgb(90,180,172)",
                "rgb(1,102,94)"
            ],
            7: [
                "rgb(140,81,10)",
                "rgb(216,179,101)",
                "rgb(246,232,195)",
                "rgb(245,245,245)",
                "rgb(199,234,229)",
                "rgb(90,180,172)",
                "rgb(1,102,94)"
            ],
            8: [
                "rgb(140,81,10)",
                "rgb(191,129,45)",
                "rgb(223,194,125)",
                "rgb(246,232,195)",
                "rgb(199,234,229)",
                "rgb(128,205,193)",
                "rgb(53,151,143)",
                "rgb(1,102,94)"
            ],
            9: [
                "rgb(140,81,10)",
                "rgb(191,129,45)",
                "rgb(223,194,125)",
                "rgb(246,232,195)",
                "rgb(245,245,245)",
                "rgb(199,234,229)",
                "rgb(128,205,193)",
                "rgb(53,151,143)",
                "rgb(1,102,94)"
            ],
            type: "div"
        },
        BuGn: {
            3: [
                "rgb(229,245,249)",
                "rgb(153,216,201)",
                "rgb(44,162,95)"
            ],
            4: [
                "rgb(237,248,251)",
                "rgb(178,226,226)",
                "rgb(102,194,164)",
                "rgb(35,139,69)"
            ],
            5: [
                "rgb(237,248,251)",
                "rgb(178,226,226)",
                "rgb(102,194,164)",
                "rgb(44,162,95)",
                "rgb(0,109,44)"
            ],
            6: [
                "rgb(237,248,251)",
                "rgb(204,236,230)",
                "rgb(153,216,201)",
                "rgb(102,194,164)",
                "rgb(44,162,95)",
                "rgb(0,109,44)"
            ],
            7: [
                "rgb(237,248,251)",
                "rgb(204,236,230)",
                "rgb(153,216,201)",
                "rgb(102,194,164)",
                "rgb(65,174,118)",
                "rgb(35,139,69)",
                "rgb(0,88,36)"
            ],
            8: [
                "rgb(247,252,253)",
                "rgb(229,245,249)",
                "rgb(204,236,230)",
                "rgb(153,216,201)",
                "rgb(102,194,164)",
                "rgb(65,174,118)",
                "rgb(35,139,69)",
                "rgb(0,88,36)"
            ],
            9: [
                "rgb(247,252,253)",
                "rgb(229,245,249)",
                "rgb(204,236,230)",
                "rgb(153,216,201)",
                "rgb(102,194,164)",
                "rgb(65,174,118)",
                "rgb(35,139,69)",
                "rgb(0,109,44)",
                "rgb(0,68,27)"
            ],
            type: "seq"
        },
        BuPu: {
            3: [
                "rgb(224,236,244)",
                "rgb(158,188,218)",
                "rgb(136,86,167)"
            ],
            4: [
                "rgb(237,248,251)",
                "rgb(179,205,227)",
                "rgb(140,150,198)",
                "rgb(136,65,157)"
            ],
            5: [
                "rgb(237,248,251)",
                "rgb(179,205,227)",
                "rgb(140,150,198)",
                "rgb(136,86,167)",
                "rgb(129,15,124)"
            ],
            6: [
                "rgb(237,248,251)",
                "rgb(191,211,230)",
                "rgb(158,188,218)",
                "rgb(140,150,198)",
                "rgb(136,86,167)",
                "rgb(129,15,124)"
            ],
            7: [
                "rgb(237,248,251)",
                "rgb(191,211,230)",
                "rgb(158,188,218)",
                "rgb(140,150,198)",
                "rgb(140,107,177)",
                "rgb(136,65,157)",
                "rgb(110,1,107)"
            ],
            8: [
                "rgb(247,252,253)",
                "rgb(224,236,244)",
                "rgb(191,211,230)",
                "rgb(158,188,218)",
                "rgb(140,150,198)",
                "rgb(140,107,177)",
                "rgb(136,65,157)",
                "rgb(110,1,107)"
            ],
            9: [
                "rgb(247,252,253)",
                "rgb(224,236,244)",
                "rgb(191,211,230)",
                "rgb(158,188,218)",
                "rgb(140,150,198)",
                "rgb(140,107,177)",
                "rgb(136,65,157)",
                "rgb(129,15,124)",
                "rgb(77,0,75)"
            ],
            type: "seq"
        },
        Dark2: {
            3: [
                "rgb(27,158,119)",
                "rgb(217,95,2)",
                "rgb(117,112,179)"
            ],
            4: [
                "rgb(27,158,119)",
                "rgb(217,95,2)",
                "rgb(117,112,179)",
                "rgb(231,41,138)"
            ],
            5: [
                "rgb(27,158,119)",
                "rgb(217,95,2)",
                "rgb(117,112,179)",
                "rgb(231,41,138)",
                "rgb(102,166,30)"
            ],
            6: [
                "rgb(27,158,119)",
                "rgb(217,95,2)",
                "rgb(117,112,179)",
                "rgb(231,41,138)",
                "rgb(102,166,30)",
                "rgb(230,171,2)"
            ],
            7: [
                "rgb(27,158,119)",
                "rgb(217,95,2)",
                "rgb(117,112,179)",
                "rgb(231,41,138)",
                "rgb(102,166,30)",
                "rgb(230,171,2)",
                "rgb(166,118,29)"
            ],
            8: [
                "rgb(27,158,119)",
                "rgb(217,95,2)",
                "rgb(117,112,179)",
                "rgb(231,41,138)",
                "rgb(102,166,30)",
                "rgb(230,171,2)",
                "rgb(166,118,29)",
                "rgb(102,102,102)"
            ],
            type: "qual"
        },
        GnBu: {
            3: [
                "rgb(224,243,219)",
                "rgb(168,221,181)",
                "rgb(67,162,202)"
            ],
            4: [
                "rgb(240,249,232)",
                "rgb(186,228,188)",
                "rgb(123,204,196)",
                "rgb(43,140,190)"
            ],
            5: [
                "rgb(240,249,232)",
                "rgb(186,228,188)",
                "rgb(123,204,196)",
                "rgb(67,162,202)",
                "rgb(8,104,172)"
            ],
            6: [
                "rgb(240,249,232)",
                "rgb(204,235,197)",
                "rgb(168,221,181)",
                "rgb(123,204,196)",
                "rgb(67,162,202)",
                "rgb(8,104,172)"
            ],
            7: [
                "rgb(240,249,232)",
                "rgb(204,235,197)",
                "rgb(168,221,181)",
                "rgb(123,204,196)",
                "rgb(78,179,211)",
                "rgb(43,140,190)",
                "rgb(8,88,158)"
            ],
            8: [
                "rgb(247,252,240)",
                "rgb(224,243,219)",
                "rgb(204,235,197)",
                "rgb(168,221,181)",
                "rgb(123,204,196)",
                "rgb(78,179,211)",
                "rgb(43,140,190)",
                "rgb(8,88,158)"
            ],
            9: [
                "rgb(247,252,240)",
                "rgb(224,243,219)",
                "rgb(204,235,197)",
                "rgb(168,221,181)",
                "rgb(123,204,196)",
                "rgb(78,179,211)",
                "rgb(43,140,190)",
                "rgb(8,104,172)",
                "rgb(8,64,129)"
            ],
            type: "seq"
        },
        Greens: {
            3: [
                "rgb(229,245,224)",
                "rgb(161,217,155)",
                "rgb(49,163,84)"
            ],
            4: [
                "rgb(237,248,233)",
                "rgb(186,228,179)",
                "rgb(116,196,118)",
                "rgb(35,139,69)"
            ],
            5: [
                "rgb(237,248,233)",
                "rgb(186,228,179)",
                "rgb(116,196,118)",
                "rgb(49,163,84)",
                "rgb(0,109,44)"
            ],
            6: [
                "rgb(237,248,233)",
                "rgb(199,233,192)",
                "rgb(161,217,155)",
                "rgb(116,196,118)",
                "rgb(49,163,84)",
                "rgb(0,109,44)"
            ],
            7: [
                "rgb(237,248,233)",
                "rgb(199,233,192)",
                "rgb(161,217,155)",
                "rgb(116,196,118)",
                "rgb(65,171,93)",
                "rgb(35,139,69)",
                "rgb(0,90,50)"
            ],
            8: [
                "rgb(247,252,245)",
                "rgb(229,245,224)",
                "rgb(199,233,192)",
                "rgb(161,217,155)",
                "rgb(116,196,118)",
                "rgb(65,171,93)",
                "rgb(35,139,69)",
                "rgb(0,90,50)"
            ],
            9: [
                "rgb(247,252,245)",
                "rgb(229,245,224)",
                "rgb(199,233,192)",
                "rgb(161,217,155)",
                "rgb(116,196,118)",
                "rgb(65,171,93)",
                "rgb(35,139,69)",
                "rgb(0,109,44)",
                "rgb(0,68,27)"
            ],
            type: "seq"
        },
        Greys: {
            3: [
                "rgb(240,240,240)",
                "rgb(189,189,189)",
                "rgb(99,99,99)"
            ],
            4: [
                "rgb(247,247,247)",
                "rgb(204,204,204)",
                "rgb(150,150,150)",
                "rgb(82,82,82)"
            ],
            5: [
                "rgb(247,247,247)",
                "rgb(204,204,204)",
                "rgb(150,150,150)",
                "rgb(99,99,99)",
                "rgb(37,37,37)"
            ],
            6: [
                "rgb(247,247,247)",
                "rgb(217,217,217)",
                "rgb(189,189,189)",
                "rgb(150,150,150)",
                "rgb(99,99,99)",
                "rgb(37,37,37)"
            ],
            7: [
                "rgb(247,247,247)",
                "rgb(217,217,217)",
                "rgb(189,189,189)",
                "rgb(150,150,150)",
                "rgb(115,115,115)",
                "rgb(82,82,82)",
                "rgb(37,37,37)"
            ],
            8: [
                "rgb(255,255,255)",
                "rgb(240,240,240)",
                "rgb(217,217,217)",
                "rgb(189,189,189)",
                "rgb(150,150,150)",
                "rgb(115,115,115)",
                "rgb(82,82,82)",
                "rgb(37,37,37)"
            ],
            9: [
                "rgb(255,255,255)",
                "rgb(240,240,240)",
                "rgb(217,217,217)",
                "rgb(189,189,189)",
                "rgb(150,150,150)",
                "rgb(115,115,115)",
                "rgb(82,82,82)",
                "rgb(37,37,37)",
                "rgb(0,0,0)"
            ],
            type: "seq"
        },
        OrRd: {
            3: [
                "rgb(254,232,200)",
                "rgb(253,187,132)",
                "rgb(227,74,51)"
            ],
            4: [
                "rgb(254,240,217)",
                "rgb(253,204,138)",
                "rgb(252,141,89)",
                "rgb(215,48,31)"
            ],
            5: [
                "rgb(254,240,217)",
                "rgb(253,204,138)",
                "rgb(252,141,89)",
                "rgb(227,74,51)",
                "rgb(179,0,0)"
            ],
            6: [
                "rgb(254,240,217)",
                "rgb(253,212,158)",
                "rgb(253,187,132)",
                "rgb(252,141,89)",
                "rgb(227,74,51)",
                "rgb(179,0,0)"
            ],
            7: [
                "rgb(254,240,217)",
                "rgb(253,212,158)",
                "rgb(253,187,132)",
                "rgb(252,141,89)",
                "rgb(239,101,72)",
                "rgb(215,48,31)",
                "rgb(153,0,0)"
            ],
            8: [
                "rgb(255,247,236)",
                "rgb(254,232,200)",
                "rgb(253,212,158)",
                "rgb(253,187,132)",
                "rgb(252,141,89)",
                "rgb(239,101,72)",
                "rgb(215,48,31)",
                "rgb(153,0,0)"
            ],
            9: [
                "rgb(255,247,236)",
                "rgb(254,232,200)",
                "rgb(253,212,158)",
                "rgb(253,187,132)",
                "rgb(252,141,89)",
                "rgb(239,101,72)",
                "rgb(215,48,31)",
                "rgb(179,0,0)",
                "rgb(127,0,0)"
            ],
            type: "seq"
        },
        Oranges: {
            3: [
                "rgb(254,230,206)",
                "rgb(253,174,107)",
                "rgb(230,85,13)"
            ],
            4: [
                "rgb(254,237,222)",
                "rgb(253,190,133)",
                "rgb(253,141,60)",
                "rgb(217,71,1)"
            ],
            5: [
                "rgb(254,237,222)",
                "rgb(253,190,133)",
                "rgb(253,141,60)",
                "rgb(230,85,13)",
                "rgb(166,54,3)"
            ],
            6: [
                "rgb(254,237,222)",
                "rgb(253,208,162)",
                "rgb(253,174,107)",
                "rgb(253,141,60)",
                "rgb(230,85,13)",
                "rgb(166,54,3)"
            ],
            7: [
                "rgb(254,237,222)",
                "rgb(253,208,162)",
                "rgb(253,174,107)",
                "rgb(253,141,60)",
                "rgb(241,105,19)",
                "rgb(217,72,1)",
                "rgb(140,45,4)"
            ],
            8: [
                "rgb(255,245,235)",
                "rgb(254,230,206)",
                "rgb(253,208,162)",
                "rgb(253,174,107)",
                "rgb(253,141,60)",
                "rgb(241,105,19)",
                "rgb(217,72,1)",
                "rgb(140,45,4)"
            ],
            9: [
                "rgb(255,245,235)",
                "rgb(254,230,206)",
                "rgb(253,208,162)",
                "rgb(253,174,107)",
                "rgb(253,141,60)",
                "rgb(241,105,19)",
                "rgb(217,72,1)",
                "rgb(166,54,3)",
                "rgb(127,39,4)"
            ],
            type: "seq"
        },
        PRGn: {
            10: [
                "rgb(64,0,75)",
                "rgb(118,42,131)",
                "rgb(153,112,171)",
                "rgb(194,165,207)",
                "rgb(231,212,232)",
                "rgb(217,240,211)",
                "rgb(166,219,160)",
                "rgb(90,174,97)",
                "rgb(27,120,55)",
                "rgb(0,68,27)"
            ],
            11: [
                "rgb(64,0,75)",
                "rgb(118,42,131)",
                "rgb(153,112,171)",
                "rgb(194,165,207)",
                "rgb(231,212,232)",
                "rgb(247,247,247)",
                "rgb(217,240,211)",
                "rgb(166,219,160)",
                "rgb(90,174,97)",
                "rgb(27,120,55)",
                "rgb(0,68,27)"
            ],
            3: [
                "rgb(175,141,195)",
                "rgb(247,247,247)",
                "rgb(127,191,123)"
            ],
            4: [
                "rgb(123,50,148)",
                "rgb(194,165,207)",
                "rgb(166,219,160)",
                "rgb(0,136,55)"
            ],
            5: [
                "rgb(123,50,148)",
                "rgb(194,165,207)",
                "rgb(247,247,247)",
                "rgb(166,219,160)",
                "rgb(0,136,55)"
            ],
            6: [
                "rgb(118,42,131)",
                "rgb(175,141,195)",
                "rgb(231,212,232)",
                "rgb(217,240,211)",
                "rgb(127,191,123)",
                "rgb(27,120,55)"
            ],
            7: [
                "rgb(118,42,131)",
                "rgb(175,141,195)",
                "rgb(231,212,232)",
                "rgb(247,247,247)",
                "rgb(217,240,211)",
                "rgb(127,191,123)",
                "rgb(27,120,55)"
            ],
            8: [
                "rgb(118,42,131)",
                "rgb(153,112,171)",
                "rgb(194,165,207)",
                "rgb(231,212,232)",
                "rgb(217,240,211)",
                "rgb(166,219,160)",
                "rgb(90,174,97)",
                "rgb(27,120,55)"
            ],
            9: [
                "rgb(118,42,131)",
                "rgb(153,112,171)",
                "rgb(194,165,207)",
                "rgb(231,212,232)",
                "rgb(247,247,247)",
                "rgb(217,240,211)",
                "rgb(166,219,160)",
                "rgb(90,174,97)",
                "rgb(27,120,55)"
            ],
            type: "div"
        },
        Paired: {
            10: [
                "rgb(166,206,227)",
                "rgb(31,120,180)",
                "rgb(178,223,138)",
                "rgb(51,160,44)",
                "rgb(251,154,153)",
                "rgb(227,26,28)",
                "rgb(253,191,111)",
                "rgb(255,127,0)",
                "rgb(202,178,214)",
                "rgb(106,61,154)"
            ],
            11: [
                "rgb(166,206,227)",
                "rgb(31,120,180)",
                "rgb(178,223,138)",
                "rgb(51,160,44)",
                "rgb(251,154,153)",
                "rgb(227,26,28)",
                "rgb(253,191,111)",
                "rgb(255,127,0)",
                "rgb(202,178,214)",
                "rgb(106,61,154)",
                "rgb(255,255,153)"
            ],
            12: [
                "rgb(166,206,227)",
                "rgb(31,120,180)",
                "rgb(178,223,138)",
                "rgb(51,160,44)",
                "rgb(251,154,153)",
                "rgb(227,26,28)",
                "rgb(253,191,111)",
                "rgb(255,127,0)",
                "rgb(202,178,214)",
                "rgb(106,61,154)",
                "rgb(255,255,153)",
                "rgb(177,89,40)"
            ],
            3: [
                "rgb(166,206,227)",
                "rgb(31,120,180)",
                "rgb(178,223,138)"
            ],
            4: [
                "rgb(166,206,227)",
                "rgb(31,120,180)",
                "rgb(178,223,138)",
                "rgb(51,160,44)"
            ],
            5: [
                "rgb(166,206,227)",
                "rgb(31,120,180)",
                "rgb(178,223,138)",
                "rgb(51,160,44)",
                "rgb(251,154,153)"
            ],
            6: [
                "rgb(166,206,227)",
                "rgb(31,120,180)",
                "rgb(178,223,138)",
                "rgb(51,160,44)",
                "rgb(251,154,153)",
                "rgb(227,26,28)"
            ],
            7: [
                "rgb(166,206,227)",
                "rgb(31,120,180)",
                "rgb(178,223,138)",
                "rgb(51,160,44)",
                "rgb(251,154,153)",
                "rgb(227,26,28)",
                "rgb(253,191,111)"
            ],
            8: [
                "rgb(166,206,227)",
                "rgb(31,120,180)",
                "rgb(178,223,138)",
                "rgb(51,160,44)",
                "rgb(251,154,153)",
                "rgb(227,26,28)",
                "rgb(253,191,111)",
                "rgb(255,127,0)"
            ],
            9: [
                "rgb(166,206,227)",
                "rgb(31,120,180)",
                "rgb(178,223,138)",
                "rgb(51,160,44)",
                "rgb(251,154,153)",
                "rgb(227,26,28)",
                "rgb(253,191,111)",
                "rgb(255,127,0)",
                "rgb(202,178,214)"
            ],
            type: "qual"
        },
        Pastel1: {
            3: [
                "rgb(251,180,174)",
                "rgb(179,205,227)",
                "rgb(204,235,197)"
            ],
            4: [
                "rgb(251,180,174)",
                "rgb(179,205,227)",
                "rgb(204,235,197)",
                "rgb(222,203,228)"
            ],
            5: [
                "rgb(251,180,174)",
                "rgb(179,205,227)",
                "rgb(204,235,197)",
                "rgb(222,203,228)",
                "rgb(254,217,166)"
            ],
            6: [
                "rgb(251,180,174)",
                "rgb(179,205,227)",
                "rgb(204,235,197)",
                "rgb(222,203,228)",
                "rgb(254,217,166)",
                "rgb(255,255,204)"
            ],
            7: [
                "rgb(251,180,174)",
                "rgb(179,205,227)",
                "rgb(204,235,197)",
                "rgb(222,203,228)",
                "rgb(254,217,166)",
                "rgb(255,255,204)",
                "rgb(229,216,189)"
            ],
            8: [
                "rgb(251,180,174)",
                "rgb(179,205,227)",
                "rgb(204,235,197)",
                "rgb(222,203,228)",
                "rgb(254,217,166)",
                "rgb(255,255,204)",
                "rgb(229,216,189)",
                "rgb(253,218,236)"
            ],
            9: [
                "rgb(251,180,174)",
                "rgb(179,205,227)",
                "rgb(204,235,197)",
                "rgb(222,203,228)",
                "rgb(254,217,166)",
                "rgb(255,255,204)",
                "rgb(229,216,189)",
                "rgb(253,218,236)",
                "rgb(242,242,242)"
            ],
            type: "qual"
        },
        Pastel2: {
            3: [
                "rgb(179,226,205)",
                "rgb(253,205,172)",
                "rgb(203,213,232)"
            ],
            4: [
                "rgb(179,226,205)",
                "rgb(253,205,172)",
                "rgb(203,213,232)",
                "rgb(244,202,228)"
            ],
            5: [
                "rgb(179,226,205)",
                "rgb(253,205,172)",
                "rgb(203,213,232)",
                "rgb(244,202,228)",
                "rgb(230,245,201)"
            ],
            6: [
                "rgb(179,226,205)",
                "rgb(253,205,172)",
                "rgb(203,213,232)",
                "rgb(244,202,228)",
                "rgb(230,245,201)",
                "rgb(255,242,174)"
            ],
            7: [
                "rgb(179,226,205)",
                "rgb(253,205,172)",
                "rgb(203,213,232)",
                "rgb(244,202,228)",
                "rgb(230,245,201)",
                "rgb(255,242,174)",
                "rgb(241,226,204)"
            ],
            8: [
                "rgb(179,226,205)",
                "rgb(253,205,172)",
                "rgb(203,213,232)",
                "rgb(244,202,228)",
                "rgb(230,245,201)",
                "rgb(255,242,174)",
                "rgb(241,226,204)",
                "rgb(204,204,204)"
            ],
            type: "qual"
        },
        PiYG: {
            10: [
                "rgb(142,1,82)",
                "rgb(197,27,125)",
                "rgb(222,119,174)",
                "rgb(241,182,218)",
                "rgb(253,224,239)",
                "rgb(230,245,208)",
                "rgb(184,225,134)",
                "rgb(127,188,65)",
                "rgb(77,146,33)",
                "rgb(39,100,25)"
            ],
            11: [
                "rgb(142,1,82)",
                "rgb(197,27,125)",
                "rgb(222,119,174)",
                "rgb(241,182,218)",
                "rgb(253,224,239)",
                "rgb(247,247,247)",
                "rgb(230,245,208)",
                "rgb(184,225,134)",
                "rgb(127,188,65)",
                "rgb(77,146,33)",
                "rgb(39,100,25)"
            ],
            3: [
                "rgb(233,163,201)",
                "rgb(247,247,247)",
                "rgb(161,215,106)"
            ],
            4: [
                "rgb(208,28,139)",
                "rgb(241,182,218)",
                "rgb(184,225,134)",
                "rgb(77,172,38)"
            ],
            5: [
                "rgb(208,28,139)",
                "rgb(241,182,218)",
                "rgb(247,247,247)",
                "rgb(184,225,134)",
                "rgb(77,172,38)"
            ],
            6: [
                "rgb(197,27,125)",
                "rgb(233,163,201)",
                "rgb(253,224,239)",
                "rgb(230,245,208)",
                "rgb(161,215,106)",
                "rgb(77,146,33)"
            ],
            7: [
                "rgb(197,27,125)",
                "rgb(233,163,201)",
                "rgb(253,224,239)",
                "rgb(247,247,247)",
                "rgb(230,245,208)",
                "rgb(161,215,106)",
                "rgb(77,146,33)"
            ],
            8: [
                "rgb(197,27,125)",
                "rgb(222,119,174)",
                "rgb(241,182,218)",
                "rgb(253,224,239)",
                "rgb(230,245,208)",
                "rgb(184,225,134)",
                "rgb(127,188,65)",
                "rgb(77,146,33)"
            ],
            9: [
                "rgb(197,27,125)",
                "rgb(222,119,174)",
                "rgb(241,182,218)",
                "rgb(253,224,239)",
                "rgb(247,247,247)",
                "rgb(230,245,208)",
                "rgb(184,225,134)",
                "rgb(127,188,65)",
                "rgb(77,146,33)"
            ],
            type: "div"
        },
        PuBu: {
            3: [
                "rgb(236,231,242)",
                "rgb(166,189,219)",
                "rgb(43,140,190)"
            ],
            4: [
                "rgb(241,238,246)",
                "rgb(189,201,225)",
                "rgb(116,169,207)",
                "rgb(5,112,176)"
            ],
            5: [
                "rgb(241,238,246)",
                "rgb(189,201,225)",
                "rgb(116,169,207)",
                "rgb(43,140,190)",
                "rgb(4,90,141)"
            ],
            6: [
                "rgb(241,238,246)",
                "rgb(208,209,230)",
                "rgb(166,189,219)",
                "rgb(116,169,207)",
                "rgb(43,140,190)",
                "rgb(4,90,141)"
            ],
            7: [
                "rgb(241,238,246)",
                "rgb(208,209,230)",
                "rgb(166,189,219)",
                "rgb(116,169,207)",
                "rgb(54,144,192)",
                "rgb(5,112,176)",
                "rgb(3,78,123)"
            ],
            8: [
                "rgb(255,247,251)",
                "rgb(236,231,242)",
                "rgb(208,209,230)",
                "rgb(166,189,219)",
                "rgb(116,169,207)",
                "rgb(54,144,192)",
                "rgb(5,112,176)",
                "rgb(3,78,123)"
            ],
            9: [
                "rgb(255,247,251)",
                "rgb(236,231,242)",
                "rgb(208,209,230)",
                "rgb(166,189,219)",
                "rgb(116,169,207)",
                "rgb(54,144,192)",
                "rgb(5,112,176)",
                "rgb(4,90,141)",
                "rgb(2,56,88)"
            ],
            type: "seq"
        },
        PuBuGn: {
            3: [
                "rgb(236,226,240)",
                "rgb(166,189,219)",
                "rgb(28,144,153)"
            ],
            4: [
                "rgb(246,239,247)",
                "rgb(189,201,225)",
                "rgb(103,169,207)",
                "rgb(2,129,138)"
            ],
            5: [
                "rgb(246,239,247)",
                "rgb(189,201,225)",
                "rgb(103,169,207)",
                "rgb(28,144,153)",
                "rgb(1,108,89)"
            ],
            6: [
                "rgb(246,239,247)",
                "rgb(208,209,230)",
                "rgb(166,189,219)",
                "rgb(103,169,207)",
                "rgb(28,144,153)",
                "rgb(1,108,89)"
            ],
            7: [
                "rgb(246,239,247)",
                "rgb(208,209,230)",
                "rgb(166,189,219)",
                "rgb(103,169,207)",
                "rgb(54,144,192)",
                "rgb(2,129,138)",
                "rgb(1,100,80)"
            ],
            8: [
                "rgb(255,247,251)",
                "rgb(236,226,240)",
                "rgb(208,209,230)",
                "rgb(166,189,219)",
                "rgb(103,169,207)",
                "rgb(54,144,192)",
                "rgb(2,129,138)",
                "rgb(1,100,80)"
            ],
            9: [
                "rgb(255,247,251)",
                "rgb(236,226,240)",
                "rgb(208,209,230)",
                "rgb(166,189,219)",
                "rgb(103,169,207)",
                "rgb(54,144,192)",
                "rgb(2,129,138)",
                "rgb(1,108,89)",
                "rgb(1,70,54)"
            ],
            type: "seq"
        },
        PuOr: {
            10: [
                "rgb(127,59,8)",
                "rgb(179,88,6)",
                "rgb(224,130,20)",
                "rgb(253,184,99)",
                "rgb(254,224,182)",
                "rgb(216,218,235)",
                "rgb(178,171,210)",
                "rgb(128,115,172)",
                "rgb(84,39,136)",
                "rgb(45,0,75)"
            ],
            11: [
                "rgb(127,59,8)",
                "rgb(179,88,6)",
                "rgb(224,130,20)",
                "rgb(253,184,99)",
                "rgb(254,224,182)",
                "rgb(247,247,247)",
                "rgb(216,218,235)",
                "rgb(178,171,210)",
                "rgb(128,115,172)",
                "rgb(84,39,136)",
                "rgb(45,0,75)"
            ],
            3: [
                "rgb(241,163,64)",
                "rgb(247,247,247)",
                "rgb(153,142,195)"
            ],
            4: [
                "rgb(230,97,1)",
                "rgb(253,184,99)",
                "rgb(178,171,210)",
                "rgb(94,60,153)"
            ],
            5: [
                "rgb(230,97,1)",
                "rgb(253,184,99)",
                "rgb(247,247,247)",
                "rgb(178,171,210)",
                "rgb(94,60,153)"
            ],
            6: [
                "rgb(179,88,6)",
                "rgb(241,163,64)",
                "rgb(254,224,182)",
                "rgb(216,218,235)",
                "rgb(153,142,195)",
                "rgb(84,39,136)"
            ],
            7: [
                "rgb(179,88,6)",
                "rgb(241,163,64)",
                "rgb(254,224,182)",
                "rgb(247,247,247)",
                "rgb(216,218,235)",
                "rgb(153,142,195)",
                "rgb(84,39,136)"
            ],
            8: [
                "rgb(179,88,6)",
                "rgb(224,130,20)",
                "rgb(253,184,99)",
                "rgb(254,224,182)",
                "rgb(216,218,235)",
                "rgb(178,171,210)",
                "rgb(128,115,172)",
                "rgb(84,39,136)"
            ],
            9: [
                "rgb(179,88,6)",
                "rgb(224,130,20)",
                "rgb(253,184,99)",
                "rgb(254,224,182)",
                "rgb(247,247,247)",
                "rgb(216,218,235)",
                "rgb(178,171,210)",
                "rgb(128,115,172)",
                "rgb(84,39,136)"
            ],
            type: "div"
        },
        PuRd: {
            3: [
                "rgb(231,225,239)",
                "rgb(201,148,199)",
                "rgb(221,28,119)"
            ],
            4: [
                "rgb(241,238,246)",
                "rgb(215,181,216)",
                "rgb(223,101,176)",
                "rgb(206,18,86)"
            ],
            5: [
                "rgb(241,238,246)",
                "rgb(215,181,216)",
                "rgb(223,101,176)",
                "rgb(221,28,119)",
                "rgb(152,0,67)"
            ],
            6: [
                "rgb(241,238,246)",
                "rgb(212,185,218)",
                "rgb(201,148,199)",
                "rgb(223,101,176)",
                "rgb(221,28,119)",
                "rgb(152,0,67)"
            ],
            7: [
                "rgb(241,238,246)",
                "rgb(212,185,218)",
                "rgb(201,148,199)",
                "rgb(223,101,176)",
                "rgb(231,41,138)",
                "rgb(206,18,86)",
                "rgb(145,0,63)"
            ],
            8: [
                "rgb(247,244,249)",
                "rgb(231,225,239)",
                "rgb(212,185,218)",
                "rgb(201,148,199)",
                "rgb(223,101,176)",
                "rgb(231,41,138)",
                "rgb(206,18,86)",
                "rgb(145,0,63)"
            ],
            9: [
                "rgb(247,244,249)",
                "rgb(231,225,239)",
                "rgb(212,185,218)",
                "rgb(201,148,199)",
                "rgb(223,101,176)",
                "rgb(231,41,138)",
                "rgb(206,18,86)",
                "rgb(152,0,67)",
                "rgb(103,0,31)"
            ],
            type: "seq"
        },
        Purples: {
            3: [
                "rgb(239,237,245)",
                "rgb(188,189,220)",
                "rgb(117,107,177)"
            ],
            4: [
                "rgb(242,240,247)",
                "rgb(203,201,226)",
                "rgb(158,154,200)",
                "rgb(106,81,163)"
            ],
            5: [
                "rgb(242,240,247)",
                "rgb(203,201,226)",
                "rgb(158,154,200)",
                "rgb(117,107,177)",
                "rgb(84,39,143)"
            ],
            6: [
                "rgb(242,240,247)",
                "rgb(218,218,235)",
                "rgb(188,189,220)",
                "rgb(158,154,200)",
                "rgb(117,107,177)",
                "rgb(84,39,143)"
            ],
            7: [
                "rgb(242,240,247)",
                "rgb(218,218,235)",
                "rgb(188,189,220)",
                "rgb(158,154,200)",
                "rgb(128,125,186)",
                "rgb(106,81,163)",
                "rgb(74,20,134)"
            ],
            8: [
                "rgb(252,251,253)",
                "rgb(239,237,245)",
                "rgb(218,218,235)",
                "rgb(188,189,220)",
                "rgb(158,154,200)",
                "rgb(128,125,186)",
                "rgb(106,81,163)",
                "rgb(74,20,134)"
            ],
            9: [
                "rgb(252,251,253)",
                "rgb(239,237,245)",
                "rgb(218,218,235)",
                "rgb(188,189,220)",
                "rgb(158,154,200)",
                "rgb(128,125,186)",
                "rgb(106,81,163)",
                "rgb(84,39,143)",
                "rgb(63,0,125)"
            ],
            type: "seq"
        },
        RdBu: {
            10: [
                "rgb(103,0,31)",
                "rgb(178,24,43)",
                "rgb(214,96,77)",
                "rgb(244,165,130)",
                "rgb(253,219,199)",
                "rgb(209,229,240)",
                "rgb(146,197,222)",
                "rgb(67,147,195)",
                "rgb(33,102,172)",
                "rgb(5,48,97)"
            ],
            11: [
                "rgb(103,0,31)",
                "rgb(178,24,43)",
                "rgb(214,96,77)",
                "rgb(244,165,130)",
                "rgb(253,219,199)",
                "rgb(247,247,247)",
                "rgb(209,229,240)",
                "rgb(146,197,222)",
                "rgb(67,147,195)",
                "rgb(33,102,172)",
                "rgb(5,48,97)"
            ],
            3: [
                "rgb(239,138,98)",
                "rgb(247,247,247)",
                "rgb(103,169,207)"
            ],
            4: [
                "rgb(202,0,32)",
                "rgb(244,165,130)",
                "rgb(146,197,222)",
                "rgb(5,113,176)"
            ],
            5: [
                "rgb(202,0,32)",
                "rgb(244,165,130)",
                "rgb(247,247,247)",
                "rgb(146,197,222)",
                "rgb(5,113,176)"
            ],
            6: [
                "rgb(178,24,43)",
                "rgb(239,138,98)",
                "rgb(253,219,199)",
                "rgb(209,229,240)",
                "rgb(103,169,207)",
                "rgb(33,102,172)"
            ],
            7: [
                "rgb(178,24,43)",
                "rgb(239,138,98)",
                "rgb(253,219,199)",
                "rgb(247,247,247)",
                "rgb(209,229,240)",
                "rgb(103,169,207)",
                "rgb(33,102,172)"
            ],
            8: [
                "rgb(178,24,43)",
                "rgb(214,96,77)",
                "rgb(244,165,130)",
                "rgb(253,219,199)",
                "rgb(209,229,240)",
                "rgb(146,197,222)",
                "rgb(67,147,195)",
                "rgb(33,102,172)"
            ],
            9: [
                "rgb(178,24,43)",
                "rgb(214,96,77)",
                "rgb(244,165,130)",
                "rgb(253,219,199)",
                "rgb(247,247,247)",
                "rgb(209,229,240)",
                "rgb(146,197,222)",
                "rgb(67,147,195)",
                "rgb(33,102,172)"
            ],
            type: "div"
        },
        RdGy: {
            10: [
                "rgb(103,0,31)",
                "rgb(178,24,43)",
                "rgb(214,96,77)",
                "rgb(244,165,130)",
                "rgb(253,219,199)",
                "rgb(224,224,224)",
                "rgb(186,186,186)",
                "rgb(135,135,135)",
                "rgb(77,77,77)",
                "rgb(26,26,26)"
            ],
            11: [
                "rgb(103,0,31)",
                "rgb(178,24,43)",
                "rgb(214,96,77)",
                "rgb(244,165,130)",
                "rgb(253,219,199)",
                "rgb(255,255,255)",
                "rgb(224,224,224)",
                "rgb(186,186,186)",
                "rgb(135,135,135)",
                "rgb(77,77,77)",
                "rgb(26,26,26)"
            ],
            3: [
                "rgb(239,138,98)",
                "rgb(255,255,255)",
                "rgb(153,153,153)"
            ],
            4: [
                "rgb(202,0,32)",
                "rgb(244,165,130)",
                "rgb(186,186,186)",
                "rgb(64,64,64)"
            ],
            5: [
                "rgb(202,0,32)",
                "rgb(244,165,130)",
                "rgb(255,255,255)",
                "rgb(186,186,186)",
                "rgb(64,64,64)"
            ],
            6: [
                "rgb(178,24,43)",
                "rgb(239,138,98)",
                "rgb(253,219,199)",
                "rgb(224,224,224)",
                "rgb(153,153,153)",
                "rgb(77,77,77)"
            ],
            7: [
                "rgb(178,24,43)",
                "rgb(239,138,98)",
                "rgb(253,219,199)",
                "rgb(255,255,255)",
                "rgb(224,224,224)",
                "rgb(153,153,153)",
                "rgb(77,77,77)"
            ],
            8: [
                "rgb(178,24,43)",
                "rgb(214,96,77)",
                "rgb(244,165,130)",
                "rgb(253,219,199)",
                "rgb(224,224,224)",
                "rgb(186,186,186)",
                "rgb(135,135,135)",
                "rgb(77,77,77)"
            ],
            9: [
                "rgb(178,24,43)",
                "rgb(214,96,77)",
                "rgb(244,165,130)",
                "rgb(253,219,199)",
                "rgb(255,255,255)",
                "rgb(224,224,224)",
                "rgb(186,186,186)",
                "rgb(135,135,135)",
                "rgb(77,77,77)"
            ],
            type: "div"
        },
        RdPu: {
            3: [
                "rgb(253,224,221)",
                "rgb(250,159,181)",
                "rgb(197,27,138)"
            ],
            4: [
                "rgb(254,235,226)",
                "rgb(251,180,185)",
                "rgb(247,104,161)",
                "rgb(174,1,126)"
            ],
            5: [
                "rgb(254,235,226)",
                "rgb(251,180,185)",
                "rgb(247,104,161)",
                "rgb(197,27,138)",
                "rgb(122,1,119)"
            ],
            6: [
                "rgb(254,235,226)",
                "rgb(252,197,192)",
                "rgb(250,159,181)",
                "rgb(247,104,161)",
                "rgb(197,27,138)",
                "rgb(122,1,119)"
            ],
            7: [
                "rgb(254,235,226)",
                "rgb(252,197,192)",
                "rgb(250,159,181)",
                "rgb(247,104,161)",
                "rgb(221,52,151)",
                "rgb(174,1,126)",
                "rgb(122,1,119)"
            ],
            8: [
                "rgb(255,247,243)",
                "rgb(253,224,221)",
                "rgb(252,197,192)",
                "rgb(250,159,181)",
                "rgb(247,104,161)",
                "rgb(221,52,151)",
                "rgb(174,1,126)",
                "rgb(122,1,119)"
            ],
            9: [
                "rgb(255,247,243)",
                "rgb(253,224,221)",
                "rgb(252,197,192)",
                "rgb(250,159,181)",
                "rgb(247,104,161)",
                "rgb(221,52,151)",
                "rgb(174,1,126)",
                "rgb(122,1,119)",
                "rgb(73,0,106)"
            ],
            type: "seq"
        },
        RdYlBu: {
            10: [
                "rgb(165,0,38)",
                "rgb(215,48,39)",
                "rgb(244,109,67)",
                "rgb(253,174,97)",
                "rgb(254,224,144)",
                "rgb(224,243,248)",
                "rgb(171,217,233)",
                "rgb(116,173,209)",
                "rgb(69,117,180)",
                "rgb(49,54,149)"
            ],
            11: [
                "rgb(165,0,38)",
                "rgb(215,48,39)",
                "rgb(244,109,67)",
                "rgb(253,174,97)",
                "rgb(254,224,144)",
                "rgb(255,255,191)",
                "rgb(224,243,248)",
                "rgb(171,217,233)",
                "rgb(116,173,209)",
                "rgb(69,117,180)",
                "rgb(49,54,149)"
            ],
            3: [
                "rgb(252,141,89)",
                "rgb(255,255,191)",
                "rgb(145,191,219)"
            ],
            4: [
                "rgb(215,25,28)",
                "rgb(253,174,97)",
                "rgb(171,217,233)",
                "rgb(44,123,182)"
            ],
            5: [
                "rgb(215,25,28)",
                "rgb(253,174,97)",
                "rgb(255,255,191)",
                "rgb(171,217,233)",
                "rgb(44,123,182)"
            ],
            6: [
                "rgb(215,48,39)",
                "rgb(252,141,89)",
                "rgb(254,224,144)",
                "rgb(224,243,248)",
                "rgb(145,191,219)",
                "rgb(69,117,180)"
            ],
            7: [
                "rgb(215,48,39)",
                "rgb(252,141,89)",
                "rgb(254,224,144)",
                "rgb(255,255,191)",
                "rgb(224,243,248)",
                "rgb(145,191,219)",
                "rgb(69,117,180)"
            ],
            8: [
                "rgb(215,48,39)",
                "rgb(244,109,67)",
                "rgb(253,174,97)",
                "rgb(254,224,144)",
                "rgb(224,243,248)",
                "rgb(171,217,233)",
                "rgb(116,173,209)",
                "rgb(69,117,180)"
            ],
            9: [
                "rgb(215,48,39)",
                "rgb(244,109,67)",
                "rgb(253,174,97)",
                "rgb(254,224,144)",
                "rgb(255,255,191)",
                "rgb(224,243,248)",
                "rgb(171,217,233)",
                "rgb(116,173,209)",
                "rgb(69,117,180)"
            ],
            type: "div"
        },
        RdYlGn: {
            10: [
                "rgb(165,0,38)",
                "rgb(215,48,39)",
                "rgb(244,109,67)",
                "rgb(253,174,97)",
                "rgb(254,224,139)",
                "rgb(217,239,139)",
                "rgb(166,217,106)",
                "rgb(102,189,99)",
                "rgb(26,152,80)",
                "rgb(0,104,55)"
            ],
            11: [
                "rgb(165,0,38)",
                "rgb(215,48,39)",
                "rgb(244,109,67)",
                "rgb(253,174,97)",
                "rgb(254,224,139)",
                "rgb(255,255,191)",
                "rgb(217,239,139)",
                "rgb(166,217,106)",
                "rgb(102,189,99)",
                "rgb(26,152,80)",
                "rgb(0,104,55)"
            ],
            3: [
                "rgb(252,141,89)",
                "rgb(255,255,191)",
                "rgb(145,207,96)"
            ],
            4: [
                "rgb(215,25,28)",
                "rgb(253,174,97)",
                "rgb(166,217,106)",
                "rgb(26,150,65)"
            ],
            5: [
                "rgb(215,25,28)",
                "rgb(253,174,97)",
                "rgb(255,255,191)",
                "rgb(166,217,106)",
                "rgb(26,150,65)"
            ],
            6: [
                "rgb(215,48,39)",
                "rgb(252,141,89)",
                "rgb(254,224,139)",
                "rgb(217,239,139)",
                "rgb(145,207,96)",
                "rgb(26,152,80)"
            ],
            7: [
                "rgb(215,48,39)",
                "rgb(252,141,89)",
                "rgb(254,224,139)",
                "rgb(255,255,191)",
                "rgb(217,239,139)",
                "rgb(145,207,96)",
                "rgb(26,152,80)"
            ],
            8: [
                "rgb(215,48,39)",
                "rgb(244,109,67)",
                "rgb(253,174,97)",
                "rgb(254,224,139)",
                "rgb(217,239,139)",
                "rgb(166,217,106)",
                "rgb(102,189,99)",
                "rgb(26,152,80)"
            ],
            9: [
                "rgb(215,48,39)",
                "rgb(244,109,67)",
                "rgb(253,174,97)",
                "rgb(254,224,139)",
                "rgb(255,255,191)",
                "rgb(217,239,139)",
                "rgb(166,217,106)",
                "rgb(102,189,99)",
                "rgb(26,152,80)"
            ],
            type: "div"
        },
        Reds: {
            3: [
                "rgb(254,224,210)",
                "rgb(252,146,114)",
                "rgb(222,45,38)"
            ],
            4: [
                "rgb(254,229,217)",
                "rgb(252,174,145)",
                "rgb(251,106,74)",
                "rgb(203,24,29)"
            ],
            5: [
                "rgb(254,229,217)",
                "rgb(252,174,145)",
                "rgb(251,106,74)",
                "rgb(222,45,38)",
                "rgb(165,15,21)"
            ],
            6: [
                "rgb(254,229,217)",
                "rgb(252,187,161)",
                "rgb(252,146,114)",
                "rgb(251,106,74)",
                "rgb(222,45,38)",
                "rgb(165,15,21)"
            ],
            7: [
                "rgb(254,229,217)",
                "rgb(252,187,161)",
                "rgb(252,146,114)",
                "rgb(251,106,74)",
                "rgb(239,59,44)",
                "rgb(203,24,29)",
                "rgb(153,0,13)"
            ],
            8: [
                "rgb(255,245,240)",
                "rgb(254,224,210)",
                "rgb(252,187,161)",
                "rgb(252,146,114)",
                "rgb(251,106,74)",
                "rgb(239,59,44)",
                "rgb(203,24,29)",
                "rgb(153,0,13)"
            ],
            9: [
                "rgb(255,245,240)",
                "rgb(254,224,210)",
                "rgb(252,187,161)",
                "rgb(252,146,114)",
                "rgb(251,106,74)",
                "rgb(239,59,44)",
                "rgb(203,24,29)",
                "rgb(165,15,21)",
                "rgb(103,0,13)"
            ],
            type: "seq"
        },
        Set1: {
            3: [
                "rgb(228,26,28)",
                "rgb(55,126,184)",
                "rgb(77,175,74)"
            ],
            4: [
                "rgb(228,26,28)",
                "rgb(55,126,184)",
                "rgb(77,175,74)",
                "rgb(152,78,163)"
            ],
            5: [
                "rgb(228,26,28)",
                "rgb(55,126,184)",
                "rgb(77,175,74)",
                "rgb(152,78,163)",
                "rgb(255,127,0)"
            ],
            6: [
                "rgb(228,26,28)",
                "rgb(55,126,184)",
                "rgb(77,175,74)",
                "rgb(152,78,163)",
                "rgb(255,127,0)",
                "rgb(255,255,51)"
            ],
            7: [
                "rgb(228,26,28)",
                "rgb(55,126,184)",
                "rgb(77,175,74)",
                "rgb(152,78,163)",
                "rgb(255,127,0)",
                "rgb(255,255,51)",
                "rgb(166,86,40)"
            ],
            8: [
                "rgb(228,26,28)",
                "rgb(55,126,184)",
                "rgb(77,175,74)",
                "rgb(152,78,163)",
                "rgb(255,127,0)",
                "rgb(255,255,51)",
                "rgb(166,86,40)",
                "rgb(247,129,191)"
            ],
            9: [
                "rgb(228,26,28)",
                "rgb(55,126,184)",
                "rgb(77,175,74)",
                "rgb(152,78,163)",
                "rgb(255,127,0)",
                "rgb(255,255,51)",
                "rgb(166,86,40)",
                "rgb(247,129,191)",
                "rgb(153,153,153)"
            ],
            type: "qual"
        },
        Set2: {
            3: [
                "rgb(102,194,165)",
                "rgb(252,141,98)",
                "rgb(141,160,203)"
            ],
            4: [
                "rgb(102,194,165)",
                "rgb(252,141,98)",
                "rgb(141,160,203)",
                "rgb(231,138,195)"
            ],
            5: [
                "rgb(102,194,165)",
                "rgb(252,141,98)",
                "rgb(141,160,203)",
                "rgb(231,138,195)",
                "rgb(166,216,84)"
            ],
            6: [
                "rgb(102,194,165)",
                "rgb(252,141,98)",
                "rgb(141,160,203)",
                "rgb(231,138,195)",
                "rgb(166,216,84)",
                "rgb(255,217,47)"
            ],
            7: [
                "rgb(102,194,165)",
                "rgb(252,141,98)",
                "rgb(141,160,203)",
                "rgb(231,138,195)",
                "rgb(166,216,84)",
                "rgb(255,217,47)",
                "rgb(229,196,148)"
            ],
            8: [
                "rgb(102,194,165)",
                "rgb(252,141,98)",
                "rgb(141,160,203)",
                "rgb(231,138,195)",
                "rgb(166,216,84)",
                "rgb(255,217,47)",
                "rgb(229,196,148)",
                "rgb(179,179,179)"
            ],
            type: "qual"
        },
        Set3: {
            10: [
                "rgb(141,211,199)",
                "rgb(255,255,179)",
                "rgb(190,186,218)",
                "rgb(251,128,114)",
                "rgb(128,177,211)",
                "rgb(253,180,98)",
                "rgb(179,222,105)",
                "rgb(252,205,229)",
                "rgb(217,217,217)",
                "rgb(188,128,189)"
            ],
            11: [
                "rgb(141,211,199)",
                "rgb(255,255,179)",
                "rgb(190,186,218)",
                "rgb(251,128,114)",
                "rgb(128,177,211)",
                "rgb(253,180,98)",
                "rgb(179,222,105)",
                "rgb(252,205,229)",
                "rgb(217,217,217)",
                "rgb(188,128,189)",
                "rgb(204,235,197)"
            ],
            12: [
                "rgb(141,211,199)",
                "rgb(255,255,179)",
                "rgb(190,186,218)",
                "rgb(251,128,114)",
                "rgb(128,177,211)",
                "rgb(253,180,98)",
                "rgb(179,222,105)",
                "rgb(252,205,229)",
                "rgb(217,217,217)",
                "rgb(188,128,189)",
                "rgb(204,235,197)",
                "rgb(255,237,111)"
            ],
            3: [
                "rgb(141,211,199)",
                "rgb(255,255,179)",
                "rgb(190,186,218)"
            ],
            4: [
                "rgb(141,211,199)",
                "rgb(255,255,179)",
                "rgb(190,186,218)",
                "rgb(251,128,114)"
            ],
            5: [
                "rgb(141,211,199)",
                "rgb(255,255,179)",
                "rgb(190,186,218)",
                "rgb(251,128,114)",
                "rgb(128,177,211)"
            ],
            6: [
                "rgb(141,211,199)",
                "rgb(255,255,179)",
                "rgb(190,186,218)",
                "rgb(251,128,114)",
                "rgb(128,177,211)",
                "rgb(253,180,98)"
            ],
            7: [
                "rgb(141,211,199)",
                "rgb(255,255,179)",
                "rgb(190,186,218)",
                "rgb(251,128,114)",
                "rgb(128,177,211)",
                "rgb(253,180,98)",
                "rgb(179,222,105)"
            ],
            8: [
                "rgb(141,211,199)",
                "rgb(255,255,179)",
                "rgb(190,186,218)",
                "rgb(251,128,114)",
                "rgb(128,177,211)",
                "rgb(253,180,98)",
                "rgb(179,222,105)",
                "rgb(252,205,229)"
            ],
            9: [
                "rgb(141,211,199)",
                "rgb(255,255,179)",
                "rgb(190,186,218)",
                "rgb(251,128,114)",
                "rgb(128,177,211)",
                "rgb(253,180,98)",
                "rgb(179,222,105)",
                "rgb(252,205,229)",
                "rgb(217,217,217)"
            ],
            type: "qual"
        },
        Spectral: {
            10: [
                "rgb(158,1,66)",
                "rgb(213,62,79)",
                "rgb(244,109,67)",
                "rgb(253,174,97)",
                "rgb(254,224,139)",
                "rgb(230,245,152)",
                "rgb(171,221,164)",
                "rgb(102,194,165)",
                "rgb(50,136,189)",
                "rgb(94,79,162)"
            ],
            11: [
                "rgb(158,1,66)",
                "rgb(213,62,79)",
                "rgb(244,109,67)",
                "rgb(253,174,97)",
                "rgb(254,224,139)",
                "rgb(255,255,191)",
                "rgb(230,245,152)",
                "rgb(171,221,164)",
                "rgb(102,194,165)",
                "rgb(50,136,189)",
                "rgb(94,79,162)"
            ],
            3: [
                "rgb(252,141,89)",
                "rgb(255,255,191)",
                "rgb(153,213,148)"
            ],
            4: [
                "rgb(215,25,28)",
                "rgb(253,174,97)",
                "rgb(171,221,164)",
                "rgb(43,131,186)"
            ],
            5: [
                "rgb(215,25,28)",
                "rgb(253,174,97)",
                "rgb(255,255,191)",
                "rgb(171,221,164)",
                "rgb(43,131,186)"
            ],
            6: [
                "rgb(213,62,79)",
                "rgb(252,141,89)",
                "rgb(254,224,139)",
                "rgb(230,245,152)",
                "rgb(153,213,148)",
                "rgb(50,136,189)"
            ],
            7: [
                "rgb(213,62,79)",
                "rgb(252,141,89)",
                "rgb(254,224,139)",
                "rgb(255,255,191)",
                "rgb(230,245,152)",
                "rgb(153,213,148)",
                "rgb(50,136,189)"
            ],
            8: [
                "rgb(213,62,79)",
                "rgb(244,109,67)",
                "rgb(253,174,97)",
                "rgb(254,224,139)",
                "rgb(230,245,152)",
                "rgb(171,221,164)",
                "rgb(102,194,165)",
                "rgb(50,136,189)"
            ],
            9: [
                "rgb(213,62,79)",
                "rgb(244,109,67)",
                "rgb(253,174,97)",
                "rgb(254,224,139)",
                "rgb(255,255,191)",
                "rgb(230,245,152)",
                "rgb(171,221,164)",
                "rgb(102,194,165)",
                "rgb(50,136,189)"
            ],
            type: "div"
        },
        YlGn: {
            3: [
                "rgb(247,252,185)",
                "rgb(173,221,142)",
                "rgb(49,163,84)"
            ],
            4: [
                "rgb(255,255,204)",
                "rgb(194,230,153)",
                "rgb(120,198,121)",
                "rgb(35,132,67)"
            ],
            5: [
                "rgb(255,255,204)",
                "rgb(194,230,153)",
                "rgb(120,198,121)",
                "rgb(49,163,84)",
                "rgb(0,104,55)"
            ],
            6: [
                "rgb(255,255,204)",
                "rgb(217,240,163)",
                "rgb(173,221,142)",
                "rgb(120,198,121)",
                "rgb(49,163,84)",
                "rgb(0,104,55)"
            ],
            7: [
                "rgb(255,255,204)",
                "rgb(217,240,163)",
                "rgb(173,221,142)",
                "rgb(120,198,121)",
                "rgb(65,171,93)",
                "rgb(35,132,67)",
                "rgb(0,90,50)"
            ],
            8: [
                "rgb(255,255,229)",
                "rgb(247,252,185)",
                "rgb(217,240,163)",
                "rgb(173,221,142)",
                "rgb(120,198,121)",
                "rgb(65,171,93)",
                "rgb(35,132,67)",
                "rgb(0,90,50)"
            ],
            9: [
                "rgb(255,255,229)",
                "rgb(247,252,185)",
                "rgb(217,240,163)",
                "rgb(173,221,142)",
                "rgb(120,198,121)",
                "rgb(65,171,93)",
                "rgb(35,132,67)",
                "rgb(0,104,55)",
                "rgb(0,69,41)"
            ],
            type: "seq"
        },
        YlGnBu: {
            3: [
                "rgb(237,248,177)",
                "rgb(127,205,187)",
                "rgb(44,127,184)"
            ],
            4: [
                "rgb(255,255,204)",
                "rgb(161,218,180)",
                "rgb(65,182,196)",
                "rgb(34,94,168)"
            ],
            5: [
                "rgb(255,255,204)",
                "rgb(161,218,180)",
                "rgb(65,182,196)",
                "rgb(44,127,184)",
                "rgb(37,52,148)"
            ],
            6: [
                "rgb(255,255,204)",
                "rgb(199,233,180)",
                "rgb(127,205,187)",
                "rgb(65,182,196)",
                "rgb(44,127,184)",
                "rgb(37,52,148)"
            ],
            7: [
                "rgb(255,255,204)",
                "rgb(199,233,180)",
                "rgb(127,205,187)",
                "rgb(65,182,196)",
                "rgb(29,145,192)",
                "rgb(34,94,168)",
                "rgb(12,44,132)"
            ],
            8: [
                "rgb(255,255,217)",
                "rgb(237,248,177)",
                "rgb(199,233,180)",
                "rgb(127,205,187)",
                "rgb(65,182,196)",
                "rgb(29,145,192)",
                "rgb(34,94,168)",
                "rgb(12,44,132)"
            ],
            9: [
                "rgb(255,255,217)",
                "rgb(237,248,177)",
                "rgb(199,233,180)",
                "rgb(127,205,187)",
                "rgb(65,182,196)",
                "rgb(29,145,192)",
                "rgb(34,94,168)",
                "rgb(37,52,148)",
                "rgb(8,29,88)"
            ],
            type: "seq"
        },
        YlOrBr: {
            3: [
                "rgb(255,247,188)",
                "rgb(254,196,79)",
                "rgb(217,95,14)"
            ],
            4: [
                "rgb(255,255,212)",
                "rgb(254,217,142)",
                "rgb(254,153,41)",
                "rgb(204,76,2)"
            ],
            5: [
                "rgb(255,255,212)",
                "rgb(254,217,142)",
                "rgb(254,153,41)",
                "rgb(217,95,14)",
                "rgb(153,52,4)"
            ],
            6: [
                "rgb(255,255,212)",
                "rgb(254,227,145)",
                "rgb(254,196,79)",
                "rgb(254,153,41)",
                "rgb(217,95,14)",
                "rgb(153,52,4)"
            ],
            7: [
                "rgb(255,255,212)",
                "rgb(254,227,145)",
                "rgb(254,196,79)",
                "rgb(254,153,41)",
                "rgb(236,112,20)",
                "rgb(204,76,2)",
                "rgb(140,45,4)"
            ],
            8: [
                "rgb(255,255,229)",
                "rgb(255,247,188)",
                "rgb(254,227,145)",
                "rgb(254,196,79)",
                "rgb(254,153,41)",
                "rgb(236,112,20)",
                "rgb(204,76,2)",
                "rgb(140,45,4)"
            ],
            9: [
                "rgb(255,255,229)",
                "rgb(255,247,188)",
                "rgb(254,227,145)",
                "rgb(254,196,79)",
                "rgb(254,153,41)",
                "rgb(236,112,20)",
                "rgb(204,76,2)",
                "rgb(153,52,4)",
                "rgb(102,37,6)"
            ],
            type: "seq"
        },
        YlOrRd: {
            3: [
                "rgb(255,237,160)",
                "rgb(254,178,76)",
                "rgb(240,59,32)"
            ],
            4: [
                "rgb(255,255,178)",
                "rgb(254,204,92)",
                "rgb(253,141,60)",
                "rgb(227,26,28)"
            ],
            5: [
                "rgb(255,255,178)",
                "rgb(254,204,92)",
                "rgb(253,141,60)",
                "rgb(240,59,32)",
                "rgb(189,0,38)"
            ],
            6: [
                "rgb(255,255,178)",
                "rgb(254,217,118)",
                "rgb(254,178,76)",
                "rgb(253,141,60)",
                "rgb(240,59,32)",
                "rgb(189,0,38)"
            ],
            7: [
                "rgb(255,255,178)",
                "rgb(254,217,118)",
                "rgb(254,178,76)",
                "rgb(253,141,60)",
                "rgb(252,78,42)",
                "rgb(227,26,28)",
                "rgb(177,0,38)"
            ],
            8: [
                "rgb(255,255,204)",
                "rgb(255,237,160)",
                "rgb(254,217,118)",
                "rgb(254,178,76)",
                "rgb(253,141,60)",
                "rgb(252,78,42)",
                "rgb(227,26,28)",
                "rgb(177,0,38)"
            ],
            type: "seq"
        }
    };

    var DEFAULT_NUM_COLOURS = 3;
    var PaletteService = /** @class */ (function () {
        function PaletteService(_http) {
            this._http = _http;
            this.namedPalettes = {};
            this._source = '';
        }
        Object.defineProperty(PaletteService.prototype, "source", {
            set: function (val) {
                this._source = val;
            },
            enumerable: true,
            configurable: true
        });
        PaletteService.prototype.getPalette = function (name, reverse, numColours) {
            var _this = this;
            var palette = null;
            if (this.namedPalettes[name]) {
                palette = this.namedPalettes[name];
            }
            else if (palettes[name]) {
                palette = palettes[name][numColours || DEFAULT_NUM_COLOURS];
            }
            if (palette) {
                if (reverse) {
                    return rxjs.of(palette.slice().reverse());
                }
                return rxjs.of(palette.slice());
            }
            return this._http.get(this._source + '/' + name + '.pal', { responseType: 'text' }).pipe(operators.map(function (text) { return _this.parseNCWMSPalette(text); }));
        };
        PaletteService.prototype.parseNCWMSPalette = function (txt) {
            return txt.split('\n')
                .map(function (ln) { return ln.replace(/\#.*/g, '').trim().replace(/ +/g, ' '); })
                .filter(function (ln) { return ln.length; })
                .map(function (e) { return "rgb(" + e.split(' ').join(',') + ")"; });
        };
        PaletteService.prototype.colourIndex = function (val, min, max, count) {
            var point = (val - min) / (max - min);
            var pos = Math.round(point * (count - 1));
            return pos;
        };
        PaletteService.ctorParameters = function () { return [
            { type: http.HttpClient }
        ]; };
        PaletteService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [http.HttpClient])
        ], PaletteService);
        return PaletteService;
    }());

    function utcDate(y, m, d) {
        return new Date(Date.UTC(y, m, d));
    }
    function utcDateCopy(d) {
        return utcDate(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    }
    var TimeUtilsService = /** @class */ (function () {
        function TimeUtilsService() {
            this.specialDates = {
                yesterday: function () {
                    var d = new Date();
                    d.setDate(d.getDate() - 1);
                    return d;
                }
            };
        }
        TimeUtilsService.prototype.convertDate = function (d) {
            if (!d) {
                d = new Date();
            }
            var date;
            if (typeof (d) === 'string') {
                var dateText = d;
                if (this.specialDates[dateText]) {
                    date = this.specialDates[dateText]();
                }
                else {
                    var _a = __read(d.split('-').map(function (c) { return +c; }), 4), year = _a[0], month = _a[1], day = _a[2], other = _a[3];
                    date = utcDate(year, month, day);
                }
            }
            else {
                date = d;
            }
            return {
                day: date.getUTCDate(),
                month: date.getUTCMonth() + 1,
                year: date.getUTCFullYear()
            };
        };
        TimeUtilsService.prototype.datesEqual = function (lhs, rhs) {
            if (!lhs || !rhs) {
                return false;
            }
            return (lhs.year === rhs.year) &&
                (lhs.month === rhs.month) &&
                (lhs.day === rhs.day);
        };
        TimeUtilsService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [])
        ], TimeUtilsService);
        return TimeUtilsService;
    }());

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
                this.cache[url] = this.http.get(uniqueUrl).pipe(operators.publishReplay(), operators.refCount());
            }
            return this.cache[url];
        };
        StaticDataService.ctorParameters = function () { return [
            { type: http.HttpClient }
        ]; };
        StaticDataService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [http.HttpClient])
        ], StaticDataService);
        return StaticDataService;
    }());

    var OpendapService = /** @class */ (function () {
        function OpendapService(http) {
            this.http = http;
        }
        OpendapService.prototype.makeURL = function (host, filepath) {
            return host.url + '/dodsC/' + filepath;
        };
        OpendapService.prototype.get = function (url) {
            return this.http.get(url, { responseType: 'text' });
        };
        OpendapService.prototype.getData = function (queryUrl, das) {
            return this.get(queryUrl).pipe(operators.map(function (txt) { return dapQuery.simplify(dapQuery.parseData(txt, das)); }));
        };
        OpendapService.prototype.getDAS = function (url) {
            return this.get(url + '.das').pipe(operators.map(dapQuery.parseDAS));
        };
        OpendapService.prototype.getDDX = function (url) {
            return this.get(url + '.ddx').pipe(operators.map(dapQuery.parseDDX));
        };
        OpendapService.prototype.getExtent = function (url) {
            var _this = this;
            console.log(url);
            return rxjs.forkJoin([
                this.getDAS(url),
                this.getDDX(url)
            ]).pipe(operators.switchMap(function (_a) {
                var _b = __read(_a, 2), theDAS = _b[0], theDDX = _b[1];
                var das = theDAS;
                return rxjs.forkJoin([
                    _this.getData(url + '.ascii?latitude', das),
                    _this.getData(url + '.ascii?longitude', das)
                ]);
            }), operators.map(function (ll) {
                var lats = ll[0].latitude;
                var lons = ll[1].longitude;
                return [lats[0], lats[lats.length - 1],
                    lons[0], lons[lons.length - 1]];
            }));
        };
        OpendapService.prototype.dapRangeQuery = function (from, to, step) {
            step = step || 1;
            if (to === undefined) {
                to = from;
            }
            return '[' + from + ':' + step + ':' + to + ']';
        };
        OpendapService.ctorParameters = function () { return [
            { type: http.HttpClient }
        ]; };
        OpendapService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [http.HttpClient])
        ], OpendapService);
        return OpendapService;
    }());

    var LAT_NAMES = ['latitude', 'lat'];
    var LNG_NAMES = ['longitude', 'lng', 'lon'];
    var TIME_NAMES = ['time', 't'];
    var MetadataService = /** @class */ (function () {
        function MetadataService(dap) {
            this.dap = dap;
            this.ddxCache = {};
            this.dasCache = {};
            this.timeCache = {};
        }
        MetadataService.prototype.identifyCoordinate = function (ddx) {
            var e_1, _a;
            var possibleNames = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                possibleNames[_i - 1] = arguments[_i];
            }
            try {
                for (var possibleNames_1 = __values(possibleNames), possibleNames_1_1 = possibleNames_1.next(); !possibleNames_1_1.done; possibleNames_1_1 = possibleNames_1.next()) {
                    var n = possibleNames_1_1.value;
                    if (ddx.variables[n]) {
                        return n;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (possibleNames_1_1 && !possibleNames_1_1.done && (_a = possibleNames_1.return)) _a.call(possibleNames_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return undefined;
        };
        MetadataService.prototype.getDDX = function (host, file) {
            var url = this.dap.makeURL(host, file);
            return this.ddxForUrl(url);
        };
        MetadataService.prototype.ddxForUrl = function (url) {
            if (!this.ddxCache[url]) {
                this.ddxCache[url] =
                    this.dap.getDDX(url).pipe(operators.publishReplay(), operators.refCount());
            }
            return this.ddxCache[url];
        };
        MetadataService.prototype.getDDXForLayer = function (ml) {
            return this.getDDX(ml.flattenedSettings.host, ml.interpolatedFile);
        };
        MetadataService.prototype.getDAS = function (host, file) {
            var url = this.dap.makeURL(host, file);
            return this.dasForUrl(url);
        };
        MetadataService.prototype.dasForUrl = function (url) {
            if (!this.dasCache[url]) {
                this.dasCache[url] =
                    this.dap.getDAS(url).pipe(operators.publishReplay(), operators.refCount());
            }
            return this.dasCache[url];
        };
        MetadataService.prototype.getDASForLayer = function (ml) {
            return this.getDAS(ml.flattenedSettings.host, ml.interpolatedFile);
        };
        MetadataService.prototype.getMetadata = function (ml) {
            if (ml.flattenedSettings.host.software !== 'tds') {
                return rxjs.of({});
            }
            return rxjs.forkJoin([this.getDASForLayer(ml), this.getDDXForLayer(ml)]).pipe(operators.map(function (meta) {
                return {
                    das: meta[0],
                    ddx: meta[1]
                };
            }), operators.map(function (meta) {
                return Object.assign({}, meta.das.attr || {}, meta.ddx.variables[ml.flattenedSettings.layer || ml.flattenedSettings.variable] || {});
            }));
        };
        MetadataService.prototype.populateMetadata = function (ml) {
            this.getMetadata(ml).subscribe(function (entry) {
                setTimeout(function () {
                    ml.retrievedMetadata = entry;
                });
            });
        };
        MetadataService.prototype.getGrid = function (host, file) {
            var url = this.dap.makeURL(host, file);
            return this.getGridForURL(url);
        };
        MetadataService.prototype.getGridForURL = function (url) {
            var _this = this;
            var ddx$ = this.ddxForUrl(url);
            var das$ = this.dasForUrl(url);
            var res$ = rxjs.forkJoin([ddx$, das$]).pipe(operators.map(function (metadata) {
                var ddx = metadata[0];
                var das = metadata[1];
                var latCoord = _this.identifyCoordinate.apply(_this, __spread([ddx], LAT_NAMES));
                var lngCoord = _this.identifyCoordinate.apply(_this, __spread([ddx], LNG_NAMES));
                var lat$ = _this.dap.getData(url + ".ascii?" + latCoord, das).pipe(operators.map(function (dd) { return dd[latCoord]; }));
                var lng$ = _this.dap.getData(url + ".ascii?" + lngCoord, das).pipe(operators.map(function (dd) { return dd[lngCoord]; }));
                return rxjs.forkJoin(lat$, lng$);
            }), operators.switchAll(), operators.publishReplay(), operators.refCount());
            return res$;
        };
        MetadataService.prototype.getGridForLayer = function (ml) {
            return this.getGrid(ml.flattenedSettings.host, ml.interpolatedFile);
        };
        MetadataService.prototype.getSpatialExtent = function (ml) {
            return this.getGridForLayer(ml).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), lats = _b[0], lngs = _b[1];
                var result = {
                    east: Math.max.apply(Math, __spread(lngs)),
                    west: Math.min.apply(Math, __spread(lngs)),
                    north: Math.max.apply(Math, __spread(lats)),
                    south: Math.min.apply(Math, __spread(lats))
                };
                return result;
            })).pipe(operators.publishReplay(), operators.refCount());
        };
        MetadataService.prototype.getTimeDimension = function (host, file) {
            var url = this.dap.makeURL(host, file);
            return this.getTimeDimensionForURL(url);
        };
        MetadataService.prototype.getTimeDimensionForURL = function (url) {
            var _this = this;
            if (!this.timeCache[url]) {
                var ddx$ = this.ddxForUrl(url);
                var das$ = this.dasForUrl(url);
                var res$ = rxjs.forkJoin([ddx$, das$]).pipe(operators.map(function (metadata) {
                    var ddx = metadata[0];
                    var das = metadata[1];
                    var timeCoord = _this.identifyCoordinate.apply(_this, __spread([ddx], TIME_NAMES));
                    var time$ = _this.dap.getData(url + ".ascii?" + timeCoord, das).pipe(operators.map(function (dd) { return dd[timeCoord]; }));
                    return time$;
                }), operators.switchAll(), operators.shareReplay());
                this.timeCache[url] = res$;
            }
            return this.timeCache[url];
        };
        MetadataService.ctorParameters = function () { return [
            { type: OpendapService }
        ]; };
        MetadataService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [OpendapService])
        ], MetadataService);
        return MetadataService;
    }());

    ;
    var TimeseriesService = /** @class */ (function () {
        function TimeseriesService(metadata, dap) {
            this.metadata = metadata;
            this.dap = dap;
        }
        TimeseriesService.prototype.getTimeseries = function (host, file, variable, pt, additionalIndices, fillValue) {
            var _this = this;
            additionalIndices = additionalIndices || {};
            var url = this.dap.makeURL(host, file);
            var ddx$ = this.metadata.ddxForUrl(url);
            var das$ = this.metadata.dasForUrl(url);
            var variable = variable;
            return rxjs.forkJoin(ddx$, das$, this.metadata.getGrid(host, file)).pipe(operators.switchMap(function (_a) {
                var _b = __read(_a, 3), ddx = _b[0], das = _b[1], latsAndLngs = _b[2];
                var lats = latsAndLngs[0];
                var lngs = latsAndLngs[1];
                var latIndex = _this.indexInDimension(pt.lat, lats);
                var lngIndex = _this.indexInDimension(pt.lng, lngs);
                if (fillValue === undefined) {
                    fillValue = +ddx.variables[variable]._FillValue;
                }
                var query = _this.makeTimeQuery(ddx, variable, latIndex, lngIndex, additionalIndices);
                return _this.dap.getData(url + ".ascii?" + variable + query, das);
            }), operators.map(function (data) {
                var vals = data[variable];
                if (!vals.length) {
                    vals = [data[variable]];
                }
                return {
                    dates: (data.time || data.t),
                    values: vals.map(function (v) { return (v === fillValue) ? NaN : v; })
                };
            }));
        };
        TimeseriesService.prototype.getTimeseriesForLayer = function (ml, pt) {
            return this.getTimeseries(ml.flattenedSettings.host, ml.interpolatedFile, ml.flattenedSettings.layer || ml.flattenedSettings.variable, pt, null, ml.flattenedSettings.fillValue);
        };
        TimeseriesService.prototype.makeTimeQuery = function (ddx, variable, latIndex, lngIndex, additionalIndices) {
            var _this = this;
            var metadata = ddx.variables[variable];
            var query = '';
            metadata.dimensions.forEach(function (dim) {
                var dName = dim.name.toLowerCase();
                if (TIME_NAMES.indexOf(dName) >= 0) {
                    query += _this.dapRangeQuery(0, +(dim.size) - 1);
                }
                else if (LAT_NAMES.indexOf(dName) >= 0) {
                    query += _this.dapRangeQuery(latIndex);
                }
                else if (LNG_NAMES.indexOf(dName) >= 0) {
                    query += _this.dapRangeQuery(lngIndex);
                }
                else {
                    query += _this.dapRangeQuery(additionalIndices[dName] || 0);
                }
            });
            return query;
        };
        TimeseriesService.prototype.dapRangeQuery = function (from, to, step) {
            step = step || 1;
            if (to === undefined) {
                to = from;
            }
            return '[' + from + ':' + step + ':' + to + ']';
        };
        TimeseriesService.prototype.indexInDimension = function (c, dim, trim) {
            var minIndex = 0;
            var maxIndex = dim.length - 1;
            if (trim) {
                maxIndex -= trim;
            }
            var rev = dim[0] > dim[dim.length - 1];
            if (rev) {
                minIndex = maxIndex;
                maxIndex = 0;
            }
            var currentIndex;
            while ((minIndex <= maxIndex) || (rev && (maxIndex <= minIndex))) {
                if (c <= dim[minIndex]) {
                    return minIndex;
                }
                if (c >= dim[maxIndex]) {
                    return maxIndex;
                }
                currentIndex = Math.floor((minIndex + maxIndex) / 2);
                var d1 = Math.abs(dim[currentIndex] - c);
                var d2 = Math.abs(dim[currentIndex + 1] - c);
                if (rev) {
                    if (d2 <= d1) {
                        maxIndex = currentIndex + 1;
                    }
                    else {
                        minIndex = currentIndex;
                    }
                }
                else {
                    if (d2 <= d1) {
                        minIndex = currentIndex + 1;
                    }
                    else {
                        maxIndex = currentIndex;
                    }
                }
            }
            return currentIndex;
        };
        ;
        TimeseriesService.ctorParameters = function () { return [
            { type: MetadataService },
            { type: OpendapService }
        ]; };
        TimeseriesService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [MetadataService, OpendapService])
        ], TimeseriesService);
        return TimeseriesService;
    }());

    // @dynamic
    var InterpolationService = /** @class */ (function () {
        function InterpolationService() {
        }
        InterpolationService.isDefined = function (val) {
            return val !== undefined && val !== null;
        };
        InterpolationService.interpolate = function (expr, params) {
            if (typeof expr !== 'string' || !params) {
                return expr;
            }
            return expr.replace(InterpolationService.templateMatcher, function (substring, b) {
                var r = InterpolationService.getValue(params, b);
                return InterpolationService.isDefined(r) ? r : substring;
            });
        };
        InterpolationService.getValue = function (target, key) {
            var keys = key.split('.');
            key = '';
            do {
                key += keys.shift();
                if (InterpolationService.isDefined(target) && InterpolationService.isDefined(target[key]) && (typeof target[key] === 'object' || !keys.length)) {
                    target = target[key];
                    key = '';
                }
                else if (!keys.length) {
                    target = undefined;
                }
                else {
                    key += '.';
                }
            } while (keys.length);
            return target;
        };
        InterpolationService.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
        return InterpolationService;
    }());

    var PointSelectionService = /** @class */ (function () {
        function PointSelectionService(meta) {
            this.meta = meta;
            this.latestPointSelectionSource = new rxjs.BehaviorSubject(null);
            this.latestPointSelection = this.latestPointSelectionSource.asObservable();
        }
        PointSelectionService.prototype.unchanged = function (current, updated) {
            if (!current && !updated) {
                return true;
            }
            if (!current || !updated) {
                return false;
            }
            if (current.variable !== updated.variable) {
                return false;
            }
            if (!Object.keys(current.tags).every(function (t) { return current.tags[t] === updated.tags[t]; })) {
                return false;
            }
            if (current.catalog.url !== updated.catalog.url) {
                return false;
            }
            if (current.feature !== updated.feature) {
                return false;
            }
            return true;
            // return false; // TODO
        };
        PointSelectionService.prototype.pointSelection = function (sel) {
            var current = this.latestPointSelectionSource.getValue();
            if (this.unchanged(current, sel)) {
                return;
            }
            var url = this.fullUrl(sel);
            if (!this.validUrl(url)) {
                return; // Not a complete selection
            }
            if (!sel.variable) {
                return; // Not a complete selection
            }
            this.latestPointSelectionSource.next(sel);
        };
        PointSelectionService.prototype.fullUrl = function (sel) {
            var params = Object.assign({}, sel.feature ? sel.feature.properties : {}, sel.tags);
            return InterpolationService.interpolate(sel.catalog.url, params);
        };
        PointSelectionService.prototype.validUrl = function (url) {
            return url.indexOf('{{') < 0;
        };
        PointSelectionService.prototype.timeseriesVariables = function (sel) {
            var coords = sel.catalog.coordinates || {};
            var url = this.fullUrl(sel);
            if (!this.validUrl(url)) {
                return rxjs.of([]);
            }
            return this.meta.ddxForUrl(url).pipe(operators.map(function (ddx) {
                var variables = ddx.variables;
                var variableNames = Object.keys(variables).filter(function (v) {
                    var dims = ddx.variables[v].dimensions;
                    return Object.keys(coords).every(function (coord) {
                        return dims.find(function (dim) { return dim.name === coord; });
                    });
                });
                return variableNames.map(function (v) {
                    if (sel.catalog && sel.catalog.displayFormat) {
                        var fmt = Object.assign({ variable: v }, ddx.variables[v]);
                        return {
                            value: v,
                            label: InterpolationService.interpolate(sel.catalog.displayFormat, fmt)
                        };
                    }
                    if (ddx.variables[v].long_name) {
                        return {
                            value: v,
                            label: ddx.variables[v].long_name
                        };
                    }
                    return {
                        value: v,
                        label: v
                    };
                });
            }));
        };
        PointSelectionService.ctorParameters = function () { return [
            { type: MetadataService }
        ]; };
        PointSelectionService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [MetadataService])
        ], PointSelectionService);
        return PointSelectionService;
    }());

    var AvailableDatesService = /** @class */ (function () {
        function AvailableDatesService(metadata) {
            this.metadata = metadata;
        }
        AvailableDatesService.prototype.fnForYear = function (mapped, year) {
            var publication = mapped.layer.publications[mapped.options.publication];
            return InterpolationService.interpolate(publication.options.filepath, {
                year: year
            });
        };
        AvailableDatesService.prototype.availableDates = function (mapped, year) {
            var layer = mapped.layer;
            var fn = this.fnForYear(mapped, year);
            var res$ = this.metadata.getTimeDimension(layer.options.host, fn);
            if (!layer.timeshift) {
                return res$;
            }
            if (layer.timePeriod.containsYear(year - 1)) {
                fn = this.fnForYear(mapped, year - 1);
                var prev$ = this.metadata.getTimeDimension(layer.host, fn);
                res$ = rxjs.forkJoin.apply(void 0, __spread([prev$, res$])).pipe(operators.map(function (years) { return years[0].concat(years[1]); }));
            }
            return res$.pipe(operators.map(function (dates) {
                return dates.map(function (d) {
                    var res = new Date(d.getTime());
                    res.setUTCDate(d.getUTCDate() - layer.timeshift * layer.timestep);
                    return res;
                });
            }), operators.map(function (dates) { return dates.filter(function (d, i) { return (i >= Math.abs(layer.timeshift)) && (d.getUTCFullYear() === year); }); }));
        };
        AvailableDatesService.ctorParameters = function () { return [
            { type: MetadataService }
        ]; };
        AvailableDatesService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [MetadataService])
        ], AvailableDatesService);
        return AvailableDatesService;
    }());

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
    var WMS_PARAMETER_NAMES = {
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
    var WMS_URL_FORMAT = {
        tds: '/wms/',
        geoserver: '/wms/',
        esri: '/'
    };
    var INTERPOLATED_PARAMETERS = [
        'styles',
        'layers'
    ];
    var MappedLayer = /** @class */ (function () {
        function MappedLayer(data) {
            this.options = {
                date: new Date(2016, 0, 1) // Set to most recent available date
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
    function decadeText(d) {
        var decade = d.getFullYear().toString().slice(0, 3);
        return decade + "0-" + decade + "9";
    }

    var CatalogService = /** @class */ (function () {
        function CatalogService(_http, metadata) {
            this._http = _http;
            this.metadata = metadata;
        }
        CatalogService.prototype.load = function (catalogJSON) {
            var _this = this;
            this.current = new Catalog(catalogJSON);
            this.current.allLayers().filter(function (l) { return l.options.smallExtent; }).forEach(function (l) {
                l.spatialExtent = _this.findExtentOfLayer(l);
            });
        };
        CatalogService.prototype.loadFrom = function (path) {
            var _this = this;
            return this._http.get(path).pipe(operators.tap(function (json) { return _this.load(json); }), operators.map(function (_) { return _this.current; }));
            //   var result = new Promise<Catalog>((res,rej)=>{
            //     this._http.get(path).subscribe(json=>{
            //       this.load(json);
            //       res(this.current);
            //     });
            //   });
            // return from(result);
        };
        CatalogService.prototype.findExtentOfLayer = function (l) {
            var tmp = new MappedLayer();
            tmp.layer = l;
            tmp.update();
            return this.metadata.getSpatialExtent(tmp);
        };
        CatalogService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: MetadataService }
        ]; };
        CatalogService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [http.HttpClient, MetadataService])
        ], CatalogService);
        return CatalogService;
    }());

    var MapViewParameterService = /** @class */ (function () {
        function MapViewParameterService(_location) {
            this._location = _location;
        }
        MapViewParameterService_1 = MapViewParameterService;
        MapViewParameterService.prototype.current = function () {
            if (!this._location) {
                return {};
            }
            var path = this._location.path().split('/');
            if (path.length > MapViewParameterService_1.parameterNames.length) {
                path.shift();
            }
            var result = {};
            MapViewParameterService_1.parameterNames.forEach(function (p, i) { return result[p] = path[i] || '_'; });
            return result;
        };
        MapViewParameterService.prototype.update = function (changes) {
            if (!this._location) {
                return;
            }
            var updated = this.current();
            Object.assign(updated, changes);
            this._location.go(this.constructRoute(updated));
        };
        MapViewParameterService.prototype.retrieveFromRoute = function (route) {
            var e_1, _a;
            var result = {};
            try {
                for (var _b = __values(MapViewParameterService_1.parameterNames), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var name_1 = _c.value;
                    result[name_1] = route.snapshot.params[name_1];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        };
        ;
        MapViewParameterService.prototype.constructRoute = function (parameters) {
            return MapViewParameterService_1.parameterNames.map(function (n) { return parameters[n] || '_'; }).join('/');
        };
        MapViewParameterService.prototype.routerPaths = function ( /*component:any*/) {
            var e_2, _a;
            var result = [];
            var path = '';
            result.push(path);
            try {
                //    result.push({path:path,component:component});
                for (var _b = __values(MapViewParameterService_1.parameterNames), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var name_2 = _c.value;
                    path += ":" + name_2;
                    //      result.unshift({path:path,component:component});
                    result.unshift(path);
                    path += '/';
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return result;
        };
        var MapViewParameterService_1;
        MapViewParameterService.ctorParameters = function () { return [
            { type: common.Location }
        ]; };
        MapViewParameterService.parameterNames = [];
        MapViewParameterService = MapViewParameterService_1 = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [common.Location])
        ], MapViewParameterService);
        return MapViewParameterService;
    }());

    var D2R = Math.PI / 180;
    var WMSService = /** @class */ (function () {
        function WMSService() {
            this.webMercator = (proj4__default || proj4).Proj('EPSG:3857');
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
            core.Injectable(),
            __metadata("design:paramtypes", [])
        ], WMSService);
        return WMSService;
    }());

    var GeocodingService = /** @class */ (function () {
        function GeocodingService(_api) {
            this._api = _api;
        }
        GeocodingService.prototype.geocode = function (address, bnds) {
            var _this = this;
            var promise = new Promise(function (resolve, reject) {
                _this._api.load().then(function () {
                    var service = new google.maps.Geocoder();
                    service.geocode({
                        address: address,
                        componentRestrictions: {
                            country: 'AU'
                        },
                        region: 'AU'
                    }, function (results, status) {
                        if (status !== google.maps.GeocoderStatus.OK) {
                            reject();
                        }
                        else {
                            resolve(results.filter(function (r) {
                                return r.formatted_address !== 'Australia';
                            }));
                        }
                    });
                });
            });
            return rxjs.from(promise);
        };
        GeocodingService.ctorParameters = function () { return [
            { type: core$1.MapsAPILoader }
        ]; };
        GeocodingService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [core$1.MapsAPILoader])
        ], GeocodingService);
        return GeocodingService;
    }());

    //const proj4 = require('proj4').default;
    var ProjectionService = /** @class */ (function () {
        function ProjectionService() {
        }
        ProjectionService.prototype.proj4 = function () {
            return proj4;
        };
        ProjectionService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [])
        ], ProjectionService);
        return ProjectionService;
    }());

    var services = [
        //$serviceList
        AvailableDatesService,
        PointSelectionService,
        TimeseriesService,
        StaticDataService,
        MetadataService,
        OpendapService,
        PaletteService,
        TimeUtilsService,
        WMSService,
        MapViewParameterService,
        ProjectionService,
        GeocodingService,
        CatalogService,
        TreeFilterService
    ];
    var MapWaldCoreModule = /** @class */ (function () {
        function MapWaldCoreModule() {
        }
        MapWaldCoreModule_1 = MapWaldCoreModule;
        MapWaldCoreModule.forRoot = function (moduleInitialisation) {
            return {
                ngModule: MapWaldCoreModule_1,
                providers: services
            };
        };
        var MapWaldCoreModule_1;
        MapWaldCoreModule = MapWaldCoreModule_1 = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
                    core$1.AgmCoreModule,
                    http.HttpClientModule
                ],
                declarations: [],
                exports: [],
                providers: services
            })
        ], MapWaldCoreModule);
        return MapWaldCoreModule;
    }());

    var WMSLayerComponent = /** @class */ (function () {
        function WMSLayerComponent(_wmsService, _wrapper) {
            this._wmsService = _wmsService;
            this._wrapper = _wrapper;
            this.opacity = 1.0;
            this.position = 0;
            this.zoom = 4;
            this.building = false;
        }
        WMSLayerComponent.prototype.buildMap = function () {
            var _this = this;
            if (this.building)
                return;
            this.building = true;
            this._wrapper.getNativeMap().then(function (theMap) {
                _this.building = false;
                _this.map = theMap;
                _this.overlay = _this._wmsService.buildImageMap(function () { return _this.map; }, function (z) { return _this.url + '?'; }, function (z) { return _this.params; }, function () { return _this.opacity; });
                if (_this.map.overlayMapTypes.length > _this.position) {
                    _this.map.overlayMapTypes.removeAt(_this.position);
                    _this.map.overlayMapTypes.insertAt(_this.position, _this.overlay);
                }
                else {
                    while (_this.map.overlayMapTypes.length <= _this.position) {
                        // Temporarily add replicate layers.
                        // These should be replaced by other wms-layer components
                        _this.map.overlayMapTypes.push(_this.overlay);
                    }
                }
            }).catch(function (e) { return console.log(e); });
        };
        WMSLayerComponent.prototype.ngOnInit = function () {
            if (this.url) {
                this.buildMap();
            }
        };
        WMSLayerComponent.prototype.ngOnChanges = function (changes) {
            if (this.url) {
                this.buildMap();
            }
            // let currentOpacity: number = changes.opacity.currentValue;
            // let previousOpacity: number = changes.opacity.previousValue;
            // if (currentOpacity !== previousOpacity) {
            //   console.log('building a map off my own bat');
            //   this.buildMap();
            // }
        };
        WMSLayerComponent.prototype.ngOnDestroy = function () {
            var _this = this;
            this._wrapper.getNativeMap().then(function (theMap) {
                if (_this.map.overlayMapTypes.length > _this.position) {
                    _this.map.overlayMapTypes.removeAt(_this.position);
                }
            });
        };
        WMSLayerComponent.ctorParameters = function () { return [
            { type: WMSService },
            { type: core$1.GoogleMapsAPIWrapper }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], WMSLayerComponent.prototype, "url", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], WMSLayerComponent.prototype, "params", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], WMSLayerComponent.prototype, "opacity", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], WMSLayerComponent.prototype, "position", void 0);
        WMSLayerComponent = __decorate([
            core.Component({
                selector: 'wms-layer',
                template: ''
            }),
            __metadata("design:paramtypes", [WMSService,
                core$1.GoogleMapsAPIWrapper])
        ], WMSLayerComponent);
        return WMSLayerComponent;
    }());

    var MapLegendComponent = /** @class */ (function () {
        function MapLegendComponent(_palettes) {
            this._palettes = _palettes;
            this.colours = ['red', 'white', 'blue'];
            this.labels = []; //['-','-','-'];
            this.title = 'the title';
            this.mapUnits = '';
            this.helpText = 'No comment';
            this.tooltipPlacement = 'right';
            this.generatedLabels = [];
            this.formatValue = function (val, decimalPlaces) {
                if (!val) {
                    if (val === 0) {
                        return '0';
                    }
                    return '-';
                }
                // Add thousand's separator. Source: http://stackoverflow.com/a/2901298
                var parts = val.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                if (decimalPlaces === 0) {
                    return parts[0];
                }
                if ((decimalPlaces !== null) && (decimalPlaces !== undefined) && (parts.length === 2)) {
                    parts[1] = parts[1].substr(0, decimalPlaces);
                    parts[1] = parts[1].replace(/0+$/, '');
                }
                return parts.join('.');
            };
        }
        Object.defineProperty(MapLegendComponent.prototype, "cbPalette", {
            get: function () { return this._cbPalette; },
            set: function (cbp) {
                this._cbPalette = cbp;
                this.generatePalette();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapLegendComponent.prototype, "cbCount", {
            get: function () { return this._cbCount; },
            set: function (cbc) {
                this._cbCount = cbc;
                this.generatePalette();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapLegendComponent.prototype, "cbReverse", {
            get: function () { return this._cbReverse; },
            set: function (cbr) {
                this._cbReverse = cbr;
                this.generatePalette();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapLegendComponent.prototype, "cbRange", {
            get: function () { return this._cbRange; },
            set: function (cbr) {
                this._cbRange = cbr;
                this.generatePalette();
            },
            enumerable: true,
            configurable: true
        });
        MapLegendComponent.prototype.generateLabels = function (count) {
            if (!this._cbRange || !count) {
                return null;
            }
            var delta = (this._cbRange[1] - this._cbRange[0]) / (count - 1);
            var result = [];
            var lower = this._cbRange[0];
            var decimalPlaces = Math.max(0, 2 - (+Math.log10(this._cbRange[1] - this._cbRange[0]).toFixed()));
            decimalPlaces = Math.min(decimalPlaces, 10);
            var upper;
            for (var i = 1; i < count; i++) {
                upper = this._cbRange[0] + i * delta;
                result.push(this.formatValue(lower, decimalPlaces) + "-" + this.formatValue(upper, decimalPlaces));
                lower = upper;
            }
            result.push('&ge;' + this._cbRange[1]);
            result.reverse();
            return result;
        };
        MapLegendComponent.prototype.generatePalette = function () {
            var _this = this;
            if (!this._cbPalette || !this._cbCount) {
                return;
            }
            this._palettes.getPalette(this._cbPalette, this._cbReverse, this._cbCount)
                .subscribe(function (palette) {
                _this.colours = palette.slice().reverse();
                _this.generatedLabels = _this.labels || _this.generateLabels(_this.colours.length) || palette;
            });
        };
        MapLegendComponent.prototype.ngOnInit = function () { };
        MapLegendComponent.ctorParameters = function () { return [
            { type: PaletteService }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], MapLegendComponent.prototype, "imageURL", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], MapLegendComponent.prototype, "colours", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], MapLegendComponent.prototype, "labels", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], MapLegendComponent.prototype, "title", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], MapLegendComponent.prototype, "mapUnits", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], MapLegendComponent.prototype, "helpText", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], MapLegendComponent.prototype, "tooltipPlacement", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], MapLegendComponent.prototype, "attribution", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], MapLegendComponent.prototype, "attributionLink", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], MapLegendComponent.prototype, "cbPalette", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Number),
            __metadata("design:paramtypes", [Number])
        ], MapLegendComponent.prototype, "cbCount", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Boolean])
        ], MapLegendComponent.prototype, "cbReverse", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Array),
            __metadata("design:paramtypes", [Array])
        ], MapLegendComponent.prototype, "cbRange", null);
        MapLegendComponent = __decorate([
            core.Component({
                selector: 'map-legend',
                template: "<div class=\"map-legend panel panel-group\">\n\n<strong>{{title}} <span *ngIf=\"mapUnits\" [innerHTML]=\"'('+mapUnits+')'\"></span>\n        <span *ngIf=\"helpText\"\n              [ngbTooltip]=\"helpText\"\n              [placement]=\"tooltipPlacement\"\n              container=\"body\">\n          <i class=\"fa fa-info-circle\"></i>\n        </span>\n</strong>\n\n  <div *ngIf=\"!imageURL\">\n    <div style=\"display:table;line-height:15px\">\n      <div style=\"display:table-row;padding:0;\"\n          *ngFor=\"let colour of colours; let i=index\">\n        <div class=\"legend-colour\">\n          <i class=\"legend-entry\" [ngStyle]=\"{background:colour}\"></i>\n        </div>\n        <div class=\"legend-label\">\n          <span [innerHTML]=\"generatedLabels[i]\"></span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"imageURL\">\n    <img [src]=\"imageURL\">\n  </div>\n  <p *ngIf=\"attributionLink\">Source: <a [href]=\"attributionLink\">{{attribution || 'details'}}</a></p>\n  <p *ngIf=\"attribution&&!attributionLink\">Source: {{attribution}}</p>\n</div>\n",
                styles: ["\n.map-legend{\n  display:block;\n  background: white;\n}\n\n.legend-colour{\n  display:table-cell;\n  padding:0px;\n}\n\n.legend-label{\n  display:table-cell;\n  padding:0px 4px 2px 2px;\n  font-size:10px;\n  vertical-align:middle;\n}\n\n.legend-entry {\n  float: left;\n  width: 15px !important;\n  height: 15px !important;\n}\n"]
            }),
            __metadata("design:paramtypes", [PaletteService])
        ], MapLegendComponent);
        return MapLegendComponent;
    }());

    var MapControlComponent = /** @class */ (function () {
        function MapControlComponent(_el, _wrapper) {
            this._el = _el;
            this._wrapper = _wrapper;
            this.position = 'TOP_RIGHT';
        }
        MapControlComponent.prototype.ngOnInit = function () {
        };
        MapControlComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this._wrapper.getNativeMap().then(function (m) {
                var content = _this._el.nativeElement.querySelector('.map-control-content');
                // If content of the map control is not already wrapped in a div, do it
                // now.
                if (content.nodeName !== "DIV") {
                    var controlDiv = document.createElement('div');
                    controlDiv.appendChild(content);
                    content = controlDiv;
                }
                m.controls[window.google.maps.ControlPosition[_this.position]].push(content);
            });
        };
        MapControlComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core$1.GoogleMapsAPIWrapper }
        ]; };
        __decorate([
            core.ViewChild('mapControl', { static: false }),
            __metadata("design:type", core.Component)
        ], MapControlComponent.prototype, "mapControl", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], MapControlComponent.prototype, "position", void 0);
        MapControlComponent = __decorate([
            core.Component({
                selector: 'map-control',
                template: "<div #mapControl class=\"map-control-content\">\n  <ng-content></ng-content>\n</div>\n",
                styles: [".map-control-content{\n  background: transparent;\n}\n"]
            }),
            __metadata("design:paramtypes", [core.ElementRef, core$1.GoogleMapsAPIWrapper])
        ], MapControlComponent);
        return MapControlComponent;
    }());

    var DateShifterComponent = /** @class */ (function () {
        function DateShifterComponent() {
            this.interval = 2000;
            this.limits = null;
            this.date = new Date();
            this.dateChange = new core.EventEmitter();
            this.value = 0;
            this.label = '-';
            this.timer = 0;
            this.dateText = '-';
        }
        DateShifterComponent.prototype.ngOnChanges = function (changes) {
            if (changes.interval) {
                this.startTimer();
            }
        };
        DateShifterComponent.prototype.startTimer = function () {
            var _this = this;
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.timer = window.setInterval(function () { return _this.tick(); }, this.interval);
        };
        DateShifterComponent.prototype.ngAfterViewInit = function () {
            this.startTimer();
        };
        DateShifterComponent.prototype.reset = function () {
            this.value = 0;
            this.sliderMoved();
        };
        DateShifterComponent.prototype.tick = function () {
            if (!this.value) {
                return;
            }
            var sign = this.value < 0 ? -1 : 1;
            this.date = new Date(this.date.getTime());
            switch (Math.abs(this.value)) {
                case 1:
                    this.date.setDate(this.date.getDate() + sign);
                    break;
                case 2:
                    this.date.setDate(this.date.getDate() + 7 * sign);
                    break;
                case 3:
                    this.date.setMonth(this.date.getMonth() + sign);
                    break;
                case 4:
                    this.date.setFullYear(this.date.getFullYear() + sign);
                    break;
            }
            if (this.limits && this.limits.length) {
                if (this.date.getTime() < this.limits[0].getTime()) {
                    this.date = this.limits[0];
                }
                if (this.date.getTime() > this.limits[1].getTime()) {
                    this.date = this.limits[1];
                }
            }
            this.setDateText();
            this.dateChange.emit(this.date);
        };
        DateShifterComponent.prototype.setDateText = function () {
            this.dateText = this.date.toLocaleDateString();
        };
        DateShifterComponent.prototype.sliderMoved = function () {
            this.setLabel();
        };
        DateShifterComponent.prototype.setLabel = function () {
            if (this.value < 0) {
                this.label = 'back 1';
            }
            else if (this.value > 0) {
                this.label = 'advance 1';
            }
            else {
                this.label = '-';
            }
            switch (Math.abs(this.value)) {
                case 1:
                    this.label += 'day';
                    break;
                case 2:
                    this.label += 'week';
                    break;
                case 3:
                    this.label += 'month';
                    break;
                case 4:
                    this.label += 'year';
                    break;
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], DateShifterComponent.prototype, "interval", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], DateShifterComponent.prototype, "limits", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], DateShifterComponent.prototype, "date", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], DateShifterComponent.prototype, "dateChange", void 0);
        DateShifterComponent = __decorate([
            core.Component({
                selector: 'date-shifter',
                template: "<div>\n  <h3>{{dateText}}</h3>\n  <input type=\"range\"\n         class=\"form-control\"\n         min=\"-4\"\n         [max]=\"4\"\n         step=\"1\"\n         [(ngModel)]=\"value\"\n         (ngModelChange)=\"sliderMoved()\"\n         (mouseup)=\"reset()\">\n  <h4>{{label}}</h4>\n</div>\n\n  ",
                styles: [""]
            }),
            __metadata("design:paramtypes", [])
        ], DateShifterComponent);
        return DateShifterComponent;
    }());

    var OneTimeSplashComponent = /** @class */ (function () {
        function OneTimeSplashComponent(modalService) {
            this.modalService = modalService;
            this.label = 'About';
            this.hideMessage = 'Understood, I don’t need to see this again';
        }
        OneTimeSplashComponent.prototype.storageKey = function () {
            if (!this.application) {
                return null;
            }
            return this.application + '-splash-skip';
        };
        OneTimeSplashComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () {
                var key = _this.storageKey();
                if (key) {
                    _this.doNotShow = store.get(key, false);
                }
                if (!_this.doNotShow) {
                    _this.show();
                }
            });
        };
        OneTimeSplashComponent.prototype.show = function () {
            this.current = this.modalService.open(this.splashTemplate, {
                size: 'lg',
                windowClass: this.klass
            });
        };
        OneTimeSplashComponent.prototype.close = function () {
            if (!this.current) {
                return;
            }
            this.current.close();
            this.current = null;
        };
        OneTimeSplashComponent.prototype.doNotShowClicked = function () {
            var key = this.storageKey();
            if (!key) {
                return;
            }
            store.set(key, this.doNotShow);
        };
        OneTimeSplashComponent.ctorParameters = function () { return [
            { type: ngBootstrap.NgbModal }
        ]; };
        __decorate([
            core.ViewChild('splashTemplate', { static: false }),
            __metadata("design:type", Object)
        ], OneTimeSplashComponent.prototype, "splashTemplate", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], OneTimeSplashComponent.prototype, "application", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], OneTimeSplashComponent.prototype, "label", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], OneTimeSplashComponent.prototype, "hideMessage", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], OneTimeSplashComponent.prototype, "klass", void 0);
        OneTimeSplashComponent = __decorate([
            core.Component({
                selector: 'one-time-splash',
                template: "<ng-template #splashTemplate let-c=\"close\" let-d=\"dismiss\">\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\">\n      {{label}}</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <ng-content></ng-content>\n  </div>\n  <div class=\"modal-footer\">\n    <label *ngIf=\"application\">\n      <input type=\"checkbox\" [(ngModel)]=\"doNotShow\" (ngModelChange)=\"doNotShowClicked()\">\n      &nbsp; {{hideMessage}}\n    </label>\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c('Close click')\">Close</button>\n  </div>\n  </ng-template>\n",
                styles: [""]
            }),
            __metadata("design:paramtypes", [ngBootstrap.NgbModal])
        ], OneTimeSplashComponent);
        return OneTimeSplashComponent;
    }());

    var DateElementComponent = /** @class */ (function () {
        function DateElementComponent() {
            this.step = 1;
            this.changed = new core.EventEmitter();
        }
        DateElementComponent.prototype.ngAfterViewInit = function () {
        };
        DateElementComponent.prototype.move = function (n) {
            this.src[this.property] += n;
            this.changed.emit(this.src);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], DateElementComponent.prototype, "label", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], DateElementComponent.prototype, "property", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], DateElementComponent.prototype, "src", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], DateElementComponent.prototype, "step", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], DateElementComponent.prototype, "changed", void 0);
        DateElementComponent = __decorate([
            core.Component({
                selector: 'date-element',
                template: "<div class=\"row no-gutters\">\n  <div class=\"col-4\">{{label}}</div>\n  <div class=\"col-2\">\n    <button class=\"btn btn-secondary btn-sm\" (click)=\"move(-step)\">\n      <i class=\"fa fa-angle-left\"></i>\n    </button>\n  </div>\n  <div class=\"col-4\"><button class=\"btn btn-link btn-sm\">{{src[property]}}</button></div>\n  <div class=\"col-2\">\n    <button class=\"btn btn-secondary btn-sm\" (click)=\"move(step)\">\n      <i class=\"fa fa-angle-right\"></i>\n    </button>\n  </div>\n</div>\n"
            }),
            __metadata("design:paramtypes", [])
        ], DateElementComponent);
        return DateElementComponent;
    }());

    var ShareViewComponent = /** @class */ (function () {
        function ShareViewComponent() {
        }
        ShareViewComponent.prototype.ngAfterViewInit = function () {
        };
        ShareViewComponent = __decorate([
            core.Component({
                selector: 'share-view',
                template: "<button class=\"btn btn-secondary btn-sm\"\n        ngbTooltip=\"Share current view\"\n        placement=\"right\"\n        [disabled]=\"true\"\n><i class=\"fa fa-share-alt\"></i></button>\n"
            }),
            __metadata("design:paramtypes", [])
        ], ShareViewComponent);
        return ShareViewComponent;
    }());

    var LocationSearchComponent = /** @class */ (function () {
        function LocationSearchComponent() {
        }
        LocationSearchComponent.prototype.ngAfterViewInit = function () {
        };
        LocationSearchComponent = __decorate([
            core.Component({
                selector: 'location-search',
                template: "<button class=\"btn btn-secondary btn-sm\"\n        ngbTooltip=\"Location search\"\n        placement=\"right\"\n        [disabled]=\"true\"\n\n><i class=\"fa fa-search\"></i></button>\n"
            }),
            __metadata("design:paramtypes", [])
        ], LocationSearchComponent);
        return LocationSearchComponent;
    }());

    var LayeredMapComponent = /** @class */ (function () {
        function LayeredMapComponent(_zone, staticData, metadata) {
            this._zone = _zone;
            this.staticData = staticData;
            this.metadata = metadata;
            this.layers = [];
            this.markers = [];
            this.mapTypeId = 'roadmap';
            this.layersChange = new core.EventEmitter();
            this.featureSelected = new core.EventEmitter();
            this.pointSelected = new core.EventEmitter();
            this.mapTypePosition = googleMapsTypes.ControlPosition.BOTTOM_LEFT;
            this.streetViewControl = true;
            this.selectedFeature = null;
            // google maps zoom level
            this.zoom = 4;
            this.showMapType = true;
            this.mapTypeOptions = {
                position: googleMapsTypes.ControlPosition.BOTTOM_LEFT
            };
            // initial center position for the map
            this.lat = -22.673858;
            this.lng = 129.815982;
        }
        LayeredMapComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            // if zoom in changes...
            if (changes.mapTypePosition) {
                if (this.mapTypePosition === null) {
                    this.showMapType = false;
                }
                this.mapTypeOptions = {
                    position: this.mapTypePosition
                };
            }
            if (changes.layers) {
                this.setLayerPositions();
            }
            if (changes.markers && this.markers) {
                // deal with existing info windows?
                if (this.infoWindows) {
                    this.infoWindows.forEach(function (w, i) {
                        _this._zone.runOutsideAngular(function () { return w.close(); });
                    });
                }
                setTimeout(function () {
                    // Check and open relevant info windows...
                    _this.infoWindows.forEach(function (w, i) {
                        var m = _this.markers[i];
                        if (m.open) {
                            _this._zone.runOutsideAngular(function () { return w.open(); });
                        }
                        else {
                            _this._zone.runOutsideAngular(function () { return w.close(); });
                        }
                    });
                });
            }
            if (changes.bounds) {
                setTimeout(function () { return _this._bounds = _this.bounds; });
            }
        };
        LayeredMapComponent.prototype.ngAfterViewInit = function () {
        };
        LayeredMapComponent.prototype.layersChanged = function (changes) {
        };
        LayeredMapComponent.prototype.layerAdded = function (selection) {
            var _this = this;
            var ex = this.layers.find(function (l) { return l.layer === selection.layer; });
            if (ex) {
                return;
            }
            var mapped = new MappedLayer();
            mapped.layer = selection.layer;
            mapped.layerType = 'wms';
            mapped.options.legend = true;
            if (selection.layer.options.vectors) {
                this.staticData.get(selection.layer.options.host, selection.layer.options.filepath).subscribe(function (data) {
                    mapped.staticData = data;
                    _this.activateLayer(mapped, selection);
                });
            }
            else {
                this.activateLayer(mapped, selection);
            }
        };
        LayeredMapComponent.prototype.activateLayer = function (mapped, selection) {
            mapped.update();
            if (selection.action === 'replace') {
                if (selection.filter) {
                    this.layers = this.layers.filter(function (ml) { return !selection.filter(ml); });
                }
                else {
                    this.layers = [];
                }
            }
            this.layers = [mapped].concat(this.layers);
            this.setLayerPositions();
            this.layersChange.emit(this.layers);
        };
        LayeredMapComponent.prototype.setLayerPositions = function () {
            var ix = 0;
            for (var i = this.layers.length - 1; i >= 0; i--) {
                if (this.layers[i].layerType === 'wms') {
                    this.layers[i].options.position = ix;
                    ix++;
                }
            }
        };
        LayeredMapComponent.prototype.extractFeature = function (f) {
            var geo = f.getGeometry();
            geo = {
                type: 'Point',
                coordinates: geo.get(0)
            };
            var props = {};
            f.forEachProperty(function (val, prop) { return props[prop] = val; });
            return {
                type: 'Feature',
                geometry: geo,
                properties: props
            };
        };
        LayeredMapComponent.prototype.clicked = function (event) {
            var feature = this.extractFeature(event.feature);
            this.selectedFeature = feature;
            this.featureSelected.emit({ feature: feature });
        };
        LayeredMapComponent.prototype.circleClicked = function (ml, feature) {
            this.selectedFeature = feature;
            this.featureSelected.emit({ feature: feature, layer: ml });
        };
        LayeredMapComponent.prototype.mapClick = function (event) {
            var coords = event.coords;
            this.pointSelected.emit(coords);
        };
        LayeredMapComponent.prototype.zoomToBounds = function (bounds) {
            this._bounds = bounds;
        };
        LayeredMapComponent.prototype.zoomChanged = function () {
            this.layers = this.layers.slice();
        };
        LayeredMapComponent.ctorParameters = function () { return [
            { type: core.NgZone },
            { type: StaticDataService },
            { type: MetadataService }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], LayeredMapComponent.prototype, "layers", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], LayeredMapComponent.prototype, "markers", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], LayeredMapComponent.prototype, "mapTypeId", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], LayeredMapComponent.prototype, "layersChange", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], LayeredMapComponent.prototype, "featureSelected", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], LayeredMapComponent.prototype, "pointSelected", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], LayeredMapComponent.prototype, "mapTypePosition", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LayeredMapComponent.prototype, "streetViewControl", void 0);
        __decorate([
            core.ViewChild(core$1.AgmMap, { static: false }),
            __metadata("design:type", core$1.AgmMap)
        ], LayeredMapComponent.prototype, "theMap", void 0);
        __decorate([
            core.ViewChildren('infoWindows'),
            __metadata("design:type", core.QueryList)
        ], LayeredMapComponent.prototype, "infoWindows", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], LayeredMapComponent.prototype, "zoom", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LayeredMapComponent.prototype, "showMapType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], LayeredMapComponent.prototype, "lat", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], LayeredMapComponent.prototype, "lng", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LayeredMapComponent.prototype, "bounds", void 0);
        LayeredMapComponent = __decorate([
            core.Component({
                selector: 'layered-map',
                template: "<agm-map #theMap\n[(latitude)]=\"lat\"\n[(longitude)]=\"lng\"\n[(zoom)]=\"zoom\"\n(zoomChange)=\"zoomChanged()\"\n[disableDefaultUI]=\"false\"\n[zoomControl]=\"false\"\n[mapTypeId]=\"mapTypeId\"\n[mapTypeControl]=\"showMapType\"\n[mapTypeControlOptions]=\"mapTypeOptions\"\n[streetViewControl]=\"streetViewControl\"\nscaleControl=\"true\"\n[fitBounds]=\"_bounds\"\n(mapClick)=\"mapClick($event)\">\n\n<agm-marker *ngFor=\"let marker of markers\"\n            [longitude]=\"marker.loc.lng\"\n            [latitude]=\"marker.loc.lat\"\n            [iconUrl]=\"marker.iconUrl\">\n  <agm-info-window #infoWindows [disableAutoPan]=\"true\">\n    <strong>{{marker.value}}</strong>\n  </agm-info-window>\n</agm-marker>\n\n<ng-container *ngFor=\"let mp of layers.slice()|reverse; let i = index\" [ngSwitch]=\"mp.layerType\">\n  <wms-layer *ngSwitchCase=\"'wms'\"\n    [url]=\"mp.url\"\n    [params]=\"mp.wmsParameters\"\n    [opacity]=\"mp.opacity\"\n    [position]=\"mp.options.position\">\n  </wms-layer>\n  <agm-data-layer *ngSwitchCase=\"'vector'\"\n                [geoJson]=\"mp.staticData\"\n                [style]=\"mp._styleFunc\"\n                (layerClick)=\"clicked($event)\"\n\n                >\n  </agm-data-layer>\n\n  <ng-container *ngSwitchCase=\"'circle'\">\n    <agm-circle *ngFor=\"let f of mp.staticData.features; let j=index\"\n                [latitude]=\"f.geometry.coordinates[1]\"\n                [longitude]=\"f.geometry.coordinates[0]\"\n                [radius]=\"10000000/(zoom*zoom*zoom*zoom)\"\n                [fillColor]=\"mp.flattenedSettings?.styles?.fillColor||'black'\"\n                [fillOpacity]=\"mp.flattenedSettings?.styles?.fillOpacity||1\"\n                [strokeColor]=\"mp.flattenedSettings?.styles?.strokeColor||'black'\"\n                [strokeOpacity]=\"mp.flattenedSettings?.styles?.strokeOpacity||1\"\n                [strokePosition]=\"0\"\n                [strokeWeight]=\"(f===selectedFeature)?3:(mp.flattenedSettings?.styles?.strokeWeight||0.5)\"\n                (circleClick)=\"circleClicked(mp,f)\"\n                >\n    </agm-circle>\n  </ng-container>\n\n  <!--\n  -->\n</ng-container>\n\n<!-- for map controls -->\n<map-control position=\"TOP_CENTER\">\n    <ng-content select=\".map-control.top-center\"></ng-content>\n</map-control>\n\n<map-control position=\"TOP_LEFT\">\n    <ng-content select=\".map-control.top-left\"></ng-content>\n</map-control>\n\n<map-control position=\"TOP_RIGHT\">\n    <ng-content select=\".map-control.top-right\"></ng-content>\n</map-control>\n\n<map-control position=\"LEFT_TOP\">\n    <ng-content select=\".map-control.left-top\"></ng-content>\n</map-control>\n\n<map-control position=\"RIGHT_TOP\">\n    <ng-content select=\".map-control.right-top\"></ng-content>\n</map-control>\n\n<map-control position=\"LEFT_CENTER\">\n    <ng-content select=\".map-control.left-center\"></ng-content>\n</map-control>\n\n<map-control position=\"RIGHT_CENTER\">\n    <ng-content select=\".map-control.right-center\"></ng-content>\n</map-control>\n\n<map-control position=\"LEFT_BOTTOM\">\n    <ng-content select=\".map-control.left-bottom\"></ng-content>\n</map-control>\n\n<map-control position=\"RIGHT_BOTTOM\">\n    <ng-content select=\".map-control.right-bottom\"></ng-content>\n</map-control>\n\n<map-control position=\"BOTTOM_CENTER\">\n    <ng-content select=\".map-control.bottom-center\"></ng-content>\n</map-control>\n\n<map-control position=\"BOTTOM_LEFT\">\n    <ng-content select=\".map-control.bottom-left\"></ng-content>\n</map-control>\n\n<map-control position=\"BOTTOM_RIGHT\">\n    <ng-content select=\".map-control.bottom-right\"></ng-content>\n</map-control>\n\n</agm-map>\n\n"
            }),
            __metadata("design:paramtypes", [core.NgZone,
                StaticDataService,
                MetadataService])
        ], LayeredMapComponent);
        return LayeredMapComponent;
    }());

    var ZoomLayerComponent = /** @class */ (function () {
        function ZoomLayerComponent() {
        }
        ZoomLayerComponent.prototype.ngAfterViewInit = function () {
        };
        ZoomLayerComponent.prototype.zoomToLayer = function () {
            var _this = this;
            if (this.layer.layer.spatialExtent) {
                console.log('Zoom to layer');
                this.layer.layer.spatialExtent.subscribe(function (b) {
                    _this.map.zoomToBounds(Object.assign({}, b));
                });
            }
            else {
                console.log('Zoom full');
                this.map.zoomToBounds(Object.assign({}, this.fullBounds));
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", LayeredMapComponent)
        ], ZoomLayerComponent.prototype, "map", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", MappedLayer)
        ], ZoomLayerComponent.prototype, "layer", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ZoomLayerComponent.prototype, "fullBounds", void 0);
        ZoomLayerComponent = __decorate([
            core.Component({
                selector: 'zoom-layer',
                template: "<button type=\"button\" [disabled]=\"!layer\" class=\"btn btn-secondary btn-sm\"\n        ngbTooltip=\"Zoom to selected layer\"\n        placement=\"right\"\n        (click)=\"zoomToLayer()\"\n><i class=\"fa fa-compress\"></i>\n</button>\n"
            }),
            __metadata("design:paramtypes", [])
        ], ZoomLayerComponent);
        return ZoomLayerComponent;
    }());

    var ZoomFullComponent = /** @class */ (function () {
        function ZoomFullComponent() {
        }
        ZoomFullComponent.prototype.ngAfterViewInit = function () {
        };
        ZoomFullComponent.prototype.zoomToBounds = function () {
            this.map.zoomToBounds(Object.assign({}, this.bounds));
        };
        __decorate([
            core.Input(),
            __metadata("design:type", LayeredMapComponent)
        ], ZoomFullComponent.prototype, "map", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ZoomFullComponent.prototype, "bounds", void 0);
        ZoomFullComponent = __decorate([
            core.Component({
                selector: 'zoom-full',
                template: "<button class=\"btn btn-secondary btn-sm\"\n        ngbTooltip=\"Zoom to full extent\"\n        placement=\"right\"\n        (click)=\"zoomToBounds()\"\n><i class=\"fa fa-arrows-alt\"></i></button>\n"
            }),
            __metadata("design:paramtypes", [])
        ], ZoomFullComponent);
        return ZoomFullComponent;
    }());

    var ZoomOutComponent = /** @class */ (function () {
        function ZoomOutComponent() {
            this.minZoom = 1;
        }
        ZoomOutComponent.prototype.ngAfterViewInit = function () {
        };
        ZoomOutComponent.prototype.zoomOut = function () {
            if (!this.map) {
                return;
            }
            this.map.zoom = Math.max(this.minZoom, this.map.zoom - 1);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", LayeredMapComponent)
        ], ZoomOutComponent.prototype, "map", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], ZoomOutComponent.prototype, "minZoom", void 0);
        ZoomOutComponent = __decorate([
            core.Component({
                selector: 'zoom-out',
                template: "<button class=\"btn btn-secondary btn-sm\"\n        ngbTooltip=\"Zoom out\"\n        placement=\"right\"\n        (click)=\"zoomOut()\"\n><i class=\"fa fa-minus\"></i></button>"
            }),
            __metadata("design:paramtypes", [])
        ], ZoomOutComponent);
        return ZoomOutComponent;
    }());

    var ZoomInComponent = /** @class */ (function () {
        function ZoomInComponent() {
            this.maxZoom = 32;
        }
        ZoomInComponent.prototype.ngAfterViewInit = function () {
        };
        ZoomInComponent.prototype.zoomIn = function () {
            if (!this.map) {
                return;
            }
            this.map.zoom = Math.min(this.maxZoom, this.map.zoom + 1);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", LayeredMapComponent)
        ], ZoomInComponent.prototype, "map", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], ZoomInComponent.prototype, "maxZoom", void 0);
        ZoomInComponent = __decorate([
            core.Component({
                selector: 'zoom-in',
                template: "<button class=\"btn btn-secondary btn-sm\"\n        ngbTooltip=\"Zoom in\"\n        placement=\"right\"\n        (click)=\"zoomIn()\"\n><i class=\"fa fa-plus\"></i></button>"
            }),
            __metadata("design:paramtypes", [])
        ], ZoomInComponent);
        return ZoomInComponent;
    }());

    var CycleBaseMapComponent = /** @class */ (function () {
        function CycleBaseMapComponent() {
            this.maxZoom = 32;
            this.baseLayers = [
                {
                    map_type_id: 'roadmap',
                    label: 'Road Map'
                },
                {
                    map_type_id: 'satellite',
                    label: 'Satellite'
                }
            ];
            this.tooltip = 'Toggle base layer';
        }
        CycleBaseMapComponent.prototype.ngAfterViewInit = function () {
        };
        CycleBaseMapComponent.prototype.ngOnChanges = function (changes) {
            if (this.baseLayers && !this.baseLayer) {
                this.baseLayer = this.baseLayers[0];
            }
        };
        CycleBaseMapComponent.prototype.toggleBaseLayer = function () {
            var _this = this;
            if (!this.map) {
                return;
            }
            var current = this.baseLayers.findIndex(function (l) { return l.map_type_id === _this.baseLayer.map_type_id; });
            var next = (current + 1) % this.baseLayers.length;
            this.baseLayer = this.baseLayers[next];
            this.map.mapTypeId = this.baseLayer ?
                this.baseLayer.map_type_id :
                null;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", LayeredMapComponent)
        ], CycleBaseMapComponent.prototype, "map", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], CycleBaseMapComponent.prototype, "maxZoom", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], CycleBaseMapComponent.prototype, "baseLayers", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CycleBaseMapComponent.prototype, "baseLayer", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CycleBaseMapComponent.prototype, "tooltip", void 0);
        CycleBaseMapComponent = __decorate([
            core.Component({
                selector: 'cycle-base-map',
                template: "<button class=\"btn btn-secondary btn-sm\" (click)=\"toggleBaseLayer()\" [ngbTooltip]=\"tooltip\"\n                     placement=\"right\">\n  <i class=\"fa\" [ngClass]=\"baseLayer?.label==='Road Map'?'fa-road':'fa-globe'\"></i>\n</button>"
            }),
            __metadata("design:paramtypes", [])
        ], CycleBaseMapComponent);
        return CycleBaseMapComponent;
    }());

    var CycleOpacityComponent = /** @class */ (function () {
        function CycleOpacityComponent() {
            this.maxZoom = 32;
            this.tooltip = 'Adjust transparency of grid layer';
            this.layerOpacity = 1.0;
            this.step = 0.4;
        }
        CycleOpacityComponent.prototype.ngAfterViewInit = function () {
        };
        CycleOpacityComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (this.map) {
                this.map.layersChange.subscribe(function () { return _this.updateLayers(); });
            }
        };
        CycleOpacityComponent.prototype.cycleTransparency = function () {
            this.layerOpacity -= this.step;
            if (this.layerOpacity < 0) {
                this.layerOpacity = 1.0;
            }
            this.updateLayers();
        };
        CycleOpacityComponent.prototype.updateLayers = function () {
            var _this = this;
            this.map.layers.forEach(function (l) { return l.opacity = _this.layerOpacity; });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", LayeredMapComponent)
        ], CycleOpacityComponent.prototype, "map", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CycleOpacityComponent.prototype, "maxZoom", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CycleOpacityComponent.prototype, "tooltip", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CycleOpacityComponent.prototype, "layerOpacity", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CycleOpacityComponent.prototype, "step", void 0);
        CycleOpacityComponent = __decorate([
            core.Component({
                selector: 'cycle-opacity',
                template: "<button class=\"btn btn-secondary btn-sm\"\n                     (click)=\"cycleTransparency()\"\n                     [ngbTooltip]=\"tooltip\"\n                     placement=\"right\">\n<i class=\"fa\" [ngClass]=\"(layerOpacity<0.5)?'fa-circle-o':((layerOpacity<0.9)?'fa-adjust':'fa-circle')\"></i>\n</button>"
            }),
            __metadata("design:paramtypes", [])
        ], CycleOpacityComponent);
        return CycleOpacityComponent;
    }());

    var ButtonBarComponent = /** @class */ (function () {
        function ButtonBarComponent() {
        }
        ButtonBarComponent.prototype.ngAfterViewInit = function () {
        };
        ButtonBarComponent = __decorate([
            core.Component({
                selector: 'button-bar',
                template: "<div class=\"button-bar bb-vertical\">\n  <ng-content></ng-content>\n</div>\n\n",
                styles: ["\n"]
            }),
            __metadata("design:paramtypes", [])
        ], ButtonBarComponent);
        return ButtonBarComponent;
    }());

    var TimeseriesChartComponent = /** @class */ (function () {
        function TimeseriesChartComponent(_element) {
            this._element = _element;
            this.timeSeries = [];
            this.marginLeft = 40;
            this.marginRight = 10;
            this.marginTop = 0;
            this.marginBottom = 20;
            this.titlefont = undefined;
        }
        TimeseriesChartComponent.prototype.ngAfterViewInit = function () {
            this.draw();
        };
        TimeseriesChartComponent.prototype.ngOnChanges = function (changes) {
            this.draw();
        };
        TimeseriesChartComponent.prototype.draw = function () {
            var node = this._element.nativeElement.querySelector('.our-chart');
            plotlyBasic.purge(node);
            if (!this.timeSeries || !this.timeSeries.length) {
                return;
            }
            var seriesUnits = this.timeSeries.map(function (ts) { return ts.units; });
            var commonUnits;
            if (seriesUnits.every(function (u) { return u === seriesUnits[0]; })) {
                commonUnits = seriesUnits[0];
            }
            var layout = {
                margin: {
                    t: this.marginTop + (this.title ? 30 : 0),
                    l: this.marginLeft,
                    r: this.marginRight,
                    b: this.marginBottom
                },
                yaxis: {
                    fixedrange: true,
                    title: commonUnits
                },
                width: 320,
                height: 200,
                title: this.title || undefined,
                titlefont: this.titlefont
            };
            plotlyBasic.plot(node, this.timeSeries.map(function (ts) {
                var nonNullCount = ts.values.filter(function (v) { return !isNaN(v); }).length;
                var mode = ((ts.style !== 'bar') && (nonNullCount < 365)) ?
                    'lines+markers' :
                    undefined;
                var suffix = commonUnits ? '' : " (" + ts.units + ")";
                return {
                    type: (ts.style === 'bar') ? 'bar' : undefined,
                    mode: mode,
                    x: ts.dates,
                    y: ts.values,
                    name: ts.label + suffix
                };
            }), layout);
        };
        TimeseriesChartComponent.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TimeseriesChartComponent.prototype, "title", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], TimeseriesChartComponent.prototype, "timeSeries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TimeseriesChartComponent.prototype, "marginLeft", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TimeseriesChartComponent.prototype, "marginRight", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TimeseriesChartComponent.prototype, "marginTop", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TimeseriesChartComponent.prototype, "marginBottom", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TimeseriesChartComponent.prototype, "titlefont", void 0);
        TimeseriesChartComponent = __decorate([
            core.Component({
                selector: 'timeseries-chart',
                template: "<div class=\"our-chart\">\n</div>\n"
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], TimeseriesChartComponent);
        return TimeseriesChartComponent;
    }());

    var FeatureTableComponent = /** @class */ (function () {
        function FeatureTableComponent() {
            this.styles = {};
            this._keys = Object.keys;
        }
        FeatureTableComponent.prototype.ngAfterViewInit = function () {
        };
        FeatureTableComponent.prototype.ngOnChanges = function (changes) {
            if (!this.styles) {
                this.styles = {};
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], FeatureTableComponent.prototype, "feature", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], FeatureTableComponent.prototype, "styles", void 0);
        FeatureTableComponent = __decorate([
            core.Component({
                selector: 'feature-table',
                template: "<table *ngIf=\"feature\" class=\"table table-striped table-sm feature-table\">\n  <thead>\n    <tr>\n      <td><strong>Property</strong></td>\n      <td><strong>Value</strong></td>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td><strong>Geometry</strong></td>\n      <td>{{feature.geometry.type}}</td>\n    </tr>\n    <tr *ngFor=\"let prop of _keys(feature.properties)\">\n      <td><strong>{{prop}}</strong></td>\n      <td *ngIf=\"!styles||!styles[prop]\">{{feature.properties[prop]}}</td>\n      <td *ngIf=\"styles&&styles[prop]\">\n        <a *ngIf=\"styles[prop].hyperlink\" target=\"_blank\" [href]=\"feature.properties[prop]\">\n          {{feature.properties[prop]}}\n        </a>\n      </td>\n    </tr>\n  </tbody>\n</table>",
                styles: [".feature-table{\n  max-width:300px;\n}"]
            }),
            __metadata("design:paramtypes", [])
        ], FeatureTableComponent);
        return FeatureTableComponent;
    }());

    var CollapsibleMapControlComponent = /** @class */ (function () {
        function CollapsibleMapControlComponent() {
        }
        CollapsibleMapControlComponent.prototype.ngAfterViewInit = function () {
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], CollapsibleMapControlComponent.prototype, "isCollapsed", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], CollapsibleMapControlComponent.prototype, "heading", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], CollapsibleMapControlComponent.prototype, "direction", void 0);
        CollapsibleMapControlComponent = __decorate([
            core.Component({
                selector: 'collapsible-map-control',
                template: "<div class=\"card map-control collapsible-control\">\n    <a (click)=\"isCollapsed = !isCollapsed\">\n      <div class=\"card-header\">\n        <h6 class=\"mb-0\">\n          {{heading}}\n          <span *ngIf=\"isCollapsed\" class=\"float-right fa fa-caret-up\n            collapse-arrow\" aria-hidden=\"true\"></span>\n          <span *ngIf=\"!isCollapsed\" class=\"float-right fa fa-caret-down\n            collapse-arrow\" aria-hidden=\"true\"></span>\n        </h6>\n      </div>\n    </a>\n\n    <div class=\"ngbCollapse\" [ngbCollapse]=\"isCollapsed\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n",
                styles: [".collapsible-control{\n  margin:3px;\n}"]
            }),
            __metadata("design:paramtypes", [])
        ], CollapsibleMapControlComponent);
        return CollapsibleMapControlComponent;
    }());

    var BaseMapSelectionComponent = /** @class */ (function () {
        function BaseMapSelectionComponent() {
        }
        BaseMapSelectionComponent.prototype.ngAfterViewInit = function () {
        };
        BaseMapSelectionComponent = __decorate([
            core.Component({
                selector: 'base-map-selection',
                template: "<p>base-map-selection Component</p>"
            }),
            __metadata("design:paramtypes", [])
        ], BaseMapSelectionComponent);
        return BaseMapSelectionComponent;
    }());

    var SimpleTreeNodeComponent = /** @class */ (function () {
        function SimpleTreeNodeComponent() {
            this.options = {};
            this.nodeSelected = new core.EventEmitter();
        }
        SimpleTreeNodeComponent.prototype.ngOnChanges = function (changes) {
            this.evalState();
        };
        SimpleTreeNodeComponent.prototype.ngAfterViewInit = function () {
        };
        SimpleTreeNodeComponent.prototype.treeClick = function (event) {
            event.stopPropagation();
            event.preventDefault();
            if (!this.tree) {
                return;
            }
            this.tree.expanded = !this.tree.expanded;
            this.evalState();
            if (this.tree.actions && this.tree.actions.length) {
                this.tree.actions[0].action(this.tree);
            }
            else {
                this.nodeSelected.emit(this.tree);
            }
        };
        SimpleTreeNodeComponent.prototype.evalState = function () {
            this.expanded = this.tree &&
                this.tree.expanded &&
                this.tree.children &&
                this.tree.children.length > 0;
            this.leaf = this.tree && (!this.tree.children || this.tree.children.length === 0);
            this.collapsed = this.tree &&
                !this.tree.expanded &&
                this.tree.children &&
                this.tree.children.length > 0;
            if (this.expanded) {
                this.icon = this.options.expandedIcon;
            }
            else if (this.collapsed) {
                this.icon = this.options.collapsedIcon;
            }
            else {
                this.icon = this.options.leafIcon;
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SimpleTreeNodeComponent.prototype, "tree", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SimpleTreeNodeComponent.prototype, "options", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], SimpleTreeNodeComponent.prototype, "nodeSelected", void 0);
        SimpleTreeNodeComponent = __decorate([
            core.Component({
                selector: 'simple-tree-node',
                template: "<a href=\"#\" \n                (click)=\"treeClick($event)\"\n                [ngClass]=\"tree.klass\"><i [ngClass]=\"icon\"></i>\n  &nbsp;\n  <span ngbTooltip=\"{{tree.tooltip | async}}\"\n        placement=\"right\"\n        container=\"body\">{{tree.label}}</span>\n  <span *ngIf=\"tree.actions\"\n        class=\"float-right\">\n      &nbsp;\n      <i *ngFor=\"let a of tree.actions\"\n       [ngClass]=\"a.icon\"\n       ngbTooltip=\"{{a.tooltip | async}}\"\n       placement=\"right\"\n       container=\"body\"\n       (click)=\"a.action(tree)\">&nbsp;</i>\n  </span>\n</a>\n"
            })
        ], SimpleTreeNodeComponent);
        return SimpleTreeNodeComponent;
    }());

    var SimpleTreeComponent = /** @class */ (function () {
        function SimpleTreeComponent() {
            this.showTop = true;
            this.collapsedIcon = 'fa fa-caret-right';
            this.expandedIcon = 'fa fa-caret-down';
            this.leafIcon = 'fa fa-minus';
            this.nodeSelected = new core.EventEmitter();
            this.options = {};
        }
        SimpleTreeComponent.prototype.ngAfterViewInit = function () {
        };
        SimpleTreeComponent.prototype.ngOnChanges = function (changes) {
            if (changes.options) {
                return;
            }
            this.options = {
                collapsedIcon: this.collapsedIcon,
                expandedIcon: this.expandedIcon,
                leafIcon: this.leafIcon
            };
        };
        SimpleTreeComponent.prototype.childSelected = function (node) {
            this.nodeSelected.emit(node);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SimpleTreeComponent.prototype, "tree", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], SimpleTreeComponent.prototype, "showTop", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], SimpleTreeComponent.prototype, "inner", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SimpleTreeComponent.prototype, "collapsedIcon", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SimpleTreeComponent.prototype, "expandedIcon", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SimpleTreeComponent.prototype, "leafIcon", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], SimpleTreeComponent.prototype, "nodeSelected", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SimpleTreeComponent.prototype, "options", void 0);
        SimpleTreeComponent = __decorate([
            core.Component({
                selector: 'simple-tree',
                template: "<div *ngIf=\"tree&&tree.visible\" class=\"simple-tree\">\n\n  <div *ngIf=\"inner\">\n    <li ><simple-tree-node [tree]=\"tree\"\n                           [options]=\"options\"\n                           (nodeSelected)=\"childSelected($event)\"></simple-tree-node>\n      <ul *ngIf=\"tree.children&&tree.expanded\" class=\"inner-list\">\n        <simple-tree *ngFor=\"let t of tree.children\" [tree]=\"t\" [inner]=\"true\"\n                    (nodeSelected)=\"childSelected($event)\"\n                    [options]=\"options\"></simple-tree>\n      </ul>\n    </li>\n  </div>\n\n  <div *ngIf=\"!inner&&showTop\">\n    <ul class=\"outer-list\">\n      <li><simple-tree-node [tree]=\"tree\" [options]=\"options\"\n        (nodeSelected)=\"childSelected($event)\"></simple-tree-node>\n        <ul *ngIf=\"tree.children&&tree.expanded\" class=\"inner-list\">\n            <simple-tree *ngFor=\"let t of tree.children\" [tree]=\"t\" [inner]=\"true\"\n            (nodeSelected)=\"childSelected($event)\"\n            [options]=\"options\"></simple-tree>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div *ngIf=\"!inner&&!showTop\">\n      <ul *ngIf=\"tree.children&&tree.expanded\" class=\"outer-list\">\n          <simple-tree *ngFor=\"let t of tree.children\" [tree]=\"t\" [inner]=\"true\"\n          (nodeSelected)=\"childSelected($event)\"\n          [options]=\"options\"></simple-tree>\n      </ul>\n    </div>\n  \n</div>\n",
                styles: ["\n.simple-tree ul{\n  list-style-type: none\n}\n\nul.outer-list{\n  padding-left:5px;\n}\n\nul.inner-list{\n  padding-left:15px;\n}"]
            }),
            __metadata("design:paramtypes", [])
        ], SimpleTreeComponent);
        return SimpleTreeComponent;
    }());

    var CatalogComponent = /** @class */ (function () {
        function CatalogComponent(filterService, metadata) {
            this.metadata = metadata;
            this.showPlaceholders = true;
            this.defaultAction = 'add';
            this.layerActions = [];
            this.layerSelected = new core.EventEmitter();
            this.collapsedIcon = 'fa fa-caret-right';
            this.expandedIcon = 'fa fa-caret-down';
            this.leafIcon = 'fa fa-minus';
            this.layers = [];
            this.tree = { label: 'no catalog loaded' };
            this.filterText = '';
            this.filterService = filterService;
        }
        CatalogComponent.prototype.ngAfterViewInit = function () {
            if (this.catalog) {
                this.buildTree();
            }
        };
        CatalogComponent.prototype.ngOnChanges = function (changes) {
            if (changes.catalog && this.catalog) {
                this.filterText = '';
                this.buildTree();
                this.highlightLayers([], this.tree);
            }
        };
        CatalogComponent.prototype.buildTree = function () {
            var _this = this;
            var self = this;
            this.layers = [];
            var cat = this.catalog;
            var tree = {
                label: cat.name,
                expanded: true,
                visible: true,
            };
            var deferredLayers = cat.themes.map(function (t) { return t.layers.filter(function (l) { return l.path && !l.skip; }); }).reduce(function (l, r) { return l.concat(r); }, []);
            var deferredThemes = cat.themes.filter(function (t) { return t.path && !t.skip; });
            var treeActions = this.layerActions.map(function (la) {
                return {
                    icon: la.icon,
                    tooltip: la.tooltip,
                    action: function (node) { return _this.layerClick(node.data, la.action); }
                };
            });
            var layerToTree = function (l) {
                var result = {
                    label: l.name,
                    data: l,
                    visible: true,
                    actions: treeActions
                };
                var tmp = new MappedLayer();
                tmp.layer = l;
                tmp.update();
                if (l.description) {
                    result.tooltip = rxjs.of(l.description);
                }
                else {
                    result.tooltip = _this.metadata.getMetadata(tmp).pipe(operators.map(function (meta) { return meta[l.descriptionField || 'long_name']; }));
                }
                return result;
            };
            function themeToTree(t) {
                return {
                    label: t.name,
                    expanded: false,
                    visible: true,
                    children: t.layers.filter(function (l) { return !l.path && !l.skip; })
                        .filter(function (l) { return self.showPlaceholders || !l.placeholder; })
                        .map(layerToTree)
                };
            }
            tree.children = cat.themes.filter(function (t) { return !t.path && !t.skip; }).map(themeToTree);
            function findParent(path) {
                var e_1, _a, e_2, _b;
                var components = path.split('/');
                var parent = tree;
                var index = -1;
                try {
                    for (var components_1 = __values(components), components_1_1 = components_1.next(); !components_1_1.done; components_1_1 = components_1.next()) {
                        var component = components_1_1.value;
                        var split = component.split('@');
                        component = split[0];
                        index = -1;
                        if (split.length > 1) {
                            index = +split[1];
                        }
                        var found = false;
                        try {
                            for (var _c = (e_2 = void 0, __values(parent.children)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var n = _d.value;
                                if (n.label === component) {
                                    parent = n;
                                    found = true;
                                    break;
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        if (!found) {
                            var newNode = {
                                label: component,
                                expanded: false,
                                visible: true,
                                children: []
                            };
                            addChild(parent, newNode, index);
                            parent = newNode;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (components_1_1 && !components_1_1.done && (_a = components_1.return)) _a.call(components_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return [parent, index];
            }
            function addChild(parent, child, i) {
                if (i < 0) {
                    parent.children.push(child);
                }
                else {
                    parent.children.splice(i, 0, child);
                }
            }
            deferredThemes.forEach(function (t) {
                var _a = __read(findParent(t.path), 2), parent = _a[0], index = _a[1];
                addChild(parent, themeToTree(t), index);
            });
            deferredLayers.forEach(function (l) {
                var _a = __read(findParent(l.path), 2), parent = _a[0], index = _a[1];
                addChild(parent, layerToTree(l), index);
            });
            this.tree = tree;
        };
        CatalogComponent.prototype.layerClick = function (l, action) {
            var selection = {
                layer: l,
                action: action
            };
            this.layerSelected.emit(selection);
        };
        CatalogComponent.prototype.nodeSelected = function (e) {
            if (!e.data) {
                return;
            }
            var layer = e.data;
            this.layerClick(layer, this.defaultAction);
        };
        CatalogComponent.prototype.activeLayers = function (layers) {
            this.highlightLayers(layers, this.tree);
        };
        CatalogComponent.prototype.highlightLayers = function (layers, tree) {
            tree.klass = null;
            if (tree.data && (layers.indexOf(tree.data) >= 0)) {
                tree.klass = 'active-layer';
                return true;
            }
            if (tree.children) {
                var activeChild = false;
                for (var i = 0; i < tree.children.length; i++) {
                    activeChild = this.highlightLayers(layers, tree.children[i]) || activeChild;
                }
                if (activeChild) {
                    tree.klass = 'active-child';
                }
                tree.klass = (tree.klass || '') + ' theme';
                return activeChild;
            }
            return false;
        };
        CatalogComponent.ctorParameters = function () { return [
            { type: TreeFilterService },
            { type: MetadataService }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Catalog)
        ], CatalogComponent.prototype, "catalog", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CatalogComponent.prototype, "showPlaceholders", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CatalogComponent.prototype, "defaultAction", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], CatalogComponent.prototype, "layerActions", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], CatalogComponent.prototype, "layerSelected", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CatalogComponent.prototype, "collapsedIcon", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CatalogComponent.prototype, "expandedIcon", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CatalogComponent.prototype, "leafIcon", void 0);
        CatalogComponent = __decorate([
            core.Component({
                selector: 'catalog',
                template: "<div class=\"input-group\">\n  <span class=\"input-group-btn\">\n            <button class=\"btn\" type=\"button\" [disabled]=\"!filterText\"\n              (click)=\"filterText = ''\">\n            <i *ngIf=\"filterText\"class=\"fa fa-times\" aria-hidden=\"true\"></i>\n            <i *ngIf=\"!filterText\"class=\"fa fa-search\" aria-hidden=\"true\"></i>\n            </button>\n  </span>\n  <input #filterInput type=\"text\" class=\"form-control\" placeholder=\"Catalog search...\"\n  [(ngModel)]=\"filterText\"/>\n</div>\n\n<simple-tree \n  [tree]=\"this.filterService.filterTree(tree, filterText)\"\n  [showTop]=\"false\"\n  [leafIcon]=\"leafIcon\"\n  [collapsedIcon]=\"collapsedIcon\"\n  [expandedIcon]=\"expandedIcon\"\n  (nodeSelected)=\"nodeSelected($event)\">\n</simple-tree>\n",
                styles: ["\n.node-name{\n  font-size:1em;\n}\n"]
            }),
            __metadata("design:paramtypes", [TreeFilterService, MetadataService])
        ], CatalogComponent);
        return CatalogComponent;
    }());

    var MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
    var DateSelectionComponent = /** @class */ (function () {
        function DateSelectionComponent(timeUtils) {
            this.timeUtils = timeUtils;
            this.dateChange = new core.EventEmitter();
            this.style = 'arrows';
            this.stepDays = 1;
            this.referenceDate = null;
            this.need = {
                day: true,
                month: true,
                year: true
            };
            this.atMax = false;
            this.atMin = false;
        }
        DateSelectionComponent.prototype.ngAfterViewInit = function () {
        };
        DateSelectionComponent.prototype.ngOnChanges = function (changes) {
            if (changes.minDate) {
                this.minDateStruct = this.timeUtils.convertDate(this.minDate);
            }
            if (changes.maxDate) {
                this.maxDateStruct = this.timeUtils.convertDate(this.maxDate);
            }
            if (changes.date) {
                this.dateStruct = this.timeUtils.convertDate(this.date);
            }
            if (changes.timestep) {
                this.assessDateComponents();
            }
            this.checkLimits();
        };
        DateSelectionComponent.prototype.dateStructChanged = function () {
            this.date = new Date(Date.UTC(this.dateStruct.year, this.dateStruct.month - 1, this.dateStruct.day));
            // this.date.setUTCFullYear(this.dateStruct.year)
            // this.date.setUTCMonth(this.dateStruct.month-1)
            // this.date.setUTCDate(this.dateStruct.day);
            this.checkReference();
            this.dateChange.emit(this.date);
        };
        DateSelectionComponent.prototype.assessDateComponents = function () {
            this.need.day = this.need.month = this.need.year = true;
            if (this.timestep === 'daily') {
                return;
            }
            this.need.day = false;
            if (this.timestep === 'annual') {
                this.need.month = false;
            }
        };
        DateSelectionComponent.prototype.move = function (n) {
            this.date = new Date(this.date && this.date.getTime());
            this.date.setDate(this.date.getDate() + n);
            this.onDateChanged();
            this.dateChange.emit(this.date);
        };
        DateSelectionComponent.prototype.onDateChanged = function () {
            this.checkLimits();
        };
        DateSelectionComponent.prototype.checkLimits = function () {
            this.atMax = this.timeUtils.datesEqual(this.dateStruct, this.maxDateStruct);
            this.atMin = this.timeUtils.datesEqual(this.dateStruct, this.minDateStruct);
        };
        // TODO not enforcing limits etc...
        DateSelectionComponent.prototype.checkReference = function () {
            if (!this.referenceDate) {
                return;
            }
            var refComponents = InterpolationService.interpolate(this.referenceDate, {
                year: this.date.getFullYear(),
                month: this.date.getMonth() + 1,
                date: this.date.getDate()
            }).split('-').map(function (s) { return +s; });
            var currentRef = new Date(Date.UTC(refComponents[0], refComponents[1] - 1, refComponents[2]));
            console.log('currentRef', currentRef);
            console.log('currentDate', this.date);
            var timeSpan = MILLISECONDS_PER_DAY * this.stepDays;
            var days = (this.date.getTime() - currentRef.getTime()) / timeSpan;
            this.date = new Date(currentRef.getTime() + Math.round(days) * timeSpan);
            this.dateStruct = this.timeUtils.convertDate(this.date);
        };
        DateSelectionComponent.ctorParameters = function () { return [
            { type: TimeUtilsService }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Date)
        ], DateSelectionComponent.prototype, "date", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], DateSelectionComponent.prototype, "dateChange", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], DateSelectionComponent.prototype, "timestep", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], DateSelectionComponent.prototype, "minDate", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], DateSelectionComponent.prototype, "maxDate", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], DateSelectionComponent.prototype, "style", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], DateSelectionComponent.prototype, "stepDays", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], DateSelectionComponent.prototype, "referenceDate", void 0);
        DateSelectionComponent = __decorate([
            core.Component({
                selector: 'date-selection',
                template: "<div class=\"date-control container-fluid\">\n  <div *ngIf=\"style!=='arrows'\" class=\"row no-gutters\">\n    <div class=\"col-8 form-group-inline\">\n        <div class=\"input-group input-group-sm\">\n          <input class=\"form-control form-control-sm\" placeholder=\"yyyy-mm-dd\"\n                 name=\"dp\" [(ngModel)]=\"dateStruct\" (ngModelChange)=\"dateStructChanged()\"\n                 ngbDatepicker #d=\"ngbDatepicker\"\n                 [maxDate]=\"maxDateStruct\" [minDate]=\"minDateStruct\">\n          <div class=\"input-group-addon\" (click)=\"d.toggle()\" >\n            <i class=\"fa fa-calendar\"></i>\n          </div>\n        </div>\n      </div>\n\n    <!--\n      <div class=\"col-2\" >\n        <button class=\"btn btn-secondary btn-sm\" [disabled]=\"atMax\"\n                (click)=\"move(1)\"><i class=\"fa fa-chevron-right\"></i></button>\n      </div>\n    -->\n  </div>\n\n  <div *ngIf=\"style==='arrows'\">\n    <date-element *ngIf=\"need.day\"   [src]=\"dateStruct\" [property]=\"'day'\" [label]=\"'Day'\"\n                  [step]=\"stepDays\"\n                  (changed)=\"dateStructChanged()\"></date-element>\n    <date-element *ngIf=\"need.month\" [src]=\"dateStruct\" [property]=\"'month'\" [label]=\"'Month'\"\n                  (changed)=\"dateStructChanged()\"></date-element>\n    <date-element *ngIf=\"need.year\"  [src]=\"dateStruct\" [property]=\"'year'\" [label]=\"'Year'\"\n                  (changed)=\"dateStructChanged()\"></date-element>\n  </div>\n</div>\n"
            }),
            __metadata("design:paramtypes", [TimeUtilsService])
        ], DateSelectionComponent);
        return DateSelectionComponent;
    }());

    var LayerPropertiesComponent = /** @class */ (function () {
        function LayerPropertiesComponent(pointSelectionService) {
            this.pointSelectionService = pointSelectionService;
            this.getKeys = Object.keys;
            this.propertyChanged = new core.EventEmitter();
            this.tooltipPlacement = 'right';
            this.availableTags = null;
            this.tags = {};
            this.pointVariables = [];
        }
        Object.defineProperty(LayerPropertiesComponent.prototype, "publication", {
            get: function () {
                if (!this.layer || !this.layer.layer || !this.layer.layer.publications) {
                    return null;
                }
                return this.layer.layer.publications[this.layer.options.publication || 0];
            },
            enumerable: true,
            configurable: true
        });
        LayerPropertiesComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            // if(this.layer){
            //   this.publication=this.layer.layer.publications[this.layer.options.publication||0];
            // }
            // if (this.layer &&
            //   this.layer.layer.options.smallExtent &&
            //   !this.layer.spatialExtent) {
            //   this.loadExtent();
            // }
            if (this.map) {
                this.selectedFeatureSubscription =
                    this.map.featureSelected.subscribe(function (evt) { return _this.featureSelected(evt); });
            }
            if (this.layer) {
                setTimeout(function () {
                    _this.findTags();
                });
            }
        };
        LayerPropertiesComponent.prototype.ngOnDestroy = function () {
            if (this.selectedFeatureSubscription) {
                this.selectedFeatureSubscription.unsubscribe();
            }
        };
        LayerPropertiesComponent.prototype.featureSelected = function (evt) {
            if (!this.publication || !this.publication.pointdata) {
                return;
            }
            this.selectedFeature = evt.feature;
            // No guarantee that this is from the same layer!!!!
            this.queryPointData();
        };
        LayerPropertiesComponent.prototype.publicationSelected = function (idx) {
            this.layer.options.publication = idx;
            // this.publication=this.layer.layer.publications[idx];
            if (this.publication.pointdata) {
                this.pointSelectionChanged();
                this.updateVariables();
            }
            this.update(idx);
        };
        LayerPropertiesComponent.prototype.updateLayer = function () {
            this.layer.options.tags = this.tags;
            this.layer.update();
            this.propertyChanged.emit(this.layer);
        };
        LayerPropertiesComponent.prototype.update = function (event) {
            var _this = this;
            this.updateLayer();
            setTimeout(function () {
                _this.findTags();
            });
        };
        LayerPropertiesComponent.prototype.processTags = function (tags) {
            if (!tags) {
                return null;
            }
            var result = {};
            Object.keys(tags).forEach(function (k) {
                var values = tags[k];
                result[k] = values.map(function (v) {
                    var vAsTag = v;
                    if (vAsTag.value && vAsTag.label) {
                        return vAsTag;
                    }
                    var vAsString = v;
                    return {
                        value: vAsString,
                        label: vAsString
                    };
                });
            });
            return result;
        };
        LayerPropertiesComponent.prototype.findTags = function () {
            if (this.publication.pointdata) {
                this.availableTags = this.processTags(this.publication.pointdata.tags);
            }
            else {
                this.availableTags = this.processTags(this.layer.flattenedSettings.options.tags);
            }
            this.setDefaultTags();
        };
        LayerPropertiesComponent.prototype.tagChanged = function (t) {
            this.queryPointData();
            this.update(null);
        };
        LayerPropertiesComponent.prototype.setDefaultTags = function () {
            var _this = this;
            if (!this.availableTags) {
                return;
            }
            Object.keys(this.availableTags).forEach(function (tag) {
                if (_this.tags[tag] === undefined) {
                    _this.tags[tag] = _this.availableTags[tag][0].value;
                }
            });
            this.updateLayer();
        };
        LayerPropertiesComponent.prototype.zoomToExtent = function () {
            if (!this.map) {
                console.log('NO MAP!');
                return;
            }
            this.map.lat = this.layer.layer.lat;
            this.map.lng = this.layer.layer.lon;
            this.map.zoom = this.layer.layer.zoom || 13;
        };
        LayerPropertiesComponent.prototype.pointSelection = function () {
            return {
                catalog: this.publication.pointdata,
                variable: this.selectedVariable,
                feature: this.selectedFeature,
                tags: this.tags
            };
        };
        LayerPropertiesComponent.prototype.queryPointData = function () {
            var pointdata = this.publication && this.publication.pointdata;
            if (!this.publication || !this.publication.pointdata) {
                return;
            }
            this.pointSelectionChanged();
            this.updateVariables();
        };
        LayerPropertiesComponent.prototype.updateVariables = function () {
            var _this = this;
            var sel = this.pointSelection();
            this.pointSelectionService.timeseriesVariables(sel).subscribe(function (variables) {
                _this.pointVariables = variables.slice();
                if (_this.publication.pointdata.exclude) {
                    _this.pointVariables = _this.pointVariables.filter(function (v) {
                        return !_this.publication.pointdata.exclude.some(function (pattern) {
                            return !!v.value.match(pattern);
                        });
                    });
                }
                if (!_this.pointVariables.length) {
                    _this.selectedVariable = null;
                }
                else if (_this.pointVariables.findIndex(function (t) { return t.value === _this.selectedVariable; }) < 0) {
                    if (_this.pointVariables.findIndex(function (t) { return t.value === _this.publication.pointdata.defaultVariable; }) >= 0) {
                        _this.selectedVariable = _this.publication.pointdata.defaultVariable;
                    }
                    else {
                        _this.selectedVariable = _this.pointVariables[0].value;
                    }
                }
                _this.pointSelectionChanged();
            });
        };
        LayerPropertiesComponent.prototype.pointSelectionChanged = function () {
            this.pointSelectionService.pointSelection(this.pointSelection());
        };
        LayerPropertiesComponent.ctorParameters = function () { return [
            { type: PointSelectionService }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", MappedLayer)
        ], LayerPropertiesComponent.prototype, "layer", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", LayeredMapComponent)
        ], LayerPropertiesComponent.prototype, "map", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], LayerPropertiesComponent.prototype, "propertyChanged", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], LayerPropertiesComponent.prototype, "tooltipPlacement", void 0);
        LayerPropertiesComponent = __decorate([
            core.Component({
                selector: 'layer-properties',
                template: "<div class=\"container-fluid\">\n  <p><strong>{{layer?.title}}</strong>\n    <span *ngIf=\"layer.description()\" \n    [ngbTooltip]=\"layer.description()\"\n    [placement]=\"tooltipPlacement\"\n    class=\"layer-info-target\"\n    container=\"body\">\n  &nbsp;<i class=\"fa fa-info-circle\"></i>\n  </span>\n  &nbsp;<span *ngIf=\"layer.interpolatedDownloadURL\">\n    <small><a target=\"_blank\" \n              [href]=\"layer.interpolatedDownloadURL\"\n              [ngbTooltip]=\"'Download data'\"\n              container=\"body\">\n      <i class=\"fa fa-download\"></i>\n    </a></small>\n  </span>\n  </p>\n\n  <div *ngIf=\"layer?.layer.publications.length>1\">\n    <span *ngIf=\"layer.layer.publications[0].timestep\">Timestep </span>\n    <span *ngIf=\"!layer.layer.publications[0].timestep\">{{ layer.layer.options.publicationLabel || 'Variable' }} </span>\n    <select [(ngModel)]=\"layer.options.publication\" (ngModelChange)=\"publicationSelected($event)\">\n      <option *ngFor=\"let p of layer.layer.publications; let i=index\" [ngValue]=\"i\">{{p.label || p.timestep}}</option>\n    </select>\n  </div>\n  <div *ngIf=\"layer?.layer.publications.length===1\">\n    {{publication?.label}}\n  </div>\n\n  <div *ngIf=\"publication&&publication.timestep\">\n    <hr/>\n    <date-selection [(date)]=\"layer.options.date\"\n      (dateChange)=\"update($event)\"\n      [timestep]=\"publication.timestep\"\n      [stepDays]=\"publication.timestepMultiplier||1\"\n      [referenceDate]=\"publication.timestepReference\"\n      [minDate]=\"publication.options.start\"\n      [maxDate]=\"publication.options.end\"></date-selection>\n  </div>\n\n  <div *ngIf=\"layer.layer.options.smallExtent\">\n    <hr/>\n    <button class=\"btn btn-sm btn-primary\" (click)=\"zoomToExtent()\">Zoom to Extent</button>\n  </div>\n\n<!--\n  <div *ngIf=\"layer.layer.options.vectors\">\n    <p>Lets filter those {{layer.layer.options.vectors}}s, eh?</p>\n  </div>\n-->\n\n  <div *ngIf=\"availableTags\">\n    <div *ngFor=\"let tag of getKeys(availableTags)\">\n      {{tag}}\n      <select [(ngModel)]=\"tags[tag]\" (ngModelChange)=\"tagChanged(tag)\">\n        <option *ngFor=\"let val of availableTags[tag]\" [ngValue]=\"val.value\">{{val.label}}</option>\n      </select> \n    </div>\n  </div>\n\n  <div *ngIf=\"publication?.pointdata\">\n    Variable:\n    <select [(ngModel)]=\"selectedVariable\" (ngModelChange)=\"queryPointData()\">\n      <option *ngFor=\"let v of pointVariables\" [ngValue]=\"v.value\">{{v.label}}</option>\n    </select>\n  </div>\n  <!--\n  <div *ngIf=\"publication\">\n    <p>Start: {{publication.options.start}}</p>\n    <p>End: {{publication.options.end}}</p>\n    <p>{{publication|json}}</p>\n  </div>\n  <button (click)=\"update()\">Force update...</button>\n  -->\n</div>"
            }),
            __metadata("design:paramtypes", [PointSelectionService])
        ], LayerPropertiesComponent);
        return LayerPropertiesComponent;
    }());

    var LayerControlComponent = /** @class */ (function () {
        function LayerControlComponent(metadata) {
            this.metadata = metadata;
            this.allowRemove = true;
            this.showLegends = true;
            this.allowReorder = true;
            this.layersChange = new core.EventEmitter();
            this.foo = 'bar';
        }
        LayerControlComponent.prototype.ngAfterViewInit = function () {
        };
        LayerControlComponent.prototype.ngOnChanges = function (changes) {
            if (!changes.layers || !this.layers) {
                return;
            }
            this.applyViewMode();
            this.fetchMetadata();
        };
        LayerControlComponent.prototype.applyViewMode = function () {
            var _this = this;
            if (this.uniformViewMode === undefined) {
                return;
            }
            this.layers.forEach(function (l) { return l.options.legend = _this.uniformViewMode; });
        };
        LayerControlComponent.prototype.allLegends = function (showLegend) {
            this.uniformViewMode = showLegend;
            this.layers.forEach(function (l) { return l.options.legend = showLegend; });
        };
        LayerControlComponent.prototype.layerLegend = function (layer, showLegend) {
            this.uniformViewMode = undefined;
            layer.options.legend = showLegend;
        };
        LayerControlComponent.prototype.moveToTop = function (idx) {
            this.layers = [this.layers[idx]].concat(this.layers.slice(0, idx)).concat(this.layers.slice(idx + 1));
            this._changed();
        };
        LayerControlComponent.prototype.moveUp = function (idx) {
            if (idx === 0) {
                return;
            }
            var layers = this.layers;
            this.layers = layers.slice(0, idx - 1).concat([layers[idx], layers[idx - 1]]).concat(layers.slice(idx + 1));
            this._changed();
        };
        LayerControlComponent.prototype.moveDown = function (idx) {
            if (idx === (this.layers.length - 1)) {
                return;
            }
            var layers = this.layers;
            this.layers = layers.slice(0, idx).concat([layers[idx + 1], layers[idx]]).concat(layers.slice(idx + 2));
            this._changed();
        };
        LayerControlComponent.prototype.moveToBottom = function (idx) {
            this.layers = this.layers.slice(0, idx).concat(this.layers.slice(idx + 1)).concat([this.layers[idx]]);
            this._changed();
        };
        LayerControlComponent.prototype.removeLayer = function (idx) {
            var layers = this.layers.slice();
            layers.splice(idx, 1);
            this.layers = layers;
            this._changed();
        };
        LayerControlComponent.prototype.layerPropertyChanged = function (l) {
            this.layers = this.layers.slice();
            this._changed();
        };
        LayerControlComponent.prototype._changed = function () {
            this.fetchMetadata();
            this.layersChange.emit(this.layers);
        };
        LayerControlComponent.prototype.fetchMetadata = function () {
            var _this = this;
            this.layers.forEach(function (ml) {
                _this.metadata.populateMetadata(ml);
            });
        };
        LayerControlComponent.ctorParameters = function () { return [
            { type: MetadataService }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], LayerControlComponent.prototype, "layers", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", LayeredMapComponent)
        ], LayerControlComponent.prototype, "map", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LayerControlComponent.prototype, "allowRemove", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LayerControlComponent.prototype, "showLegends", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LayerControlComponent.prototype, "allowReorder", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], LayerControlComponent.prototype, "layersChange", void 0);
        LayerControlComponent = __decorate([
            core.Component({
                selector: 'layer-control',
                template: "<div class=\"layers-control\">\n  <div *ngIf=\"showLegends\" class=\"layers-control-header\"> <!-- header -->\n    <div class=\"float-right\">\n      <!-- TODO Attach handlers and tooltips to each icon -->\n      <i class=\"fa fa-lg fa-cog discrete-icon\" (click)=\"allLegends(false)\"></i>\n      <i class=\"fa fa-lg fa-th-list discrete-icon\" (click)=\"allLegends(true)\"></i>\n    </div>\n    <br/>\n  </div>\n\n  <div *ngIf=\"layers\">\n    <div *ngFor=\"let l of layers; let i = index\"\n         class=\"layer-control d-flex justify-content-between\">\n      <div class=\"p-2\" style=\"width:100%\">\n        <div *ngIf=\"showLegends&&l.options.legend\">\n          <div *ngIf=\"l.flattenedSettings?.palette || l.legendURL\">\n            <map-legend [title]=\"l.title\"\n              [imageURL]=\"l.legendURL\"\n              [helpText]=\"l.description()\"\n              [mapUnits]=\"l.flattenedSettings?.units\"\n              [cbPalette]=\"l.flattenedSettings?.palette?.name||l.flattenedSettings?.palette\"\n              [cbCount]=\"l.flattenedSettings?.numcolorbands||l.flattenedSettings?.palette?.count\"\n              [cbReverse]=\"l.flattenedSettings?.palette?.reverse\"\n              [cbRange]=\"l.flattenedSettings?.colorscalerange\">\n            </map-legend>\n          </div>\n        </div>\n\n        <div *ngIf=\"!showLegends||!l.options.legend\">\n          <layer-properties [layer]=\"l\"\n                            [map]=\"map\"\n                            (propertyChanged)=\"layerPropertyChanged($event)\">\n          </layer-properties>\n        </div>\n      </div>\n      <div class=\"p-2\">\n          <div>\n            <!-- TODO Attach handlers and tooltips to each icon -->\n            <i *ngIf=\"allowReorder\" class=\"fa fa-bars discrete-icon\"></i><br *ngIf=\"allowReorder\"/>\n            <i *ngIf=\"showLegends\" class=\"fa fa-cog discrete-icon\"\n               ngbTooltip=\"Show layer controls\" placement=\"right\" data-container=\"body\"\n               (click)=\"layerLegend(l,false)\"></i><br *ngIf=\"showLegends\"/>\n            <i *ngIf=\"showLegends\" class=\"fa fa-th-list discrete-icon\"\n               ngbTooltip=\"Show layer data\" placement=\"right\" data-container=\"body\"\n               (click)=\"layerLegend(l,true)\"></i><br *ngIf=\"showLegends\"/>\n            <i *ngIf=\"allowReorder\" class=\"fa fa-angle-double-up discrete-icon\"\n               ngbTooltip=\"Move to top\" placement=\"right\" data-container=\"body\"\n              (click)=\"moveToTop(i)\"></i><br *ngIf=\"allowReorder\"/>\n            <i *ngIf=\"allowReorder\" class=\"fa fa-angle-up discrete-icon\"\n               ngbTooltip=\"Move up\" placement=\"right\" data-container=\"body\"\n              (click)=\"moveUp(i)\"></i><br *ngIf=\"allowReorder\"/>\n            <i *ngIf=\"allowReorder\" class=\"fa fa-angle-down discrete-icon\"\n               ngbTooltip=\"Move down\" placement=\"right\" data-container=\"body\"\n              (click)=\"moveDown(i)\"></i><br *ngIf=\"allowReorder\"/>\n            <i *ngIf=\"allowReorder\" class=\"fa fa-angle-double-down discrete-icon\"\n               ngbTooltip=\"Move to bottom\" placement=\"right\" data-container=\"body\"\n              (click)=\"moveToBottom(i)\"></i><br *ngIf=\"allowReorder\"/>\n            <i *ngIf=\"allowRemove\" class=\"fa fa-times discrete-icon\"\n               ngbTooltip=\"Remove layer\" placement=\"right\" data-container=\"body\"\n              data-toggle=\"tooltip\" title=\"Remove layer\"\n              (click)=\"removeLayer(i)\"></i>\n          </div>\n        </div>\n      </div>\n  </div>\n</div>\n\n<!-- Should this control be outside the map? eg to the left? -->\n",
                styles: [".layers-control{\n  width:200px;\n}\n\n\n.layers-control-header, .layer-control{\n  border-bottom: 1.5px solid #aaa;\n}"]
            }),
            __metadata("design:paramtypes", [MetadataService])
        ], LayerControlComponent);
        return LayerControlComponent;
    }());

    var ThemeNavbarComponent = /** @class */ (function () {
        function ThemeNavbarComponent() {
            this.layerSelected = new core.EventEmitter();
        }
        ThemeNavbarComponent.prototype.ngAfterViewInit = function () {
        };
        ThemeNavbarComponent.prototype.layerClick = function (event, layer, action) {
            this.stop(event);
            var selection = {
                layer: layer,
                action: action
            };
            this.layerSelected.emit(selection);
        };
        ThemeNavbarComponent.prototype.stop = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Catalog)
        ], ThemeNavbarComponent.prototype, "catalog", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], ThemeNavbarComponent.prototype, "includeSearch", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], ThemeNavbarComponent.prototype, "layerSelected", void 0);
        ThemeNavbarComponent = __decorate([
            core.Component({
                selector: 'theme-navbar',
                template: "<ul class=\"navbar-nav\">\n  <li class=\"nav-item\" ngbDropdown *ngFor=\"let theme of catalog?.themes\">\n    <a class=\"nav-link\" ngbDropdownToggle href=\"#\"><i class=\"fa\" [ngClass]=\"theme.icon\"></i></a>\n    <div ngbDropdownMenu class=\"dropdown-menu\">\n      <a class=\"dropdown-item\" href=\"#\" (click)=\"layerClick($event,layer,'replace')\" *ngFor=\"let layer of theme.layers\">\n        <div>\n          <span>{{layer.name}}</span>\n          <span class=\"float-right layer-select-icons\">\n            <i class=\"fa fa-map layer-select-icon discrete-icon\"\n               (click)=\"layerClick($event,layer,'replace')\"\n               placement=\"right\"\n               ngbTooltip=\"Map this layer. (Replace any existing layers)\"></i>\n            <br/>\n            <i class=\"fa fa-plus layer-select-icon discrete-icon\"\n               (click)=\"layerClick($event,layer,'add')\"\n               placement=\"right\"\n               ngbTooltip=\"Add this layer to the map.\"></i>\n          </span>\n        </div>\n      </a>\n    </div>\n  </li>\n</ul>\n\n<!--\n\n[ng-reflect-ngb-tooltip].yellow + .tooltip {\n    background-color: yellow;\n}\n-->",
                styles: ["\n.layer-select-icons{\n  font-size:0.75em;\n  margin-right:-20px;\n}\n\n/* Annoying... using /deep/ to access the child component\n * but /deep/ (and synonyms) are deprecated. Not clear what\n * we should be doing\n */\n/deep/ .tooltip-inner {\n  width: 400px;\n}\n\n.dropdown-item{\n  border-bottom: 1px solid #aaa;\n  height: 40px;\n}\n"]
            }),
            __metadata("design:paramtypes", [])
        ], ThemeNavbarComponent);
        return ThemeNavbarComponent;
    }());

    var components = [
        //$componentList
        DateShifterComponent,
        OneTimeSplashComponent,
        DateElementComponent,
        ShareViewComponent,
        LocationSearchComponent,
        ZoomLayerComponent,
        ZoomFullComponent,
        ZoomOutComponent,
        ZoomInComponent,
        CycleBaseMapComponent,
        CycleOpacityComponent,
        ButtonBarComponent,
        TimeseriesChartComponent,
        FeatureTableComponent,
        CollapsibleMapControlComponent,
        BaseMapSelectionComponent,
        SimpleTreeNodeComponent,
        SimpleTreeComponent,
        CatalogComponent,
        DateSelectionComponent,
        LayerPropertiesComponent,
        LayerControlComponent,
        LayeredMapComponent,
        ThemeNavbarComponent,
        WMSLayerComponent,
        MapLegendComponent,
        MapControlComponent
    ];
    var MapWaldBootstrapModule = /** @class */ (function () {
        function MapWaldBootstrapModule() {
        }
        MapWaldBootstrapModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
                    core$1.AgmCoreModule,
                    http.HttpClientModule,
                    ngxPipes.NgPipesModule,
                    ngBootstrap.NgbModule,
                    MapWaldCoreModule
                ],
                declarations: components,
                exports: components,
                providers: []
            })
        ], MapWaldBootstrapModule);
        return MapWaldBootstrapModule;
    }());

    function parseCSV(txt) {
        var lines = txt.split('\n');
        var header = lines[0];
        lines = lines.slice(1);
        var columns = header.split(',');
        return lines.filter(function (ln) { return ln.length; }).map(function (ln) {
            var data = ln.split(',');
            var result = {};
            data.forEach(function (val, i) {
                result[columns[i]] = parseVal(val);
            });
            return result;
        });
    }
    function parseVal(val) {
        // Try date...
        var components = val.split('-');
        if (components.length === 3) {
            var dateComponents = components.map(function (c) { return +c; });
            if (!dateComponents.some(isNaN)) {
                return new Date(Date.UTC(dateComponents[0], dateComponents[1] - 1, dateComponents[2]));
            }
        }
        if (val === '') {
            return val;
        }
        // Try numeric
        var numeric = +val;
        if (!isNaN(numeric)) {
            return numeric;
        }
        return val;
    }

    var MapWaldModule = /** @class */ (function () {
        function MapWaldModule() {
        }
        MapWaldModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
                    core$1.AgmCoreModule,
                    http.HttpClientModule,
                    ngxPipes.NgPipesModule,
                    ngBootstrap.NgbModule,
                    MapWaldBootstrapModule,
                    MapWaldCoreModule
                ],
                declarations: [],
                exports: [],
                providers: []
            })
        ], MapWaldModule);
        return MapWaldModule;
    }());

    exports.AvailableDatesService = AvailableDatesService;
    exports.BaseMapSelectionComponent = BaseMapSelectionComponent;
    exports.ButtonBarComponent = ButtonBarComponent;
    exports.Catalog = Catalog;
    exports.CatalogComponent = CatalogComponent;
    exports.CatalogOptions = CatalogOptions;
    exports.CatalogService = CatalogService;
    exports.CollapsibleMapControlComponent = CollapsibleMapControlComponent;
    exports.CycleBaseMapComponent = CycleBaseMapComponent;
    exports.CycleOpacityComponent = CycleOpacityComponent;
    exports.DateElementComponent = DateElementComponent;
    exports.DateSelectionComponent = DateSelectionComponent;
    exports.DateShifterComponent = DateShifterComponent;
    exports.FeatureTableComponent = FeatureTableComponent;
    exports.GeocodingService = GeocodingService;
    exports.INTERPOLATED_PARAMETERS = INTERPOLATED_PARAMETERS;
    exports.InterpolationService = InterpolationService;
    exports.LAT_NAMES = LAT_NAMES;
    exports.LNG_NAMES = LNG_NAMES;
    exports.Layer = Layer;
    exports.LayerControlComponent = LayerControlComponent;
    exports.LayerPropertiesComponent = LayerPropertiesComponent;
    exports.LayeredMapComponent = LayeredMapComponent;
    exports.LocationSearchComponent = LocationSearchComponent;
    exports.MapControlComponent = MapControlComponent;
    exports.MapLegendComponent = MapLegendComponent;
    exports.MapViewParameterService = MapViewParameterService;
    exports.MapWaldBootstrapModule = MapWaldBootstrapModule;
    exports.MapWaldCoreModule = MapWaldCoreModule;
    exports.MapWaldModule = MapWaldModule;
    exports.MappedLayer = MappedLayer;
    exports.MetadataService = MetadataService;
    exports.OneTimeSplashComponent = OneTimeSplashComponent;
    exports.OpendapService = OpendapService;
    exports.PaletteService = PaletteService;
    exports.PointSelectionService = PointSelectionService;
    exports.ProjectionService = ProjectionService;
    exports.Publication = Publication;
    exports.ShareViewComponent = ShareViewComponent;
    exports.SimpleTreeComponent = SimpleTreeComponent;
    exports.SimpleTreeNodeComponent = SimpleTreeNodeComponent;
    exports.StaticDataService = StaticDataService;
    exports.TIME_NAMES = TIME_NAMES;
    exports.Theme = Theme;
    exports.ThemeNavbarComponent = ThemeNavbarComponent;
    exports.TimeUtilsService = TimeUtilsService;
    exports.TimeseriesChartComponent = TimeseriesChartComponent;
    exports.TimeseriesService = TimeseriesService;
    exports.WMSLayerComponent = WMSLayerComponent;
    exports.WMSService = WMSService;
    exports.WMS_PARAMETER_NAMES = WMS_PARAMETER_NAMES;
    exports.WMS_URL_FORMAT = WMS_URL_FORMAT;
    exports.ZoomFullComponent = ZoomFullComponent;
    exports.ZoomInComponent = ZoomInComponent;
    exports.ZoomLayerComponent = ZoomLayerComponent;
    exports.ZoomOutComponent = ZoomOutComponent;
    exports.components = components;
    exports.parseCSV = parseCSV;
    exports.services = services;
    exports.utcDate = utcDate;
    exports.utcDateCopy = utcDateCopy;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;
    exports.ɵa = TreeFilterService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=map-wald.umd.js.map
