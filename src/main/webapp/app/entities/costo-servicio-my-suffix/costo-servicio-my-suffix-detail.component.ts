import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CostoServicioMySuffix } from './costo-servicio-my-suffix.model';
import { CostoServicioMySuffixService } from './costo-servicio-my-suffix.service';

@Component({
    selector: 'jhi-costo-servicio-my-suffix-detail',
    templateUrl: './costo-servicio-my-suffix-detail.component.html'
})
export class CostoServicioMySuffixDetailComponent implements OnInit, OnDestroy {

    costoServicio: CostoServicioMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private costoServicioService: CostoServicioMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCostoServicios();
    }

    load(id) {
        this.costoServicioService.find(id)
            .subscribe((costoServicioResponse: HttpResponse<CostoServicioMySuffix>) => {
                this.costoServicio = costoServicioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCostoServicios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'costoServicioListModification',
            (response) => this.load(this.costoServicio.id)
        );
    }
}
