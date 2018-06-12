import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TipoServicioMySuffix } from './tipo-servicio-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TipoServicioMySuffix>;

@Injectable()
export class TipoServicioMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/tipo-servicios';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tipo-servicios';

    constructor(private http: HttpClient) { }

    create(tipoServicio: TipoServicioMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(tipoServicio);
        return this.http.post<TipoServicioMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tipoServicio: TipoServicioMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(tipoServicio);
        return this.http.put<TipoServicioMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TipoServicioMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TipoServicioMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoServicioMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TipoServicioMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TipoServicioMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoServicioMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TipoServicioMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TipoServicioMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TipoServicioMySuffix[]>): HttpResponse<TipoServicioMySuffix[]> {
        const jsonResponse: TipoServicioMySuffix[] = res.body;
        const body: TipoServicioMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TipoServicioMySuffix.
     */
    private convertItemFromServer(tipoServicio: TipoServicioMySuffix): TipoServicioMySuffix {
        const copy: TipoServicioMySuffix = Object.assign({}, tipoServicio);
        return copy;
    }

    /**
     * Convert a TipoServicioMySuffix to a JSON which can be sent to the server.
     */
    private convert(tipoServicio: TipoServicioMySuffix): TipoServicioMySuffix {
        const copy: TipoServicioMySuffix = Object.assign({}, tipoServicio);
        return copy;
    }
}
