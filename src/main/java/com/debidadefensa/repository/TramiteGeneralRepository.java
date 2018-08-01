package com.debidadefensa.repository;

import com.debidadefensa.domain.TramiteGeneral;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

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

   // @Query("SELECT p FROM Expediente p WHERE p.cliente_id = :cliente_id")
    // List<Expediente> findByCliente_id(@Param("cliente_id") long cliente_id);
    List<TramiteGeneral> findByCliente_id(long cliente_id);
}
