import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TramiteAsociado } from './tramite-asociado.model';
import { TramiteAsociadoPopupService } from './tramite-asociado-popup.service';
import { TramiteAsociadoService } from './tramite-asociado.service';

@Component({
    selector: 'jhi-tramite-asociado-delete-dialog',
    templateUrl: './tramite-asociado-delete-dialog.component.html'
})
export class TramiteAsociadoDeleteDialogComponent {
    id: number;
    tiposervicio: number;
    idAsociado: number;

    constructor(
        private tramiteAsociadoService: TramiteAsociadoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private eventManager2: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete() {
        this.tramiteAsociadoService.delete(this.id, this.tiposervicio, this.idAsociado).subscribe((response) => {
            this.eventManager.broadcast({ name: 'tramiteGeneralListModification', content: 'OK'});
            this.eventManager2.broadcast({ name: 'tramiteMigratorioListModification', content: 'OK'});

            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tramite-asociado-delete-popup',
    template: ''
})
export class TramiteAsociadoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tramiteAsociadoPopupService: TramiteAsociadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tramiteAsociadoPopupService
                .openDelete(TramiteAsociadoDeleteDialogComponent as Component, params['id'], params['tiposervicio'], params['idasociado']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
