import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Documentos } from './documentos.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Documentos>;

@Injectable()
export class DocumentosService {

    private resourceUrl =  SERVER_API_URL + 'api/documentos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/documentos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(fileToUpload: File, documentos: Documentos): Observable<EntityResponseType> {
        this.postFile(fileToUpload, documentos)
        .subscribe((event) => {
            if (event instanceof HttpResponse) {
               // console.log(event.body);
             }
        });
        const copy = this.convert(documentos);
        return this.http.post<Documentos>(this.resourceUrl, copy, { observe: 'response' })
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    postFile(fileToUpload: File, documentos: Documentos ): Observable<HttpEvent<{}>> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        formData.append('fecha', String(documentos.fecha));
        formData.append('descripcion', documentos.descripcion);
        formData.append('idCliente', String(documentos.idCliente));
        const options = createRequestOption('Hola Mundo');
        const req = new HttpRequest('POST', this.resourceUrl + '/upload', formData, {reportProgress: true,  responseType: 'text' });
        return this.http.request(req);
    }

    getFile(fileName: String): Observable<Blob> {
        return this.http.get(this.resourceUrl + '/download?fileName=' + fileName , { responseType: 'blob' });
    }

    update(documentos: Documentos): Observable<EntityResponseType> {
        const copy = this.convert(documentos);
        return this.http.put<Documentos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Documentos>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByMigratorioId(id: number): Observable<HttpResponse<Documentos[]>> {
        return this.http.get<Documentos[]>(SERVER_API_URL + 'api/documentos/migratorio/' + id, { observe: 'response' })
            .map((res: HttpResponse<Documentos[]>) => this.convertArrayResponse(res));
    }

    findByGeneralId(id: number): Observable<HttpResponse<Documentos[]>> {
        return this.http.get<Documentos[]>(SERVER_API_URL + 'api/documentos/general/' + id, { observe: 'response' })
            .map((res: HttpResponse<Documentos[]>) => this.convertArrayResponse(res));
    }

    findByExpedienteId(id: number): Observable<HttpResponse<Documentos[]>> {
        return this.http.get<Documentos[]>(SERVER_API_URL + 'api/documentos/expediente/' + id, { observe: 'response' })
            .map((res: HttpResponse<Documentos[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Documentos[]>> {
        const options = createRequestOption(req);
        return this.http.get<Documentos[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Documentos[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Documentos[]>> {
        const options = createRequestOption(req);
        return this.http.get<Documentos[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Documentos[]>) => this.convertArrayResponse(res));
    }

   /* postFile(fileToUpload: File): Observable<boolean> {
        const endpoint = 'your-destination-url';
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        return this.httpClient
          .post(endpoint, formData, { headers: yourHeadersConfig })
          .map(() => { return true; })
          .catch((e) => this.handleError(e));
    }*/

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Documentos = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Documentos[]>): HttpResponse<Documentos[]> {
        const jsonResponse: Documentos[] = res.body;
        const body: Documentos[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Documentos.
     */
    private convertItemFromServer(documentos: Documentos): Documentos {
        const copy: Documentos = Object.assign({}, documentos);
        copy.fecha = this.dateUtils
            .convertLocalDateFromServer(documentos.fecha);
        return copy;
    }

    /**
     * Convert a Documentos to a JSON which can be sent to the server.
     */
    private convert(documentos: Documentos): Documentos {
        const copy: Documentos = Object.assign({}, documentos);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(documentos.fecha);
        return copy;
    }
}
