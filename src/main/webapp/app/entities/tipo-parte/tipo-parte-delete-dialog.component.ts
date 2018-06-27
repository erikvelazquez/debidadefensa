import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoParte } from './tipo-parte.model';
import { TipoPartePopupService } from './tipo-parte-popup.service';
import { TipoParteService } from './tipo-parte.service';

@Component({
    selector: 'jhi-tipo-parte-delete-dialog',
    templateUrl: './tipo-parte-delete-dialog.component.html'
})
export class TipoParteDeleteDialogComponent {

    tipoParte: TipoParte;

    constructor(
        private tipoParteService: TipoParteService,
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
    selector: 'jhi-tipo-parte-delete-popup',
    template: ''
})
export class TipoParteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoPartePopupService: TipoPartePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoPartePopupService
                .open(TipoParteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
