import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Expediente } from './expediente.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Expediente>;

@Injectable()
export class ExpedienteService {

    private resourceUrl =  SERVER_API_URL + 'api/expedientes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/expedientes';
    private resourceURLbyUser = SERVER_API_URL + 'api/expedientes/user/';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(expediente: Expediente): Observable<EntityResponseType> {
        const copy = this.convert(expediente);
        return this.http.post<Expediente>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(expediente: Expediente): Observable<EntityResponseType> {
        const copy = this.convert(expediente);
        return this.http.put<Expediente>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Expediente>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByUser(req: number): Observable<HttpResponse<Expediente[]>> {
        return this.http.get<Expediente[]>(`${this.resourceURLbyUser}/${req}`, { observe: 'response' })
            .map((res: HttpResponse<Expediente[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Expediente[]>> {
        const options = createRequestOption(req);
        return this.http.get<Expediente[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Expediente[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Expediente[]>> {
        const options = createRequestOption(req);
        return this.http.get<Expediente[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Expediente[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Expediente = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Expediente[]>): HttpResponse<Expediente[]> {
        const jsonResponse: Expediente[] = res.body;
        const body: Expediente[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Expediente.
     */
    private convertItemFromServer(expediente: Expediente): Expediente {
        const copy: Expediente = Object.assign({}, expediente);
        copy.fechaAlta = this.dateUtils
            .convertLocalDateFromServer(expediente.fechaAlta);
        copy.fechaSentencia = this.dateUtils
            .convertLocalDateFromServer(expediente.fechaSentencia);
        return copy;
    }

    /**
     * Convert a Expediente to a JSON which can be sent to the server.
     */
    private convert(expediente: Expediente): Expediente {
        const copy: Expediente = Object.assign({}, expediente);
        copy.fechaAlta = this.dateUtils
            .convertLocalDateToServer(expediente.fechaAlta);
        copy.fechaSentencia = this.dateUtils
            .convertLocalDateToServer(expediente.fechaSentencia);
        return copy;
    }
}
