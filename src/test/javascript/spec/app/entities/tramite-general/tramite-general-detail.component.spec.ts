/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteGeneralDetailComponent } from '../../../../../../main/webapp/app/entities/tramite-general/tramite-general-detail.component';
import { TramiteGeneralService } from '../../../../../../main/webapp/app/entities/tramite-general/tramite-general.service';
import { TramiteGeneral } from '../../../../../../main/webapp/app/entities/tramite-general/tramite-general.model';

describe('Component Tests', () => {

    describe('TramiteGeneral Management Detail Component', () => {
        let comp: TramiteGeneralDetailComponent;
        let fixture: ComponentFixture<TramiteGeneralDetailComponent>;
        let service: TramiteGeneralService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteGeneralDetailComponent],
                providers: [
                    TramiteGeneralService
                ]
            })
            .overrideTemplate(TramiteGeneralDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteGeneralDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteGeneralService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TramiteGeneral(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tramiteGeneral).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
