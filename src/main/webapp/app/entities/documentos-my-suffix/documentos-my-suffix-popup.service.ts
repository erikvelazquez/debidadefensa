import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DocumentosMySuffix } from './documentos-my-suffix.model';
import { DocumentosMySuffixService } from './documentos-my-suffix.service';

@Injectable()
export class DocumentosMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private documentosService: DocumentosMySuffixService

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
                    .subscribe((documentosResponse: HttpResponse<DocumentosMySuffix>) => {
                        const documentos: DocumentosMySuffix = documentosResponse.body;
                        documentos.fecha = this.datePipe
                            .transform(documentos.fecha, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.documentosModalRef(component, documentos);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.documentosModalRef(component, new DocumentosMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    documentosModalRef(component: Component, documentos: DocumentosMySuffix): NgbModalRef {
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
