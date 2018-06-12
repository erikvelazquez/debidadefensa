import { BaseEntity } from './../../shared';

export class EstatusMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
        public tipoServicioEstatusId?: number,
    ) {
    }
}
