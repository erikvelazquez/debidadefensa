import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DebidadefensaClienteModule } from './cliente/cliente.module';
import { DebidadefensaEstatusModule } from './estatus/estatus.module';
import { DebidadefensaExpedienteModule } from './expediente/expediente.module';
import { DebidadefensaParteModule } from './parte/parte.module';
import { DebidadefensaExpedienteAsociadoModule } from './expediente-asociado/expediente-asociado.module';
import { DebidadefensaTramiteMigratorioModule } from './tramite-migratorio/tramite-migratorio.module';
import { DebidadefensaTramiteGeneralModule } from './tramite-general/tramite-general.module';
import { DebidadefensaTramiteAsociadoModule } from './tramite-asociado/tramite-asociado.module';
import { DebidadefensaCostoServicioModule } from './costo-servicio/costo-servicio.module';
import { DebidadefensaPagosModule } from './pagos/pagos.module';
import { DebidadefensaFechasServicioModule } from './fechas-servicio/fechas-servicio.module';
import { DebidadefensaTipoParteModule } from './tipo-parte/tipo-parte.module';
import { DebidadefensaTipoServicioModule } from './tipo-servicio/tipo-servicio.module';
import { DebidadefensaDocumentosModule } from './documentos/documentos.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DebidadefensaClienteModule,
        DebidadefensaEstatusModule,
        DebidadefensaExpedienteModule,
        DebidadefensaParteModule,
        DebidadefensaExpedienteAsociadoModule,
        DebidadefensaTramiteMigratorioModule,
        DebidadefensaTramiteGeneralModule,
        DebidadefensaTramiteAsociadoModule,
        DebidadefensaCostoServicioModule,
        DebidadefensaPagosModule,
        DebidadefensaFechasServicioModule,
        DebidadefensaTipoParteModule,
        DebidadefensaTipoServicioModule,
        DebidadefensaDocumentosModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaEntityModule {}
