package com.debidadefensa.repository;

import com.debidadefensa.domain.FechasServicio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FechasServicio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FechasServicioRepository extends JpaRepository<FechasServicio, Long> {

}
