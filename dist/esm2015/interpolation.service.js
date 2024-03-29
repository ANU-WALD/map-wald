// @dynamic
export class InterpolationService {
    static isDefined(val) {
        return val !== undefined && val !== null;
    }
    static interpolate(expr, params) {
        if (typeof expr !== 'string' || !params) {
            return expr;
        }
        return expr.replace(InterpolationService.templateMatcher, (substring, b) => {
            let r = InterpolationService.getValue(params, b);
            return InterpolationService.isDefined(r) ? r : substring;
        });
    }
    static getValue(target, key) {
        let keys = key.split('.');
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
    }
}
InterpolationService.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJwb2xhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ludGVycG9sYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxXQUFXO0FBQ1gsTUFBTSxPQUFPLG9CQUFvQjtJQUV2QixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQU87UUFDOUIsT0FBTyxHQUFHLEtBQUcsU0FBUyxJQUFJLEdBQUcsS0FBRyxJQUFJLENBQUM7SUFDdkMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBWSxFQUFFLE1BQVk7UUFDbEQsSUFBRyxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDdEMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFpQixFQUFFLENBQVMsRUFBRSxFQUFFO1lBQ3pGLElBQUksQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakQsT0FBTyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBVyxFQUFFLEdBQVc7UUFDdEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ1QsR0FBRztZQUNELEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEIsSUFBRyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUM3SSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixHQUFHLEdBQUcsRUFBRSxDQUFDO2FBQ1Y7aUJBQU0sSUFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3RCLE1BQU0sR0FBRyxTQUFTLENBQUM7YUFDcEI7aUJBQU07Z0JBQ0wsR0FBRyxJQUFJLEdBQUcsQ0FBQzthQUNaO1NBQ0YsUUFBTyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBRXJCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O0FBaENNLG9DQUFlLEdBQVcsdUJBQXVCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIEBkeW5hbWljXG5leHBvcnQgY2xhc3MgSW50ZXJwb2xhdGlvblNlcnZpY2V7XG4gIHN0YXRpYyB0ZW1wbGF0ZU1hdGNoZXI6IFJlZ0V4cCA9IC97e1xccz8oW157fVxcc10qKVxccz99fS9nO1xuICBwcml2YXRlIHN0YXRpYyBpc0RlZmluZWQodmFsOmFueSl7XG4gICAgcmV0dXJuIHZhbCE9PXVuZGVmaW5lZCAmJiB2YWwhPT1udWxsO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbnRlcnBvbGF0ZShleHByOiBzdHJpbmcsIHBhcmFtcz86IGFueSk6IHN0cmluZyB7XG4gICAgaWYodHlwZW9mIGV4cHIgIT09ICdzdHJpbmcnIHx8ICFwYXJhbXMpIHtcbiAgICAgIHJldHVybiBleHByO1xuICAgIH1cblxuICAgIHJldHVybiBleHByLnJlcGxhY2UoSW50ZXJwb2xhdGlvblNlcnZpY2UudGVtcGxhdGVNYXRjaGVyLCAoc3Vic3RyaW5nOiBzdHJpbmcsIGI6IHN0cmluZykgPT4ge1xuICAgICAgbGV0IHIgPSBJbnRlcnBvbGF0aW9uU2VydmljZS5nZXRWYWx1ZShwYXJhbXMsIGIpO1xuICAgICAgcmV0dXJuIEludGVycG9sYXRpb25TZXJ2aWNlLmlzRGVmaW5lZChyKSA/IHIgOiBzdWJzdHJpbmc7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0VmFsdWUodGFyZ2V0OiBhbnksIGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQga2V5cyA9IGtleS5zcGxpdCgnLicpO1xuICAgIGtleSA9ICcnO1xuICAgIGRvIHtcbiAgICAgIGtleSArPSBrZXlzLnNoaWZ0KCk7XG4gICAgICBpZihJbnRlcnBvbGF0aW9uU2VydmljZS5pc0RlZmluZWQodGFyZ2V0KSAmJiBJbnRlcnBvbGF0aW9uU2VydmljZS5pc0RlZmluZWQodGFyZ2V0W2tleV0pICYmICh0eXBlb2YgdGFyZ2V0W2tleV0gPT09ICdvYmplY3QnIHx8ICFrZXlzLmxlbmd0aCkpIHtcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W2tleV07XG4gICAgICAgIGtleSA9ICcnO1xuICAgICAgfSBlbHNlIGlmKCFrZXlzLmxlbmd0aCkge1xuICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBrZXkgKz0gJy4nO1xuICAgICAgfVxuICAgIH0gd2hpbGUoa2V5cy5sZW5ndGgpO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxufVxuIl19