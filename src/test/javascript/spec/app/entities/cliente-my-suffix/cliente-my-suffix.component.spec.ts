/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { ClienteMySuffixComponent } from '../../../../../../main/webapp/app/entities/cliente-my-suffix/cliente-my-suffix.component';
import { ClienteMySuffixService } from '../../../../../../main/webapp/app/entities/cliente-my-suffix/cliente-my-suffix.service';
import { ClienteMySuffix } from '../../../../../../main/webapp/app/entities/cliente-my-suffix/cliente-my-suffix.model';

describe('Component Tests', () => {

    describe('ClienteMySuffix Management Component', () => {
        let comp: ClienteMySuffixComponent;
        let fixture: ComponentFixture<ClienteMySuffixComponent>;
        let service: ClienteMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ClienteMySuffixComponent],
                providers: [
                    ClienteMySuffixService
                ]
            })
            .overrideTemplate(ClienteMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClienteMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClienteMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ClienteMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.clientes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
