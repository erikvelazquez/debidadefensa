/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { TipoParteDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-parte/tipo-parte-detail.component';
import { TipoParteService } from '../../../../../../main/webapp/app/entities/tipo-parte/tipo-parte.service';
import { TipoParte } from '../../../../../../main/webapp/app/entities/tipo-parte/tipo-parte.model';

describe('Component Tests', () => {

    describe('TipoParte Management Detail Component', () => {
        let comp: TipoParteDetailComponent;
        let fixture: ComponentFixture<TipoParteDetailComponent>;
        let service: TipoParteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TipoParteDetailComponent],
                providers: [
                    TipoParteService
                ]
            })
            .overrideTemplate(TipoParteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoParteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoParteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TipoParte(123)
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
