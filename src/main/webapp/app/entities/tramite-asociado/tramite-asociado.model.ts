import { BaseEntity } from './../../shared';

export class TramiteAsociado implements BaseEntity {
    constructor(
        public id?: number,
        public idTramite?: number,
        public idTramiteAsociado?: number,
        public tipoServicioId?: number,
        public tipoServicioIdAsociado?: number,
    ) {
    }
}
