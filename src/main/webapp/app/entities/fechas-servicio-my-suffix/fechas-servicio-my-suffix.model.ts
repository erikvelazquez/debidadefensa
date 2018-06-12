import { BaseEntity } from './../../shared';

export class FechasServicioMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public tipoServicio?: string,
        public fecha?: any,
        public descripcion?: string,
        public hora?: any,
        public observaciones?: string,
        public expedienteId?: number,
        public tramiteMigratorioId?: number,
        public tramiteGeneralId?: number,
        public tipoServicioFechasId?: number,
    ) {
    }
}
