import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Parte } from './parte.model';
import { PartePopupService } from './parte-popup.service';
import { ParteService } from './parte.service';

@Component({
    selector: 'jhi-parte-delete-dialog',
    templateUrl: './parte-delete-dialog.component.html'
})
export class ParteDeleteDialogComponent {

    parte: Parte;

    constructor(
        private parteService: ParteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'parteListModification',
                content: 'Deleted an parte'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-parte-delete-popup',
    template: ''
})
export class ParteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private partePopupService: PartePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.partePopupService
                .open(ParteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
