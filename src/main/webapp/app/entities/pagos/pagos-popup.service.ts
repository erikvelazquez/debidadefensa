import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Pagos } from './pagos.model';
import { PagosService } from './pagos.service';

@Injectable()
export class PagosPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private pagosService: PagosService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, idTramite?: number, tiposervicio?: number, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.pagosService.find(id)
                    .subscribe((pagosResponse: HttpResponse<Pagos>) => {
                        const pagos: Pagos = pagosResponse.body;
                        if (pagos.fecha) {
                            pagos.fecha = {
                                year: pagos.fecha.getFullYear(),
                                month: pagos.fecha.getMonth() + 1,
                                day: pagos.fecha.getDate()
                            };
                        }
                        this.ngbModalRef = this.pagosModalRef(component, pagos);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const pago = new Pagos();
                    pago.tipoServicioId = +tiposervicio;
                    pago.cantidad = 0;
                    switch (pago.tipoServicioId) {
                        case 1001: {
                           // Expediente
                           pago.expedienteId = +idTramite;
                           break;
                        }
                        case 1002: {
                           // Migratorio
                           pago.tramiteMigratorioId = +idTramite;
                           break;
                        }
                        case 1003: {
                            // General
                            pago.tramiteGeneralId = +idTramite;
                            break;
                         }
                        default: {
                           // statements
                           break;
                        }
                     }
                    this.ngbModalRef = this.pagosModalRef(component, pago);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pagosModalRef(component: Component, pagos: Pagos): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pagos = pagos;
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
