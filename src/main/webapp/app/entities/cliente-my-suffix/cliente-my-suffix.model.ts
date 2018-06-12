import { BaseEntity } from './../../shared';

export class ClienteMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public telefonos?: string,
        public correoElectronico?: string,
        public domicilio?: string,
        public rfc?: string,
        public referencia?: string,
        public expedientes?: BaseEntity[],
        public tramiteMigras?: BaseEntity[],
        public tramiteGrals?: BaseEntity[],
    ) {
    }
}
