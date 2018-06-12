import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TipoParteMySuffix } from './tipo-parte-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TipoParteMySuffix>;

@Injectable()
export class TipoParteMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/tipo-partes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tipo-partes';

    constructor(private http: HttpClient) { }

    create(tipoParte: TipoParteMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(tipoParte);
        return this.http.post<TipoParteMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tipoParte: TipoParteMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(tipoParte);
        return this.http.put<TipoParteMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TipoParteMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TipoParteMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoParteMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TipoParteMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TipoParteMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoParteMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TipoParteMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TipoParteMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TipoParteMySuffix[]>): HttpResponse<TipoParteMySuffix[]> {
        const jsonResponse: TipoParteMySuffix[] = res.body;
        const body: TipoParteMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TipoParteMySuffix.
     */
    private convertItemFromServer(tipoParte: TipoParteMySuffix): TipoParteMySuffix {
        const copy: TipoParteMySuffix = Object.assign({}, tipoParte);
        return copy;
    }

    /**
     * Convert a TipoParteMySuffix to a JSON which can be sent to the server.
     */
    private convert(tipoParte: TipoParteMySuffix): TipoParteMySuffix {
        const copy: TipoParteMySuffix = Object.assign({}, tipoParte);
        return copy;
    }
}
