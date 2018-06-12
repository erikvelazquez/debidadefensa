/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { ExpedienteAsociadoMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/expediente-asociado-my-suffix/expediente-asociado-my-suffix-detail.component';
import { ExpedienteAsociadoMySuffixService } from '../../../../../../main/webapp/app/entities/expediente-asociado-my-suffix/expediente-asociado-my-suffix.service';
import { ExpedienteAsociadoMySuffix } from '../../../../../../main/webapp/app/entities/expediente-asociado-my-suffix/expediente-asociado-my-suffix.model';

describe('Component Tests', () => {

    describe('ExpedienteAsociadoMySuffix Management Detail Component', () => {
        let comp: ExpedienteAsociadoMySuffixDetailComponent;
        let fixture: ComponentFixture<ExpedienteAsociadoMySuffixDetailComponent>;
        let service: ExpedienteAsociadoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ExpedienteAsociadoMySuffixDetailComponent],
                providers: [
                    ExpedienteAsociadoMySuffixService
                ]
            })
            .overrideTemplate(ExpedienteAsociadoMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpedienteAsociadoMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpedienteAsociadoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ExpedienteAsociadoMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.expedienteAsociado).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
