import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TramiteAsociado } from './tramite-asociado.model';
import { TramiteAsociadoService } from './tramite-asociado.service';
import { TramiteGeneral } from '../tramite-general/tramite-general.model';
import {TramiteGeneralService } from '../tramite-general/tramite-general.service'

@Injectable()
export class TramiteAsociadoPopupService {
    private ngbModalRef: NgbModalRef;
    predicate: any;
    reverse: any;
    tramiteGenerals: TramiteGeneral[];
    tramiteG: TramiteGeneral;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tramiteAsociadoService: TramiteAsociadoService,        
        private tramiteGeneralService: TramiteGeneralService,

    ) {        
        this.ngbModalRef = null;
        this.predicate = 'id';
        this.reverse = true;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    
    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            /*this.tramiteGeneralService.query({
                page: 0,
                size: 100,
                sort: this.sort()
            }).subscribe((res: HttpResponse<TramiteGeneral[]>) => {
                    this.tramiteGenerals = res.body;
                    this.ngbModalRef = this.tramiteAsociadoModalRef(component, this.tramiteGenerals);
                    resolve(this.ngbModalRef);
            });*/

            this.tramiteGeneralService.findByFaltantes(id)
            .subscribe(
                (res: HttpResponse<TramiteGeneral[]>) => {
                    this.tramiteGenerals = res.body;
                    this.tramiteGeneralService.find(id)
                    .subscribe(
                        (res: HttpResponse<TramiteGeneral>) => {
                            this.tramiteG = res.body;
                            this.ngbModalRef = this.tramiteAsociadoModalRef(component, this.tramiteGenerals, this.tramiteG);
                            resolve(this.ngbModalRef);
                    });
            });

            

           /* if (id) {
                this.tramiteAsociadoService.find(id)
                    .subscribe((tramiteAsociadoResponse: HttpResponse<TramiteAsociado>) => {
                        const tramiteAsociado: TramiteAsociado = tramiteAsociadoResponse.body;
                        this.ngbModalRef = this.tramiteAsociadoModalRef(component, tramiteAsociado);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tramiteAsociadoModalRef(component, new TramiteAsociado());
                    resolve(this.ngbModalRef);
                }, 0);
            }*/
        });
    }

    tramiteAsociadoModalRef(component: Component, tramiteGenerals: TramiteGeneral[], tramiteG: TramiteGeneral): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tramiteGenerals = tramiteGenerals;
        modalRef.componentInstance.tramiteG = tramiteG;
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
