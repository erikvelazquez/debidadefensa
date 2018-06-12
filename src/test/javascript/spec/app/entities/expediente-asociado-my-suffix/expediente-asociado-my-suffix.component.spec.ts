/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { ExpedienteAsociadoMySuffixComponent } from '../../../../../../main/webapp/app/entities/expediente-asociado-my-suffix/expediente-asociado-my-suffix.component';
import { ExpedienteAsociadoMySuffixService } from '../../../../../../main/webapp/app/entities/expediente-asociado-my-suffix/expediente-asociado-my-suffix.service';
import { ExpedienteAsociadoMySuffix } from '../../../../../../main/webapp/app/entities/expediente-asociado-my-suffix/expediente-asociado-my-suffix.model';

describe('Component Tests', () => {

    describe('ExpedienteAsociadoMySuffix Management Component', () => {
        let comp: ExpedienteAsociadoMySuffixComponent;
        let fixture: ComponentFixture<ExpedienteAsociadoMySuffixComponent>;
        let service: ExpedienteAsociadoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ExpedienteAsociadoMySuffixComponent],
                providers: [
                    ExpedienteAsociadoMySuffixService
                ]
            })
            .overrideTemplate(ExpedienteAsociadoMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpedienteAsociadoMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpedienteAsociadoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ExpedienteAsociadoMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.expedienteAsociados[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
