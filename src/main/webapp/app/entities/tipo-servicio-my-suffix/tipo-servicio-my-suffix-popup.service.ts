import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TipoServicioMySuffix } from './tipo-servicio-my-suffix.model';
import { TipoServicioMySuffixService } from './tipo-servicio-my-suffix.service';

@Injectable()
export class TipoServicioMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tipoServicioService: TipoServicioMySuffixService

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
                this.tipoServicioService.find(id)
                    .subscribe((tipoServicioResponse: HttpResponse<TipoServicioMySuffix>) => {
                        const tipoServicio: TipoServicioMySuffix = tipoServicioResponse.body;
                        this.ngbModalRef = this.tipoServicioModalRef(component, tipoServicio);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipoServicioModalRef(component, new TipoServicioMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipoServicioModalRef(component: Component, tipoServicio: TipoServicioMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipoServicio = tipoServicio;
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
