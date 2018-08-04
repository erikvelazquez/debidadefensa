import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Parte } from './parte.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Parte>;

@Injectable()
export class ParteService {

    private resourceUrl =  SERVER_API_URL + 'api/partes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/partes';

    constructor(private http: HttpClient) { }

    create(parte: Parte): Observable<EntityResponseType> {
        const copy = this.convert(parte);
        return this.http.post<Parte>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(parte: Parte): Observable<EntityResponseType> {
        const copy = this.convert(parte);
        return this.http.put<Parte>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Parte>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByExpediente(req: number): Observable<HttpResponse<Parte[]>> {
        return this.http.get<Parte[]>(SERVER_API_URL + 'api/partes/expediente/' + req, { observe: 'response' })
            .map((res: HttpResponse<Parte[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Parte[]>> {
        const options = createRequestOption(req);
        return this.http.get<Parte[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Parte[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Parte[]>> {
        const options = createRequestOption(req);
        return this.http.get<Parte[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Parte[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Parte = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Parte[]>): HttpResponse<Parte[]> {
        const jsonResponse: Parte[] = res.body;
        const body: Parte[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Parte.
     */
    private convertItemFromServer(parte: Parte): Parte {
        const copy: Parte = Object.assign({}, parte);
        return copy;
    }

    /**
     * Convert a Parte to a JSON which can be sent to the server.
     */
    private convert(parte: Parte): Parte {
        const copy: Parte = Object.assign({}, parte);
        return copy;
    }
}
