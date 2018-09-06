import { BaseEntity } from './../../shared';

export class Documentos implements BaseEntity {
    constructor(
        public id?: number,
        public nombreDocumento?: string,
        public fecha?: any,
        public descripcion?: string,
        public ruta?: string,
        public expedienteId?: number,
        public expedienteAsociadoId?: number,
        public tramiteMigratorioId?: number,
        public tramiteGeneralId?: number,
        public tipoServicioId?: number,
        public idCliente?: number,
        public idDocumento?: number
    ) {
    }
}
