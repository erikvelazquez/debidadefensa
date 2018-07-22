package com.debidadefensa.repository;

import java.util.List;

import com.debidadefensa.domain.Expediente;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the Expediente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExpedienteRepository extends JpaRepository<Expediente, Long> {
    // @Query("SELECT p FROM Expediente p WHERE p.cliente_id = :cliente_id")
    // List<Expediente> findByCliente_id(@Param("cliente_id") long cliente_id);
    List<Expediente> findByCliente_id(long cliente_id);
}
