package com.debidadefensa.repository;

import com.debidadefensa.domain.Estatus;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Estatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstatusRepository extends JpaRepository<Estatus, Long> {

}
