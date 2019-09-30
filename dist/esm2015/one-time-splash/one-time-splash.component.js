import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as store from 'store';
let OneTimeSplashComponent = class OneTimeSplashComponent {
    constructor(modalService) {
        this.modalService = modalService;
        this.label = 'About';
        this.hideMessage = 'Understood, I don’t need to see this again';
    }
    storageKey() {
        if (!this.application) {
            return null;
        }
        return this.application + '-splash-skip';
    }
    ngAfterViewInit() {
        setTimeout(() => {
            const key = this.storageKey();
            if (key) {
                this.doNotShow = store.get(key, false);
            }
            if (!this.doNotShow) {
                this.show();
            }
        });
    }
    show() {
        this.current = this.modalService.open(this.splashTemplate, {
            size: 'lg',
            windowClass: this.klass
        });
    }
    close() {
        if (!this.current) {
            return;
        }
        this.current.close();
        this.current = null;
    }
    doNotShowClicked() {
        const key = this.storageKey();
        if (!key) {
            return;
        }
        store.set(key, this.doNotShow);
    }
};
OneTimeSplashComponent.ctorParameters = () => [
    { type: NgbModal }
];
tslib_1.__decorate([
    ViewChild('splashTemplate', { static: false }),
    tslib_1.__metadata("design:type", Object)
], OneTimeSplashComponent.prototype, "splashTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], OneTimeSplashComponent.prototype, "application", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], OneTimeSplashComponent.prototype, "label", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], OneTimeSplashComponent.prototype, "hideMessage", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], OneTimeSplashComponent.prototype, "klass", void 0);
OneTimeSplashComponent = tslib_1.__decorate([
    Component({
        selector: 'one-time-splash',
        template: `<ng-template #splashTemplate let-c="close" let-d="dismiss">
  <div class="modal-header">
    <h4 class="modal-title">
      {{label}}</h4>
    <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <ng-content></ng-content>
  </div>
  <div class="modal-footer">
    <label *ngIf="application">
      <input type="checkbox" [(ngModel)]="doNotShow" (ngModelChange)="doNotShowClicked()">
      &nbsp; {{hideMessage}}
    </label>
    <button type="button" class="btn btn-secondary" (click)="c('Close click')">Close</button>
  </div>
  </ng-template>
`,
        styles: [``]
    }),
    tslib_1.__metadata("design:paramtypes", [NgbModal])
], OneTimeSplashComponent);
export { OneTimeSplashComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25lLXRpbWUtc3BsYXNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsib25lLXRpbWUtc3BsYXNoL29uZS10aW1lLXNwbGFzaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBNkIsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQTZCL0IsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFTakMsWUFBb0IsWUFBc0I7UUFBdEIsaUJBQVksR0FBWixZQUFZLENBQVU7UUFOakMsVUFBSyxHQUFHLE9BQU8sQ0FBQztRQUNoQixnQkFBVyxHQUFHLDRDQUE0QyxDQUFDO0lBT3BFLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUM7WUFDbkIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDLFdBQVcsR0FBSSxjQUFjLENBQUM7SUFDNUMsQ0FBQztJQUVELGVBQWU7UUFDYixVQUFVLENBQUMsR0FBRSxFQUFFO1lBQ2IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzlCLElBQUcsR0FBRyxFQUFDO2dCQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkM7WUFFRCxJQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQztnQkFDakIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2I7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFDO1lBQ3hELElBQUksRUFBQyxJQUFJO1lBQ1QsV0FBVyxFQUFDLElBQUksQ0FBQyxLQUFLO1NBQ3ZCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUM7WUFDZixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDOUIsSUFBRyxDQUFDLEdBQUcsRUFBQztZQUNOLE9BQU87U0FDUjtRQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0YsQ0FBQTs7WUFqRG1DLFFBQVE7O0FBUkU7SUFBM0MsU0FBUyxDQUFDLGdCQUFnQixFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxDQUFDOzs4REFBb0I7QUFDdEQ7SUFBUixLQUFLLEVBQUU7OzJEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTs7cURBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFOzsyREFBNEQ7QUFDM0Q7SUFBUixLQUFLLEVBQUU7O3FEQUFlO0FBTFosc0JBQXNCO0lBeEJsQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW1CWDtpQkFDVSxFQUFFO0tBQ1osQ0FBQzs2Q0FVa0MsUUFBUTtHQVQvQixzQkFBc0IsQ0EwRGxDO1NBMURZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdiTW9kYWwsIE5nYk1vZGFsUmVmIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0ICogYXMgc3RvcmUgZnJvbSAnc3RvcmUnO1xuXG5cbmRlY2xhcmUgdmFyIFBsb3RseTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdvbmUtdGltZS1zcGxhc2gnLFxuICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSAjc3BsYXNoVGVtcGxhdGUgbGV0LWM9XCJjbG9zZVwiIGxldC1kPVwiZGlzbWlzc1wiPlxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIj5cbiAgICAgIHt7bGFiZWx9fTwvaDQ+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiIChjbGljayk9XCJkKCdDcm9zcyBjbGljaycpXCI+XG4gICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgPGxhYmVsICpuZ0lmPVwiYXBwbGljYXRpb25cIj5cbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbKG5nTW9kZWwpXT1cImRvTm90U2hvd1wiIChuZ01vZGVsQ2hhbmdlKT1cImRvTm90U2hvd0NsaWNrZWQoKVwiPlxuICAgICAgJm5ic3A7IHt7aGlkZU1lc3NhZ2V9fVxuICAgIDwvbGFiZWw+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIChjbGljayk9XCJjKCdDbG9zZSBjbGljaycpXCI+Q2xvc2U8L2J1dHRvbj5cbiAgPC9kaXY+XG4gIDwvbmctdGVtcGxhdGU+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgT25lVGltZVNwbGFzaENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQgIHtcbiAgQFZpZXdDaGlsZCgnc3BsYXNoVGVtcGxhdGUnLHtzdGF0aWM6ZmFsc2V9KSBzcGxhc2hUZW1wbGF0ZTphbnk7XG4gIEBJbnB1dCgpIGFwcGxpY2F0aW9uOnN0cmluZztcbiAgQElucHV0KCkgbGFiZWwgPSAnQWJvdXQnO1xuICBASW5wdXQoKSBoaWRlTWVzc2FnZSA9ICdVbmRlcnN0b29kLCBJIGRvbuKAmXQgbmVlZCB0byBzZWUgdGhpcyBhZ2Fpbic7XG4gIEBJbnB1dCgpIGtsYXNzOiBzdHJpbmc7XG4gIGRvTm90U2hvdzogYm9vbGVhbjtcbiAgY3VycmVudDpOZ2JNb2RhbFJlZjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogTmdiTW9kYWwpe1xuXG4gIH1cblxuICBzdG9yYWdlS2V5KCl7XG4gICAgaWYoIXRoaXMuYXBwbGljYXRpb24pe1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXBwbGljYXRpb24gICsgJy1zcGxhc2gtc2tpcCc7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKXtcbiAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICBjb25zdCBrZXkgPSB0aGlzLnN0b3JhZ2VLZXkoKTtcbiAgICAgIGlmKGtleSl7XG4gICAgICAgIHRoaXMuZG9Ob3RTaG93ID0gc3RvcmUuZ2V0KGtleSxmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGlmKCF0aGlzLmRvTm90U2hvdyl7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2hvdygpe1xuICAgIHRoaXMuY3VycmVudCA9IHRoaXMubW9kYWxTZXJ2aWNlLm9wZW4odGhpcy5zcGxhc2hUZW1wbGF0ZSx7XG4gICAgICBzaXplOidsZycsXG4gICAgICB3aW5kb3dDbGFzczp0aGlzLmtsYXNzXG4gICAgfSk7XG4gIH1cblxuICBjbG9zZSgpe1xuICAgIGlmKCF0aGlzLmN1cnJlbnQpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudC5jbG9zZSgpO1xuICAgIHRoaXMuY3VycmVudD1udWxsO1xuICB9XG5cbiAgZG9Ob3RTaG93Q2xpY2tlZCgpe1xuICAgIGNvbnN0IGtleSA9IHRoaXMuc3RvcmFnZUtleSgpO1xuICAgIGlmKCFrZXkpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN0b3JlLnNldChrZXksdGhpcy5kb05vdFNob3cpO1xuICB9XG59XG4iXX0=