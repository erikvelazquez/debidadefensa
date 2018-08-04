import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { FechasServicio } from './fechas-servicio.model';
import { FechasServicioService } from './fechas-servicio.service';

@Injectable()
export class FechasServicioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private fechasServicioService: FechasServicioService

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
                this.fechasServicioService.find(id)
                    .subscribe((fechasServicioResponse: HttpResponse<FechasServicio>) => {
                        const fechasServicio: FechasServicio = fechasServicioResponse.body;
                        if (fechasServicio.fecha) {
                            fechasServicio.fecha = {
                                year: fechasServicio.fecha.getFullYear(),
                                month: fechasServicio.fecha.getMonth() + 1,
                                day: fechasServicio.fecha.getDate()
                            };
                        }
                        this.ngbModalRef = this.fechasServicioModalRef(component, fechasServicio);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    let fechas = new FechasServicio();
                    fechas.tipoServicioId = +tiposervicio;
                    switch(fechas.tipoServicioId) { 
                        case 1001: { 
                           //Expediente; 
                           fechas.expedienteId = +idTramite;
                           break; 
                        } 
                        case 1002: { 
                           //Migratorio; 
                           fechas.tramiteMigratorioId = +idTramite;
                           break; 
                        } 
                        case 1003: { 
                            //General; 
                            fechas.tramiteGeneralId = +idTramite;
                            break; 
                         } 
                        default: { 
                           //statements; 
                           break; 
                        } 
                     } 
                    this.ngbModalRef = this.fechasServicioModalRef(component, fechas);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    fechasServicioModalRef(component: Component, fechasServicio: FechasServicio): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.fechasServicio = fechasServicio;
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
