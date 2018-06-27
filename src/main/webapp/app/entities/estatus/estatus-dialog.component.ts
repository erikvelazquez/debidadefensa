import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Estatus } from './estatus.model';
import { EstatusPopupService } from './estatus-popup.service';
import { EstatusService } from './estatus.service';
import { TipoServicio, TipoServicioService } from '../tipo-servicio';

@Component({
    selector: 'jhi-estatus-dialog',
    templateUrl: './estatus-dialog.component.html'
})
export class EstatusDialogComponent implements OnInit {

    estatus: Estatus;
    isSaving: boolean;

    tiposervicios: TipoServicio[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private estatusService: EstatusService,
        private tipoServicioService: TipoServicioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipoServicioService.query()
            .subscribe((res: HttpResponse<TipoServicio[]>) => { this.tiposervicios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.estatus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.estatusService.update(this.estatus));
        } else {
            this.subscribeToSaveResponse(
                this.estatusService.create(this.estatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Estatus>>) {
        result.subscribe((res: HttpResponse<Estatus>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Estatus) {
        this.eventManager.broadcast({ name: 'estatusListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipoServicioById(index: number, item: TipoServicio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-estatus-popup',
    template: ''
})
export class EstatusPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estatusPopupService: EstatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.estatusPopupService
                    .open(EstatusDialogComponent as Component, params['id']);
            } else {
                this.estatusPopupService
                    .open(EstatusDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
