import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TramiteGeneral } from './tramite-general.model';
import { TramiteGeneralService } from './tramite-general.service';

@Injectable()
export class TramiteGeneralPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tramiteGeneralService: TramiteGeneralService

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
                this.tramiteGeneralService.find(id)
                    .subscribe((tramiteGeneralResponse: HttpResponse<TramiteGeneral>) => {
                        const tramiteGeneral: TramiteGeneral = tramiteGeneralResponse.body;
                        tramiteGeneral.fechaIngreso = this.datePipe
                            .transform(tramiteGeneral.fechaIngreso, 'yyyy-MM-ddTHH:mm:ss');
                        tramiteGeneral.fechaResolucion = this.datePipe
                            .transform(tramiteGeneral.fechaResolucion, 'yyyy-MM-ddTHH:mm:ss');
                        tramiteGeneral.fechaNotificacion = this.datePipe
                            .transform(tramiteGeneral.fechaNotificacion, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.tramiteGeneralModalRef(component, tramiteGeneral);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tramiteGeneralModalRef(component, new TramiteGeneral());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tramiteGeneralModalRef(component: Component, tramiteGeneral: TramiteGeneral): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tramiteGeneral = tramiteGeneral;
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
