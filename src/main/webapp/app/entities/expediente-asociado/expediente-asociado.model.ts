import { BaseEntity } from './../../shared';

export class ExpedienteAsociado implements BaseEntity {
    constructor(
        public id?: number,
        public numeroExpediente?: string,
        public instancia?: string,
        public organocompetente?: string,
        public archivo?: string,
        public observaciones?: string,
        public fechaSentencia?: any,
        public expedienteId?: number,
        public estatusExpedienteAsociadoId?: number,
        public expedienteAsociadoDocumentos?: BaseEntity[],
    ) {
    }
}
