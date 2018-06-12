import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TramiteMigratorioMySuffix } from './tramite-migratorio-my-suffix.model';
import { TramiteMigratorioMySuffixService } from './tramite-migratorio-my-suffix.service';

@Component({
    selector: 'jhi-tramite-migratorio-my-suffix-detail',
    templateUrl: './tramite-migratorio-my-suffix-detail.component.html'
})
export class TramiteMigratorioMySuffixDetailComponent implements OnInit, OnDestroy {

    tramiteMigratorio: TramiteMigratorioMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tramiteMigratorioService: TramiteMigratorioMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTramiteMigratorios();
    }

    load(id) {
        this.tramiteMigratorioService.find(id)
            .subscribe((tramiteMigratorioResponse: HttpResponse<TramiteMigratorioMySuffix>) => {
                this.tramiteMigratorio = tramiteMigratorioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTramiteMigratorios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tramiteMigratorioListModification',
            (response) => this.load(this.tramiteMigratorio.id)
        );
    }
}
