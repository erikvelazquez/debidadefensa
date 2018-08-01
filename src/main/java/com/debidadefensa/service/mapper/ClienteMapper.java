package com.debidadefensa.service.mapper;

import com.debidadefensa.domain.*;
import com.debidadefensa.service.dto.ClienteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Cliente and its DTO ClienteDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ClienteMapper extends EntityMapper<ClienteDTO, Cliente> {
   
    @Mapping(target = "expedientes", ignore = false)
    @Mapping(target = "tramiteMigras", ignore = true)
    @Mapping(target = "tramiteGrals", ignore = true)
    Cliente toEntity(ClienteDTO clienteDTO);

    default Cliente fromId(Long id) {
        if (id == null) {
            return null;
        }
        Cliente cliente = new Cliente();
        cliente.setId(id);
        return cliente;
    }
}
