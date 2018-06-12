import { BaseEntity } from './../../shared';

export class ParteMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public expedienteId?: number,
        public tipoParteId?: number,
    ) {
    }
}
