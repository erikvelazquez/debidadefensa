package com.debidadefensa.repository;

import com.debidadefensa.domain.TramiteAsociado;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TramiteAsociado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TramiteAsociadoRepository extends JpaRepository<TramiteAsociado, Long> {
    @Query(value = "SELECT * FROM public.tramite_asociado "
                   + " where id_tramite = :id "
                   + " and tipo_servicio_id = :tiposervicio "
                   + " and id_tramiteasociado = :idasociado "
                   + " and tipo_servicio_id_asociado = :tiposervicio ",
                nativeQuery = true)
    TramiteAsociado findAsociado(@Param("id") Long id, @Param("tiposervicio") Long tiposervicio, @Param("idasociado") Long idasociado);
}
