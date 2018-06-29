import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Documentos } from './documentos.model';
import { DocumentosService } from './documentos.service';

@Injectable()
export class DocumentosPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private documentosService: DocumentosService

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
                this.documentosService.find(id)
                    .subscribe((documentosResponse: HttpResponse<Documentos>) => {
                        const documentos: Documentos = documentosResponse.body;
                        if (documentos.fecha) {
                            documentos.fecha = {
                                year: documentos.fecha.getFullYear(),
                                month: documentos.fecha.getMonth() + 1,
                                day: documentos.fecha.getDate()
                            };
                        }
                        this.ngbModalRef = this.documentosModalRef(component, documentos);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.documentosModalRef(component, new Documentos());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    documentosModalRef(component: Component, documentos: Documentos): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.documentos = documentos;
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
