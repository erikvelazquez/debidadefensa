import { BaseEntity } from './../../shared';

export class CostoServicio implements BaseEntity {
    constructor(
        public id?: number,
        public tipoCosto?: string,
        public concepto?: string,
        public costo?: number,
        public expedienteId?: number,
        public tramiteMigratorioId?: number,
        public tramiteGeneralId?: number,
        public tipoServicioId?: number,
    ) {
    }
}
