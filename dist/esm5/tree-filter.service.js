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
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], TreeFilterService);
    return TreeFilterService;
}());
export { TreeFilterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1maWx0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsidHJlZS1maWx0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQztJQUVFO0lBQ0EsQ0FBQztJQUVELHNDQUFVLEdBQVYsVUFBVyxJQUFlLEVBQUUsVUFBa0I7UUFBOUMsaUJBeUJDO1FBdkJDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXJCLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFN0MsSUFBTSxrQkFBa0IsR0FBRyxVQUFDLEtBQWEsRUFBRSxVQUFrQixJQUFLLE9BQUEsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBckQsQ0FBcUQsQ0FBQztRQUV4SCxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFMUQsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ25DLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQztnQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBRSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQzthQUNuRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUs7b0JBQ3JCLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUVuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQztnQkFDbkUsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFFZCxDQUFDO0lBRUQsbUNBQU8sR0FBUCxVQUFRLElBQWM7UUFBdEIsaUJBS0M7UUFKQyxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFmLENBQWUsQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztJQXJDVSxpQkFBaUI7UUFEN0IsVUFBVSxFQUFFOztPQUNBLGlCQUFpQixDQXNDN0I7SUFBRCx3QkFBQztDQUFBLEFBdENELElBc0NDO1NBdENZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4vZGF0YS90cmVlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyZWVGaWx0ZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGZpbHRlclRyZWUodHJlZTogVHJlZU1vZGVsLCBmaWx0ZXJUZXh0OiBzdHJpbmcpIHtcblxuICAgIHRyZWUudmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgZmlsdGVyVGV4dCA9IGZpbHRlclRleHQudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBjb25zdCBjb250YWluc0ZpbHRlclRleHQgPSAobGFiZWw6IHN0cmluZywgZmlsdGVyVGV4dDogc3RyaW5nKSA9PiBsYWJlbC50cmltKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclRleHQpICE9PSAtMTtcblxuICAgIHRyZWUudmlzaWJsZSA9IGNvbnRhaW5zRmlsdGVyVGV4dCh0cmVlLmxhYmVsLCBmaWx0ZXJUZXh0KTtcblxuICAgIGlmICh0cmVlLmhhc093blByb3BlcnR5KFwiY2hpbGRyZW5cIikpIHtcbiAgICAgIGlmKHRyZWUudmlzaWJsZSl7XG4gICAgICAgIHRyZWUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZD0+dGhpcy5zaG93QWxsKGNoaWxkKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmVlLmNoaWxkcmVuLm1hcChjaGlsZCA9PiB7XG4gICAgICAgICAgdGhpcy5maWx0ZXJUcmVlKGNoaWxkLCBmaWx0ZXJUZXh0KTtcblxuICAgICAgICAgIHRyZWUudmlzaWJsZSA9IHRyZWUudmlzaWJsZSB8fCBjaGlsZC52aXNpYmxlO1xuICAgICAgICAgIHRyZWUuZXhwYW5kZWQgPSB0cmVlLmV4cGFuZGVkIHx8IGNoaWxkLnZpc2libGUgfHwgY2hpbGQuZXhwYW5kZWQ7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cmVlO1xuXG4gIH1cblxuICBzaG93QWxsKHRyZWU6VHJlZU1vZGVsKXtcbiAgICB0cmVlLnZpc2libGU9dHJ1ZTtcbiAgICBpZiAodHJlZS5oYXNPd25Qcm9wZXJ0eShcImNoaWxkcmVuXCIpKSB7XG4gICAgICB0cmVlLmNoaWxkcmVuLmZvckVhY2goYz0+dGhpcy5zaG93QWxsKGMpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==