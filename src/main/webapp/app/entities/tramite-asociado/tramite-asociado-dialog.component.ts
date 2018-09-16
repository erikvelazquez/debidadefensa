import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TramiteAsociado } from './tramite-asociado.model';
import { TramiteAsociadoPopupService } from './tramite-asociado-popup.service';
import { TramiteAsociadoService } from './tramite-asociado.service';
import { TramiteGeneral } from '../tramite-general';
import { TramiteMigratorio } from '../tramite-migratorio';

@Component({
    selector: 'jhi-tramite-asociado-dialog',
    templateUrl: './tramite-asociado-dialog.component.html'
})
export class TramiteAsociadoDialogComponent implements OnInit {

    tramiteAsociado: TramiteAsociado;
    tramiteGenerals: TramiteGeneral[];
    tramiteG: TramiteGeneral;
    tramiteMigratorios: TramiteMigratorio[];
    tramiteM: TramiteMigratorio;
    tiposervicio: number;
    esGeneral: boolean;
    esMigratorio: boolean;
    isSaving: boolean;
    tramitesA: TramiteAsociado[];

    constructor(
        public activeModal: NgbActiveModal,
        private tramiteAsociadoService: TramiteAsociadoService,
        private eventManager: JhiEventManager,
        private eventManager2: JhiEventManager,
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.esGeneral = this.tiposervicio === 1003 ? true : false;
        this.esMigratorio = this.tiposervicio === 1002 ? true : false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.tramitesA = Array<TramiteAsociado>();
        switch (this.tiposervicio) {
            case 1002: {
            // Migratorio
                this.tramiteMigratorios.forEach((entry) => {
                    if (entry.seleccionado === true) {
                        this.tramitesA.push(new TramiteAsociado(null, this.tramiteM.id, entry.id, this.tiposervicio, this.tiposervicio));
                    }
                });
                break;
            }
            case 1003: {
                // General
                this.tramiteGenerals.forEach((entry) => {
                    if (entry.seleccionado === true) {
                        this.tramitesA.push(new TramiteAsociado(null, this.tramiteG.id, entry.id, this.tiposervicio, this.tiposervicio));
                    }
                });
                break;
            }
            default: {
            // statements;
            break;
            }
        }

        this.subscribeToSaveResponse(this.tramiteAsociadoService.create(this.tramitesA));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TramiteAsociado>>) {
        result.subscribe((res: HttpResponse<TramiteAsociado>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TramiteAsociado) {
        this.eventManager.broadcast({ name: 'tramiteGeneralListModification', content: 'OK'});
        this.eventManager2.broadcast({ name: 'tramiteMigratorioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tramite-asociado-popup',
    template: ''
})
export class TramiteAsociadoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tramiteAsociadoPopupService: TramiteAsociadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tramiteAsociadoPopupService
                    .open(TramiteAsociadoDialogComponent as Component, params['id'], params['tiposervicio']);
            } else {
                this.tramiteAsociadoPopupService
                    .open(TramiteAsociadoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
