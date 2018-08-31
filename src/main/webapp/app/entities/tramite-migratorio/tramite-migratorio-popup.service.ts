import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TramiteMigratorio } from './tramite-migratorio.model';
import { TramiteMigratorioService } from './tramite-migratorio.service';

@Injectable()
export class TramiteMigratorioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tramiteMigratorioService: TramiteMigratorioService

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
                this.tramiteMigratorioService.find(id)
                    .subscribe((tramiteMigratorioResponse: HttpResponse<TramiteMigratorio>) => {
                        const tramiteMigratorio: TramiteMigratorio = tramiteMigratorioResponse.body;
                        if (tramiteMigratorio.fechaIngreso) {
                            tramiteMigratorio.fechaIngreso = {
                                year: tramiteMigratorio.fechaIngreso.getFullYear(),
                                month: tramiteMigratorio.fechaIngreso.getMonth() + 1,
                                day: tramiteMigratorio.fechaIngreso.getDate()
                            };
                        }
                        if (tramiteMigratorio.fechaNotificacion) {
                            tramiteMigratorio.fechaNotificacion = {
                                year: tramiteMigratorio.fechaNotificacion.getFullYear(),
                                month: tramiteMigratorio.fechaNotificacion.getMonth() + 1,
                                day: tramiteMigratorio.fechaNotificacion.getDate()
                            };
                        }
                        if (tramiteMigratorio.fechaResolucion) {
                            tramiteMigratorio.fechaResolucion = {
                                year: tramiteMigratorio.fechaResolucion.getFullYear(),
                                month: tramiteMigratorio.fechaResolucion.getMonth() + 1,
                                day: tramiteMigratorio.fechaResolucion.getDate()
                            };
                        }
                        this.ngbModalRef = this.tramiteMigratorioModalRef(component, tramiteMigratorio);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const migratorio = new TramiteMigratorio();
                    migratorio.clienteId = +idCliente;
                    this.ngbModalRef = this.tramiteMigratorioModalRef(component, migratorio);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tramiteMigratorioModalRef(component: Component, tramiteMigratorio: TramiteMigratorio): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tramiteMigratorio = tramiteMigratorio;
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
