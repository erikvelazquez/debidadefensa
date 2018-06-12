import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FechasServicioMySuffix } from './fechas-servicio-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FechasServicioMySuffix>;

@Injectable()
export class FechasServicioMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/fechas-servicios';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/fechas-servicios';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(fechasServicio: FechasServicioMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(fechasServicio);
        return this.http.post<FechasServicioMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(fechasServicio: FechasServicioMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(fechasServicio);
        return this.http.put<FechasServicioMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FechasServicioMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FechasServicioMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<FechasServicioMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FechasServicioMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<FechasServicioMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<FechasServicioMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FechasServicioMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FechasServicioMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FechasServicioMySuffix[]>): HttpResponse<FechasServicioMySuffix[]> {
        const jsonResponse: FechasServicioMySuffix[] = res.body;
        const body: FechasServicioMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FechasServicioMySuffix.
     */
    private convertItemFromServer(fechasServicio: FechasServicioMySuffix): FechasServicioMySuffix {
        const copy: FechasServicioMySuffix = Object.assign({}, fechasServicio);
        copy.fecha = this.dateUtils
            .convertDateTimeFromServer(fechasServicio.fecha);
        copy.hora = this.dateUtils
            .convertLocalDateFromServer(fechasServicio.hora);
        return copy;
    }

    /**
     * Convert a FechasServicioMySuffix to a JSON which can be sent to the server.
     */
    private convert(fechasServicio: FechasServicioMySuffix): FechasServicioMySuffix {
        const copy: FechasServicioMySuffix = Object.assign({}, fechasServicio);

        copy.fecha = this.dateUtils.toDate(fechasServicio.fecha);
        copy.hora = this.dateUtils
            .convertLocalDateToServer(fechasServicio.hora);
        return copy;
    }
}
