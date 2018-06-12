package com.debidadefensa.repository;

import com.debidadefensa.domain.TipoServicio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TipoServicio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoServicioRepository extends JpaRepository<TipoServicio, Long> {

}
