/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { DocumentosComponent } from '../../../../../../main/webapp/app/entities/documentos/documentos.component';
import { DocumentosService } from '../../../../../../main/webapp/app/entities/documentos/documentos.service';
import { Documentos } from '../../../../../../main/webapp/app/entities/documentos/documentos.model';

describe('Component Tests', () => {

    describe('Documentos Management Component', () => {
        let comp: DocumentosComponent;
        let fixture: ComponentFixture<DocumentosComponent>;
        let service: DocumentosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [DocumentosComponent],
                providers: [
                    DocumentosService
                ]
            })
            .overrideTemplate(DocumentosComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Documentos(123)],
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
