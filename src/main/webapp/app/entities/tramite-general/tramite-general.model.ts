import { BaseEntity } from './../../shared';

export class TramiteGeneral implements BaseEntity {
    constructor(
        public id?: number,
        public titular?: string,
        public dependencia?: string,
        public numeroTramite?: string,
        public tipoTramite?: string,
        public fechaIngreso?: any,
        public fechaResolucion?: any,
        public fechaNotificacion?: any,
        public archivo?: string,
        public observaciones?: string,
        public clienteId?: number,
        public estatusTramiteGeneralId?: number,
        public tramiteGralPagos?: BaseEntity[],
        public tramiteGralCostos?: BaseEntity[],
        public tramiteGralDocumentos?: BaseEntity[],
        public fechasServicioTramiteGenerals?: BaseEntity[],
        public tramiteGeneralAsociados?: BaseEntity[],
        public seleccionado?: boolean,
    ) {
    }
}
