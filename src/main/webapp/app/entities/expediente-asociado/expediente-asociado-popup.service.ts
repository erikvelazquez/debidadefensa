import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ExpedienteAsociado } from './expediente-asociado.model';
import { ExpedienteAsociadoService } from './expediente-asociado.service';

@Injectable()
export class ExpedienteAsociadoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private expedienteAsociadoService: ExpedienteAsociadoService

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
                this.expedienteAsociadoService.find(id)
                    .subscribe((expedienteAsociadoResponse: HttpResponse<ExpedienteAsociado>) => {
                        const expedienteAsociado: ExpedienteAsociado = expedienteAsociadoResponse.body;
                        expedienteAsociado.fechaSentencia = this.datePipe
                            .transform(expedienteAsociado.fechaSentencia, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.expedienteAsociadoModalRef(component, expedienteAsociado);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.expedienteAsociadoModalRef(component, new ExpedienteAsociado());
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
