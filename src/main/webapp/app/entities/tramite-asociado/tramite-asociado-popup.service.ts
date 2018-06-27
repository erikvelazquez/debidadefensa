import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TramiteAsociado } from './tramite-asociado.model';
import { TramiteAsociadoService } from './tramite-asociado.service';

@Injectable()
export class TramiteAsociadoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tramiteAsociadoService: TramiteAsociadoService

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
                    .subscribe((tramiteAsociadoResponse: HttpResponse<TramiteAsociado>) => {
                        const tramiteAsociado: TramiteAsociado = tramiteAsociadoResponse.body;
                        this.ngbModalRef = this.tramiteAsociadoModalRef(component, tramiteAsociado);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tramiteAsociadoModalRef(component, new TramiteAsociado());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tramiteAsociadoModalRef(component: Component, tramiteAsociado: TramiteAsociado): NgbModalRef {
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
