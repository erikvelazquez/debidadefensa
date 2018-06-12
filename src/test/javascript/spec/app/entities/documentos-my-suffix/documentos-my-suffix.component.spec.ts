/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { DocumentosMySuffixComponent } from '../../../../../../main/webapp/app/entities/documentos-my-suffix/documentos-my-suffix.component';
import { DocumentosMySuffixService } from '../../../../../../main/webapp/app/entities/documentos-my-suffix/documentos-my-suffix.service';
import { DocumentosMySuffix } from '../../../../../../main/webapp/app/entities/documentos-my-suffix/documentos-my-suffix.model';

describe('Component Tests', () => {

    describe('DocumentosMySuffix Management Component', () => {
        let comp: DocumentosMySuffixComponent;
        let fixture: ComponentFixture<DocumentosMySuffixComponent>;
        let service: DocumentosMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [DocumentosMySuffixComponent],
                providers: [
                    DocumentosMySuffixService
                ]
            })
            .overrideTemplate(DocumentosMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentosMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentosMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DocumentosMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.documentos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
