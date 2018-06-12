import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TramiteAsociadoMySuffix } from './tramite-asociado-my-suffix.model';
import { TramiteAsociadoMySuffixService } from './tramite-asociado-my-suffix.service';

@Injectable()
export class TramiteAsociadoMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tramiteAsociadoService: TramiteAsociadoMySuffixService

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
                this.tramiteAsociadoService.find(id)
                    .subscribe((tramiteAsociadoResponse: HttpResponse<TramiteAsociadoMySuffix>) => {
                        const tramiteAsociado: TramiteAsociadoMySuffix = tramiteAsociadoResponse.body;
                        this.ngbModalRef = this.tramiteAsociadoModalRef(component, tramiteAsociado);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tramiteAsociadoModalRef(component, new TramiteAsociadoMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tramiteAsociadoModalRef(component: Component, tramiteAsociado: TramiteAsociadoMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tramiteAsociado = tramiteAsociado;
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
