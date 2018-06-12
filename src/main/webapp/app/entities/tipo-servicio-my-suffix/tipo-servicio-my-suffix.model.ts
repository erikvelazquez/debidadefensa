import { BaseEntity } from './../../shared';

export class TipoServicioMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
    ) {
    }
}
