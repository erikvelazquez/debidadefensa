import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoParteMySuffix } from './tipo-parte-my-suffix.model';
import { TipoParteMySuffixPopupService } from './tipo-parte-my-suffix-popup.service';
import { TipoParteMySuffixService } from './tipo-parte-my-suffix.service';

@Component({
    selector: 'jhi-tipo-parte-my-suffix-dialog',
    templateUrl: './tipo-parte-my-suffix-dialog.component.html'
})
export class TipoParteMySuffixDialogComponent implements OnInit {

    tipoParte: TipoParteMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tipoParteService: TipoParteMySuffixService,
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<TipoParteMySuffix>>) {
        result.subscribe((res: HttpResponse<TipoParteMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoParteMySuffix) {
        this.eventManager.broadcast({ name: 'tipoParteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tipo-parte-my-suffix-popup',
    template: ''
})
export class TipoParteMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoPartePopupService: TipoParteMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoPartePopupService
                    .open(TipoParteMySuffixDialogComponent as Component, params['id']);
            } else {
                this.tipoPartePopupService
                    .open(TipoParteMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
