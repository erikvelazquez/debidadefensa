import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DocumentosMySuffix } from './documentos-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DocumentosMySuffix>;

@Injectable()
export class DocumentosMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/documentos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/documentos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(documentos: DocumentosMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(documentos);
        return this.http.post<DocumentosMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(documentos: DocumentosMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(documentos);
        return this.http.put<DocumentosMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DocumentosMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DocumentosMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<DocumentosMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DocumentosMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<DocumentosMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<DocumentosMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DocumentosMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DocumentosMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DocumentosMySuffix[]>): HttpResponse<DocumentosMySuffix[]> {
        const jsonResponse: DocumentosMySuffix[] = res.body;
        const body: DocumentosMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DocumentosMySuffix.
     */
    private convertItemFromServer(documentos: DocumentosMySuffix): DocumentosMySuffix {
        const copy: DocumentosMySuffix = Object.assign({}, documentos);
        copy.fecha = this.dateUtils
            .convertDateTimeFromServer(documentos.fecha);
        return copy;
    }

    /**
     * Convert a DocumentosMySuffix to a JSON which can be sent to the server.
     */
    private convert(documentos: DocumentosMySuffix): DocumentosMySuffix {
        const copy: DocumentosMySuffix = Object.assign({}, documentos);

        copy.fecha = this.dateUtils.toDate(documentos.fecha);
        return copy;
    }
}
