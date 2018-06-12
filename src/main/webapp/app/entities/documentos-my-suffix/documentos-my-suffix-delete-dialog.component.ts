import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentosMySuffix } from './documentos-my-suffix.model';
import { DocumentosMySuffixPopupService } from './documentos-my-suffix-popup.service';
import { DocumentosMySuffixService } from './documentos-my-suffix.service';

@Component({
    selector: 'jhi-documentos-my-suffix-delete-dialog',
    templateUrl: './documentos-my-suffix-delete-dialog.component.html'
})
export class DocumentosMySuffixDeleteDialogComponent {

    documentos: DocumentosMySuffix;

    constructor(
        private documentosService: DocumentosMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentosService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'documentosListModification',
                content: 'Deleted an documentos'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-documentos-my-suffix-delete-popup',
    template: ''
})
export class DocumentosMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentosPopupService: DocumentosMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.documentosPopupService
                .open(DocumentosMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
