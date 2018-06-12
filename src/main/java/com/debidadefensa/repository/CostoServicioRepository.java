package com.debidadefensa.repository;

import com.debidadefensa.domain.CostoServicio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CostoServicio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CostoServicioRepository extends JpaRepository<CostoServicio, Long> {

}
