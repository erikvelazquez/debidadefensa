package com.debidadefensa.service.mapper;

import com.debidadefensa.domain.*;
import com.debidadefensa.service.dto.CostoServicioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CostoServicio and its DTO CostoServicioDTO.
 */
@Mapper(componentModel = "spring", uses = {ExpedienteMapper.class, TramiteMigratorioMapper.class, TramiteGeneralMapper.class, TipoServicioMapper.class})
public interface CostoServicioMapper extends EntityMapper<CostoServicioDTO, CostoServicio> {

    @Mapping(source = "expediente.id", target = "expedienteId")
    @Mapping(source = "tramiteMigratorio.id", target = "tramiteMigratorioId")
    @Mapping(source = "tramiteGeneral.id", target = "tramiteGeneralId")
    @Mapping(source = "tipoServicioCostoServicio.id", target = "tipoServicioCostoServicioId")
    CostoServicioDTO toDto(CostoServicio costoServicio);

    @Mapping(source = "expedienteId", target = "expediente")
    @Mapping(source = "tramiteMigratorioId", target = "tramiteMigratorio")
    @Mapping(source = "tramiteGeneralId", target = "tramiteGeneral")
    @Mapping(source = "tipoServicioCostoServicioId", target = "tipoServicioCostoServicio")
    CostoServicio toEntity(CostoServicioDTO costoServicioDTO);

    default CostoServicio fromId(Long id) {
        if (id == null) {
            return null;
        }
        CostoServicio costoServicio = new CostoServicio();
        costoServicio.setId(id);
        return costoServicio;
    }
}
