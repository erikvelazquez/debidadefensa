package com.debidadefensa.service.mapper;

import com.debidadefensa.domain.*;
import com.debidadefensa.service.dto.ExpedienteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Expediente and its DTO ExpedienteDTO.
 */
@Mapper(componentModel = "spring", uses = {ClienteMapper.class, TipoServicioMapper.class, EstatusMapper.class})
public interface ExpedienteMapper extends EntityMapper<ExpedienteDTO, Expediente> {

    @Mapping(source = "cliente.id", target = "clienteId")
    @Mapping(source = "cliente.nombre", target = "clienteNombre")    
    @Mapping(source = "estatusExpediente.id", target = "estatusExpedienteId")
    @Mapping(source = "estatusExpediente.descripcion", target = "estatusDescripcion")
    @Mapping(source = "tipoServicio.id", target = "tipoServicioId")
    @Mapping(source = "estatusExpediente.descripcion", target = "estatusExpedienteDescripcion")
    ExpedienteDTO toDto(Expediente expediente);

    @Mapping(source = "clienteId", target = "cliente")
    @Mapping(source = "estatusExpedienteId", target = "estatusExpediente")
    @Mapping(target = "partes", ignore = true)
    @Mapping(target = "expAsociados", ignore = true)
    @Mapping(target = "costos", ignore = true)
    @Mapping(target = "pagos", ignore = true)
    @Mapping(target = "documentosExpedientes", ignore = true)
    @Mapping(target = "fechasServicioExpedientes", ignore = true)
    @Mapping(source = "tipoServicioId", target = "tipoServicio")
    Expediente toEntity(ExpedienteDTO expedienteDTO);

    default Expediente fromId(Long id) {
        if (id == null) {
            return null;
        }
        Expediente expediente = new Expediente();
        expediente.setId(id);
        return expediente;
    }
}
