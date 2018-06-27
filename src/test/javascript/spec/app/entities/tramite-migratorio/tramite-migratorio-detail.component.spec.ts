/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteMigratorioDetailComponent } from '../../../../../../main/webapp/app/entities/tramite-migratorio/tramite-migratorio-detail.component';
import { TramiteMigratorioService } from '../../../../../../main/webapp/app/entities/tramite-migratorio/tramite-migratorio.service';
import { TramiteMigratorio } from '../../../../../../main/webapp/app/entities/tramite-migratorio/tramite-migratorio.model';

describe('Component Tests', () => {

    describe('TramiteMigratorio Management Detail Component', () => {
        let comp: TramiteMigratorioDetailComponent;
        let fixture: ComponentFixture<TramiteMigratorioDetailComponent>;
        let service: TramiteMigratorioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteMigratorioDetailComponent],
                providers: [
                    TramiteMigratorioService
                ]
            })
            .overrideTemplate(TramiteMigratorioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteMigratorioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteMigratorioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TramiteMigratorio(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tramiteMigratorio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
