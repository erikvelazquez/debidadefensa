/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { TipoParteMySuffixComponent } from '../../../../../../main/webapp/app/entities/tipo-parte-my-suffix/tipo-parte-my-suffix.component';
import { TipoParteMySuffixService } from '../../../../../../main/webapp/app/entities/tipo-parte-my-suffix/tipo-parte-my-suffix.service';
import { TipoParteMySuffix } from '../../../../../../main/webapp/app/entities/tipo-parte-my-suffix/tipo-parte-my-suffix.model';

describe('Component Tests', () => {

    describe('TipoParteMySuffix Management Component', () => {
        let comp: TipoParteMySuffixComponent;
        let fixture: ComponentFixture<TipoParteMySuffixComponent>;
        let service: TipoParteMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TipoParteMySuffixComponent],
                providers: [
                    TipoParteMySuffixService
                ]
            })
            .overrideTemplate(TipoParteMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoParteMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoParteMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TipoParteMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tipoPartes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
