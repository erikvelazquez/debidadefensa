package com.debidadefensa.service.mapper;

import com.debidadefensa.domain.*;
import com.debidadefensa.service.dto.TipoServicioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TipoServicio and its DTO TipoServicioDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TipoServicioMapper extends EntityMapper<TipoServicioDTO, TipoServicio> {


    @Mapping(target = "tipoServicioEstatuses", ignore = true)
    TipoServicio toEntity(TipoServicioDTO tipoServicioDTO);

    default TipoServicio fromId(Long id) {
        if (id == null) {
            return null;
        }
        TipoServicio tipoServicio = new TipoServicio();
        tipoServicio.setId(id);
        return tipoServicio;
    }
}
