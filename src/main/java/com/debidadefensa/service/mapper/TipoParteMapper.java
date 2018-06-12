package com.debidadefensa.service.mapper;

import com.debidadefensa.domain.*;
import com.debidadefensa.service.dto.TipoParteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TipoParte and its DTO TipoParteDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TipoParteMapper extends EntityMapper<TipoParteDTO, TipoParte> {



    default TipoParte fromId(Long id) {
        if (id == null) {
            return null;
        }
        TipoParte tipoParte = new TipoParte();
        tipoParte.setId(id);
        return tipoParte;
    }
}
