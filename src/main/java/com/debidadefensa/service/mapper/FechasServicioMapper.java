package com.debidadefensa.service.mapper;

import com.debidadefensa.domain.*;
import com.debidadefensa.service.dto.FechasServicioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FechasServicio and its DTO FechasServicioDTO.
 */
@Mapper(componentModel = "spring", uses = {ExpedienteMapper.class, TramiteMigratorioMapper.class, TramiteGeneralMapper.class, TipoServicioMapper.class})
public interface FechasServicioMapper extends EntityMapper<FechasServicioDTO, FechasServicio> {

    @Mapping(source = "expediente.id", target = "expedienteId")
    @Mapping(source = "tramiteMigratorio.id", target = "tramiteMigratorioId")
    @Mapping(source = "tramiteGeneral.id", target = "tramiteGeneralId")
    @Mapping(source = "tipoServicio.id", target = "tipoServicioId")
    FechasServicioDTO toDto(FechasServicio fechasServicio);

    @Mapping(source = "expedienteId", target = "expediente")
    @Mapping(source = "tramiteMigratorioId", target = "tramiteMigratorio")
    @Mapping(source = "tramiteGeneralId", target = "tramiteGeneral")
    @Mapping(source = "tipoServicioId", target = "tipoServicio")
    FechasServicio toEntity(FechasServicioDTO fechasServicioDTO);

    default FechasServicio fromId(Long id) {
        if (id == null) {
            return null;
        }
        FechasServicio fechasServicio = new FechasServicio();
        fechasServicio.setId(id);
        return fechasServicio;
    }
}
