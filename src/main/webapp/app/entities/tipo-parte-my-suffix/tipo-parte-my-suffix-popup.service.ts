import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TipoParteMySuffix } from './tipo-parte-my-suffix.model';
import { TipoParteMySuffixService } from './tipo-parte-my-suffix.service';

@Injectable()
export class TipoParteMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tipoParteService: TipoParteMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.tipoParteService.find(id)
                    .subscribe((tipoParteResponse: HttpResponse<TipoParteMySuffix>) => {
                        const tipoParte: TipoParteMySuffix = tipoParteResponse.body;
                        this.ngbModalRef = this.tipoParteModalRef(component, tipoParte);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipoParteModalRef(component, new TipoParteMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipoParteModalRef(component: Component, tipoParte: TipoParteMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipoParte = tipoParte;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
