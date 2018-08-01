package com.debidadefensa.repository;

import com.debidadefensa.domain.FechasServicio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the FechasServicio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FechasServicioRepository extends JpaRepository<FechasServicio, Long> {
// @Query("SELECT p FROM Expediente p WHERE p.cliente_id = :cliente_id")
    // List<Expediente> findByCliente_id(@Param("cliente_id") long cliente_id);
    List<FechasServicio> findByExpediente_id(long expediente_id);
}
