import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ClienteMySuffix } from './cliente-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ClienteMySuffix>;

@Injectable()
export class ClienteMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/clientes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/clientes';

    constructor(private http: HttpClient) { }

    create(cliente: ClienteMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cliente);
        return this.http.post<ClienteMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cliente: ClienteMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cliente);
        return this.http.put<ClienteMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ClienteMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ClienteMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ClienteMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ClienteMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ClienteMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ClienteMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ClienteMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ClienteMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ClienteMySuffix[]>): HttpResponse<ClienteMySuffix[]> {
        const jsonResponse: ClienteMySuffix[] = res.body;
        const body: ClienteMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ClienteMySuffix.
     */
    private convertItemFromServer(cliente: ClienteMySuffix): ClienteMySuffix {
        const copy: ClienteMySuffix = Object.assign({}, cliente);
        return copy;
    }

    /**
     * Convert a ClienteMySuffix to a JSON which can be sent to the server.
     */
    private convert(cliente: ClienteMySuffix): ClienteMySuffix {
        const copy: ClienteMySuffix = Object.assign({}, cliente);
        return copy;
    }
}
