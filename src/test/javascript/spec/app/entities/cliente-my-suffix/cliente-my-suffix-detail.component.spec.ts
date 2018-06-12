/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { ClienteMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/cliente-my-suffix/cliente-my-suffix-detail.component';
import { ClienteMySuffixService } from '../../../../../../main/webapp/app/entities/cliente-my-suffix/cliente-my-suffix.service';
import { ClienteMySuffix } from '../../../../../../main/webapp/app/entities/cliente-my-suffix/cliente-my-suffix.model';

describe('Component Tests', () => {

    describe('ClienteMySuffix Management Detail Component', () => {
        let comp: ClienteMySuffixDetailComponent;
        let fixture: ComponentFixture<ClienteMySuffixDetailComponent>;
        let service: ClienteMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ClienteMySuffixDetailComponent],
                providers: [
                    ClienteMySuffixService
                ]
            })
            .overrideTemplate(ClienteMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClienteMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClienteMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ClienteMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cliente).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
