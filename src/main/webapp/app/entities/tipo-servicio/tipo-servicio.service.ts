import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TipoServicio } from './tipo-servicio.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TipoServicio>;

@Injectable()
export class TipoServicioService {

    private resourceUrl =  SERVER_API_URL + 'api/tipo-servicios';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tipo-servicios';

    constructor(private http: HttpClient) { }

    create(tipoServicio: TipoServicio): Observable<EntityResponseType> {
        const copy = this.convert(tipoServicio);
        return this.http.post<TipoServicio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tipoServicio: TipoServicio): Observable<EntityResponseType> {
        const copy = this.convert(tipoServicio);
        return this.http.put<TipoServicio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TipoServicio>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TipoServicio[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoServicio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TipoServicio[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TipoServicio[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoServicio[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TipoServicio[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TipoServicio = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TipoServicio[]>): HttpResponse<TipoServicio[]> {
        const jsonResponse: TipoServicio[] = res.body;
        const body: TipoServicio[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TipoServicio.
     */
    private convertItemFromServer(tipoServicio: TipoServicio): TipoServicio {
        const copy: TipoServicio = Object.assign({}, tipoServicio);
        return copy;
    }

    /**
     * Convert a TipoServicio to a JSON which can be sent to the server.
     */
    private convert(tipoServicio: TipoServicio): TipoServicio {
        const copy: TipoServicio = Object.assign({}, tipoServicio);
        return copy;
    }
}
