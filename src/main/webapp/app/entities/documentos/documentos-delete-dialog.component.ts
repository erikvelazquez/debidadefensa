import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Documentos } from './documentos.model';
import { DocumentosPopupService } from './documentos-popup.service';
import { DocumentosService } from './documentos.service';

@Component({
    selector: 'jhi-documentos-delete-dialog',
    templateUrl: './documentos-delete-dialog.component.html'
})
export class DocumentosDeleteDialogComponent {

    documentos: Documentos;

    constructor(
        private documentosService: DocumentosService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private eventManager2: JhiEventManager,
        private eventManager3: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentosService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'expedienteListModification', content: 'Deleted an documentos'});
            this.eventManager2.broadcast({name: 'tramiteMigratorioListModification', content: 'Deleted an documentos'});
            this.eventManager3.broadcast({name: 'tramiteGeneralListModification', content: 'Deleted an documentos'});
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-documentos-delete-popup',
    template: ''
})
export class DocumentosDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentosPopupService: DocumentosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.documentosPopupService
                .open(DocumentosDeleteDialogComponent as Component, params['idTramite'], params['tiposervicio'], params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
