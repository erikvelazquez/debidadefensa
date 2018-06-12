package com.debidadefensa.repository;

import com.debidadefensa.domain.Expediente;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Expediente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExpedienteRepository extends JpaRepository<Expediente, Long> {

}
