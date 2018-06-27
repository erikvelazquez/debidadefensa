import { BaseEntity } from './../../shared';

export class Parte implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public expedienteId?: number,
        public tipoParteId?: number,
    ) {
    }
}
