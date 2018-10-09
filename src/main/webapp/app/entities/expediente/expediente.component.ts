import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Expediente } from './expediente.model';
import { ExpedienteService } from './expediente.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { Cliente, ClienteService } from '../cliente';

@Component({
    selector: 'jhi-expediente',
    templateUrl: './expediente.component.html',
    styleUrls: [
        '../../app.scss'
    ]
})
export class ExpedienteComponent implements OnInit, OnDestroy {

    expedientes: Expediente[];
    cliente: Cliente;
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;
    currentSearch: string;
    private subscription: Subscription;

    constructor(
        private expedienteService: ExpedienteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private parseLinks: JhiParseLinks,
        private route: ActivatedRoute,
        private clienteService: ClienteService,
    ) {
        this.expedientes = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.cliente = new Cliente();
        this.predicate = 'id';
        this.reverse = true;
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.expedienteService.search({
                query: this.currentSearch + '*',
                page: this.page,
                size: this.itemsPerPage + 1000,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<Expediente[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            return;
        }

        if (this.cliente.id > 0) {
            this.clienteService.find(this.cliente.id)
            .subscribe((clienteResponse: HttpResponse<Cliente>) => {
                this.cliente = clienteResponse.body;
            });

            this.expedienteService.findByUser(this.cliente.id)
            .subscribe(
                (res: HttpResponse<Expediente[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else {
            this.expedienteService.query({
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<Expediente[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        }
    }

    reset() {
        this.page = 0;
        this.expedientes = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    clear() {
        this.expedientes = [];
        this.links = {
            last: 0
        };
        this.page = 0;
        this.predicate = 'id';
        this.reverse = true;
        this.currentSearch = '';
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.expedientes = [];
        this.links = {
            last: 0
        };
        this.page = 0;
        this.predicate = '_score';
        this.reverse = false;
        this.currentSearch = query;
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
        this.registerChangeInExpedientes();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Expediente) {
        return item.id;
    }
    registerChangeInExpedientes() {
        this.eventSubscriber = this.eventManager.subscribe('expedienteListModification', (response) => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
       // this.links = 100; // this.parseLinks.parse(headers.get('link'));
       // this.totalItems = data.length; // headers.get('X-Total-Count');
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        if (this.cliente.id !== undefined) {
            this.expedientes = data.filter((s) => {
                    return s.clienteId === this.cliente.id;
            });
        } else {
            this.expedientes = data;
        }
        /* for (let i = 0; i < data.length; i++) {
            this.expedientes.push(data[i]);
        }*/
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
