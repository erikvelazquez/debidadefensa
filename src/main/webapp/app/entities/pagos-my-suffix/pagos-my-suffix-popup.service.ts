import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PagosMySuffix } from './pagos-my-suffix.model';
import { PagosMySuffixService } from './pagos-my-suffix.service';

@Injectable()
export class PagosMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private pagosService: PagosMySuffixService

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
                this.pagosService.find(id)
                    .subscribe((pagosResponse: HttpResponse<PagosMySuffix>) => {
                        const pagos: PagosMySuffix = pagosResponse.body;
                        pagos.fecha = this.datePipe
                            .transform(pagos.fecha, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.pagosModalRef(component, pagos);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pagosModalRef(component, new PagosMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pagosModalRef(component: Component, pagos: PagosMySuffix): NgbModalRef {
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
