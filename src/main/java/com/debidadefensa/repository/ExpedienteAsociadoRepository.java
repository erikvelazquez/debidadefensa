package com.debidadefensa.repository;

import com.debidadefensa.domain.ExpedienteAsociado;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ExpedienteAsociado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExpedienteAsociadoRepository extends JpaRepository<ExpedienteAsociado, Long> {

}
