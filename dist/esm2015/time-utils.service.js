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
function utcDate(y, m, d) {
    return new Date(Date.UTC(y, m, d));
}
exports.utcDate = utcDate;
function utcDateCopy(d) {
    return utcDate(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}
exports.utcDateCopy = utcDateCopy;
let TimeUtilsService = class TimeUtilsService {
    constructor() {
        this.specialDates = {
            yesterday: () => {
                var d = new Date();
                d.setDate(d.getDate() - 1);
                return d;
            }
        };
    }
    convertDate(d) {
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
                var [year, month, day, other] = d.split('-').map(c => +c);
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
    }
    datesEqual(lhs, rhs) {
        if (!lhs || !rhs) {
            return false;
        }
        return (lhs.year === rhs.year) &&
            (lhs.month === rhs.month) &&
            (lhs.day === rhs.day);
    }
};
TimeUtilsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], TimeUtilsService);
exports.TimeUtilsService = TimeUtilsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS11dGlscy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJ0aW1lLXV0aWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFjM0MsU0FBZ0IsT0FBTyxDQUFDLENBQVEsRUFBQyxDQUFTLEVBQUMsQ0FBUztJQUNsRCxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFGRCwwQkFFQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxDQUFTO0lBQ25DLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFDcEUsQ0FBQztBQUZELGtDQUVDO0FBR0QsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFFM0I7UUFJQSxpQkFBWSxHQUFnQztZQUMxQyxTQUFTLEVBQUUsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixPQUFPLENBQUMsQ0FBQztZQUNYLENBQUM7U0FDRixDQUFBO0lBUkQsQ0FBQztJQVVELFdBQVcsQ0FBQyxDQUFrQjtRQUM1QixJQUFHLENBQUMsQ0FBQyxFQUFDO1lBQ0osQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7U0FDaEI7UUFFRCxJQUFJLElBQVksQ0FBQztRQUNqQixJQUFHLE9BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUM7WUFDeEIsSUFBSSxRQUFRLEdBQVUsQ0FBQyxDQUFDO1lBQ3hCLElBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBQztnQkFDN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQzthQUN0QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEM7U0FDRjthQUFNO1lBQ0wsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUNWO1FBRUQsT0FBTztZQUNMLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3RCLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQztZQUM3QixJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRTtTQUM1QixDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFpQixFQUFDLEdBQWlCO1FBQzVDLElBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUM7WUFDZCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQztZQUN2QixDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQztZQUN6QixDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRS9CLENBQUM7Q0FDRixDQUFBO0FBakRZLGdCQUFnQjtJQUQ1QixpQkFBVSxFQUFFOztHQUNBLGdCQUFnQixDQWlENUI7QUFqRFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdiRGF0ZVN0cnVjdCB9IGZyb20gXCJAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVUQ0RhdGUge1xuICBnZXRUaW1lKCk6IG51bWJlcjtcbiAgZ2V0VVRDRnVsbFllYXIoKTogbnVtYmVyO1xuICBnZXRVVENNb250aCgpOm51bWJlcjtcbiAgZ2V0VVRDRGF0ZSgpOm51bWJlcjtcblxuICBzZXRVVENGdWxsWWVhcihuOiBudW1iZXIpOnZvaWQ7XG4gIHNldFVUQ01vbnRoKG46bnVtYmVyKTp2b2lkO1xuICBzZXRVVENEYXRlKG46bnVtYmVyKTp2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXRjRGF0ZSh5Om51bWJlcixtPzpudW1iZXIsZD86bnVtYmVyKTpVVENEYXRle1xuICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoeSxtLGQpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHV0Y0RhdGVDb3B5KGQ6VVRDRGF0ZSl7XG4gIHJldHVybiB1dGNEYXRlKGQuZ2V0VVRDRnVsbFllYXIoKSxkLmdldFVUQ01vbnRoKCksZC5nZXRVVENEYXRlKCkpO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGltZVV0aWxzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG4gIHNwZWNpYWxEYXRlczoge1trZXk6c3RyaW5nXTooKCkgPT4gRGF0ZSl9ID0ge1xuICAgIHllc3RlcmRheTogKCkgPT4ge1xuICAgICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICAgICAgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpIC0gMSk7XG4gICAgICByZXR1cm4gZDtcbiAgICB9XG4gIH1cblxuICBjb252ZXJ0RGF0ZShkOihVVENEYXRlfHN0cmluZykpOk5nYkRhdGVTdHJ1Y3R7XG4gICAgaWYoIWQpe1xuICAgICAgZCA9IG5ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgdmFyIGRhdGU6VVRDRGF0ZTtcbiAgICBpZih0eXBlb2YoZCkgPT09ICdzdHJpbmcnKXtcbiAgICAgIHZhciBkYXRlVGV4dDpzdHJpbmcgPSBkO1xuICAgICAgaWYodGhpcy5zcGVjaWFsRGF0ZXNbZGF0ZVRleHRdKXtcbiAgICAgICAgZGF0ZSA9IHRoaXMuc3BlY2lhbERhdGVzW2RhdGVUZXh0XSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIFt5ZWFyLG1vbnRoLGRheSxvdGhlcl0gPSBkLnNwbGl0KCctJykubWFwKGMgPT4gK2MpO1xuICAgICAgICBkYXRlID0gdXRjRGF0ZSh5ZWFyLG1vbnRoLGRheSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGUgPSBkO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBkYXk6IGRhdGUuZ2V0VVRDRGF0ZSgpLFxuICAgICAgbW9udGg6IGRhdGUuZ2V0VVRDTW9udGgoKSArIDEsXG4gICAgICB5ZWFyOiBkYXRlLmdldFVUQ0Z1bGxZZWFyKClcbiAgICB9O1xuICB9XG5cbiAgZGF0ZXNFcXVhbChsaHM6TmdiRGF0ZVN0cnVjdCxyaHM6TmdiRGF0ZVN0cnVjdCk6Ym9vbGVhbntcbiAgICBpZighbGhzIHx8ICFyaHMpe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAobGhzLnllYXIgPT09IHJocy55ZWFyKSAmJlxuICAgICAgICAgICAobGhzLm1vbnRoID09PSByaHMubW9udGgpICYmXG4gICAgICAgICAgIChsaHMuZGF5ID09PSByaHMuZGF5KTtcblxuICB9XG59XG4iXX0=