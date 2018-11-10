import { BaseEntity } from './../../shared';

export class FechasServicio implements BaseEntity {
    constructor(
        public id?: number,
        public fecha?: any,
        public descripcion?: string,
        public observaciones?: string,
        public expedienteId?: number,
        public tramiteMigratorioId?: number,
        public tramiteGeneralId?: number,
        public tipoServicioId?: number,
        public nombreCliente?: string,
    ) {
    }
}
