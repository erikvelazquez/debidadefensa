package com.debidadefensa.repository;

import com.debidadefensa.domain.TramiteGeneral;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

/**
 * Spring Data JPA repository for the TramiteGeneral entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TramiteGeneralRepository extends JpaRepository<TramiteGeneral, Long> {
    @Query("select distinct tramite_general from TramiteGeneral tramite_general left join fetch tramite_general.tramiteGeneralAsociados")
    List<TramiteGeneral> findAllWithEagerRelationships();

    @Query("select tramite_general from TramiteGeneral tramite_general left join fetch tramite_general.tramiteGeneralAsociados where tramite_general.id =:id")
    TramiteGeneral findOneWithEagerRelationships(@Param("id") Long id);

    @Query(value = " SELECT c.id, c.titular, c.dependencia, c.numero_tramite, c.tipo_tramite, c.fecha_ingreso, c.fecha_resolucion, c.fecha_notificacion,"
            + " c.archivo, c.observaciones, (SELECT COUNT(id) as total FROM tramite_asociado WHERE id_tramite =  c.id and tipo_servicio_id = 1003 or id_tramiteasociado =  c.id and tipo_servicio_id_Asociado = 1003) as total_documentos, "
            + " c.cliente_id, c.estatus_tramite_general_id FROM tramite_general c "
            + " LEFT OUTER JOIN (select count(a.tramite_general_id) as total_documentos, a.tramite_general_id from documentos a group by a.tramite_general_id) p "
            + " ON (c.id = p.tramite_general_id) "
            + " ORDER BY ?#{#pageable}",
            countQuery = " SELECT count(c.id) FROM tramite_general c "
            + " LEFT OUTER JOIN (select count(a.tramite_general_id) as total_documentos, a.tramite_general_id from documentos a group by a.tramite_general_id) p "
            + " ON (c.id = p.tramite_general_id) "
            + " ORDER BY ?#{#pageable}",
            nativeQuery = true)   
    Page<TramiteGeneral> findAllItems(Pageable pageable);

    @Query(value = " SELECT c.id, c.titular, c.dependencia, c.numero_tramite, c.tipo_tramite, c.fecha_ingreso, c.fecha_resolucion, c.fecha_notificacion,"
            + " c.archivo, c.observaciones, (SELECT COUNT(id) as total FROM tramite_asociado WHERE id_tramite =  c.id and tipo_servicio_id = 1003 or id_tramiteasociado =  c.id and tipo_servicio_id_Asociado = 1003) as total_documentos, "
            + " c.cliente_id, c.estatus_tramite_general_id FROM tramite_general c "
            + " LEFT OUTER JOIN (select count(a.tramite_general_id) as total_documentos, a.tramite_general_id from documentos a group by a.tramite_general_id) p "
            + " ON (c.id = p.tramite_general_id) "
            + " WHERE c.cliente_id = :id"
            + " ORDER BY ?#{#pageable}",
            nativeQuery = true)
    Page<TramiteGeneral> findByCliente_id(Pageable pageable, @Param("id") long cliente_id);

    @Query(value = "SELECT * FROM tramite_general "
                + " WHERE id NOT IN ( SELECT id_tramiteasociado FROM tramite_asociado WHERE id_tramite = :id and tipo_servicio_id = :tipo) "  
                + " AND id NOT IN ( SELECT id_tramite FROM tramite_asociado WHERE id_tramiteasociado = :id and tipo_servicio_id_Asociado = :tipo) "   
                + " and cliente_id = :idCliente order by titular ",
                nativeQuery = true)
    List<TramiteGeneral> findByFaltantes(@Param("id") Long id, @Param("tipo") Long tipo, @Param("idCliente") Long cliente_id);

    @Query(value = "SELECT * FROM tramite_general "
                + " WHERE id IN ( SELECT id_tramiteasociado FROM tramite_asociado WHERE id_tramite = :id and tipo_servicio_id = :tipo) "  
                + " OR id IN ( SELECT id_tramite FROM tramite_asociado WHERE id_tramiteasociado = :id and tipo_servicio_id_Asociado = :tipo) order by titular ",
                nativeQuery = true)
    List<TramiteGeneral> findByAsociados(@Param("id") Long id, @Param("tipo") Long tipo);
    


    

    
    
    
}
