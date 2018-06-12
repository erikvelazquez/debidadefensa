import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EstatusMySuffix } from './estatus-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EstatusMySuffix>;

@Injectable()
export class EstatusMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/estatuses';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/estatuses';

    constructor(private http: HttpClient) { }

    create(estatus: EstatusMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(estatus);
        return this.http.post<EstatusMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(estatus: EstatusMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(estatus);
        return this.http.put<EstatusMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EstatusMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EstatusMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<EstatusMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EstatusMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<EstatusMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<EstatusMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EstatusMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EstatusMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EstatusMySuffix[]>): HttpResponse<EstatusMySuffix[]> {
        const jsonResponse: EstatusMySuffix[] = res.body;
        const body: EstatusMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EstatusMySuffix.
     */
    private convertItemFromServer(estatus: EstatusMySuffix): EstatusMySuffix {
        const copy: EstatusMySuffix = Object.assign({}, estatus);
        return copy;
    }

    /**
     * Convert a EstatusMySuffix to a JSON which can be sent to the server.
     */
    private convert(estatus: EstatusMySuffix): EstatusMySuffix {
        const copy: EstatusMySuffix = Object.assign({}, estatus);
        return copy;
    }
}
