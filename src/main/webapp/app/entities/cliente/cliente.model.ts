import { BaseEntity } from './../../shared';

export class Cliente implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public telefonos?: string,
        public correoElectronico?: string,
        public domicilio?: string,
        public rfc?: string,
        public referencia?: string,
        public totalExpediente?: number,
        public totalMigratorios?: number,
        public totalGenerales?: number,
        public totalCosto?: number,
        public expedientes?: BaseEntity[],
        public tramiteMigras?: BaseEntity[],
        public tramiteGrals?: BaseEntity[],
    ) {
    }
}
