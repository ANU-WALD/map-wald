import { AfterViewInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
export declare class OneTimeSplashComponent implements AfterViewInit {
    private modalService;
    splashTemplate: any;
    application: string;
    label: string;
    hideMessage: string;
    klass: string;
    doNotShow: boolean;
    current: NgbModalRef;
    constructor(modalService: NgbModal);
    storageKey(): string;
    ngAfterViewInit(): void;
    show(): void;
    close(): void;
    doNotShowClicked(): void;
}
