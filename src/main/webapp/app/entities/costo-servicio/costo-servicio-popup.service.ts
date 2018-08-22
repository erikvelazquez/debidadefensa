import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CostoServicio } from './costo-servicio.model';
import { CostoServicioService } from './costo-servicio.service';

@Injectable()
export class CostoServicioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private costoServicioService: CostoServicioService

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
                this.costoServicioService.find(id)
                    .subscribe((costoServicioResponse: HttpResponse<CostoServicio>) => {
                        const costoServicio: CostoServicio = costoServicioResponse.body;
                        this.ngbModalRef = this.costoServicioModalRef(component, costoServicio);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    let costo = new CostoServicio();
                    costo.tipoServicioId = +tiposervicio;
                    costo.costo = 0;
                    switch(costo.tipoServicioId) { 
                        case 1001: { 
                           //Expediente; 
                           costo.expedienteId = +idTramite;
                           break; 
                        } 
                        case 1002: { 
                           //Migratorio; 
                           costo.tramiteMigratorioId = +idTramite;
                           break; 
                        } 
                        case 1003: { 
                            //General; 
                            costo.tramiteGeneralId = +idTramite;
                            break; 
                         } 
                        default: { 
                           //statements; 
                           break; 
                        } 
                     } 
                    this.ngbModalRef = this.costoServicioModalRef(component, costo);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    costoServicioModalRef(component: Component, costoServicio: CostoServicio): NgbModalRef {
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
