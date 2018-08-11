package com.debidadefensa.service.mapper;

import com.debidadefensa.domain.*;
import com.debidadefensa.service.dto.TramiteAsociadoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TramiteAsociado and its DTO TramiteAsociadoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TramiteAsociadoMapper extends EntityMapper<TramiteAsociadoDTO, TramiteAsociado> {

    default TramiteAsociado fromId(Long id) {
        if (id == null) {
            return null;
        }
        TramiteAsociado tramiteAsociado = new TramiteAsociado();
        tramiteAsociado.setId(id);
        return tramiteAsociado;
    }
}
