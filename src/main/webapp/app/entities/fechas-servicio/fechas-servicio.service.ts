import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FechasServicio } from './fechas-servicio.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FechasServicio>;

@Injectable()
export class FechasServicioService {

    private resourceUrl =  SERVER_API_URL + 'api/fechas-servicios';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/fechas-servicios';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(fechasServicio: FechasServicio): Observable<EntityResponseType> {
        const copy = this.convert(fechasServicio);
        return this.http.post<FechasServicio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(fechasServicio: FechasServicio): Observable<EntityResponseType> {
        const copy = this.convert(fechasServicio);
        return this.http.put<FechasServicio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FechasServicio>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByExpedienteId(id: number): Observable<HttpResponse<FechasServicio[]>> {
        return this.http.get<FechasServicio[]>(SERVER_API_URL + 'api/fechas-servicios/expediente/' + id, { observe: 'response' })
            .map((res: HttpResponse<FechasServicio[]>) => this.convertArrayResponse(res));
    }

    findByMigratorioId(id: number): Observable<HttpResponse<FechasServicio[]>> {
        return this.http.get<FechasServicio[]>(SERVER_API_URL + 'api/fechas-servicios/migratorio/' + id, { observe: 'response' })
            .map((res: HttpResponse<FechasServicio[]>) => this.convertArrayResponse(res));
    }

    findByGeneralId(id: number): Observable<HttpResponse<FechasServicio[]>> {
        return this.http.get<FechasServicio[]>(SERVER_API_URL + 'api/fechas-servicios/general/' + id, { observe: 'response' })
            .map((res: HttpResponse<FechasServicio[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FechasServicio[]>> {
        const options = createRequestOption(req);
        return this.http.get<FechasServicio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FechasServicio[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<FechasServicio[]>> {
        const options = createRequestOption(req);
        return this.http.get<FechasServicio[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FechasServicio[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FechasServicio = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FechasServicio[]>): HttpResponse<FechasServicio[]> {
        const jsonResponse: FechasServicio[] = res.body;
        const body: FechasServicio[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FechasServicio.
     */
    private convertItemFromServer(fechasServicio: FechasServicio): FechasServicio {
        const copy: FechasServicio = Object.assign({}, fechasServicio);
        copy.fecha = this.dateUtils
            .convertDateTimeFromServer(fechasServicio.fecha);
        return copy;
    }

    /**
     * Convert a FechasServicio to a JSON which can be sent to the server.
     */
    private convert(fechasServicio: FechasServicio): FechasServicio {
        const copy: FechasServicio = Object.assign({}, fechasServicio);
       // copy.fecha = this.dateUtils.convertLocalDateToServer(fechasServicio.fecha);
        return copy;
    }
}
