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
var core_1 = require("@angular/core");
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
    TreeFilterService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], TreeFilterService);
    return TreeFilterService;
}());
exports.TreeFilterService = TreeFilterService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1maWx0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsidHJlZS1maWx0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUkzQztJQUVFO0lBQ0EsQ0FBQztJQUVELHNDQUFVLEdBQVYsVUFBVyxJQUFlLEVBQUUsVUFBa0I7UUFBOUMsaUJBeUJDO1FBdkJDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXJCLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFN0MsSUFBTSxrQkFBa0IsR0FBRyxVQUFDLEtBQWEsRUFBRSxVQUFrQixJQUFLLE9BQUEsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBckQsQ0FBcUQsQ0FBQztRQUV4SCxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFMUQsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ25DLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQztnQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBRSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQzthQUNuRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUs7b0JBQ3JCLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUVuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQztnQkFDbkUsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFFZCxDQUFDO0lBRUQsbUNBQU8sR0FBUCxVQUFRLElBQWM7UUFBdEIsaUJBS0M7UUFKQyxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFmLENBQWUsQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztJQXJDVSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTs7T0FDQSxpQkFBaUIsQ0FzQzdCO0lBQUQsd0JBQUM7Q0FBQSxBQXRDRCxJQXNDQztBQXRDWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuL2RhdGEvdHJlZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmVlRmlsdGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBmaWx0ZXJUcmVlKHRyZWU6IFRyZWVNb2RlbCwgZmlsdGVyVGV4dDogc3RyaW5nKSB7XG5cbiAgICB0cmVlLnZpc2libGUgPSBmYWxzZTtcblxuICAgIGZpbHRlclRleHQgPSBmaWx0ZXJUZXh0LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgY29uc3QgY29udGFpbnNGaWx0ZXJUZXh0ID0gKGxhYmVsOiBzdHJpbmcsIGZpbHRlclRleHQ6IHN0cmluZykgPT4gbGFiZWwudHJpbSgpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXJUZXh0KSAhPT0gLTE7XG5cbiAgICB0cmVlLnZpc2libGUgPSBjb250YWluc0ZpbHRlclRleHQodHJlZS5sYWJlbCwgZmlsdGVyVGV4dCk7XG5cbiAgICBpZiAodHJlZS5oYXNPd25Qcm9wZXJ0eShcImNoaWxkcmVuXCIpKSB7XG4gICAgICBpZih0cmVlLnZpc2libGUpe1xuICAgICAgICB0cmVlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQ9PnRoaXMuc2hvd0FsbChjaGlsZCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJlZS5jaGlsZHJlbi5tYXAoY2hpbGQgPT4ge1xuICAgICAgICAgIHRoaXMuZmlsdGVyVHJlZShjaGlsZCwgZmlsdGVyVGV4dCk7XG5cbiAgICAgICAgICB0cmVlLnZpc2libGUgPSB0cmVlLnZpc2libGUgfHwgY2hpbGQudmlzaWJsZTtcbiAgICAgICAgICB0cmVlLmV4cGFuZGVkID0gdHJlZS5leHBhbmRlZCB8fCBjaGlsZC52aXNpYmxlIHx8IGNoaWxkLmV4cGFuZGVkO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJlZTtcblxuICB9XG5cbiAgc2hvd0FsbCh0cmVlOlRyZWVNb2RlbCl7XG4gICAgdHJlZS52aXNpYmxlPXRydWU7XG4gICAgaWYgKHRyZWUuaGFzT3duUHJvcGVydHkoXCJjaGlsZHJlblwiKSkge1xuICAgICAgdHJlZS5jaGlsZHJlbi5mb3JFYWNoKGM9PnRoaXMuc2hvd0FsbChjKSk7XG4gICAgfVxuICB9XG59XG4iXX0=