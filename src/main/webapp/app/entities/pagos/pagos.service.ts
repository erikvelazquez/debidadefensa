import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Pagos } from './pagos.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Pagos>;

@Injectable()
export class PagosService {

    private resourceUrl =  SERVER_API_URL + 'api/pagos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/pagos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(pagos: Pagos): Observable<EntityResponseType> {
        const copy = this.convert(pagos);
        return this.http.post<Pagos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pagos: Pagos): Observable<EntityResponseType> {
        const copy = this.convert(pagos);
        return this.http.put<Pagos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Pagos>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Pagos[]>> {
        const options = createRequestOption(req);
        return this.http.get<Pagos[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Pagos[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Pagos[]>> {
        const options = createRequestOption(req);
        return this.http.get<Pagos[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Pagos[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Pagos = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Pagos[]>): HttpResponse<Pagos[]> {
        const jsonResponse: Pagos[] = res.body;
        const body: Pagos[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Pagos.
     */
    private convertItemFromServer(pagos: Pagos): Pagos {
        const copy: Pagos = Object.assign({}, pagos);
        copy.fecha = this.dateUtils
            .convertLocalDateFromServer(pagos.fecha);
        return copy;
    }

    /**
     * Convert a Pagos to a JSON which can be sent to the server.
     */
    private convert(pagos: Pagos): Pagos {
        const copy: Pagos = Object.assign({}, pagos);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(pagos.fecha);
        return copy;
    }
}
