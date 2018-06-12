import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ParteMySuffix } from './parte-my-suffix.model';
import { ParteMySuffixPopupService } from './parte-my-suffix-popup.service';
import { ParteMySuffixService } from './parte-my-suffix.service';
import { ExpedienteMySuffix, ExpedienteMySuffixService } from '../expediente-my-suffix';
import { TipoParteMySuffix, TipoParteMySuffixService } from '../tipo-parte-my-suffix';

@Component({
    selector: 'jhi-parte-my-suffix-dialog',
    templateUrl: './parte-my-suffix-dialog.component.html'
})
export class ParteMySuffixDialogComponent implements OnInit {

    parte: ParteMySuffix;
    isSaving: boolean;

    expedientes: ExpedienteMySuffix[];

    tipopartes: TipoParteMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private parteService: ParteMySuffixService,
        private expedienteService: ExpedienteMySuffixService,
        private tipoParteService: TipoParteMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.expedienteService.query()
            .subscribe((res: HttpResponse<ExpedienteMySuffix[]>) => { this.expedientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tipoParteService
            .query({filter: 'parte-is-null'})
            .subscribe((res: HttpResponse<TipoParteMySuffix[]>) => {
                if (!this.parte.tipoParteId) {
                    this.tipopartes = res.body;
                } else {
                    this.tipoParteService
                        .find(this.parte.tipoParteId)
                        .subscribe((subRes: HttpResponse<TipoParteMySuffix>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<ParteMySuffix>>) {
        result.subscribe((res: HttpResponse<ParteMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ParteMySuffix) {
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

    trackExpedienteById(index: number, item: ExpedienteMySuffix) {
        return item.id;
    }

    trackTipoParteById(index: number, item: TipoParteMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-parte-my-suffix-popup',
    template: ''
})
export class ParteMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private partePopupService: ParteMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.partePopupService
                    .open(ParteMySuffixDialogComponent as Component, params['id']);
            } else {
                this.partePopupService
                    .open(ParteMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
