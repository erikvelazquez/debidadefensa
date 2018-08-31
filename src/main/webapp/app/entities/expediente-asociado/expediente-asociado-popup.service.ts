import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ExpedienteAsociado } from './expediente-asociado.model';
import { ExpedienteAsociadoService } from './expediente-asociado.service';

@Injectable()
export class ExpedienteAsociadoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private expedienteAsociadoService: ExpedienteAsociadoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, idExpediente?: number, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.expedienteAsociadoService.find(id)
                    .subscribe((expedienteAsociadoResponse: HttpResponse<ExpedienteAsociado>) => {
                        const expedienteAsociado: ExpedienteAsociado = expedienteAsociadoResponse.body;
                        if (expedienteAsociado.fechaSentencia) {
                            expedienteAsociado.fechaSentencia = {
                                year: expedienteAsociado.fechaSentencia.getFullYear(),
                                month: expedienteAsociado.fechaSentencia.getMonth() + 1,
                                day: expedienteAsociado.fechaSentencia.getDate()
                            };
                        }
                        this.ngbModalRef = this.expedienteAsociadoModalRef(component, expedienteAsociado);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const expedienteAsociado = new ExpedienteAsociado();
                    expedienteAsociado.expedienteId = +idExpediente;
                    this.ngbModalRef = this.expedienteAsociadoModalRef(component, expedienteAsociado);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    expedienteAsociadoModalRef(component: Component, expedienteAsociado: ExpedienteAsociado): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.expedienteAsociado = expedienteAsociado;
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
