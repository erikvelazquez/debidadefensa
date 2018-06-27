import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoServicio } from './tipo-servicio.model';
import { TipoServicioPopupService } from './tipo-servicio-popup.service';
import { TipoServicioService } from './tipo-servicio.service';

@Component({
    selector: 'jhi-tipo-servicio-dialog',
    templateUrl: './tipo-servicio-dialog.component.html'
})
export class TipoServicioDialogComponent implements OnInit {

    tipoServicio: TipoServicio;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tipoServicioService: TipoServicioService,
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<TipoServicio>>) {
        result.subscribe((res: HttpResponse<TipoServicio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoServicio) {
        this.eventManager.broadcast({ name: 'tipoServicioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tipo-servicio-popup',
    template: ''
})
export class TipoServicioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoServicioPopupService: TipoServicioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoServicioPopupService
                    .open(TipoServicioDialogComponent as Component, params['id']);
            } else {
                this.tipoServicioPopupService
                    .open(TipoServicioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
