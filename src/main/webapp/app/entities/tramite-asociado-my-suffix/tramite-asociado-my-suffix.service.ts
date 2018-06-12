import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TramiteAsociadoMySuffix } from './tramite-asociado-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TramiteAsociadoMySuffix>;

@Injectable()
export class TramiteAsociadoMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/tramite-asociados';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tramite-asociados';

    constructor(private http: HttpClient) { }

    create(tramiteAsociado: TramiteAsociadoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(tramiteAsociado);
        return this.http.post<TramiteAsociadoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tramiteAsociado: TramiteAsociadoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(tramiteAsociado);
        return this.http.put<TramiteAsociadoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TramiteAsociadoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TramiteAsociadoMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TramiteAsociadoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TramiteAsociadoMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TramiteAsociadoMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TramiteAsociadoMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TramiteAsociadoMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TramiteAsociadoMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TramiteAsociadoMySuffix[]>): HttpResponse<TramiteAsociadoMySuffix[]> {
        const jsonResponse: TramiteAsociadoMySuffix[] = res.body;
        const body: TramiteAsociadoMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TramiteAsociadoMySuffix.
     */
    private convertItemFromServer(tramiteAsociado: TramiteAsociadoMySuffix): TramiteAsociadoMySuffix {
        const copy: TramiteAsociadoMySuffix = Object.assign({}, tramiteAsociado);
        return copy;
    }

    /**
     * Convert a TramiteAsociadoMySuffix to a JSON which can be sent to the server.
     */
    private convert(tramiteAsociado: TramiteAsociadoMySuffix): TramiteAsociadoMySuffix {
        const copy: TramiteAsociadoMySuffix = Object.assign({}, tramiteAsociado);
        return copy;
    }
}
