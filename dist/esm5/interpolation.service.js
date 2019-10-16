"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.InterpolationService = InterpolationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJwb2xhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJpbnRlcnBvbGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxXQUFXO0FBQ1g7SUFBQTtJQWtDQSxDQUFDO0lBaENnQiw4QkFBUyxHQUF4QixVQUF5QixHQUFPO1FBQzlCLE9BQU8sR0FBRyxLQUFHLFNBQVMsSUFBSSxHQUFHLEtBQUcsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7SUFFYSxnQ0FBVyxHQUF6QixVQUEwQixJQUFZLEVBQUUsTUFBWTtRQUNsRCxJQUFHLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN0QyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLGVBQWUsRUFBRSxVQUFDLFNBQWlCLEVBQUUsQ0FBUztZQUNyRixJQUFJLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSw2QkFBUSxHQUFmLFVBQWdCLE1BQVcsRUFBRSxHQUFXO1FBQ3RDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNULEdBQUc7WUFDRCxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3BCLElBQUcsb0JBQW9CLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDN0ksTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckIsR0FBRyxHQUFHLEVBQUUsQ0FBQzthQUNWO2lCQUFNLElBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUN0QixNQUFNLEdBQUcsU0FBUyxDQUFDO2FBQ3BCO2lCQUFNO2dCQUNMLEdBQUcsSUFBSSxHQUFHLENBQUM7YUFDWjtTQUNGLFFBQU8sSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUVyQixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBaENNLG9DQUFlLEdBQVcsdUJBQXVCLENBQUM7SUFpQzNELDJCQUFDO0NBQUEsQUFsQ0QsSUFrQ0M7QUFsQ1ksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBAZHluYW1pY1xuZXhwb3J0IGNsYXNzIEludGVycG9sYXRpb25TZXJ2aWNle1xuICBzdGF0aWMgdGVtcGxhdGVNYXRjaGVyOiBSZWdFeHAgPSAve3tcXHM/KFtee31cXHNdKilcXHM/fX0vZztcbiAgcHJpdmF0ZSBzdGF0aWMgaXNEZWZpbmVkKHZhbDphbnkpe1xuICAgIHJldHVybiB2YWwhPT11bmRlZmluZWQgJiYgdmFsIT09bnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW50ZXJwb2xhdGUoZXhwcjogc3RyaW5nLCBwYXJhbXM/OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmKHR5cGVvZiBleHByICE9PSAnc3RyaW5nJyB8fCAhcGFyYW1zKSB7XG4gICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG5cbiAgICByZXR1cm4gZXhwci5yZXBsYWNlKEludGVycG9sYXRpb25TZXJ2aWNlLnRlbXBsYXRlTWF0Y2hlciwgKHN1YnN0cmluZzogc3RyaW5nLCBiOiBzdHJpbmcpID0+IHtcbiAgICAgIGxldCByID0gSW50ZXJwb2xhdGlvblNlcnZpY2UuZ2V0VmFsdWUocGFyYW1zLCBiKTtcbiAgICAgIHJldHVybiBJbnRlcnBvbGF0aW9uU2VydmljZS5pc0RlZmluZWQocikgPyByIDogc3Vic3RyaW5nO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGdldFZhbHVlKHRhcmdldDogYW55LCBrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IGtleXMgPSBrZXkuc3BsaXQoJy4nKTtcbiAgICBrZXkgPSAnJztcbiAgICBkbyB7XG4gICAgICBrZXkgKz0ga2V5cy5zaGlmdCgpO1xuICAgICAgaWYoSW50ZXJwb2xhdGlvblNlcnZpY2UuaXNEZWZpbmVkKHRhcmdldCkgJiYgSW50ZXJwb2xhdGlvblNlcnZpY2UuaXNEZWZpbmVkKHRhcmdldFtrZXldKSAmJiAodHlwZW9mIHRhcmdldFtrZXldID09PSAnb2JqZWN0JyB8fCAha2V5cy5sZW5ndGgpKSB7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldFtrZXldO1xuICAgICAgICBrZXkgPSAnJztcbiAgICAgIH0gZWxzZSBpZigha2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAga2V5ICs9ICcuJztcbiAgICAgIH1cbiAgICB9IHdoaWxlKGtleXMubGVuZ3RoKTtcblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn1cbiJdfQ==