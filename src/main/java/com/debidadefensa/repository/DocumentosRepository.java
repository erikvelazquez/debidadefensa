package com.debidadefensa.repository;

import com.debidadefensa.domain.Documentos;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Documentos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentosRepository extends JpaRepository<Documentos, Long> {

}
