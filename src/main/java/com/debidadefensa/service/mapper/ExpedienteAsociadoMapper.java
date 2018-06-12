package com.debidadefensa.service.mapper;

import com.debidadefensa.domain.*;
import com.debidadefensa.service.dto.ExpedienteAsociadoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ExpedienteAsociado and its DTO ExpedienteAsociadoDTO.
 */
@Mapper(componentModel = "spring", uses = {ExpedienteMapper.class, EstatusMapper.class})
public interface ExpedienteAsociadoMapper extends EntityMapper<ExpedienteAsociadoDTO, ExpedienteAsociado> {

    @Mapping(source = "expediente.id", target = "expedienteId")
    @Mapping(source = "estatusExpedienteAsociado.id", target = "estatusExpedienteAsociadoId")
    ExpedienteAsociadoDTO toDto(ExpedienteAsociado expedienteAsociado);

    @Mapping(source = "expedienteId", target = "expediente")
    @Mapping(source = "estatusExpedienteAsociadoId", target = "estatusExpedienteAsociado")
    @Mapping(target = "expedienteAsociadoDocumentos", ignore = true)
    ExpedienteAsociado toEntity(ExpedienteAsociadoDTO expedienteAsociadoDTO);

    default ExpedienteAsociado fromId(Long id) {
        if (id == null) {
            return null;
        }
        ExpedienteAsociado expedienteAsociado = new ExpedienteAsociado();
        expedienteAsociado.setId(id);
        return expedienteAsociado;
    }
}
