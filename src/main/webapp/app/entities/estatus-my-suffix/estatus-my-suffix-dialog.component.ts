import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EstatusMySuffix } from './estatus-my-suffix.model';
import { EstatusMySuffixPopupService } from './estatus-my-suffix-popup.service';
import { EstatusMySuffixService } from './estatus-my-suffix.service';
import { TipoServicioMySuffix, TipoServicioMySuffixService } from '../tipo-servicio-my-suffix';

@Component({
    selector: 'jhi-estatus-my-suffix-dialog',
    templateUrl: './estatus-my-suffix-dialog.component.html'
})
export class EstatusMySuffixDialogComponent implements OnInit {

    estatus: EstatusMySuffix;
    isSaving: boolean;

    tiposervicios: TipoServicioMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private estatusService: EstatusMySuffixService,
        private tipoServicioService: TipoServicioMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipoServicioService.query()
            .subscribe((res: HttpResponse<TipoServicioMySuffix[]>) => { this.tiposervicios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<EstatusMySuffix>>) {
        result.subscribe((res: HttpResponse<EstatusMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EstatusMySuffix) {
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

    trackTipoServicioById(index: number, item: TipoServicioMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-estatus-my-suffix-popup',
    template: ''
})
export class EstatusMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estatusPopupService: EstatusMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.estatusPopupService
                    .open(EstatusMySuffixDialogComponent as Component, params['id']);
            } else {
                this.estatusPopupService
                    .open(EstatusMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
