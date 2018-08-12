import { BaseEntity } from './../../shared';

export class TramiteMigratorio implements BaseEntity {
    constructor(
        public id?: number,
        public nombreExtranjero?: string,
        public tipotramite?: string,
        public entidad?: string,
        public nut?: number,
        public contraseniaNUT?: string,
        public fechaIngreso?: any,
        public fechaNotificacion?: any,
        public fechaResolucion?: any,
        public archivo?: string,
        public observaciones?: string,
        public clienteId?: number,
        public estatusTramiteMigratorioId?: number,
        public tramitteMigratorioCostos?: BaseEntity[],
        public tramitteMigratorioPagos?: BaseEntity[],
        public tramitteMigratorioDocumentos?: BaseEntity[],
        public fechasServicioTramiteMigratorios?: BaseEntity[],
        public tramitesMigraAsociados?: BaseEntity[],
        public seleccionado?: boolean,
    ) {
    }
}
