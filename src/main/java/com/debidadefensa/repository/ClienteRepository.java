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
     
     @Query(value = "SELECT c.id, c.nombre, c.telefonos, c.correo_electronico, c.domicilio, c.rfc, c.referencia, p.total_expediente, g.total_generales, m.total_migratorios FROM cliente c"
                + " LEFT OUTER JOIN (select count(a.cliente_id) as total_expediente, a.cliente_id from expediente a group by a.cliente_id) p "
                + " ON (c.id = p.cliente_id)"
                + " LEFT OUTER JOIN (select count(a.cliente_id) as total_generales, a.cliente_id from tramite_general a group by a.cliente_id) g "
                + " ON (c.id = g.cliente_id)"
                + " LEFT OUTER JOIN (select count(a.cliente_id) as total_migratorios, a.cliente_id from tramite_migratorio a group by a.cliente_id) m "
                + " ON (c.id = m.cliente_id)"
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
     @Query(value = "SELECT c.*, p.total_expediente, g.total_generales, m.total_migratorios FROM cliente c"
                + " LEFT OUTER JOIN (select count(a.*) as total_expediente, a.cliente_id from expediente a group by a.cliente_id) p "
                + " ON (c.id = p.cliente_id) " 
                + " LEFT OUTER JOIN (select count(a.cliente_id) as total_generales, a.cliente_id from tramite_general a group by a.cliente_id) g "
                + " ON (c.id = g.cliente_id)"
                + " LEFT OUTER JOIN (select count(a.cliente_id) as total_migratorios, a.cliente_id from tramite_migratorio a group by a.cliente_id) m "
                + " ON (c.id = m.cliente_id)"
                + " where c.id = :id",
                nativeQuery = true)
     Cliente findCliente(@Param("id") Long id);
   
}
