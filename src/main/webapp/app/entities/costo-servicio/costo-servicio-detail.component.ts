import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CostoServicio } from './costo-servicio.model';
import { CostoServicioService } from './costo-servicio.service';

@Component({
    selector: 'jhi-costo-servicio-detail',
    templateUrl: './costo-servicio-detail.component.html'
})
export class CostoServicioDetailComponent implements OnInit, OnDestroy {

    costoServicio: CostoServicio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private costoServicioService: CostoServicioService,
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
            .subscribe((costoServicioResponse: HttpResponse<CostoServicio>) => {
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
