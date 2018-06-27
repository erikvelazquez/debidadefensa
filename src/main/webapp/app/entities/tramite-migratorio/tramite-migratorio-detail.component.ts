import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TramiteMigratorio } from './tramite-migratorio.model';
import { TramiteMigratorioService } from './tramite-migratorio.service';

@Component({
    selector: 'jhi-tramite-migratorio-detail',
    templateUrl: './tramite-migratorio-detail.component.html'
})
export class TramiteMigratorioDetailComponent implements OnInit, OnDestroy {

    tramiteMigratorio: TramiteMigratorio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tramiteMigratorioService: TramiteMigratorioService,
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
            .subscribe((tramiteMigratorioResponse: HttpResponse<TramiteMigratorio>) => {
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
