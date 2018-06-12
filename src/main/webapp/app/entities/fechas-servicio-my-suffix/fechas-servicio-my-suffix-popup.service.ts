import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FechasServicioMySuffix } from './fechas-servicio-my-suffix.model';
import { FechasServicioMySuffixService } from './fechas-servicio-my-suffix.service';

@Injectable()
export class FechasServicioMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private fechasServicioService: FechasServicioMySuffixService

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
                this.fechasServicioService.find(id)
                    .subscribe((fechasServicioResponse: HttpResponse<FechasServicioMySuffix>) => {
                        const fechasServicio: FechasServicioMySuffix = fechasServicioResponse.body;
                        fechasServicio.fecha = this.datePipe
                            .transform(fechasServicio.fecha, 'yyyy-MM-ddTHH:mm:ss');
                        if (fechasServicio.hora) {
                            fechasServicio.hora = {
                                year: fechasServicio.hora.getFullYear(),
                                month: fechasServicio.hora.getMonth() + 1,
                                day: fechasServicio.hora.getDate()
                            };
                        }
                        this.ngbModalRef = this.fechasServicioModalRef(component, fechasServicio);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.fechasServicioModalRef(component, new FechasServicioMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    fechasServicioModalRef(component: Component, fechasServicio: FechasServicioMySuffix): NgbModalRef {
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
