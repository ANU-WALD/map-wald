import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
export function utcDate(y, m, d) {
    return new Date(Date.UTC(y, m, d));
}
export function utcDateCopy(d) {
    return utcDate(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}
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
TimeUtilsService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], TimeUtilsService);
export { TimeUtilsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS11dGlscy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJ0aW1lLXV0aWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFjM0MsTUFBTSxVQUFVLE9BQU8sQ0FBQyxDQUFRLEVBQUMsQ0FBUyxFQUFDLENBQVM7SUFDbEQsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxDQUFTO0lBQ25DLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFDcEUsQ0FBQztBQUdELElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBRTNCO1FBSUEsaUJBQVksR0FBZ0M7WUFDMUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNuQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsT0FBTyxDQUFDLENBQUM7WUFDWCxDQUFDO1NBQ0YsQ0FBQTtJQVJELENBQUM7SUFVRCxXQUFXLENBQUMsQ0FBa0I7UUFDNUIsSUFBRyxDQUFDLENBQUMsRUFBQztZQUNKLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxJQUFZLENBQUM7UUFDakIsSUFBRyxPQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFDO1lBQ3hCLElBQUksUUFBUSxHQUFVLENBQUMsQ0FBQztZQUN4QixJQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUM7Z0JBQzdCLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7YUFDdEM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0Y7YUFBTTtZQUNMLElBQUksR0FBRyxDQUFDLENBQUM7U0FDVjtRQUVELE9BQU87WUFDTCxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN0QixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUM7WUFDN0IsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUU7U0FDNUIsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVLENBQUMsR0FBaUIsRUFBQyxHQUFpQjtRQUM1QyxJQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFDO1lBQ2QsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDdkIsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDekIsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUvQixDQUFDO0NBQ0YsQ0FBQTtBQWpEWSxnQkFBZ0I7SUFENUIsVUFBVSxFQUFFOztHQUNBLGdCQUFnQixDQWlENUI7U0FqRFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdiRGF0ZVN0cnVjdCB9IGZyb20gXCJAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVUQ0RhdGUge1xuICBnZXRUaW1lKCk6IG51bWJlcjtcbiAgZ2V0VVRDRnVsbFllYXIoKTogbnVtYmVyO1xuICBnZXRVVENNb250aCgpOm51bWJlcjtcbiAgZ2V0VVRDRGF0ZSgpOm51bWJlcjtcblxuICBzZXRVVENGdWxsWWVhcihuOiBudW1iZXIpOnZvaWQ7XG4gIHNldFVUQ01vbnRoKG46bnVtYmVyKTp2b2lkO1xuICBzZXRVVENEYXRlKG46bnVtYmVyKTp2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXRjRGF0ZSh5Om51bWJlcixtPzpudW1iZXIsZD86bnVtYmVyKTpVVENEYXRle1xuICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoeSxtLGQpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHV0Y0RhdGVDb3B5KGQ6VVRDRGF0ZSl7XG4gIHJldHVybiB1dGNEYXRlKGQuZ2V0VVRDRnVsbFllYXIoKSxkLmdldFVUQ01vbnRoKCksZC5nZXRVVENEYXRlKCkpO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGltZVV0aWxzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG4gIHNwZWNpYWxEYXRlczoge1trZXk6c3RyaW5nXTooKCkgPT4gRGF0ZSl9ID0ge1xuICAgIHllc3RlcmRheTogKCkgPT4ge1xuICAgICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICAgICAgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpIC0gMSk7XG4gICAgICByZXR1cm4gZDtcbiAgICB9XG4gIH1cblxuICBjb252ZXJ0RGF0ZShkOihVVENEYXRlfHN0cmluZykpOk5nYkRhdGVTdHJ1Y3R7XG4gICAgaWYoIWQpe1xuICAgICAgZCA9IG5ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgdmFyIGRhdGU6VVRDRGF0ZTtcbiAgICBpZih0eXBlb2YoZCkgPT09ICdzdHJpbmcnKXtcbiAgICAgIHZhciBkYXRlVGV4dDpzdHJpbmcgPSBkO1xuICAgICAgaWYodGhpcy5zcGVjaWFsRGF0ZXNbZGF0ZVRleHRdKXtcbiAgICAgICAgZGF0ZSA9IHRoaXMuc3BlY2lhbERhdGVzW2RhdGVUZXh0XSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIFt5ZWFyLG1vbnRoLGRheSxvdGhlcl0gPSBkLnNwbGl0KCctJykubWFwKGMgPT4gK2MpO1xuICAgICAgICBkYXRlID0gdXRjRGF0ZSh5ZWFyLG1vbnRoLGRheSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGUgPSBkO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBkYXk6IGRhdGUuZ2V0VVRDRGF0ZSgpLFxuICAgICAgbW9udGg6IGRhdGUuZ2V0VVRDTW9udGgoKSArIDEsXG4gICAgICB5ZWFyOiBkYXRlLmdldFVUQ0Z1bGxZZWFyKClcbiAgICB9O1xuICB9XG5cbiAgZGF0ZXNFcXVhbChsaHM6TmdiRGF0ZVN0cnVjdCxyaHM6TmdiRGF0ZVN0cnVjdCk6Ym9vbGVhbntcbiAgICBpZighbGhzIHx8ICFyaHMpe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAobGhzLnllYXIgPT09IHJocy55ZWFyKSAmJlxuICAgICAgICAgICAobGhzLm1vbnRoID09PSByaHMubW9udGgpICYmXG4gICAgICAgICAgIChsaHMuZGF5ID09PSByaHMuZGF5KTtcblxuICB9XG59XG4iXX0=