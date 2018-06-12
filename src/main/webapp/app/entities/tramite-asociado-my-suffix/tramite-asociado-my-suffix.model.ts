import { BaseEntity } from './../../shared';

export class TramiteAsociadoMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public tipoTramite?: string,
        public idTramite?: number,
    ) {
    }
}
