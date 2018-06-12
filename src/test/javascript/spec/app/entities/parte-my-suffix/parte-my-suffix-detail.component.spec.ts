/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { ParteMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/parte-my-suffix/parte-my-suffix-detail.component';
import { ParteMySuffixService } from '../../../../../../main/webapp/app/entities/parte-my-suffix/parte-my-suffix.service';
import { ParteMySuffix } from '../../../../../../main/webapp/app/entities/parte-my-suffix/parte-my-suffix.model';

describe('Component Tests', () => {

    describe('ParteMySuffix Management Detail Component', () => {
        let comp: ParteMySuffixDetailComponent;
        let fixture: ComponentFixture<ParteMySuffixDetailComponent>;
        let service: ParteMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ParteMySuffixDetailComponent],
                providers: [
                    ParteMySuffixService
                ]
            })
            .overrideTemplate(ParteMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParteMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParteMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ParteMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.parte).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
