package com.debidadefensa.service.mapper;

import com.debidadefensa.domain.*;
import com.debidadefensa.service.dto.TramiteGeneralDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TramiteGeneral and its DTO TramiteGeneralDTO.
 */
@Mapper(componentModel = "spring", uses = {ClienteMapper.class, EstatusMapper.class, TramiteAsociadoMapper.class})
public interface TramiteGeneralMapper extends EntityMapper<TramiteGeneralDTO, TramiteGeneral> {

    @Mapping(source = "cliente.id", target = "clienteId")
    @Mapping(source = "estatusTramiteGeneral.id", target = "estatusTramiteGeneralId")
    TramiteGeneralDTO toDto(TramiteGeneral tramiteGeneral);

    @Mapping(source = "clienteId", target = "cliente")
    @Mapping(source = "estatusTramiteGeneralId", target = "estatusTramiteGeneral")
    @Mapping(target = "tramiteGralPagos", ignore = true)
    @Mapping(target = "tramiteGralCostos", ignore = true)
    @Mapping(target = "tramiteGralDocumentos", ignore = true)
    @Mapping(target = "fechasServicioTramiteGenerals", ignore = true)
    TramiteGeneral toEntity(TramiteGeneralDTO tramiteGeneralDTO);

    default TramiteGeneral fromId(Long id) {
        if (id == null) {
            return null;
        }
        TramiteGeneral tramiteGeneral = new TramiteGeneral();
        tramiteGeneral.setId(id);
        return tramiteGeneral;
    }
}
