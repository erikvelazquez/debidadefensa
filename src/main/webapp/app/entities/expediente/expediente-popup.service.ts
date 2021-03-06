import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Expediente } from './expediente.model';
import { ExpedienteService } from './expediente.service';

@Injectable()
export class ExpedientePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private expedienteService: ExpedienteService

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
                this.expedienteService.find(id)
                    .subscribe((expedienteResponse: HttpResponse<Expediente>) => {
                        const expediente: Expediente = expedienteResponse.body;
                        if (expediente.fechaAlta) {
                            expediente.fechaAlta = {
                                year: expediente.fechaAlta.getFullYear(),
                                month: expediente.fechaAlta.getMonth() + 1,
                                day: expediente.fechaAlta.getDate()
                            };
                        }
                        if (expediente.fechaSentencia) {
                            expediente.fechaSentencia = {
                                year: expediente.fechaSentencia.getFullYear(),
                                month: expediente.fechaSentencia.getMonth() + 1,
                                day: expediente.fechaSentencia.getDate()
                            };
                        }
                        this.ngbModalRef = this.expedienteModalRef(component, expediente);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const expediente = new Expediente();
                    const date = new Date();
                    expediente.fechaAlta = {
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate()
                    };
                    expediente.clienteId = + idCliente;
                    expediente.clienteId = Number.isNaN(expediente.clienteId) ? null : expediente.clienteId;
                    this.ngbModalRef = this.expedienteModalRef(component, expediente);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    expedienteModalRef(component: Component, expediente: Expediente): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.expediente = expediente;
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
