package com.debidadefensa.service.mapper;

import com.debidadefensa.domain.*;
import com.debidadefensa.service.dto.PagosDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Pagos and its DTO PagosDTO.
 */
@Mapper(componentModel = "spring", uses = {ExpedienteMapper.class, TramiteMigratorioMapper.class, TramiteGeneralMapper.class, TipoServicioMapper.class})
public interface PagosMapper extends EntityMapper<PagosDTO, Pagos> {

    @Mapping(source = "expediente.id", target = "expedienteId")
    @Mapping(source = "tramiteMigratorio.id", target = "tramiteMigratorioId")
    @Mapping(source = "tramiteGeneral.id", target = "tramiteGeneralId")
    @Mapping(source = "tipoServicio.id", target = "tipoServicioId")
    PagosDTO toDto(Pagos pagos);

    @Mapping(source = "expedienteId", target = "expediente")
    @Mapping(source = "tramiteMigratorioId", target = "tramiteMigratorio")
    @Mapping(source = "tramiteGeneralId", target = "tramiteGeneral")
    @Mapping(source = "tipoServicioId", target = "tipoServicio")
    Pagos toEntity(PagosDTO pagosDTO);

    default Pagos fromId(Long id) {
        if (id == null) {
            return null;
        }
        Pagos pagos = new Pagos();
        pagos.setId(id);
        return pagos;
    }
}
