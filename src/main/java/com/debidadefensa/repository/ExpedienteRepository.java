package com.debidadefensa.repository;

import java.util.List;

import com.debidadefensa.domain.Expediente;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

/**
 * Spring Data JPA repository for the Expediente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExpedienteRepository extends JpaRepository<Expediente, Long> {
   
    @Query(value = " SELECT c.id, c.juzgado, c.numero_expediente, c.juicio, c.responsable, c.observaciones, c.fecha_alta, c.fecha_sentencia, "
                    + " p.total_documentos, c.cliente_id, c.tipo_servicio_id, c.estatus_expediente_id FROM expediente c "
                    + " LEFT OUTER JOIN (select count(a.expediente_id) as total_documentos, a.expediente_id from documentos a group by a.expediente_id) p "
                    + " ON (c.id = p.expediente_id) "
                    + " ORDER BY ?#{#pageable}",
            countQuery = " SELECT count(c.id) FROM expediente c "
                        + " LEFT OUTER JOIN (select count(a.expediente_id) as total_documentos, a.expediente_id from documentos a group by a.expediente_id) p "
                        + " ON (c.id = p.expediente_id) "
                    + " ORDER BY ?#{#pageable}",
            nativeQuery = true)   
    Page<Expediente> findAllItems(Pageable pageable);


    @Query(value = " SELECT c.id, c.juzgado, c.numero_expediente, c.juicio, c.responsable, c.observaciones, c.fecha_alta, c.fecha_sentencia, "
            + " p.total_documentos, c.cliente_id, c.tipo_servicio_id, c.estatus_expediente_id FROM expediente c "
            + " LEFT OUTER JOIN (select count(a.expediente_id) as total_documentos, a.expediente_id from documentos a group by a.expediente_id) p "
            + " ON (c.id = p.expediente_id) "
            + " WHERE c.cliente_id = :id"
            + " ORDER BY ?#{#pageable}",
            nativeQuery = true)
    Page<Expediente> findByCliente_id(Pageable pageable, @Param("id") long cliente_id);
}
