import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CostoServicioMySuffix } from './costo-servicio-my-suffix.model';
import { CostoServicioMySuffixService } from './costo-servicio-my-suffix.service';

@Injectable()
export class CostoServicioMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private costoServicioService: CostoServicioMySuffixService

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
                this.costoServicioService.find(id)
                    .subscribe((costoServicioResponse: HttpResponse<CostoServicioMySuffix>) => {
                        const costoServicio: CostoServicioMySuffix = costoServicioResponse.body;
                        this.ngbModalRef = this.costoServicioModalRef(component, costoServicio);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.costoServicioModalRef(component, new CostoServicioMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    costoServicioModalRef(component: Component, costoServicio: CostoServicioMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.costoServicio = costoServicio;
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
