/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteMigratorioMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/tramite-migratorio-my-suffix/tramite-migratorio-my-suffix-detail.component';
import { TramiteMigratorioMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-migratorio-my-suffix/tramite-migratorio-my-suffix.service';
import { TramiteMigratorioMySuffix } from '../../../../../../main/webapp/app/entities/tramite-migratorio-my-suffix/tramite-migratorio-my-suffix.model';

describe('Component Tests', () => {

    describe('TramiteMigratorioMySuffix Management Detail Component', () => {
        let comp: TramiteMigratorioMySuffixDetailComponent;
        let fixture: ComponentFixture<TramiteMigratorioMySuffixDetailComponent>;
        let service: TramiteMigratorioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteMigratorioMySuffixDetailComponent],
                providers: [
                    TramiteMigratorioMySuffixService
                ]
            })
            .overrideTemplate(TramiteMigratorioMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteMigratorioMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteMigratorioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TramiteMigratorioMySuffix(123)
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
