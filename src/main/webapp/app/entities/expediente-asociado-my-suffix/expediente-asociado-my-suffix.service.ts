import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ExpedienteAsociadoMySuffix } from './expediente-asociado-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ExpedienteAsociadoMySuffix>;

@Injectable()
export class ExpedienteAsociadoMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/expediente-asociados';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/expediente-asociados';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(expedienteAsociado: ExpedienteAsociadoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(expedienteAsociado);
        return this.http.post<ExpedienteAsociadoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(expedienteAsociado: ExpedienteAsociadoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(expedienteAsociado);
        return this.http.put<ExpedienteAsociadoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ExpedienteAsociadoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ExpedienteAsociadoMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ExpedienteAsociadoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ExpedienteAsociadoMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ExpedienteAsociadoMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ExpedienteAsociadoMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ExpedienteAsociadoMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ExpedienteAsociadoMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ExpedienteAsociadoMySuffix[]>): HttpResponse<ExpedienteAsociadoMySuffix[]> {
        const jsonResponse: ExpedienteAsociadoMySuffix[] = res.body;
        const body: ExpedienteAsociadoMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ExpedienteAsociadoMySuffix.
     */
    private convertItemFromServer(expedienteAsociado: ExpedienteAsociadoMySuffix): ExpedienteAsociadoMySuffix {
        const copy: ExpedienteAsociadoMySuffix = Object.assign({}, expedienteAsociado);
        copy.fechaSentencia = this.dateUtils
            .convertDateTimeFromServer(expedienteAsociado.fechaSentencia);
        return copy;
    }

    /**
     * Convert a ExpedienteAsociadoMySuffix to a JSON which can be sent to the server.
     */
    private convert(expedienteAsociado: ExpedienteAsociadoMySuffix): ExpedienteAsociadoMySuffix {
        const copy: ExpedienteAsociadoMySuffix = Object.assign({}, expedienteAsociado);

        copy.fechaSentencia = this.dateUtils.toDate(expedienteAsociado.fechaSentencia);
        return copy;
    }
}
