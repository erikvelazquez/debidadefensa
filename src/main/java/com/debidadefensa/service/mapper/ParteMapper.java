package com.debidadefensa.service.mapper;

import com.debidadefensa.domain.*;
import com.debidadefensa.service.dto.ParteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Parte and its DTO ParteDTO.
 */
@Mapper(componentModel = "spring", uses = {ExpedienteMapper.class, TipoParteMapper.class})
public interface ParteMapper extends EntityMapper<ParteDTO, Parte> {

    @Mapping(source = "expediente.id", target = "expedienteId")
    @Mapping(source = "tipoParte.id", target = "tipoParteId")
    ParteDTO toDto(Parte parte);

    @Mapping(source = "expedienteId", target = "expediente")
    @Mapping(source = "tipoParteId", target = "tipoParte")
    Parte toEntity(ParteDTO parteDTO);

    default Parte fromId(Long id) {
        if (id == null) {
            return null;
        }
        Parte parte = new Parte();
        parte.setId(id);
        return parte;
    }
}
