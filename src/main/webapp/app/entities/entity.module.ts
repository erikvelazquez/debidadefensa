import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DebidadefensaClienteMySuffixModule } from './cliente-my-suffix/cliente-my-suffix.module';
import { DebidadefensaEstatusMySuffixModule } from './estatus-my-suffix/estatus-my-suffix.module';
import { DebidadefensaExpedienteMySuffixModule } from './expediente-my-suffix/expediente-my-suffix.module';
import { DebidadefensaParteMySuffixModule } from './parte-my-suffix/parte-my-suffix.module';
import { DebidadefensaExpedienteAsociadoMySuffixModule } from './expediente-asociado-my-suffix/expediente-asociado-my-suffix.module';
import { DebidadefensaTramiteMigratorioMySuffixModule } from './tramite-migratorio-my-suffix/tramite-migratorio-my-suffix.module';
import { DebidadefensaTramiteGeneralMySuffixModule } from './tramite-general-my-suffix/tramite-general-my-suffix.module';
import { DebidadefensaTramiteAsociadoMySuffixModule } from './tramite-asociado-my-suffix/tramite-asociado-my-suffix.module';
import { DebidadefensaCostoServicioMySuffixModule } from './costo-servicio-my-suffix/costo-servicio-my-suffix.module';
import { DebidadefensaPagosMySuffixModule } from './pagos-my-suffix/pagos-my-suffix.module';
import { DebidadefensaFechasServicioMySuffixModule } from './fechas-servicio-my-suffix/fechas-servicio-my-suffix.module';
import { DebidadefensaTipoParteMySuffixModule } from './tipo-parte-my-suffix/tipo-parte-my-suffix.module';
import { DebidadefensaTipoServicioMySuffixModule } from './tipo-servicio-my-suffix/tipo-servicio-my-suffix.module';
import { DebidadefensaDocumentosMySuffixModule } from './documentos-my-suffix/documentos-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DebidadefensaClienteMySuffixModule,
        DebidadefensaEstatusMySuffixModule,
        DebidadefensaExpedienteMySuffixModule,
        DebidadefensaParteMySuffixModule,
        DebidadefensaExpedienteAsociadoMySuffixModule,
        DebidadefensaTramiteMigratorioMySuffixModule,
        DebidadefensaTramiteGeneralMySuffixModule,
        DebidadefensaTramiteAsociadoMySuffixModule,
        DebidadefensaCostoServicioMySuffixModule,
        DebidadefensaPagosMySuffixModule,
        DebidadefensaFechasServicioMySuffixModule,
        DebidadefensaTipoParteMySuffixModule,
        DebidadefensaTipoServicioMySuffixModule,
        DebidadefensaDocumentosMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaEntityModule {}
