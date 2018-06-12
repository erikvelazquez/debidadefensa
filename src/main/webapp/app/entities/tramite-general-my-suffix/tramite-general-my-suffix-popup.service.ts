import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TramiteGeneralMySuffix } from './tramite-general-my-suffix.model';
import { TramiteGeneralMySuffixService } from './tramite-general-my-suffix.service';

@Injectable()
export class TramiteGeneralMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tramiteGeneralService: TramiteGeneralMySuffixService

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
                    .subscribe((tramiteGeneralResponse: HttpResponse<TramiteGeneralMySuffix>) => {
                        const tramiteGeneral: TramiteGeneralMySuffix = tramiteGeneralResponse.body;
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
                    this.ngbModalRef = this.tramiteGeneralModalRef(component, new TramiteGeneralMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tramiteGeneralModalRef(component: Component, tramiteGeneral: TramiteGeneralMySuffix): NgbModalRef {
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
