import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TramiteMigratorio } from './tramite-migratorio.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TramiteMigratorio>;

@Injectable()
export class TramiteMigratorioService {

    private resourceUrl =  SERVER_API_URL + 'api/tramite-migratorios';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tramite-migratorios';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(tramiteMigratorio: TramiteMigratorio): Observable<EntityResponseType> {
        const copy = this.convert(tramiteMigratorio);
        return this.http.post<TramiteMigratorio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tramiteMigratorio: TramiteMigratorio): Observable<EntityResponseType> {
        const copy = this.convert(tramiteMigratorio);
        return this.http.put<TramiteMigratorio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TramiteMigratorio>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByUser(req: number): Observable<HttpResponse<TramiteMigratorio[]>> {
        return this.http.get<TramiteMigratorio[]>(SERVER_API_URL + "api/tramite-migratorios/user/" + req, { observe: 'response' })
            .map((res: HttpResponse<TramiteMigratorio[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TramiteMigratorio[]>> {
        const options = createRequestOption(req);
        return this.http.get<TramiteMigratorio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TramiteMigratorio[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TramiteMigratorio[]>> {
        const options = createRequestOption(req);
        return this.http.get<TramiteMigratorio[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TramiteMigratorio[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TramiteMigratorio = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TramiteMigratorio[]>): HttpResponse<TramiteMigratorio[]> {
        const jsonResponse: TramiteMigratorio[] = res.body;
        const body: TramiteMigratorio[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TramiteMigratorio.
     */
    private convertItemFromServer(tramiteMigratorio: TramiteMigratorio): TramiteMigratorio {
        const copy: TramiteMigratorio = Object.assign({}, tramiteMigratorio);
        copy.fechaIngreso = this.dateUtils
            .convertLocalDateFromServer(tramiteMigratorio.fechaIngreso);
        copy.fechaNotificacion = this.dateUtils
            .convertLocalDateFromServer(tramiteMigratorio.fechaNotificacion);
        copy.fechaResolucion = this.dateUtils
            .convertLocalDateFromServer(tramiteMigratorio.fechaResolucion);
        return copy;
    }

    /**
     * Convert a TramiteMigratorio to a JSON which can be sent to the server.
     */
    private convert(tramiteMigratorio: TramiteMigratorio): TramiteMigratorio {
        const copy: TramiteMigratorio = Object.assign({}, tramiteMigratorio);
        copy.fechaIngreso = this.dateUtils
            .convertLocalDateToServer(tramiteMigratorio.fechaIngreso);
        copy.fechaNotificacion = this.dateUtils
            .convertLocalDateToServer(tramiteMigratorio.fechaNotificacion);
        copy.fechaResolucion = this.dateUtils
            .convertLocalDateToServer(tramiteMigratorio.fechaResolucion);
        return copy;
    }
}
