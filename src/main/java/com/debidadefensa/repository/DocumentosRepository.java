package com.debidadefensa.repository;

import com.debidadefensa.domain.Documentos;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Documentos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentosRepository extends JpaRepository<Documentos, Long> {
    List<Documentos> findByExpediente_id(long expediente_id);

    List<Documentos> findByTramiteMigratorio_id(long id);

    List<Documentos> findByTramiteGeneral_id(long id);

}
