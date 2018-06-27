/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteAsociadoDetailComponent } from '../../../../../../main/webapp/app/entities/tramite-asociado/tramite-asociado-detail.component';
import { TramiteAsociadoService } from '../../../../../../main/webapp/app/entities/tramite-asociado/tramite-asociado.service';
import { TramiteAsociado } from '../../../../../../main/webapp/app/entities/tramite-asociado/tramite-asociado.model';

describe('Component Tests', () => {

    describe('TramiteAsociado Management Detail Component', () => {
        let comp: TramiteAsociadoDetailComponent;
        let fixture: ComponentFixture<TramiteAsociadoDetailComponent>;
        let service: TramiteAsociadoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteAsociadoDetailComponent],
                providers: [
                    TramiteAsociadoService
                ]
            })
            .overrideTemplate(TramiteAsociadoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteAsociadoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteAsociadoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TramiteAsociado(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tramiteAsociado).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
