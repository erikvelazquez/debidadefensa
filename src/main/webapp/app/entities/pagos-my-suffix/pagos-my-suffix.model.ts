import { BaseEntity } from './../../shared';

export class PagosMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public tipoServicio?: string,
        public idServicio?: number,
        public cantidad?: number,
        public fecha?: any,
        public formaPago?: string,
        public tipoAbono?: string,
        public expedienteId?: number,
        public tramiteMigratorioId?: number,
        public tramiteGeneralId?: number,
        public tipoServicioPagosId?: number,
    ) {
    }
}
