/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { EstatusDetailComponent } from '../../../../../../main/webapp/app/entities/estatus/estatus-detail.component';
import { EstatusService } from '../../../../../../main/webapp/app/entities/estatus/estatus.service';
import { Estatus } from '../../../../../../main/webapp/app/entities/estatus/estatus.model';

describe('Component Tests', () => {

    describe('Estatus Management Detail Component', () => {
        let comp: EstatusDetailComponent;
        let fixture: ComponentFixture<EstatusDetailComponent>;
        let service: EstatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [EstatusDetailComponent],
                providers: [
                    EstatusService
                ]
            })
            .overrideTemplate(EstatusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstatusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Estatus(123)
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
