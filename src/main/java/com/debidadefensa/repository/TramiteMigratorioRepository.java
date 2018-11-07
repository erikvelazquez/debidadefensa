package com.debidadefensa.repository;

import com.debidadefensa.domain.TramiteMigratorio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

/**
 * Spring Data JPA repository for the TramiteMigratorio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TramiteMigratorioRepository extends JpaRepository<TramiteMigratorio, Long> {
    @Query("select distinct tramite_migratorio from TramiteMigratorio tramite_migratorio left join fetch tramite_migratorio.tramitesMigraAsociados")
    List<TramiteMigratorio> findAllWithEagerRelationships();

    @Query("select tramite_migratorio from TramiteMigratorio tramite_migratorio left join fetch tramite_migratorio.tramitesMigraAsociados where tramite_migratorio.id =:id")
    TramiteMigratorio findOneWithEagerRelationships(@Param("id") Long id);


    @Query(value = " SELECT c.id, c.nombre_extranjero, c.tipotramite, c.entidad, c.nut, c.contrasenia_nut, c.fecha_ingreso, c.fecha_notificacion, c.fecha_resolucion, "
            + " c.archivo, c.observaciones, p.total_documentos, c.cliente_id, c.estatus_tramite_migratorio_id FROM tramite_migratorio c "
            + " LEFT OUTER JOIN (select count(a.tramite_migratorio_id) as total_documentos, a.tramite_migratorio_id from documentos a group by a.tramite_migratorio_id) p "
            + " ON (c.id = p.tramite_migratorio_id) "
            + " ORDER BY ?#{#pageable}",
            countQuery = " SELECT count(c.id) FROM tramite_migratorio c "
            + " LEFT OUTER JOIN (select count(a.tramite_migratorio_id) as total_documentos, a.tramite_migratorio_id from documentos a group by a.tramite_migratorio_id) p "
            + " ON (c.id = p.tramite_migratorio_id) "
            + " ORDER BY ?#{#pageable}",
            nativeQuery = true)   
    Page<TramiteMigratorio> findAllItems(Pageable pageable);

    @Query(value = " SELECT c.id, c.nombre_extranjero, c.tipotramite, c.entidad, c.nut, c.contrasenia_nut, c.fecha_ingreso, c.fecha_notificacion, c.fecha_resolucion, "
            + " c.archivo, c.observaciones, p.total_documentos, c.cliente_id, c.estatus_tramite_migratorio_id FROM tramite_migratorio c "
            + " LEFT OUTER JOIN (select count(a.tramite_migratorio_id) as total_documentos, a.tramite_migratorio_id from documentos a group by a.tramite_migratorio_id) p "
            + " ON (c.id = p.tramite_migratorio_id) "
            + " WHERE c.cliente_id = :id"
            + " ORDER BY ?#{#pageable}",
            nativeQuery = true)
    Page<TramiteMigratorio> findByCliente_id(Pageable pageable, @Param("id") long cliente_id);


    @Query(value = "SELECT * FROM tramite_migratorio "
                + " WHERE id NOT IN ( SELECT id_tramiteasociado "  
                + " FROM tramite_asociado "           
                + " WHERE id_tramite = :id) and cliente_id = :idCliente",
                nativeQuery = true)
    List<TramiteMigratorio> findByFaltantes(@Param("id") Long id, @Param("idCliente") Long cliente_id);

    @Query(value = "SELECT * FROM tramite_migratorio "
                + " WHERE id IN ( SELECT id_tramiteasociado "  
                + " FROM tramite_asociado "           
                + " WHERE id_tramite = :id)",
                nativeQuery = true)
    List<TramiteMigratorio> findByAsociados(@Param("id") Long id);

}
