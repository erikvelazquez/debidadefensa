/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteAsociadoComponent } from '../../../../../../main/webapp/app/entities/tramite-asociado/tramite-asociado.component';
import { TramiteAsociadoService } from '../../../../../../main/webapp/app/entities/tramite-asociado/tramite-asociado.service';
import { TramiteAsociado } from '../../../../../../main/webapp/app/entities/tramite-asociado/tramite-asociado.model';

describe('Component Tests', () => {

    describe('TramiteAsociado Management Component', () => {
        let comp: TramiteAsociadoComponent;
        let fixture: ComponentFixture<TramiteAsociadoComponent>;
        let service: TramiteAsociadoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteAsociadoComponent],
                providers: [
                    TramiteAsociadoService
                ]
            })
            .overrideTemplate(TramiteAsociadoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteAsociadoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteAsociadoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TramiteAsociado(123)],
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
