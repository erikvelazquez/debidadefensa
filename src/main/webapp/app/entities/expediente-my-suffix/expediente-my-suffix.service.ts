import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ExpedienteMySuffix } from './expediente-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ExpedienteMySuffix>;

@Injectable()
export class ExpedienteMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/expedientes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/expedientes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(expediente: ExpedienteMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(expediente);
        return this.http.post<ExpedienteMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(expediente: ExpedienteMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(expediente);
        return this.http.put<ExpedienteMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ExpedienteMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ExpedienteMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ExpedienteMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ExpedienteMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ExpedienteMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ExpedienteMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ExpedienteMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ExpedienteMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ExpedienteMySuffix[]>): HttpResponse<ExpedienteMySuffix[]> {
        const jsonResponse: ExpedienteMySuffix[] = res.body;
        const body: ExpedienteMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ExpedienteMySuffix.
     */
    private convertItemFromServer(expediente: ExpedienteMySuffix): ExpedienteMySuffix {
        const copy: ExpedienteMySuffix = Object.assign({}, expediente);
        copy.fechaAlta = this.dateUtils
            .convertDateTimeFromServer(expediente.fechaAlta);
        copy.fechaSentencia = this.dateUtils
            .convertDateTimeFromServer(expediente.fechaSentencia);
        return copy;
    }

    /**
     * Convert a ExpedienteMySuffix to a JSON which can be sent to the server.
     */
    private convert(expediente: ExpedienteMySuffix): ExpedienteMySuffix {
        const copy: ExpedienteMySuffix = Object.assign({}, expediente);

        copy.fechaAlta = this.dateUtils.toDate(expediente.fechaAlta);

        copy.fechaSentencia = this.dateUtils.toDate(expediente.fechaSentencia);
        return copy;
    }
}
