package com.debidadefensa.service.mapper;

import com.debidadefensa.domain.*;
import com.debidadefensa.service.dto.FechasServicioDTO;

import org.mapstruct.*;

/** 
 * Mapper for the entity FechasServicio and its DTO FechasServicioDTO.
 */
@Mapper(componentModel = "spring", uses = {ExpedienteMapper.class, TramiteMigratorioMapper.class, TramiteGeneralMapper.class, TipoServicioMapper.class})
public interface FechasServicioMapper extends EntityMapper<FechasServicioDTO, FechasServicio> {
    // String nombre = "expediente.id" "expediente.cliente.nombre";

    @BeforeMapping
    default void beforeMapping(@MappingTarget FechasServicioDTO target, FechasServicio source) {
         
        int idServicio = source.getTipoServicio() != null ? (int)(source.getTipoServicio().getId() % 100000) : 0;
        String nombre = "Evento";
        switch (idServicio) {
            case 1002:
                nombre = source.getTramiteMigratorio().getCliente() != null ? source.getTramiteMigratorio().getCliente().getNombre() : "";
                target.setNombreCliente(nombre);
            break;
            case 1003:
                nombre = source.getTramiteGeneral().getCliente() != null ? source.getTramiteGeneral().getCliente().getNombre() : "";
                target.setNombreCliente(nombre);
                break;
            case 1001:
                nombre = source.getExpediente().getCliente() != null ? source.getExpediente().getCliente().getNombre() : "";
                target.setNombreCliente(nombre);
                break;
            default:
                target.setNombreCliente(nombre);
        }
    }

    @Mapping(source = "expediente.id", target = "expedienteId")
    @Mapping(source = "tramiteMigratorio.id", target = "tramiteMigratorioId")
    @Mapping(source = "tramiteGeneral.id", target = "tramiteGeneralId")
    @Mapping(source = "tipoServicio.id", target = "tipoServicioId")
   // @Mapping(source = nombre, target = "nombreCliente")
    // @Mapping(source = "tramiteMigratorio.cliente.nombre", target = "nombreCliente")
    // @Mapping(source = "tramiteGeneral.cliente.nombre", target = "nombreCliente")
    FechasServicioDTO toDto(FechasServicio fechasServicio);

    @Mapping(source = "expedienteId", target = "expediente")
    @Mapping(source = "tramiteMigratorioId", target = "tramiteMigratorio")
    @Mapping(source = "tramiteGeneralId", target = "tramiteGeneral")
    @Mapping(source = "tipoServicioId", target = "tipoServicio")
    FechasServicio toEntity(FechasServicioDTO fechasServicioDTO);

    default FechasServicio fromId(Long id) {
        if (id == null) {
            return null;
        }
        FechasServicio fechasServicio = new FechasServicio();
        fechasServicio.setId(id);
        return fechasServicio;
    }
}
