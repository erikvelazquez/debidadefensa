import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TramiteGeneral } from './tramite-general.model';
import { TramiteGeneralService } from './tramite-general.service';

@Injectable()
export class TramiteGeneralPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tramiteGeneralService: TramiteGeneralService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, idCliente?: number, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.tramiteGeneralService.find(id)
                    .subscribe((tramiteGeneralResponse: HttpResponse<TramiteGeneral>) => {
                        const tramiteGeneral: TramiteGeneral = tramiteGeneralResponse.body;
                        if (tramiteGeneral.fechaIngreso) {
                            tramiteGeneral.fechaIngreso = {
                                year: tramiteGeneral.fechaIngreso.getFullYear(),
                                month: tramiteGeneral.fechaIngreso.getMonth() + 1,
                                day: tramiteGeneral.fechaIngreso.getDate()
                            };
                        }
                        if (tramiteGeneral.fechaResolucion) {
                            tramiteGeneral.fechaResolucion = {
                                year: tramiteGeneral.fechaResolucion.getFullYear(),
                                month: tramiteGeneral.fechaResolucion.getMonth() + 1,
                                day: tramiteGeneral.fechaResolucion.getDate()
                            };
                        }
                        if (tramiteGeneral.fechaNotificacion) {
                            tramiteGeneral.fechaNotificacion = {
                                year: tramiteGeneral.fechaNotificacion.getFullYear(),
                                month: tramiteGeneral.fechaNotificacion.getMonth() + 1,
                                day: tramiteGeneral.fechaNotificacion.getDate()
                            };
                        }
                        this.ngbModalRef = this.tramiteGeneralModalRef(component, tramiteGeneral);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const general = new TramiteGeneral();
                    general.clienteId = +idCliente;
                    general.clienteId = Number.isNaN(general.clienteId) ? null : general.clienteId;
                    this.ngbModalRef = this.tramiteGeneralModalRef(component, general);
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
