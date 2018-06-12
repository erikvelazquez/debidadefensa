import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TramiteMigratorioMySuffix } from './tramite-migratorio-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TramiteMigratorioMySuffix>;

@Injectable()
export class TramiteMigratorioMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/tramite-migratorios';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tramite-migratorios';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(tramiteMigratorio: TramiteMigratorioMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(tramiteMigratorio);
        return this.http.post<TramiteMigratorioMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tramiteMigratorio: TramiteMigratorioMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(tramiteMigratorio);
        return this.http.put<TramiteMigratorioMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TramiteMigratorioMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TramiteMigratorioMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TramiteMigratorioMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TramiteMigratorioMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TramiteMigratorioMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TramiteMigratorioMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TramiteMigratorioMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TramiteMigratorioMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TramiteMigratorioMySuffix[]>): HttpResponse<TramiteMigratorioMySuffix[]> {
        const jsonResponse: TramiteMigratorioMySuffix[] = res.body;
        const body: TramiteMigratorioMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TramiteMigratorioMySuffix.
     */
    private convertItemFromServer(tramiteMigratorio: TramiteMigratorioMySuffix): TramiteMigratorioMySuffix {
        const copy: TramiteMigratorioMySuffix = Object.assign({}, tramiteMigratorio);
        copy.fechaIngreso = this.dateUtils
            .convertDateTimeFromServer(tramiteMigratorio.fechaIngreso);
        copy.fechaNotificacion = this.dateUtils
            .convertDateTimeFromServer(tramiteMigratorio.fechaNotificacion);
        copy.fechaResolucion = this.dateUtils
            .convertDateTimeFromServer(tramiteMigratorio.fechaResolucion);
        return copy;
    }

    /**
     * Convert a TramiteMigratorioMySuffix to a JSON which can be sent to the server.
     */
    private convert(tramiteMigratorio: TramiteMigratorioMySuffix): TramiteMigratorioMySuffix {
        const copy: TramiteMigratorioMySuffix = Object.assign({}, tramiteMigratorio);

        copy.fechaIngreso = this.dateUtils.toDate(tramiteMigratorio.fechaIngreso);

        copy.fechaNotificacion = this.dateUtils.toDate(tramiteMigratorio.fechaNotificacion);

        copy.fechaResolucion = this.dateUtils.toDate(tramiteMigratorio.fechaResolucion);
        return copy;
    }
}
