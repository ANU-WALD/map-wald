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
    TreeFilterService.decorators = [
        { type: Injectable }
    ];
    TreeFilterService.ctorParameters = function () { return []; };
    return TreeFilterService;
}());
export { TreeFilterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1maWx0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsidHJlZS1maWx0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDO0lBR0U7SUFDQSxDQUFDO0lBRUQsc0NBQVUsR0FBVixVQUFXLElBQWUsRUFBRSxVQUFrQjtRQUE5QyxpQkF5QkM7UUF2QkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFckIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUU3QyxJQUFNLGtCQUFrQixHQUFHLFVBQUMsS0FBYSxFQUFFLFVBQWtCLElBQUssT0FBQSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFyRCxDQUFxRCxDQUFDO1FBRXhILElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztRQUUxRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDbkMsSUFBRyxJQUFJLENBQUMsT0FBTyxFQUFDO2dCQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFFLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO2FBQ25EO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSztvQkFDckIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBRW5DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDO29CQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDO2dCQUNuRSxDQUFDLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQztJQUVkLENBQUM7SUFFRCxtQ0FBTyxHQUFQLFVBQVEsSUFBYztRQUF0QixpQkFLQztRQUpDLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDO1FBQ2xCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBRSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQWYsQ0FBZSxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDOztnQkF0Q0YsVUFBVTs7O0lBdUNYLHdCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0F0Q1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi9kYXRhL3RyZWUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJlZUZpbHRlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgZmlsdGVyVHJlZSh0cmVlOiBUcmVlTW9kZWwsIGZpbHRlclRleHQ6IHN0cmluZykge1xuXG4gICAgdHJlZS52aXNpYmxlID0gZmFsc2U7XG5cbiAgICBmaWx0ZXJUZXh0ID0gZmlsdGVyVGV4dC50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICAgIGNvbnN0IGNvbnRhaW5zRmlsdGVyVGV4dCA9IChsYWJlbDogc3RyaW5nLCBmaWx0ZXJUZXh0OiBzdHJpbmcpID0+IGxhYmVsLnRyaW0oKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVGV4dCkgIT09IC0xO1xuXG4gICAgdHJlZS52aXNpYmxlID0gY29udGFpbnNGaWx0ZXJUZXh0KHRyZWUubGFiZWwsIGZpbHRlclRleHQpO1xuXG4gICAgaWYgKHRyZWUuaGFzT3duUHJvcGVydHkoXCJjaGlsZHJlblwiKSkge1xuICAgICAgaWYodHJlZS52aXNpYmxlKXtcbiAgICAgICAgdHJlZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkPT50aGlzLnNob3dBbGwoY2hpbGQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyZWUuY2hpbGRyZW4ubWFwKGNoaWxkID0+IHtcbiAgICAgICAgICB0aGlzLmZpbHRlclRyZWUoY2hpbGQsIGZpbHRlclRleHQpO1xuXG4gICAgICAgICAgdHJlZS52aXNpYmxlID0gdHJlZS52aXNpYmxlIHx8IGNoaWxkLnZpc2libGU7XG4gICAgICAgICAgdHJlZS5leHBhbmRlZCA9IHRyZWUuZXhwYW5kZWQgfHwgY2hpbGQudmlzaWJsZSB8fCBjaGlsZC5leHBhbmRlZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyZWU7XG5cbiAgfVxuXG4gIHNob3dBbGwodHJlZTpUcmVlTW9kZWwpe1xuICAgIHRyZWUudmlzaWJsZT10cnVlO1xuICAgIGlmICh0cmVlLmhhc093blByb3BlcnR5KFwiY2hpbGRyZW5cIikpIHtcbiAgICAgIHRyZWUuY2hpbGRyZW4uZm9yRWFjaChjPT50aGlzLnNob3dBbGwoYykpO1xuICAgIH1cbiAgfVxufVxuIl19