import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TramiteGeneralMySuffix } from './tramite-general-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TramiteGeneralMySuffix>;

@Injectable()
export class TramiteGeneralMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/tramite-generals';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tramite-generals';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(tramiteGeneral: TramiteGeneralMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(tramiteGeneral);
        return this.http.post<TramiteGeneralMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tramiteGeneral: TramiteGeneralMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(tramiteGeneral);
        return this.http.put<TramiteGeneralMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TramiteGeneralMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TramiteGeneralMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TramiteGeneralMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TramiteGeneralMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TramiteGeneralMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TramiteGeneralMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TramiteGeneralMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TramiteGeneralMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TramiteGeneralMySuffix[]>): HttpResponse<TramiteGeneralMySuffix[]> {
        const jsonResponse: TramiteGeneralMySuffix[] = res.body;
        const body: TramiteGeneralMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TramiteGeneralMySuffix.
     */
    private convertItemFromServer(tramiteGeneral: TramiteGeneralMySuffix): TramiteGeneralMySuffix {
        const copy: TramiteGeneralMySuffix = Object.assign({}, tramiteGeneral);
        copy.fechaIngreso = this.dateUtils
            .convertDateTimeFromServer(tramiteGeneral.fechaIngreso);
        copy.fechaResolucion = this.dateUtils
            .convertDateTimeFromServer(tramiteGeneral.fechaResolucion);
        copy.fechaNotificacion = this.dateUtils
            .convertDateTimeFromServer(tramiteGeneral.fechaNotificacion);
        return copy;
    }

    /**
     * Convert a TramiteGeneralMySuffix to a JSON which can be sent to the server.
     */
    private convert(tramiteGeneral: TramiteGeneralMySuffix): TramiteGeneralMySuffix {
        const copy: TramiteGeneralMySuffix = Object.assign({}, tramiteGeneral);

        copy.fechaIngreso = this.dateUtils.toDate(tramiteGeneral.fechaIngreso);

        copy.fechaResolucion = this.dateUtils.toDate(tramiteGeneral.fechaResolucion);

        copy.fechaNotificacion = this.dateUtils.toDate(tramiteGeneral.fechaNotificacion);
        return copy;
    }
}
