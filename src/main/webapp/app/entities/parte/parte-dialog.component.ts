import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Parte } from './parte.model';
import { PartePopupService } from './parte-popup.service';
import { ParteService } from './parte.service';
import { Expediente, ExpedienteService } from '../expediente';
import { TipoParte, TipoParteService } from '../tipo-parte';

@Component({
    selector: 'jhi-parte-dialog',
    templateUrl: './parte-dialog.component.html'
})
export class ParteDialogComponent implements OnInit {

    parte: Parte;
    isSaving: boolean;

    expedientes: Expediente[];

    tipopartes: TipoParte[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private parteService: ParteService,
        private expedienteService: ExpedienteService,
        private tipoParteService: TipoParteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.expedienteService.query()
            .subscribe((res: HttpResponse<Expediente[]>) => { this.expedientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tipoParteService
            .query({filter: 'parte-is-null'})
            .subscribe((res: HttpResponse<TipoParte[]>) => {
                if (!this.parte.tipoParteId) {
                    this.tipopartes = res.body;
                } else {
                    this.tipoParteService
                        .find(this.parte.tipoParteId)
                        .subscribe((subRes: HttpResponse<TipoParte>) => {
                            this.tipopartes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.parte.id !== undefined) {
            this.subscribeToSaveResponse(
                this.parteService.update(this.parte));
        } else {
            this.subscribeToSaveResponse(
                this.parteService.create(this.parte));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Parte>>) {
        result.subscribe((res: HttpResponse<Parte>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Parte) {
        this.eventManager.broadcast({ name: 'parteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackExpedienteById(index: number, item: Expediente) {
        return item.id;
    }

    trackTipoParteById(index: number, item: TipoParte) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-parte-popup',
    template: ''
})
export class PartePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private partePopupService: PartePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.partePopupService
                    .open(ParteDialogComponent as Component, params['id']);
            } else {
                this.partePopupService
                    .open(ParteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
