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

}
