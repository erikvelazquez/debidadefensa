package com.debidadefensa.repository;
import org.springframework.data.domain.Pageable;
import java.util.List;
import com.debidadefensa.domain.Cliente;
import com.debidadefensa.service.dto.ClienteDTO;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Cliente entity.
 */     
@SuppressWarnings("unused")
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
     
     @Query(value = "SELECT c.id, c.nombre, c.telefonos, c.correo_electronico, c.domicilio, c.rfc, c.referencia, p.total_expediente, g.total_generales, m.total_migratorios, "
                + " (coalesce(cose, 0) + coalesce(cosg, 0) + coalesce(cosm, 0) - coalesce(page, 0) - coalesce(pagg, 0) - coalesce(pagm, 0)) as total_costo FROM cliente c "
                + " LEFT OUTER JOIN (select count(a.cliente_id) as total_expediente, a.cliente_id, a.id from expediente a group by a.cliente_id, a.id) p ON (c.id = p.cliente_id) "
                + " LEFT OUTER JOIN (select sum(a.costo) as cose, a.expediente_id from costo_servicio a group by a.expediente_id) ce on ce.expediente_id = p.id "
                + " LEFT OUTER JOIN (select sum(a.cantidad) as page, a.expediente_id from pagos a group by a.expediente_id) pe on pe.expediente_id = p.id "
                + " LEFT OUTER JOIN (select count(a.cliente_id) as total_generales, a.cliente_id, a.id from tramite_general a group by a.cliente_id, a.id) g ON (c.id = g.cliente_id) "
                + " LEFT OUTER JOIN (select sum(a.costo) as cosg, a.tramite_general_id from costo_servicio a group by a.tramite_general_id) cg on cg.tramite_general_id = g.id "
                + " LEFT OUTER JOIN (select sum(a.cantidad) as pagg, a.tramite_general_id from pagos a group by a.tramite_general_id) pg on pg.tramite_general_id = g.id "
                + " LEFT OUTER JOIN (select count(a.cliente_id) as total_migratorios, a.cliente_id, a.id from tramite_migratorio a group by a.cliente_id, a.id) m ON (c.id = m.cliente_id) "
                + " LEFT OUTER JOIN (select sum(a.costo) as cosm, a.tramite_migratorio_id from costo_servicio a group by a.tramite_migratorio_id) cm on cm.tramite_migratorio_id = m.id "
                + " LEFT OUTER JOIN (select sum(a.cantidad) as pagm, a.tramite_migratorio_id from pagos a group by a.tramite_migratorio_id) pm on pm.tramite_migratorio_id = m.id "
                + " ORDER BY ?#{#pageable}",
            countQuery = "SELECT count(c.id) FROM cliente c"
                    + " LEFT OUTER JOIN (select count(a.cliente_id) as total_expediente, a.cliente_id from expediente a group by a.cliente_id) p "
                    + " ON (c.id = p.cliente_id)"
                    + " LEFT OUTER JOIN (select count(a.cliente_id) as total_generales, a.cliente_id from tramite_general a group by a.cliente_id) g "
                    + " ON (c.id = g.cliente_id)"
                    + " LEFT OUTER JOIN (select count(a.cliente_id) as total_migratorios, a.cliente_id from tramite_migratorio a group by a.cliente_id) m "
                    + " ON (c.id = m.cliente_id)"
                    + "  ORDER BY ?#{#pageable}",
            nativeQuery = true)
    Page<Cliente> findClientes(Pageable pageable);
    

     // @Query("select u.*,  from cliente u where u.id = ?1")
     // @Param("lastname") String lastname
     @Query(value = "SELECT c.id, c.nombre, c.telefonos, c.correo_electronico, c.domicilio, c.rfc, c.referencia, p.total_expediente, g.total_generales, m.total_migratorios, c.total_costo FROM cliente c"
                + " LEFT OUTER JOIN (select count(a.cliente_id) as total_expediente, a.cliente_id from expediente a group by a.cliente_id) p "
                + " ON (c.id = p.cliente_id)"
                + " LEFT OUTER JOIN (select count(a.cliente_id) as total_generales, a.cliente_id from tramite_general a group by a.cliente_id) g "
                + " ON (c.id = g.cliente_id)"
                + " LEFT OUTER JOIN (select count(a.cliente_id) as total_migratorios, a.cliente_id from tramite_migratorio a group by a.cliente_id) m "
                + " ON (c.id = m.cliente_id)"
                + " where c.id = :id",
                nativeQuery = true)
     Cliente findCliente(@Param("id") Long id);
   
}
