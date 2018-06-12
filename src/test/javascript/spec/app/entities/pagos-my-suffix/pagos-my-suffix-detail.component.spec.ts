/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { PagosMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/pagos-my-suffix/pagos-my-suffix-detail.component';
import { PagosMySuffixService } from '../../../../../../main/webapp/app/entities/pagos-my-suffix/pagos-my-suffix.service';
import { PagosMySuffix } from '../../../../../../main/webapp/app/entities/pagos-my-suffix/pagos-my-suffix.model';

describe('Component Tests', () => {

    describe('PagosMySuffix Management Detail Component', () => {
        let comp: PagosMySuffixDetailComponent;
        let fixture: ComponentFixture<PagosMySuffixDetailComponent>;
        let service: PagosMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [PagosMySuffixDetailComponent],
                providers: [
                    PagosMySuffixService
                ]
            })
            .overrideTemplate(PagosMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PagosMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagosMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PagosMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.pagos).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
