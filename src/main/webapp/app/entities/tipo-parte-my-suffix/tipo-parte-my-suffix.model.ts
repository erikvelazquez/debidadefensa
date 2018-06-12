import { BaseEntity } from './../../shared';

export class TipoParteMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
    ) {
    }
}
