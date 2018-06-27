/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { DocumentosDetailComponent } from '../../../../../../main/webapp/app/entities/documentos/documentos-detail.component';
import { DocumentosService } from '../../../../../../main/webapp/app/entities/documentos/documentos.service';
import { Documentos } from '../../../../../../main/webapp/app/entities/documentos/documentos.model';

describe('Component Tests', () => {

    describe('Documentos Management Detail Component', () => {
        let comp: DocumentosDetailComponent;
        let fixture: ComponentFixture<DocumentosDetailComponent>;
        let service: DocumentosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [DocumentosDetailComponent],
                providers: [
                    DocumentosService
                ]
            })
            .overrideTemplate(DocumentosDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentosDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Documentos(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.documentos).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
