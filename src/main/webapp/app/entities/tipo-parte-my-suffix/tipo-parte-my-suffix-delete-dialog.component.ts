import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoParteMySuffix } from './tipo-parte-my-suffix.model';
import { TipoParteMySuffixPopupService } from './tipo-parte-my-suffix-popup.service';
import { TipoParteMySuffixService } from './tipo-parte-my-suffix.service';

@Component({
    selector: 'jhi-tipo-parte-my-suffix-delete-dialog',
    templateUrl: './tipo-parte-my-suffix-delete-dialog.component.html'
})
export class TipoParteMySuffixDeleteDialogComponent {

    tipoParte: TipoParteMySuffix;

    constructor(
        private tipoParteService: TipoParteMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoParteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoParteListModification',
                content: 'Deleted an tipoParte'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-parte-my-suffix-delete-popup',
    template: ''
})
export class TipoParteMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoPartePopupService: TipoParteMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoPartePopupService
                .open(TipoParteMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
