package com.debidadefensa.repository;

import com.debidadefensa.domain.Pagos;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Pagos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagosRepository extends JpaRepository<Pagos, Long> {

}
