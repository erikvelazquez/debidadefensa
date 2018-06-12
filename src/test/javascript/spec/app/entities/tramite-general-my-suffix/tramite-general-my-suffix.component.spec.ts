/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteGeneralMySuffixComponent } from '../../../../../../main/webapp/app/entities/tramite-general-my-suffix/tramite-general-my-suffix.component';
import { TramiteGeneralMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-general-my-suffix/tramite-general-my-suffix.service';
import { TramiteGeneralMySuffix } from '../../../../../../main/webapp/app/entities/tramite-general-my-suffix/tramite-general-my-suffix.model';

describe('Component Tests', () => {

    describe('TramiteGeneralMySuffix Management Component', () => {
        let comp: TramiteGeneralMySuffixComponent;
        let fixture: ComponentFixture<TramiteGeneralMySuffixComponent>;
        let service: TramiteGeneralMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteGeneralMySuffixComponent],
                providers: [
                    TramiteGeneralMySuffixService
                ]
            })
            .overrideTemplate(TramiteGeneralMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteGeneralMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteGeneralMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TramiteGeneralMySuffix(123)],
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
