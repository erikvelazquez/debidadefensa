import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoParte } from './tipo-parte.model';
import { TipoPartePopupService } from './tipo-parte-popup.service';
import { TipoParteService } from './tipo-parte.service';

@Component({
    selector: 'jhi-tipo-parte-dialog',
    templateUrl: './tipo-parte-dialog.component.html'
})
export class TipoParteDialogComponent implements OnInit {

    tipoParte: TipoParte;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tipoParteService: TipoParteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tipoParte.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipoParteService.update(this.tipoParte));
        } else {
            this.subscribeToSaveResponse(
                this.tipoParteService.create(this.tipoParte));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TipoParte>>) {
        result.subscribe((res: HttpResponse<TipoParte>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoParte) {
        this.eventManager.broadcast({ name: 'tipoParteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tipo-parte-popup',
    template: ''
})
export class TipoPartePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoPartePopupService: TipoPartePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoPartePopupService
                    .open(TipoParteDialogComponent as Component, params['id']);
            } else {
                this.tipoPartePopupService
                    .open(TipoParteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
