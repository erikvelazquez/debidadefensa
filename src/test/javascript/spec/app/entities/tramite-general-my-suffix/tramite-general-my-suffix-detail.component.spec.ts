/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteGeneralMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/tramite-general-my-suffix/tramite-general-my-suffix-detail.component';
import { TramiteGeneralMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-general-my-suffix/tramite-general-my-suffix.service';
import { TramiteGeneralMySuffix } from '../../../../../../main/webapp/app/entities/tramite-general-my-suffix/tramite-general-my-suffix.model';

describe('Component Tests', () => {

    describe('TramiteGeneralMySuffix Management Detail Component', () => {
        let comp: TramiteGeneralMySuffixDetailComponent;
        let fixture: ComponentFixture<TramiteGeneralMySuffixDetailComponent>;
        let service: TramiteGeneralMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteGeneralMySuffixDetailComponent],
                providers: [
                    TramiteGeneralMySuffixService
                ]
            })
            .overrideTemplate(TramiteGeneralMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteGeneralMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteGeneralMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TramiteGeneralMySuffix(123)
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
