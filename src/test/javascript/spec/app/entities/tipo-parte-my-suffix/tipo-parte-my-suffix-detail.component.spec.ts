/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { TipoParteMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-parte-my-suffix/tipo-parte-my-suffix-detail.component';
import { TipoParteMySuffixService } from '../../../../../../main/webapp/app/entities/tipo-parte-my-suffix/tipo-parte-my-suffix.service';
import { TipoParteMySuffix } from '../../../../../../main/webapp/app/entities/tipo-parte-my-suffix/tipo-parte-my-suffix.model';

describe('Component Tests', () => {

    describe('TipoParteMySuffix Management Detail Component', () => {
        let comp: TipoParteMySuffixDetailComponent;
        let fixture: ComponentFixture<TipoParteMySuffixDetailComponent>;
        let service: TipoParteMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TipoParteMySuffixDetailComponent],
                providers: [
                    TipoParteMySuffixService
                ]
            })
            .overrideTemplate(TipoParteMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoParteMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoParteMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TipoParteMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tipoParte).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
