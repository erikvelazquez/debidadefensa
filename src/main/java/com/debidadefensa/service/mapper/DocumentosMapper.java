package com.debidadefensa.service.mapper;

import com.debidadefensa.domain.*;
import com.debidadefensa.service.dto.DocumentosDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Documentos and its DTO DocumentosDTO.
 */
@Mapper(componentModel = "spring", uses = {ExpedienteMapper.class, ExpedienteAsociadoMapper.class, TramiteMigratorioMapper.class, TramiteGeneralMapper.class, TipoServicioMapper.class})
public interface DocumentosMapper extends EntityMapper<DocumentosDTO, Documentos> {

    @Mapping(source = "expediente.id", target = "expedienteId")
    @Mapping(source = "expedienteAsociado.id", target = "expedienteAsociadoId")
    @Mapping(source = "tramiteMigratorio.id", target = "tramiteMigratorioId")
    @Mapping(source = "tramiteGeneral.id", target = "tramiteGeneralId")
    @Mapping(source = "tipoServicio.id", target = "tipoServicioId")
    DocumentosDTO toDto(Documentos documentos);

    @Mapping(source = "expedienteId", target = "expediente")
    @Mapping(source = "expedienteAsociadoId", target = "expedienteAsociado")
    @Mapping(source = "tramiteMigratorioId", target = "tramiteMigratorio")
    @Mapping(source = "tramiteGeneralId", target = "tramiteGeneral")
    @Mapping(source = "tipoServicioId", target = "tipoServicio")
    Documentos toEntity(DocumentosDTO documentosDTO);

    default Documentos fromId(Long id) {
        if (id == null) {
            return null;
        }
        Documentos documentos = new Documentos();
        documentos.setId(id);
        return documentos;
    }
}
