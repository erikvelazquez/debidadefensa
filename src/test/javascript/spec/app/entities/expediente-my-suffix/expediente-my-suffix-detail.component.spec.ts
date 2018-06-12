/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { ExpedienteMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/expediente-my-suffix/expediente-my-suffix-detail.component';
import { ExpedienteMySuffixService } from '../../../../../../main/webapp/app/entities/expediente-my-suffix/expediente-my-suffix.service';
import { ExpedienteMySuffix } from '../../../../../../main/webapp/app/entities/expediente-my-suffix/expediente-my-suffix.model';

describe('Component Tests', () => {

    describe('ExpedienteMySuffix Management Detail Component', () => {
        let comp: ExpedienteMySuffixDetailComponent;
        let fixture: ComponentFixture<ExpedienteMySuffixDetailComponent>;
        let service: ExpedienteMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ExpedienteMySuffixDetailComponent],
                providers: [
                    ExpedienteMySuffixService
                ]
            })
            .overrideTemplate(ExpedienteMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpedienteMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpedienteMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ExpedienteMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.expediente).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
