import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TramiteMigratorio } from './tramite-migratorio.model';
import { TramiteMigratorioService } from './tramite-migratorio.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { Cliente, ClienteService } from '../cliente';

@Component({
    selector: 'jhi-tramite-migratorio',
    templateUrl: './tramite-migratorio.component.html',
    styleUrls: [
        '../../app.scss'
    ]
})
export class TramiteMigratorioComponent implements OnInit, OnDestroy {

currentAccount: any;
    cliente: Cliente;
    tramiteMigratorios: TramiteMigratorio[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    private subscription: Subscription;

    constructor(
        private tramiteMigratorioService: TramiteMigratorioService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        private clienteService: ClienteService,
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.cliente = new Cliente();
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.tramiteMigratorioService.search({
                page: this.page - 1,
                query: this.currentSearch,
                size: this.itemsPerPage,
                sort: this.sort()}).subscribe(
                    (res: HttpResponse<TramiteMigratorio[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }

        if (this.cliente.id > 0) {
            this.clienteService.find(this.cliente.id)
            .subscribe((clienteResponse: HttpResponse<Cliente>) => {
                this.cliente = clienteResponse.body;
            });

            this.tramiteMigratorioService.findByUser(this.cliente.id)
            .subscribe(
                (res: HttpResponse<TramiteMigratorio[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else {
            this.tramiteMigratorioService.query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()}).subscribe(
                    (res: HttpResponse<TramiteMigratorio[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.router.navigate(['/tramite-migratorio'], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/tramite-migratorio', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }
    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate(['/tramite-migratorio', {
            search: this.currentSearch,
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }
    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.cliente.id = params['id'];
        });
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTramiteMigratorios();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TramiteMigratorio) {
        return item.id;
    }

    registerChangeInTramiteMigratorios() {
        this.eventSubscriber = this.eventManager.subscribe('tramiteMigratorioListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        /* this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');*/
        this.links = 100; // this.parseLinks.parse(headers.get('link'));
        this.totalItems = data.length; // headers.get('X-Total-Count');

        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.tramiteMigratorios = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
