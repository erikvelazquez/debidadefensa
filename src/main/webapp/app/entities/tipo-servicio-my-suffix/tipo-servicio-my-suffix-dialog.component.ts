import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoServicioMySuffix } from './tipo-servicio-my-suffix.model';
import { TipoServicioMySuffixPopupService } from './tipo-servicio-my-suffix-popup.service';
import { TipoServicioMySuffixService } from './tipo-servicio-my-suffix.service';

@Component({
    selector: 'jhi-tipo-servicio-my-suffix-dialog',
    templateUrl: './tipo-servicio-my-suffix-dialog.component.html'
})
export class TipoServicioMySuffixDialogComponent implements OnInit {

    tipoServicio: TipoServicioMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tipoServicioService: TipoServicioMySuffixService,
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
        if (this.tipoServicio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipoServicioService.update(this.tipoServicio));
        } else {
            this.subscribeToSaveResponse(
                this.tipoServicioService.create(this.tipoServicio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TipoServicioMySuffix>>) {
        result.subscribe((res: HttpResponse<TipoServicioMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoServicioMySuffix) {
        this.eventManager.broadcast({ name: 'tipoServicioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tipo-servicio-my-suffix-popup',
    template: ''
})
export class TipoServicioMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoServicioPopupService: TipoServicioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoServicioPopupService
                    .open(TipoServicioMySuffixDialogComponent as Component, params['id']);
            } else {
                this.tipoServicioPopupService
                    .open(TipoServicioMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
