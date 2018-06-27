import { BaseEntity } from './../../shared';

export class TipoServicio implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
        public tipoServicioEstatuses?: BaseEntity[],
    ) {
    }
}
