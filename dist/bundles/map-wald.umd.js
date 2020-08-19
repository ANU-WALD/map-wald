(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('dap-query-js/dist/dap-query'), require('proj4')) :
    typeof define === 'function' && define.amd ? define('map-wald', ['exports', '@angular/core', '@angular/common', '@angular/forms', '@angular/common/http', 'rxjs', 'rxjs/operators', 'dap-query-js/dist/dap-query', 'proj4'], factory) :
    (global = global || self, factory(global['map-wald'] = {}, global.ng.core, global.ng.common, global.ng.forms, global.ng.common.http, global.rxjs, global.rxjs.operators, global.dapQuery, global.proj4));
}(this, (function (exports, core, common, forms, http, rxjs, operators, dapQuery, proj4) { 'use strict';

    var proj4__default = 'default' in proj4 ? proj4['default'] : proj4;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
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
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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

    var __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    function __exportStar(m, o) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

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

    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
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
        TreeFilterService.decorators = [
            { type: core.Injectable }
        ];
        TreeFilterService.ctorParameters = function () { return []; };
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
            enumerable: false,
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
        PaletteService.decorators = [
            { type: core.Injectable }
        ];
        PaletteService.ctorParameters = function () { return [
            { type: http.HttpClient }
        ]; };
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
        TimeUtilsService.decorators = [
            { type: core.Injectable }
        ];
        TimeUtilsService.ctorParameters = function () { return []; };
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
        StaticDataService.decorators = [
            { type: core.Injectable }
        ];
        StaticDataService.ctorParameters = function () { return [
            { type: http.HttpClient }
        ]; };
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
        OpendapService.decorators = [
            { type: core.Injectable }
        ];
        OpendapService.ctorParameters = function () { return [
            { type: http.HttpClient }
        ]; };
        return OpendapService;
    }());

    var LAT_NAMES = ['latitude', 'lat'];
    var LNG_NAMES = ['longitude', 'lng', 'lon'];
    var TIME_NAMES = ['time', 't', 'Time'];
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
        MetadataService.decorators = [
            { type: core.Injectable }
        ];
        MetadataService.ctorParameters = function () { return [
            { type: OpendapService }
        ]; };
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
                var dates = (data.time || data.t);
                if (dates && !dates.length) {
                    dates = [data.time || data.t];
                }
                return {
                    dates: dates,
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
        TimeseriesService.decorators = [
            { type: core.Injectable }
        ];
        TimeseriesService.ctorParameters = function () { return [
            { type: MetadataService },
            { type: OpendapService }
        ]; };
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
        PointSelectionService.decorators = [
            { type: core.Injectable }
        ];
        PointSelectionService.ctorParameters = function () { return [
            { type: MetadataService }
        ]; };
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
        AvailableDatesService.decorators = [
            { type: core.Injectable }
        ];
        AvailableDatesService.ctorParameters = function () { return [
            { type: MetadataService }
        ]; };
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
        CatalogService.decorators = [
            { type: core.Injectable }
        ];
        CatalogService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: MetadataService }
        ]; };
        return CatalogService;
    }());

    var MapViewParameterService = /** @class */ (function () {
        function MapViewParameterService(_location) {
            this._location = _location;
        }
        MapViewParameterService.prototype.current = function () {
            if (!this._location) {
                return {};
            }
            var path = this._location.path().split('/');
            if (path.length > MapViewParameterService.parameterNames.length) {
                path.shift();
            }
            var result = {};
            MapViewParameterService.parameterNames.forEach(function (p, i) { return result[p] = path[i] || '_'; });
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
                for (var _b = __values(MapViewParameterService.parameterNames), _c = _b.next(); !_c.done; _c = _b.next()) {
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
            return MapViewParameterService.parameterNames.map(function (n) { return parameters[n] || '_'; }).join('/');
        };
        MapViewParameterService.prototype.routerPaths = function ( /*component:any*/) {
            var e_2, _a;
            var result = [];
            var path = '';
            result.push(path);
            try {
                //    result.push({path:path,component:component});
                for (var _b = __values(MapViewParameterService.parameterNames), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        MapViewParameterService.ctorParameters = function () { return [
            { type: common.Location }
        ]; };
        MapViewParameterService.parameterNames = [];
        MapViewParameterService.decorators = [
            { type: core.Injectable }
        ];
        MapViewParameterService.ctorParameters = function () { return [
            { type: common.Location }
        ]; };
        return MapViewParameterService;
    }());

    var D2R = Math.PI / 180;
    var WMSService = /** @class */ (function () {
        function WMSService() {
            this.webMercator = (proj4__default || proj4).Proj('EPSG:3857');
            //this.webMercator = proj4.Proj(proj4.defs('EPSG:3857'));
        }
        WMSService.prototype.pointToWebMercator = function (pt) {
            var ptRadians = { x: pt.lng() * D2R, y: pt.lat() * D2R };
            var ptWM = this.webMercator.forward({ x: ptRadians.x, y: ptRadians.y });
            return ptWM;
        };
        ;
        WMSService.prototype.computeTileBounds = function (map, coord, zoom) {
            var proj = map.getProjection();
            var zfactor = Math.pow(2, zoom);
            var xScale = WMSService.TILE_WIDTH / zfactor;
            var yScale = WMSService.TILE_HEIGHT / zfactor;
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
                    layerParams.width = WMSService.TILE_WIDTH;
                    layerParams.height = WMSService.TILE_HEIGHT;
                    for (var key in layerParams) {
                        url += '&' + key + '=' + layerParams[key];
                    }
                    url += "&SRS=EPSG:3857"; //set Web Mercator
                    return url;
                },
                tileSize: new window.google.maps.Size(WMSService.TILE_SIZE, WMSService.TILE_SIZE),
                isPng: true,
                opacity: getOpacity ? getOpacity() : 1.0
            });
        };
        ;
        WMSService.TILE_SIZE = 256;
        WMSService.TILE_WIDTH = WMSService.TILE_SIZE;
        WMSService.TILE_HEIGHT = WMSService.TILE_SIZE;
        WMSService.decorators = [
            { type: core.Injectable }
        ];
        WMSService.ctorParameters = function () { return []; };
        return WMSService;
    }());

    //const proj4 = require('proj4').default;
    var ProjectionService = /** @class */ (function () {
        function ProjectionService() {
        }
        ProjectionService.prototype.proj4 = function () {
            return proj4;
        };
        ProjectionService.decorators = [
            { type: core.Injectable }
        ];
        ProjectionService.ctorParameters = function () { return []; };
        return ProjectionService;
    }());

    ;

    function parseCSV(txt, options) {
        var columns = options && options.columns;
        var lines = txt.split('\n');
        if (!columns) {
            var header = lines[0];
            lines = lines.slice(1);
            columns = header.split(',');
        }
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
        CatalogService,
        TreeFilterService
    ];
    //import { CSVService } from './src/csv.service';
    //$importList
    //$exportList
    var MapWaldCoreModule = /** @class */ (function () {
        function MapWaldCoreModule() {
        }
        MapWaldCoreModule.forRoot = function (moduleInitialisation) {
            return {
                ngModule: MapWaldCoreModule,
                providers: services
            };
        };
        MapWaldCoreModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            http.HttpClientModule
                        ],
                        declarations: [],
                        exports: [],
                        providers: services
                    },] }
        ];
        return MapWaldCoreModule;
    }());

    exports.AvailableDatesService = AvailableDatesService;
    exports.Catalog = Catalog;
    exports.CatalogOptions = CatalogOptions;
    exports.CatalogService = CatalogService;
    exports.INTERPOLATED_PARAMETERS = INTERPOLATED_PARAMETERS;
    exports.InterpolationService = InterpolationService;
    exports.LAT_NAMES = LAT_NAMES;
    exports.LNG_NAMES = LNG_NAMES;
    exports.Layer = Layer;
    exports.MapViewParameterService = MapViewParameterService;
    exports.MapWaldCoreModule = MapWaldCoreModule;
    exports.MappedLayer = MappedLayer;
    exports.MetadataService = MetadataService;
    exports.OpendapService = OpendapService;
    exports.PaletteService = PaletteService;
    exports.PointSelectionService = PointSelectionService;
    exports.ProjectionService = ProjectionService;
    exports.Publication = Publication;
    exports.StaticDataService = StaticDataService;
    exports.TIME_NAMES = TIME_NAMES;
    exports.Theme = Theme;
    exports.TimeUtilsService = TimeUtilsService;
    exports.TimeseriesService = TimeseriesService;
    exports.TreeFilterService = TreeFilterService;
    exports.WMSService = WMSService;
    exports.WMS_PARAMETER_NAMES = WMS_PARAMETER_NAMES;
    exports.WMS_URL_FORMAT = WMS_URL_FORMAT;
    exports.parseCSV = parseCSV;
    exports.utcDate = utcDate;
    exports.utcDateCopy = utcDateCopy;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=map-wald.umd.js.map
