package com.debidadefensa.repository;

import com.debidadefensa.domain.TramiteAsociado;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the TramiteAsociado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TramiteAsociadoRepository extends JpaRepository<TramiteAsociado, Long> {
 
}
