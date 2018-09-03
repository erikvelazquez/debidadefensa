import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TramiteGeneral } from '../tramite-general/tramite-general.model';
import {TramiteGeneralService } from '../tramite-general/tramite-general.service';
import { TramiteMigratorioService, TramiteMigratorio } from '../tramite-migratorio';

@Injectable()
export class TramiteAsociadoPopupService {
    ngbModalRef: NgbModalRef;
    predicate: any;
    reverse: any;
    tramiteGenerals: TramiteGeneral[];
    tramiteG: TramiteGeneral;

    tramiteMigratorios: TramiteMigratorio[];
    tramiteM: TramiteMigratorio;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tramiteGeneralService: TramiteGeneralService,
        private tramiteMigratorioService: TramiteMigratorioService,

    ) {
        this.ngbModalRef = null;
        this.predicate = 'id';
        this.reverse = true;

        this.tramiteGenerals = new Array<TramiteGeneral>();
        this.tramiteG = new TramiteGeneral();

        this.tramiteMigratorios = new Array<TramiteGeneral>();
        this.tramiteM = new TramiteGeneral();
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    open(component: Component, id?: number, tiposervicio?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            this.tramiteGenerals = new Array<TramiteGeneral>();
            this.tramiteG = new TramiteGeneral();
            this.tramiteMigratorios = new Array<TramiteGeneral>();
            this.tramiteM = new TramiteGeneral();
            tiposervicio = +tiposervicio;
            switch (tiposervicio) {
                case 1002: {
                // Migratorio
                this.tramiteMigratorioService.findByFaltantes(id).subscribe(
                    (res: HttpResponse<TramiteMigratorio[]>) => {
                        this.tramiteMigratorios = res.body;
                        this.tramiteMigratorioService.find(id).subscribe(
                            (ress: HttpResponse<TramiteMigratorio> ) => {
                                this.tramiteM = ress.body;
                                this.ngbModalRef = this.tramiteAsociadoModalRef(component
                                    , this.tramiteGenerals
                                    , this.tramiteG
                                    , this.tramiteMigratorios
                                    , this.tramiteM, tiposervicio);
                                resolve(this.ngbModalRef);
                        });
                });
                break;
                }
                case 1003: {
                    // General
                    this.tramiteGeneralService.findByFaltantes(id).subscribe(
                        (res: HttpResponse<TramiteGeneral[]>) => {
                            this.tramiteGenerals = res.body;
                            this.tramiteGeneralService.find(id).subscribe(
                                (ress: HttpResponse<TramiteGeneral>) => {
                                    this.tramiteG = ress.body;
                                    this.ngbModalRef = this.tramiteAsociadoModalRef(component
                                        , this.tramiteGenerals
                                        , this.tramiteG
                                        , this.tramiteMigratorios
                                        , this.tramiteM
                                        , tiposervicio);
                                    resolve(this.ngbModalRef);
                            });
                    });
                    break;
                }
                default: {
                // statements;
                }
            }
        });
    }

    tramiteAsociadoModalRef(component: Component, tramiteGenerals: TramiteGeneral[],
        tramiteG: TramiteGeneral, tramiteMigratorios: TramiteMigratorio[],
        tramiteM: TramiteMigratorio, tiposervicio: number): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tramiteGenerals = tramiteGenerals;
        modalRef.componentInstance.tramiteG = tramiteG;
        modalRef.componentInstance.tramiteMigratorios = tramiteMigratorios;
        modalRef.componentInstance.tramiteM = tramiteM;
        modalRef.componentInstance.tiposervicio = tiposervicio;

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
