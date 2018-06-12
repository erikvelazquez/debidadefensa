import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PagosMySuffix } from './pagos-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PagosMySuffix>;

@Injectable()
export class PagosMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/pagos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/pagos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(pagos: PagosMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(pagos);
        return this.http.post<PagosMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pagos: PagosMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(pagos);
        return this.http.put<PagosMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PagosMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PagosMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<PagosMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PagosMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PagosMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<PagosMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PagosMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PagosMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PagosMySuffix[]>): HttpResponse<PagosMySuffix[]> {
        const jsonResponse: PagosMySuffix[] = res.body;
        const body: PagosMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PagosMySuffix.
     */
    private convertItemFromServer(pagos: PagosMySuffix): PagosMySuffix {
        const copy: PagosMySuffix = Object.assign({}, pagos);
        copy.fecha = this.dateUtils
            .convertDateTimeFromServer(pagos.fecha);
        return copy;
    }

    /**
     * Convert a PagosMySuffix to a JSON which can be sent to the server.
     */
    private convert(pagos: PagosMySuffix): PagosMySuffix {
        const copy: PagosMySuffix = Object.assign({}, pagos);

        copy.fecha = this.dateUtils.toDate(pagos.fecha);
        return copy;
    }
}
