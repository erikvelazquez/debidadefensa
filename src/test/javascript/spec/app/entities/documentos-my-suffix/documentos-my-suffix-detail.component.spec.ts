/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { DocumentosMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/documentos-my-suffix/documentos-my-suffix-detail.component';
import { DocumentosMySuffixService } from '../../../../../../main/webapp/app/entities/documentos-my-suffix/documentos-my-suffix.service';
import { DocumentosMySuffix } from '../../../../../../main/webapp/app/entities/documentos-my-suffix/documentos-my-suffix.model';

describe('Component Tests', () => {

    describe('DocumentosMySuffix Management Detail Component', () => {
        let comp: DocumentosMySuffixDetailComponent;
        let fixture: ComponentFixture<DocumentosMySuffixDetailComponent>;
        let service: DocumentosMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [DocumentosMySuffixDetailComponent],
                providers: [
                    DocumentosMySuffixService
                ]
            })
            .overrideTemplate(DocumentosMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentosMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentosMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DocumentosMySuffix(123)
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
