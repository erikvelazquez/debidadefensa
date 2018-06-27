import { BaseEntity } from './../../shared';

export class TipoParte implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
    ) {
    }
}
