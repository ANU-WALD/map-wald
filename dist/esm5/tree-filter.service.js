import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
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
    TreeFilterService = tslib_1.__decorate([
        Injectable()
    ], TreeFilterService);
    return TreeFilterService;
}());
export { TreeFilterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1maWx0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsidHJlZS1maWx0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQztJQUVFO0lBQ0EsQ0FBQztJQUVELHNDQUFVLEdBQVYsVUFBVyxJQUFlLEVBQUUsVUFBa0I7UUFBOUMsaUJBeUJDO1FBdkJDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXJCLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFN0MsSUFBTSxrQkFBa0IsR0FBRyxVQUFDLEtBQWEsRUFBRSxVQUFrQixJQUFLLE9BQUEsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBckQsQ0FBcUQsQ0FBQztRQUV4SCxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFMUQsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ25DLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQztnQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBRSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQzthQUNuRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUs7b0JBQ3JCLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUVuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQztnQkFDbkUsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFFZCxDQUFDO0lBRUQsbUNBQU8sR0FBUCxVQUFRLElBQWM7UUFBdEIsaUJBS0M7UUFKQyxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFmLENBQWUsQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztJQXJDVSxpQkFBaUI7UUFEN0IsVUFBVSxFQUFFO09BQ0EsaUJBQWlCLENBc0M3QjtJQUFELHdCQUFDO0NBQUEsQUF0Q0QsSUFzQ0M7U0F0Q1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi9kYXRhL3RyZWUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJlZUZpbHRlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgZmlsdGVyVHJlZSh0cmVlOiBUcmVlTW9kZWwsIGZpbHRlclRleHQ6IHN0cmluZykge1xuXG4gICAgdHJlZS52aXNpYmxlID0gZmFsc2U7XG5cbiAgICBmaWx0ZXJUZXh0ID0gZmlsdGVyVGV4dC50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICAgIGNvbnN0IGNvbnRhaW5zRmlsdGVyVGV4dCA9IChsYWJlbDogc3RyaW5nLCBmaWx0ZXJUZXh0OiBzdHJpbmcpID0+IGxhYmVsLnRyaW0oKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVGV4dCkgIT09IC0xO1xuXG4gICAgdHJlZS52aXNpYmxlID0gY29udGFpbnNGaWx0ZXJUZXh0KHRyZWUubGFiZWwsIGZpbHRlclRleHQpO1xuXG4gICAgaWYgKHRyZWUuaGFzT3duUHJvcGVydHkoXCJjaGlsZHJlblwiKSkge1xuICAgICAgaWYodHJlZS52aXNpYmxlKXtcbiAgICAgICAgdHJlZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkPT50aGlzLnNob3dBbGwoY2hpbGQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyZWUuY2hpbGRyZW4ubWFwKGNoaWxkID0+IHtcbiAgICAgICAgICB0aGlzLmZpbHRlclRyZWUoY2hpbGQsIGZpbHRlclRleHQpO1xuXG4gICAgICAgICAgdHJlZS52aXNpYmxlID0gdHJlZS52aXNpYmxlIHx8IGNoaWxkLnZpc2libGU7XG4gICAgICAgICAgdHJlZS5leHBhbmRlZCA9IHRyZWUuZXhwYW5kZWQgfHwgY2hpbGQudmlzaWJsZSB8fCBjaGlsZC5leHBhbmRlZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyZWU7XG5cbiAgfVxuXG4gIHNob3dBbGwodHJlZTpUcmVlTW9kZWwpe1xuICAgIHRyZWUudmlzaWJsZT10cnVlO1xuICAgIGlmICh0cmVlLmhhc093blByb3BlcnR5KFwiY2hpbGRyZW5cIikpIHtcbiAgICAgIHRyZWUuY2hpbGRyZW4uZm9yRWFjaChjPT50aGlzLnNob3dBbGwoYykpO1xuICAgIH1cbiAgfVxufVxuIl19