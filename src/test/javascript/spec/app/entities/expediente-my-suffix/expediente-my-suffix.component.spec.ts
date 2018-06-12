/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { ExpedienteMySuffixComponent } from '../../../../../../main/webapp/app/entities/expediente-my-suffix/expediente-my-suffix.component';
import { ExpedienteMySuffixService } from '../../../../../../main/webapp/app/entities/expediente-my-suffix/expediente-my-suffix.service';
import { ExpedienteMySuffix } from '../../../../../../main/webapp/app/entities/expediente-my-suffix/expediente-my-suffix.model';

describe('Component Tests', () => {

    describe('ExpedienteMySuffix Management Component', () => {
        let comp: ExpedienteMySuffixComponent;
        let fixture: ComponentFixture<ExpedienteMySuffixComponent>;
        let service: ExpedienteMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ExpedienteMySuffixComponent],
                providers: [
                    ExpedienteMySuffixService
                ]
            })
            .overrideTemplate(ExpedienteMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpedienteMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpedienteMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ExpedienteMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.expedientes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
