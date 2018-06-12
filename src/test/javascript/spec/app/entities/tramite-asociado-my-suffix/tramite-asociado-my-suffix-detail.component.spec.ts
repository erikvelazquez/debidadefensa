/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteAsociadoMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/tramite-asociado-my-suffix/tramite-asociado-my-suffix-detail.component';
import { TramiteAsociadoMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-asociado-my-suffix/tramite-asociado-my-suffix.service';
import { TramiteAsociadoMySuffix } from '../../../../../../main/webapp/app/entities/tramite-asociado-my-suffix/tramite-asociado-my-suffix.model';

describe('Component Tests', () => {

    describe('TramiteAsociadoMySuffix Management Detail Component', () => {
        let comp: TramiteAsociadoMySuffixDetailComponent;
        let fixture: ComponentFixture<TramiteAsociadoMySuffixDetailComponent>;
        let service: TramiteAsociadoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteAsociadoMySuffixDetailComponent],
                providers: [
                    TramiteAsociadoMySuffixService
                ]
            })
            .overrideTemplate(TramiteAsociadoMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteAsociadoMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteAsociadoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TramiteAsociadoMySuffix(123)
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
