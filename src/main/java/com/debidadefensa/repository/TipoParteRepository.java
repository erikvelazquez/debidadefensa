package com.debidadefensa.repository;

import com.debidadefensa.domain.TipoParte;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TipoParte entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoParteRepository extends JpaRepository<TipoParte, Long> {

}
