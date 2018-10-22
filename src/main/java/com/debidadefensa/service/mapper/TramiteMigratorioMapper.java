package com.debidadefensa.service.mapper;

import com.debidadefensa.domain.*;
import com.debidadefensa.service.dto.TramiteMigratorioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TramiteMigratorio and its DTO TramiteMigratorioDTO.
 */
@Mapper(componentModel = "spring", uses = {ClienteMapper.class, TramiteAsociadoMapper.class, EstatusMapper.class})
public interface TramiteMigratorioMapper extends EntityMapper<TramiteMigratorioDTO, TramiteMigratorio> {

    @Mapping(source = "cliente.id", target = "clienteId")
    @Mapping(source = "cliente.nombre", target = "clienteNombre")
    @Mapping(source = "estatusTramiteMigratorio.id", target = "estatusTramiteMigratorioId")
    @Mapping(source = "estatusTramiteMigratorio.descripcion", target = "estatusDescripcion")
    TramiteMigratorioDTO toDto(TramiteMigratorio tramiteMigratorio);

    @Mapping(source = "clienteId", target = "cliente")
    @Mapping(target = "tramitteMigratorioCostos", ignore = true)
    @Mapping(target = "tramitteMigratorioPagos", ignore = true)
    @Mapping(target = "tramitteMigratorioDocumentos", ignore = true)
    @Mapping(target = "fechasServicioTramiteMigratorios", ignore = true)
    @Mapping(source = "estatusTramiteMigratorioId", target = "estatusTramiteMigratorio")
    TramiteMigratorio toEntity(TramiteMigratorioDTO tramiteMigratorioDTO);

    default TramiteMigratorio fromId(Long id) {
        if (id == null) {
            return null;
        }
        TramiteMigratorio tramiteMigratorio = new TramiteMigratorio();
        tramiteMigratorio.setId(id);
        return tramiteMigratorio;
    }
}
