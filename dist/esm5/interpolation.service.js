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
export { InterpolationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJwb2xhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJpbnRlcnBvbGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsV0FBVztBQUNYO0lBQUE7SUFrQ0EsQ0FBQztJQWhDZ0IsOEJBQVMsR0FBeEIsVUFBeUIsR0FBTztRQUM5QixPQUFPLEdBQUcsS0FBRyxTQUFTLElBQUksR0FBRyxLQUFHLElBQUksQ0FBQztJQUN2QyxDQUFDO0lBRWEsZ0NBQVcsR0FBekIsVUFBMEIsSUFBWSxFQUFFLE1BQVk7UUFDbEQsSUFBRyxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDdEMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLEVBQUUsVUFBQyxTQUFpQixFQUFFLENBQVM7WUFDckYsSUFBSSxDQUFDLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRCxPQUFPLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sNkJBQVEsR0FBZixVQUFnQixNQUFXLEVBQUUsR0FBVztRQUN0QyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDVCxHQUFHO1lBQ0QsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNwQixJQUFHLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzdJLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLEdBQUcsR0FBRyxFQUFFLENBQUM7YUFDVjtpQkFBTSxJQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDdEIsTUFBTSxHQUFHLFNBQVMsQ0FBQzthQUNwQjtpQkFBTTtnQkFDTCxHQUFHLElBQUksR0FBRyxDQUFDO2FBQ1o7U0FDRixRQUFPLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFFckIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQWhDTSxvQ0FBZSxHQUFXLHVCQUF1QixDQUFDO0lBaUMzRCwyQkFBQztDQUFBLEFBbENELElBa0NDO1NBbENZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8gQGR5bmFtaWNcbmV4cG9ydCBjbGFzcyBJbnRlcnBvbGF0aW9uU2VydmljZXtcbiAgc3RhdGljIHRlbXBsYXRlTWF0Y2hlcjogUmVnRXhwID0gL3t7XFxzPyhbXnt9XFxzXSopXFxzP319L2c7XG4gIHByaXZhdGUgc3RhdGljIGlzRGVmaW5lZCh2YWw6YW55KXtcbiAgICByZXR1cm4gdmFsIT09dW5kZWZpbmVkICYmIHZhbCE9PW51bGw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGludGVycG9sYXRlKGV4cHI6IHN0cmluZywgcGFyYW1zPzogYW55KTogc3RyaW5nIHtcbiAgICBpZih0eXBlb2YgZXhwciAhPT0gJ3N0cmluZycgfHwgIXBhcmFtcykge1xuICAgICAgcmV0dXJuIGV4cHI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4cHIucmVwbGFjZShJbnRlcnBvbGF0aW9uU2VydmljZS50ZW1wbGF0ZU1hdGNoZXIsIChzdWJzdHJpbmc6IHN0cmluZywgYjogc3RyaW5nKSA9PiB7XG4gICAgICBsZXQgciA9IEludGVycG9sYXRpb25TZXJ2aWNlLmdldFZhbHVlKHBhcmFtcywgYik7XG4gICAgICByZXR1cm4gSW50ZXJwb2xhdGlvblNlcnZpY2UuaXNEZWZpbmVkKHIpID8gciA6IHN1YnN0cmluZztcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRWYWx1ZSh0YXJnZXQ6IGFueSwga2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBrZXlzID0ga2V5LnNwbGl0KCcuJyk7XG4gICAga2V5ID0gJyc7XG4gICAgZG8ge1xuICAgICAga2V5ICs9IGtleXMuc2hpZnQoKTtcbiAgICAgIGlmKEludGVycG9sYXRpb25TZXJ2aWNlLmlzRGVmaW5lZCh0YXJnZXQpICYmIEludGVycG9sYXRpb25TZXJ2aWNlLmlzRGVmaW5lZCh0YXJnZXRba2V5XSkgJiYgKHR5cGVvZiB0YXJnZXRba2V5XSA9PT0gJ29iamVjdCcgfHwgIWtleXMubGVuZ3RoKSkge1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXRba2V5XTtcbiAgICAgICAga2V5ID0gJyc7XG4gICAgICB9IGVsc2UgaWYoIWtleXMubGVuZ3RoKSB7XG4gICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGtleSArPSAnLic7XG4gICAgICB9XG4gICAgfSB3aGlsZShrZXlzLmxlbmd0aCk7XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG59XG4iXX0=