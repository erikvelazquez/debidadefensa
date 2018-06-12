/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { PagosMySuffixComponent } from '../../../../../../main/webapp/app/entities/pagos-my-suffix/pagos-my-suffix.component';
import { PagosMySuffixService } from '../../../../../../main/webapp/app/entities/pagos-my-suffix/pagos-my-suffix.service';
import { PagosMySuffix } from '../../../../../../main/webapp/app/entities/pagos-my-suffix/pagos-my-suffix.model';

describe('Component Tests', () => {

    describe('PagosMySuffix Management Component', () => {
        let comp: PagosMySuffixComponent;
        let fixture: ComponentFixture<PagosMySuffixComponent>;
        let service: PagosMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [PagosMySuffixComponent],
                providers: [
                    PagosMySuffixService
                ]
            })
            .overrideTemplate(PagosMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PagosMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagosMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PagosMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.pagos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
