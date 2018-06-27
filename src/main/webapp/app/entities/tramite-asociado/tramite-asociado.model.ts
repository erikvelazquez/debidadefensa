import { BaseEntity } from './../../shared';

export class TramiteAsociado implements BaseEntity {
    constructor(
        public id?: number,
        public tipoTramite?: string,
        public idTramite?: number,
    ) {
    }
}
