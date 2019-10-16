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
var __read = (this && this.__read) || function (o, n) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
function utcDate(y, m, d) {
    return new Date(Date.UTC(y, m, d));
}
exports.utcDate = utcDate;
function utcDateCopy(d) {
    return utcDate(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}
exports.utcDateCopy = utcDateCopy;
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
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], TimeUtilsService);
    return TimeUtilsService;
}());
exports.TimeUtilsService = TimeUtilsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS11dGlscy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJ0aW1lLXV0aWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBYzNDLFNBQWdCLE9BQU8sQ0FBQyxDQUFRLEVBQUMsQ0FBUyxFQUFDLENBQVM7SUFDbEQsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRkQsMEJBRUM7QUFFRCxTQUFnQixXQUFXLENBQUMsQ0FBUztJQUNuQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQ3BFLENBQUM7QUFGRCxrQ0FFQztBQUdEO0lBRUU7UUFJQSxpQkFBWSxHQUFnQztZQUMxQyxTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxDQUFDO1lBQ1gsQ0FBQztTQUNGLENBQUE7SUFSRCxDQUFDO0lBVUQsc0NBQVcsR0FBWCxVQUFZLENBQWtCO1FBQzVCLElBQUcsQ0FBQyxDQUFDLEVBQUM7WUFDSixDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUNoQjtRQUVELElBQUksSUFBWSxDQUFDO1FBQ2pCLElBQUcsT0FBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBQztZQUN4QixJQUFJLFFBQVEsR0FBVSxDQUFDLENBQUM7WUFDeEIsSUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFDO2dCQUM3QixJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNELElBQUEsNkRBQWtELEVBQWpELFlBQUksRUFBQyxhQUFLLEVBQUMsV0FBRyxFQUFDLGFBQWtDLENBQUM7Z0JBQ3ZELElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsQ0FBQzthQUNoQztTQUNGO2FBQU07WUFDTCxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ1Y7UUFFRCxPQUFPO1lBQ0wsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdEIsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDO1lBQzdCLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFO1NBQzVCLENBQUM7SUFDSixDQUFDO0lBRUQscUNBQVUsR0FBVixVQUFXLEdBQWlCLEVBQUMsR0FBaUI7UUFDNUMsSUFBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBQztZQUNkLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3pCLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFL0IsQ0FBQztJQWhEVSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTs7T0FDQSxnQkFBZ0IsQ0FpRDVCO0lBQUQsdUJBQUM7Q0FBQSxBQWpERCxJQWlEQztBQWpEWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ2JEYXRlU3RydWN0IH0gZnJvbSBcIkBuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVVRDRGF0ZSB7XG4gIGdldFRpbWUoKTogbnVtYmVyO1xuICBnZXRVVENGdWxsWWVhcigpOiBudW1iZXI7XG4gIGdldFVUQ01vbnRoKCk6bnVtYmVyO1xuICBnZXRVVENEYXRlKCk6bnVtYmVyO1xuXG4gIHNldFVUQ0Z1bGxZZWFyKG46IG51bWJlcik6dm9pZDtcbiAgc2V0VVRDTW9udGgobjpudW1iZXIpOnZvaWQ7XG4gIHNldFVUQ0RhdGUobjpudW1iZXIpOnZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1dGNEYXRlKHk6bnVtYmVyLG0/Om51bWJlcixkPzpudW1iZXIpOlVUQ0RhdGV7XG4gIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQyh5LG0sZCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXRjRGF0ZUNvcHkoZDpVVENEYXRlKXtcbiAgcmV0dXJuIHV0Y0RhdGUoZC5nZXRVVENGdWxsWWVhcigpLGQuZ2V0VVRDTW9udGgoKSxkLmdldFVUQ0RhdGUoKSk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUaW1lVXRpbHNTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgc3BlY2lhbERhdGVzOiB7W2tleTpzdHJpbmddOigoKSA9PiBEYXRlKX0gPSB7XG4gICAgeWVzdGVyZGF5OiAoKSA9PiB7XG4gICAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gICAgICBkLnNldERhdGUoZC5nZXREYXRlKCkgLSAxKTtcbiAgICAgIHJldHVybiBkO1xuICAgIH1cbiAgfVxuXG4gIGNvbnZlcnREYXRlKGQ6KFVUQ0RhdGV8c3RyaW5nKSk6TmdiRGF0ZVN0cnVjdHtcbiAgICBpZighZCl7XG4gICAgICBkID0gbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICB2YXIgZGF0ZTpVVENEYXRlO1xuICAgIGlmKHR5cGVvZihkKSA9PT0gJ3N0cmluZycpe1xuICAgICAgdmFyIGRhdGVUZXh0OnN0cmluZyA9IGQ7XG4gICAgICBpZih0aGlzLnNwZWNpYWxEYXRlc1tkYXRlVGV4dF0pe1xuICAgICAgICBkYXRlID0gdGhpcy5zcGVjaWFsRGF0ZXNbZGF0ZVRleHRdKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgW3llYXIsbW9udGgsZGF5LG90aGVyXSA9IGQuc3BsaXQoJy0nKS5tYXAoYyA9PiArYyk7XG4gICAgICAgIGRhdGUgPSB1dGNEYXRlKHllYXIsbW9udGgsZGF5KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGF0ZSA9IGQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRheTogZGF0ZS5nZXRVVENEYXRlKCksXG4gICAgICBtb250aDogZGF0ZS5nZXRVVENNb250aCgpICsgMSxcbiAgICAgIHllYXI6IGRhdGUuZ2V0VVRDRnVsbFllYXIoKVxuICAgIH07XG4gIH1cblxuICBkYXRlc0VxdWFsKGxoczpOZ2JEYXRlU3RydWN0LHJoczpOZ2JEYXRlU3RydWN0KTpib29sZWFue1xuICAgIGlmKCFsaHMgfHwgIXJocyl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIChsaHMueWVhciA9PT0gcmhzLnllYXIpICYmXG4gICAgICAgICAgIChsaHMubW9udGggPT09IHJocy5tb250aCkgJiZcbiAgICAgICAgICAgKGxocy5kYXkgPT09IHJocy5kYXkpO1xuXG4gIH1cbn1cbiJdfQ==