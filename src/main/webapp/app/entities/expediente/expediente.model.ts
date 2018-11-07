import { BaseEntity } from './../../shared';

export class Expediente implements BaseEntity {
    constructor(
        public id?: number,
        public juzgado?: string,
        public numeroExpediente?: string,
        public juicio?: string,
        public responsable?: string,
        public observaciones?: string,
        public fechaAlta?: any,
        public fechaSentencia?: any,
        public clienteId?: number,
        public estatusExpedienteId?: number,
        public partes?: BaseEntity[],
        public expAsociados?: BaseEntity[],
        public costos?: BaseEntity[],
        public pagos?: BaseEntity[],
        public documentosExpedientes?: BaseEntity[],
        public fechasServicioExpedientes?: BaseEntity[],
        public tipoServicioId?: number,
        public totalDocumentos?: number,
        public asociados?: string,
    ) {
    }
}
