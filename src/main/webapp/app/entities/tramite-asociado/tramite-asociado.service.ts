import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TramiteAsociado } from './tramite-asociado.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TramiteAsociado>;

@Injectable()
export class TramiteAsociadoService {

    private resourceUrl =  SERVER_API_URL + 'api/tramite-asociados';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tramite-asociados';

    constructor(private http: HttpClient) { }

    create(tramiteAsociado: TramiteAsociado): Observable<EntityResponseType> {
        const copy = this.convert(tramiteAsociado);
        return this.http.post<TramiteAsociado>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tramiteAsociado: TramiteAsociado): Observable<EntityResponseType> {
        const copy = this.convert(tramiteAsociado);
        return this.http.put<TramiteAsociado>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TramiteAsociado>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TramiteAsociado[]>> {
        const options = createRequestOption(req);
        return this.http.get<TramiteAsociado[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TramiteAsociado[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TramiteAsociado[]>> {
        const options = createRequestOption(req);
        return this.http.get<TramiteAsociado[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TramiteAsociado[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TramiteAsociado = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TramiteAsociado[]>): HttpResponse<TramiteAsociado[]> {
        const jsonResponse: TramiteAsociado[] = res.body;
        const body: TramiteAsociado[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TramiteAsociado.
     */
    private convertItemFromServer(tramiteAsociado: TramiteAsociado): TramiteAsociado {
        const copy: TramiteAsociado = Object.assign({}, tramiteAsociado);
        return copy;
    }

    /**
     * Convert a TramiteAsociado to a JSON which can be sent to the server.
     */
    private convert(tramiteAsociado: TramiteAsociado): TramiteAsociado {
        const copy: TramiteAsociado = Object.assign({}, tramiteAsociado);
        return copy;
    }
}
