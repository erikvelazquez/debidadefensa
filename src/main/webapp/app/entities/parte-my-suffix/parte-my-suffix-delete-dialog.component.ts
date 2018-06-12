import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ParteMySuffix } from './parte-my-suffix.model';
import { ParteMySuffixPopupService } from './parte-my-suffix-popup.service';
import { ParteMySuffixService } from './parte-my-suffix.service';

@Component({
    selector: 'jhi-parte-my-suffix-delete-dialog',
    templateUrl: './parte-my-suffix-delete-dialog.component.html'
})
export class ParteMySuffixDeleteDialogComponent {

    parte: ParteMySuffix;

    constructor(
        private parteService: ParteMySuffixService,
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
    selector: 'jhi-parte-my-suffix-delete-popup',
    template: ''
})
export class ParteMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private partePopupService: ParteMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.partePopupService
                .open(ParteMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
