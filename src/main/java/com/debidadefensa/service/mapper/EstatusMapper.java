package com.debidadefensa.service.mapper;

import com.debidadefensa.domain.*;
import com.debidadefensa.service.dto.EstatusDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Estatus and its DTO EstatusDTO.
 */
@Mapper(componentModel = "spring", uses = {TipoServicioMapper.class})
public interface EstatusMapper extends EntityMapper<EstatusDTO, Estatus> {

    @Mapping(source = "tipoServicioEstatus.id", target = "tipoServicioEstatusId")
    EstatusDTO toDto(Estatus estatus);

    @Mapping(source = "tipoServicioEstatusId", target = "tipoServicioEstatus")
    Estatus toEntity(EstatusDTO estatusDTO);

    default Estatus fromId(Long id) {
        if (id == null) {
            return null;
        }
        Estatus estatus = new Estatus();
        estatus.setId(id);
        return estatus;
    }
}
