package com.debidadefensa.repository;

import com.debidadefensa.domain.Parte;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;


/**
 * Spring Data JPA repository for the Parte entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParteRepository extends JpaRepository<Parte, Long> {
    List<Parte> findByExpediente_id(long id);
}
