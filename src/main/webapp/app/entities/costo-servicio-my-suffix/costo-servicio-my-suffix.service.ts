import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CostoServicioMySuffix } from './costo-servicio-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CostoServicioMySuffix>;

@Injectable()
export class CostoServicioMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/costo-servicios';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/costo-servicios';

    constructor(private http: HttpClient) { }

    create(costoServicio: CostoServicioMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(costoServicio);
        return this.http.post<CostoServicioMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(costoServicio: CostoServicioMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(costoServicio);
        return this.http.put<CostoServicioMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CostoServicioMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CostoServicioMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostoServicioMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CostoServicioMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CostoServicioMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostoServicioMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CostoServicioMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CostoServicioMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CostoServicioMySuffix[]>): HttpResponse<CostoServicioMySuffix[]> {
        const jsonResponse: CostoServicioMySuffix[] = res.body;
        const body: CostoServicioMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CostoServicioMySuffix.
     */
    private convertItemFromServer(costoServicio: CostoServicioMySuffix): CostoServicioMySuffix {
        const copy: CostoServicioMySuffix = Object.assign({}, costoServicio);
        return copy;
    }

    /**
     * Convert a CostoServicioMySuffix to a JSON which can be sent to the server.
     */
    private convert(costoServicio: CostoServicioMySuffix): CostoServicioMySuffix {
        const copy: CostoServicioMySuffix = Object.assign({}, costoServicio);
        return copy;
    }
}
