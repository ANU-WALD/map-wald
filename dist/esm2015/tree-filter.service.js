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
let TreeFilterService = class TreeFilterService {
    constructor() {
    }
    filterTree(tree, filterText) {
        tree.visible = false;
        filterText = filterText.trim().toLowerCase();
        const containsFilterText = (label, filterText) => label.trim().toLowerCase().indexOf(filterText) !== -1;
        tree.visible = containsFilterText(tree.label, filterText);
        if (tree.hasOwnProperty("children")) {
            if (tree.visible) {
                tree.children.forEach(child => this.showAll(child));
            }
            else {
                tree.children.map(child => {
                    this.filterTree(child, filterText);
                    tree.visible = tree.visible || child.visible;
                    tree.expanded = tree.expanded || child.visible || child.expanded;
                });
            }
        }
        return tree;
    }
    showAll(tree) {
        tree.visible = true;
        if (tree.hasOwnProperty("children")) {
            tree.children.forEach(c => this.showAll(c));
        }
    }
};
TreeFilterService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], TreeFilterService);
exports.TreeFilterService = TreeFilterService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1maWx0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsidHJlZS1maWx0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUEyQztBQUkzQyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUU1QjtJQUNBLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBZSxFQUFFLFVBQWtCO1FBRTVDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXJCLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFN0MsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxVQUFrQixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRXhILElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztRQUUxRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDbkMsSUFBRyxJQUFJLENBQUMsT0FBTyxFQUFDO2dCQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQSxFQUFFLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ25EO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFFbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUM7b0JBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUM7Z0JBQ25FLENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBRWQsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFjO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDO1FBQ2xCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7Q0FDRixDQUFBO0FBdENZLGlCQUFpQjtJQUQ3QixpQkFBVSxFQUFFOztHQUNBLGlCQUFpQixDQXNDN0I7QUF0Q1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi9kYXRhL3RyZWUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJlZUZpbHRlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgZmlsdGVyVHJlZSh0cmVlOiBUcmVlTW9kZWwsIGZpbHRlclRleHQ6IHN0cmluZykge1xuXG4gICAgdHJlZS52aXNpYmxlID0gZmFsc2U7XG5cbiAgICBmaWx0ZXJUZXh0ID0gZmlsdGVyVGV4dC50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICAgIGNvbnN0IGNvbnRhaW5zRmlsdGVyVGV4dCA9IChsYWJlbDogc3RyaW5nLCBmaWx0ZXJUZXh0OiBzdHJpbmcpID0+IGxhYmVsLnRyaW0oKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVGV4dCkgIT09IC0xO1xuXG4gICAgdHJlZS52aXNpYmxlID0gY29udGFpbnNGaWx0ZXJUZXh0KHRyZWUubGFiZWwsIGZpbHRlclRleHQpO1xuXG4gICAgaWYgKHRyZWUuaGFzT3duUHJvcGVydHkoXCJjaGlsZHJlblwiKSkge1xuICAgICAgaWYodHJlZS52aXNpYmxlKXtcbiAgICAgICAgdHJlZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkPT50aGlzLnNob3dBbGwoY2hpbGQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyZWUuY2hpbGRyZW4ubWFwKGNoaWxkID0+IHtcbiAgICAgICAgICB0aGlzLmZpbHRlclRyZWUoY2hpbGQsIGZpbHRlclRleHQpO1xuXG4gICAgICAgICAgdHJlZS52aXNpYmxlID0gdHJlZS52aXNpYmxlIHx8IGNoaWxkLnZpc2libGU7XG4gICAgICAgICAgdHJlZS5leHBhbmRlZCA9IHRyZWUuZXhwYW5kZWQgfHwgY2hpbGQudmlzaWJsZSB8fCBjaGlsZC5leHBhbmRlZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyZWU7XG5cbiAgfVxuXG4gIHNob3dBbGwodHJlZTpUcmVlTW9kZWwpe1xuICAgIHRyZWUudmlzaWJsZT10cnVlO1xuICAgIGlmICh0cmVlLmhhc093blByb3BlcnR5KFwiY2hpbGRyZW5cIikpIHtcbiAgICAgIHRyZWUuY2hpbGRyZW4uZm9yRWFjaChjPT50aGlzLnNob3dBbGwoYykpO1xuICAgIH1cbiAgfVxufVxuIl19