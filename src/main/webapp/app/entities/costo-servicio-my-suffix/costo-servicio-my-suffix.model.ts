import { BaseEntity } from './../../shared';

export class CostoServicioMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public tipoServicio?: string,
        public idServicio?: number,
        public tipoCosto?: string,
        public concepto?: string,
        public costo?: number,
        public expedienteId?: number,
        public tramiteMigratorioId?: number,
        public tramiteGeneralId?: number,
        public tipoServicioCostoServicioId?: number,
    ) {
    }
}
