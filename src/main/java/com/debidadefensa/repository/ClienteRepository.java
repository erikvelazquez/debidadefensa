package com.debidadefensa.repository;
import org.springframework.data.domain.Pageable;
import java.util.List;
import com.debidadefensa.domain.Cliente;
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
     @Query(value = "SELECT c.*, p.totalExpediente FROM cliente c"
                    + " LEFT OUTER JOIN (select count(a.*) as totalExpediente, a.cliente_id "
                    + " from expediente a "
                    + " group by a.cliente_id) p "
                    + " ON (c.id = p.cliente_id) /*#pageable*/",
            countQuery = "SELECT count(c.*) FROM cliente c"
                        + " LEFT OUTER JOIN (select count(a.*) as totalExpediente, a.cliente_id "
                        + " from expediente a "
                        + " group by a.cliente_id) p "
                        + " ON (c.id = p.cliente_id)",
            nativeQuery = true)
     Page<Cliente> findClientes(Pageable pageable);
}
