package com.debidadefensa.repository;

import com.debidadefensa.domain.CostoServicio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the CostoServicio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CostoServicioRepository extends JpaRepository<CostoServicio, Long> {
    
// @Query("SELECT p FROM Expediente p WHERE p.cliente_id = :cliente_id")
    // List<Expediente> findByCliente_id(@Param("cliente_id") long cliente_id);
    List<CostoServicio> findByExpediente_id(long expediente_id);
}
