import { BaseEntity } from './../../shared';

export class Estatus implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
        public tipoServicioId?: number,
        public tipoServicioNombre?: string,
    ) {
    }
}
