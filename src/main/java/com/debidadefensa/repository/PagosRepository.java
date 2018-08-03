package com.debidadefensa.repository;

import com.debidadefensa.domain.Pagos;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;


/**
 * Spring Data JPA repository for the Pagos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagosRepository extends JpaRepository<Pagos, Long> {

    List<Pagos> findByExpediente_id(long id);

    List<Pagos> findByTramiteMigratorio_id(long id);
    
    List<Pagos> findByTramiteGeneral_id(long id);

}
