import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TipoParte } from './tipo-parte.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TipoParte>;

@Injectable()
export class TipoParteService {

    private resourceUrl =  SERVER_API_URL + 'api/tipo-partes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tipo-partes';

    constructor(private http: HttpClient) { }

    create(tipoParte: TipoParte): Observable<EntityResponseType> {
        const copy = this.convert(tipoParte);
        return this.http.post<TipoParte>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tipoParte: TipoParte): Observable<EntityResponseType> {
        const copy = this.convert(tipoParte);
        return this.http.put<TipoParte>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TipoParte>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TipoParte[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoParte[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TipoParte[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TipoParte[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoParte[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TipoParte[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TipoParte = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TipoParte[]>): HttpResponse<TipoParte[]> {
        const jsonResponse: TipoParte[] = res.body;
        const body: TipoParte[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TipoParte.
     */
    private convertItemFromServer(tipoParte: TipoParte): TipoParte {
        const copy: TipoParte = Object.assign({}, tipoParte);
        return copy;
    }

    /**
     * Convert a TipoParte to a JSON which can be sent to the server.
     */
    private convert(tipoParte: TipoParte): TipoParte {
        const copy: TipoParte = Object.assign({}, tipoParte);
        return copy;
    }
}
