import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TramiteMigratorio } from './tramite-migratorio.model';
import { TramiteMigratorioService } from './tramite-migratorio.service';

@Injectable()
export class TramiteMigratorioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tramiteMigratorioService: TramiteMigratorioService

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
                this.tramiteMigratorioService.find(id)
                    .subscribe((tramiteMigratorioResponse: HttpResponse<TramiteMigratorio>) => {
                        const tramiteMigratorio: TramiteMigratorio = tramiteMigratorioResponse.body;
                        tramiteMigratorio.fechaIngreso = this.datePipe
                            .transform(tramiteMigratorio.fechaIngreso, 'yyyy-MM-ddTHH:mm:ss');
                        tramiteMigratorio.fechaNotificacion = this.datePipe
                            .transform(tramiteMigratorio.fechaNotificacion, 'yyyy-MM-ddTHH:mm:ss');
                        tramiteMigratorio.fechaResolucion = this.datePipe
                            .transform(tramiteMigratorio.fechaResolucion, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.tramiteMigratorioModalRef(component, tramiteMigratorio);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tramiteMigratorioModalRef(component, new TramiteMigratorio());
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
