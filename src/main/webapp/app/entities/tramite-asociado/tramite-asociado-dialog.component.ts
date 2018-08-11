import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TramiteAsociado } from './tramite-asociado.model';
import { TramiteAsociadoPopupService } from './tramite-asociado-popup.service';
import { TramiteAsociadoService } from './tramite-asociado.service';
import { TramiteGeneral, TramiteGeneralService } from '../tramite-general';

@Component({
    selector: 'jhi-tramite-asociado-dialog',
    templateUrl: './tramite-asociado-dialog.component.html'
})
export class TramiteAsociadoDialogComponent implements OnInit {

    tramiteAsociado: TramiteAsociado;
    tramiteGenerals: TramiteGeneral[];
    tramiteG: TramiteGeneral;
    isSaving: boolean;    
    tramitesA: TramiteAsociado[];
    constructor(
        public activeModal: NgbActiveModal,
        private tramiteAsociadoService: TramiteAsociadoService,
        private eventManager: JhiEventManager,
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
        this.tramitesA = Array<TramiteAsociado>();
        this.tramiteGenerals.forEach((entry) => {
            if (entry.seleccionado == true){                
                this.tramitesA.push(new TramiteAsociado(null, this.tramiteG.id, entry.id, 1003, 1003));
            } 
        });


        this.subscribeToSaveResponse(
            this.tramiteAsociadoService.create(this.tramitesA));
       /* if (this.tramiteAsociado.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tramiteAsociadoService.update(this.tramiteAsociado));
        } else {
            this.subscribeToSaveResponse(
                this.tramiteAsociadoService.create(this.tramiteAsociado));
        }*/
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TramiteAsociado>>) {
        result.subscribe((res: HttpResponse<TramiteAsociado>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TramiteAsociado) {
        this.eventManager.broadcast({ name: 'tramiteGeneralListModification', content: 'OK'});
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
                    .open(TramiteAsociadoDialogComponent as Component, params['id']);
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
