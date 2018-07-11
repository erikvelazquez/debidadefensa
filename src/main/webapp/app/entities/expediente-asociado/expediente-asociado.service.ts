import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ExpedienteAsociado } from './expediente-asociado.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ExpedienteAsociado>;

@Injectable()
export class ExpedienteAsociadoService {

    private resourceUrl =  SERVER_API_URL + 'api/expediente-asociados';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/expediente-asociados';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(expedienteAsociado: ExpedienteAsociado): Observable<EntityResponseType> {
        const copy = this.convert(expedienteAsociado);
        return this.http.post<ExpedienteAsociado>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(expedienteAsociado: ExpedienteAsociado): Observable<EntityResponseType> {
        const copy = this.convert(expedienteAsociado);
        return this.http.put<ExpedienteAsociado>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ExpedienteAsociado>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ExpedienteAsociado[]>> {
        const options = createRequestOption(req);
        return this.http.get<ExpedienteAsociado[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ExpedienteAsociado[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ExpedienteAsociado[]>> {
        const options = createRequestOption(req);
        return this.http.get<ExpedienteAsociado[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ExpedienteAsociado[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ExpedienteAsociado = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ExpedienteAsociado[]>): HttpResponse<ExpedienteAsociado[]> {
        const jsonResponse: ExpedienteAsociado[] = res.body;
        const body: ExpedienteAsociado[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ExpedienteAsociado.
     */
    private convertItemFromServer(expedienteAsociado: ExpedienteAsociado): ExpedienteAsociado {
        const copy: ExpedienteAsociado = Object.assign({}, expedienteAsociado);
        copy.fechaSentencia = this.dateUtils
            .convertLocalDateFromServer(expedienteAsociado.fechaSentencia);
        return copy;
    }

    /**
     * Convert a ExpedienteAsociado to a JSON which can be sent to the server.
     */
    private convert(expedienteAsociado: ExpedienteAsociado): ExpedienteAsociado {
        const copy: ExpedienteAsociado = Object.assign({}, expedienteAsociado);
        copy.fechaSentencia = this.dateUtils
            .convertLocalDateToServer(expedienteAsociado.fechaSentencia);
        return copy;
    }
}
