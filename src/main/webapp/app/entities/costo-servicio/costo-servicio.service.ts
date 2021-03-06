import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CostoServicio } from './costo-servicio.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CostoServicio>;

@Injectable()
export class CostoServicioService {

    private resourceUrl =  SERVER_API_URL + 'api/costo-servicios';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/costo-servicios';

    constructor(private http: HttpClient) { }

    create(costoServicio: CostoServicio): Observable<EntityResponseType> {
        const copy = this.convert(costoServicio);
        return this.http.post<CostoServicio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(costoServicio: CostoServicio): Observable<EntityResponseType> {
        const copy = this.convert(costoServicio);
        return this.http.put<CostoServicio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CostoServicio>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByExpediente(req: number): Observable<HttpResponse<CostoServicio[]>> {
        return this.http.get<CostoServicio[]>(SERVER_API_URL + 'api/costo-servicios/expediente/' + req, { observe: 'response' })
            .map((res: HttpResponse<CostoServicio[]>) => this.convertArrayResponse(res));
    }

    findByMigratorio(req: number): Observable<HttpResponse<CostoServicio[]>> {
        return this.http.get<CostoServicio[]>(SERVER_API_URL + 'api/costo-servicios/migratorio/' + req, { observe: 'response' })
            .map((res: HttpResponse<CostoServicio[]>) => this.convertArrayResponse(res));
    }

    findByGeneral(req: number): Observable<HttpResponse<CostoServicio[]>> {
        return this.http.get<CostoServicio[]>(SERVER_API_URL + 'api/costo-servicios/general/' + req, { observe: 'response' })
            .map((res: HttpResponse<CostoServicio[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CostoServicio[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostoServicio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CostoServicio[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CostoServicio[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostoServicio[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CostoServicio[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CostoServicio = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CostoServicio[]>): HttpResponse<CostoServicio[]> {
        const jsonResponse: CostoServicio[] = res.body;
        const body: CostoServicio[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CostoServicio.
     */
    private convertItemFromServer(costoServicio: CostoServicio): CostoServicio {
        const copy: CostoServicio = Object.assign({}, costoServicio);
        return copy;
    }

    /**
     * Convert a CostoServicio to a JSON which can be sent to the server.
     */
    private convert(costoServicio: CostoServicio): CostoServicio {
        const copy: CostoServicio = Object.assign({}, costoServicio);
        return copy;
    }
}
