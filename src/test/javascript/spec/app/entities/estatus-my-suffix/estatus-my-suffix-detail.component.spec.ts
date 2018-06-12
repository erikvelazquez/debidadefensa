/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { EstatusMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/estatus-my-suffix/estatus-my-suffix-detail.component';
import { EstatusMySuffixService } from '../../../../../../main/webapp/app/entities/estatus-my-suffix/estatus-my-suffix.service';
import { EstatusMySuffix } from '../../../../../../main/webapp/app/entities/estatus-my-suffix/estatus-my-suffix.model';

describe('Component Tests', () => {

    describe('EstatusMySuffix Management Detail Component', () => {
        let comp: EstatusMySuffixDetailComponent;
        let fixture: ComponentFixture<EstatusMySuffixDetailComponent>;
        let service: EstatusMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [EstatusMySuffixDetailComponent],
                providers: [
                    EstatusMySuffixService
                ]
            })
            .overrideTemplate(EstatusMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstatusMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstatusMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EstatusMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.estatus).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
