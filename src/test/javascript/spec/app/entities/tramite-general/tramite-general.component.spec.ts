/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteGeneralComponent } from '../../../../../../main/webapp/app/entities/tramite-general/tramite-general.component';
import { TramiteGeneralService } from '../../../../../../main/webapp/app/entities/tramite-general/tramite-general.service';
import { TramiteGeneral } from '../../../../../../main/webapp/app/entities/tramite-general/tramite-general.model';

describe('Component Tests', () => {

    describe('TramiteGeneral Management Component', () => {
        let comp: TramiteGeneralComponent;
        let fixture: ComponentFixture<TramiteGeneralComponent>;
        let service: TramiteGeneralService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteGeneralComponent],
                providers: [
                    TramiteGeneralService
                ]
            })
            .overrideTemplate(TramiteGeneralComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteGeneralComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteGeneralService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TramiteGeneral(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tramiteGenerals[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
