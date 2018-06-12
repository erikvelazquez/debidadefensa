/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteAsociadoMySuffixComponent } from '../../../../../../main/webapp/app/entities/tramite-asociado-my-suffix/tramite-asociado-my-suffix.component';
import { TramiteAsociadoMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-asociado-my-suffix/tramite-asociado-my-suffix.service';
import { TramiteAsociadoMySuffix } from '../../../../../../main/webapp/app/entities/tramite-asociado-my-suffix/tramite-asociado-my-suffix.model';

describe('Component Tests', () => {

    describe('TramiteAsociadoMySuffix Management Component', () => {
        let comp: TramiteAsociadoMySuffixComponent;
        let fixture: ComponentFixture<TramiteAsociadoMySuffixComponent>;
        let service: TramiteAsociadoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteAsociadoMySuffixComponent],
                providers: [
                    TramiteAsociadoMySuffixService
                ]
            })
            .overrideTemplate(TramiteAsociadoMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteAsociadoMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteAsociadoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TramiteAsociadoMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tramiteAsociados[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
