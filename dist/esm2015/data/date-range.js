import { utcDate } from '../time-utils.service';
// export interface LayerTimePeriod {
//   timeperiod?: number[];
// }
const MAXIMUM_DATE_SHIFT = 60;
export class DateRange {
    static dateFromConfig(json, end) {
        if (!json) {
            return new Date();
        }
        if ('number' === typeof json) {
            if (json < MAXIMUM_DATE_SHIFT) {
                let d = new Date();
                d.setUTCDate(d.getUTCDate() + json);
                return d;
            }
            if (end) {
                return utcDate(json, 11, 31);
            }
            return utcDate(json, 0, 1);
        }
        // ? expect a string and parse out dd/mm/yyyy?
        var [yyyy, mm, dd] = json.split('/').map(elem => +elem);
        return new Date(yyyy, mm - 1, dd);
    }
    static fromJSON(json) {
        var result = new DateRange();
        if (json) {
            result.start = DateRange.dateFromConfig(json.start);
            result.end = DateRange.dateFromConfig(json.end, true);
            result.format = json.format || result.format;
        }
        return result;
    }
    containsYear(yr) {
        return (yr >= this.start.getUTCFullYear()) &&
            (yr <= this.end.getUTCFullYear());
    }
    contains(d) {
        let yr = d.getUTCFullYear();
        if ((yr < this.start.getUTCFullYear()) ||
            (yr > this.end.getUTCFullYear())) {
            return false;
        }
        if (yr < this.end.getUTCFullYear()) {
            return true;
        }
        return d <= this.end;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi9zcmMvIiwic291cmNlcyI6WyJkYXRhL2RhdGUtcmFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBVyxNQUFNLHVCQUF1QixDQUFDO0FBR3pELHFDQUFxQztBQUNyQywyQkFBMkI7QUFDM0IsSUFBSTtBQUdKLE1BQU0sa0JBQWtCLEdBQUMsRUFBRSxDQUFDO0FBRTVCLE1BQU0sT0FBTyxTQUFTO0lBS3BCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBUyxFQUFFLEdBQWE7UUFDNUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUNuQjtRQUVELElBQUksUUFBUSxLQUFLLE9BQU8sSUFBSSxFQUFFO1lBQzVCLElBQUksSUFBSSxHQUFHLGtCQUFrQixFQUFFO2dCQUM3QixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNuQixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDcEMsT0FBTyxDQUFDLENBQUM7YUFDVjtZQUNELElBQUksR0FBRyxFQUFFO2dCQUNQLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDOUI7WUFFRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzVCO1FBRUQsOENBQThDO1FBQzlDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQVM7UUFDdkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUU3QixJQUFHLElBQUksRUFBQztZQUNOLE1BQU0sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEQsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDOUM7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxDQUFDLEVBQVU7UUFDckIsT0FBTyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3hDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsUUFBUSxDQUFDLENBQVM7UUFDaEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRTVCLElBQUcsQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNoQyxDQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUM7WUFDaEMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sQ0FBQyxJQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDckIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRjRGF0ZSwgVVRDRGF0ZSB9IGZyb20gJy4uL3RpbWUtdXRpbHMuc2VydmljZSc7XG5cblxuLy8gZXhwb3J0IGludGVyZmFjZSBMYXllclRpbWVQZXJpb2Qge1xuLy8gICB0aW1lcGVyaW9kPzogbnVtYmVyW107XG4vLyB9XG5cblxuY29uc3QgTUFYSU1VTV9EQVRFX1NISUZUPTYwO1xuXG5leHBvcnQgY2xhc3MgRGF0ZVJhbmdlIHtcbiAgc3RhcnQ6IFVUQ0RhdGU7XG4gIGVuZDogVVRDRGF0ZTtcbiAgZm9ybWF0OiBzdHJpbmc7XG5cbiAgc3RhdGljIGRhdGVGcm9tQ29uZmlnKGpzb246IGFueSwgZW5kPzogYm9vbGVhbik6IFVUQ0RhdGUge1xuICAgIGlmICghanNvbikge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKCdudW1iZXInID09PSB0eXBlb2YganNvbikge1xuICAgICAgaWYgKGpzb24gPCBNQVhJTVVNX0RBVEVfU0hJRlQpIHtcbiAgICAgICAgbGV0IGQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBkLnNldFVUQ0RhdGUoZC5nZXRVVENEYXRlKCkgKyBqc29uKTtcbiAgICAgICAgcmV0dXJuIGQ7XG4gICAgICB9XG4gICAgICBpZiAoZW5kKSB7XG4gICAgICAgIHJldHVybiB1dGNEYXRlKGpzb24sIDExLCAzMSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1dGNEYXRlKGpzb24sIDAsIDEpO1xuICAgIH1cblxuICAgIC8vID8gZXhwZWN0IGEgc3RyaW5nIGFuZCBwYXJzZSBvdXQgZGQvbW0veXl5eT9cbiAgICB2YXIgW3l5eXksIG1tLCBkZF0gPSBqc29uLnNwbGl0KCcvJykubWFwKGVsZW0gPT4gK2VsZW0pO1xuICAgIHJldHVybiBuZXcgRGF0ZSh5eXl5LCBtbSAtIDEsIGRkKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uOiBhbnkpOiBEYXRlUmFuZ2Uge1xuICAgIHZhciByZXN1bHQgPSBuZXcgRGF0ZVJhbmdlKCk7XG5cbiAgICBpZihqc29uKXtcbiAgICAgIHJlc3VsdC5zdGFydCA9IERhdGVSYW5nZS5kYXRlRnJvbUNvbmZpZyhqc29uLnN0YXJ0KTtcbiAgICAgIHJlc3VsdC5lbmQgPSBEYXRlUmFuZ2UuZGF0ZUZyb21Db25maWcoanNvbi5lbmQsIHRydWUpO1xuICAgICAgcmVzdWx0LmZvcm1hdCA9IGpzb24uZm9ybWF0IHx8IHJlc3VsdC5mb3JtYXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGNvbnRhaW5zWWVhcih5cjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh5ciA+PSB0aGlzLnN0YXJ0LmdldFVUQ0Z1bGxZZWFyKCkpICYmXG4gICAgICAoeXIgPD0gdGhpcy5lbmQuZ2V0VVRDRnVsbFllYXIoKSk7XG4gIH1cblxuICBjb250YWlucyhkOlVUQ0RhdGUpOmJvb2xlYW57XG4gICAgbGV0IHlyID0gZC5nZXRVVENGdWxsWWVhcigpO1xuXG4gICAgaWYoKHlyPHRoaXMuc3RhcnQuZ2V0VVRDRnVsbFllYXIoKSl8fFxuICAgICAgICh5cj50aGlzLmVuZC5nZXRVVENGdWxsWWVhcigpKSl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYoeXI8dGhpcy5lbmQuZ2V0VVRDRnVsbFllYXIoKSl7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGQ8PXRoaXMuZW5kO1xuICB9XG59XG4iXX0=