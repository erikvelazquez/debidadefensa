import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TramiteGeneral } from './tramite-general.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TramiteGeneral>;

@Injectable()
export class TramiteGeneralService {

    private resourceUrl =  SERVER_API_URL + 'api/tramite-generals';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tramite-generals';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(tramiteGeneral: TramiteGeneral): Observable<EntityResponseType> {
        const copy = this.convert(tramiteGeneral);
        return this.http.post<TramiteGeneral>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tramiteGeneral: TramiteGeneral): Observable<EntityResponseType> {
        const copy = this.convert(tramiteGeneral);
        return this.http.put<TramiteGeneral>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TramiteGeneral>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByUser(req: number): Observable<HttpResponse<TramiteGeneral[]>> {
        return this.http.get<TramiteGeneral[]>(SERVER_API_URL + 'api/tramite-generals/user/' + req, { observe: 'response' })
            .map((res: HttpResponse<TramiteGeneral[]>) => this.convertArrayResponse(res));
    }

    findByFaltantes(req: number, idCliente: number): Observable<HttpResponse<TramiteGeneral[]>> {
        return this.http.get<TramiteGeneral[]>(SERVER_API_URL + 'api/tramite-generals/faltante/' + req + '/' + idCliente, { observe: 'response' })
            .map((res: HttpResponse<TramiteGeneral[]>) => this.convertArrayResponse(res));
    }

    findByAsociados(req: number, tipo: number): Observable<HttpResponse<TramiteGeneral[]>> {
        return this.http.get<TramiteGeneral[]>(SERVER_API_URL + 'api/tramite-generals/asociado/' + req + '/' + tipo, { observe: 'response' })
            .map((res: HttpResponse<TramiteGeneral[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TramiteGeneral[]>> {
        const options = createRequestOption(req);
        return this.http.get<TramiteGeneral[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TramiteGeneral[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TramiteGeneral[]>> {
        const options = createRequestOption(req);
        return this.http.get<TramiteGeneral[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TramiteGeneral[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TramiteGeneral = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TramiteGeneral[]>): HttpResponse<TramiteGeneral[]> {
        const jsonResponse: TramiteGeneral[] = res.body;
        const body: TramiteGeneral[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TramiteGeneral.
     */
    private convertItemFromServer(tramiteGeneral: TramiteGeneral): TramiteGeneral {
        const copy: TramiteGeneral = Object.assign({}, tramiteGeneral);
        copy.fechaIngreso = this.dateUtils
            .convertLocalDateFromServer(tramiteGeneral.fechaIngreso);
        copy.fechaResolucion = this.dateUtils
            .convertLocalDateFromServer(tramiteGeneral.fechaResolucion);
        copy.fechaNotificacion = this.dateUtils
            .convertLocalDateFromServer(tramiteGeneral.fechaNotificacion);

        copy.totalDocumentos = copy.totalDocumentos ? copy.totalDocumentos : 0;
        return copy;
    }

    /**
     * Convert a TramiteGeneral to a JSON which can be sent to the server.
     */
    private convert(tramiteGeneral: TramiteGeneral): TramiteGeneral {
        const copy: TramiteGeneral = Object.assign({}, tramiteGeneral);
        copy.fechaIngreso = this.dateUtils
            .convertLocalDateToServer(tramiteGeneral.fechaIngreso);
        copy.fechaResolucion = this.dateUtils
            .convertLocalDateToServer(tramiteGeneral.fechaResolucion);
        copy.fechaNotificacion = this.dateUtils
            .convertLocalDateToServer(tramiteGeneral.fechaNotificacion);
        return copy;
    }
}
