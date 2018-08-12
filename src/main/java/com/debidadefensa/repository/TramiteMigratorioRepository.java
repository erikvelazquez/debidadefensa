package com.debidadefensa.repository;

import com.debidadefensa.domain.TramiteMigratorio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

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

    // @Query("SELECT p FROM Expediente p WHERE p.cliente_id = :cliente_id")
    // List<Expediente> findByCliente_id(@Param("cliente_id") long cliente_id);
    List<TramiteMigratorio> findByCliente_id(long cliente_id);


    @Query(value = "SELECT * FROM tramite_migratorio "
                + " WHERE id NOT IN ( SELECT id_tramiteasociado "  
                + " FROM tramite_asociado "           
                + " WHERE id_tramite = :id)",
                nativeQuery = true)
    List<TramiteMigratorio> findByFaltantes(@Param("id") Long id);

    @Query(value = "SELECT * FROM tramite_migratorio "
                + " WHERE id IN ( SELECT id_tramiteasociado "  
                + " FROM tramite_asociado "           
                + " WHERE id_tramite = :id)",
                nativeQuery = true)
    List<TramiteMigratorio> findByAsociados(@Param("id") Long id);

}
