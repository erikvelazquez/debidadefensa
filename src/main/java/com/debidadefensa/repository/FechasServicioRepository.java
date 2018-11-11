package com.debidadefensa.repository;

import com.debidadefensa.domain.FechasServicio;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.*;

import java.time.Instant;
import java.util.List;

import javax.mail.search.DateTerm;

/**
 * Spring Data JPA repository for the FechasServicio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FechasServicioRepository extends JpaRepository<FechasServicio, Long> {
// @Query("SELECT p FROM Expediente p WHERE p.cliente_id = :cliente_id")
    // List<Expediente> findByCliente_id(@Param("cliente_id") long cliente_id);
    List<FechasServicio> findByExpediente_id(long expediente_id);

    List<FechasServicio> findByTramiteMigratorio_id(long id);

    List<FechasServicio> findByTramiteGeneral_id(long id);

    
     @Query(value = "SELECT f.* FROM fechas_servicio f "
                + " where extract(month from fecha) = :month "  
                + " and extract(year from fecha) = :year "           
                + " ORDER BY fecha ASC",
                nativeQuery = true)
    List<FechasServicio> findByDate(@Param("month") Long month, @Param("year") Long year);

    @Query(value = "SELECT f.* FROM fechas_servicio f "
                + " where fecha = :date "                      
                + " ORDER BY fecha ASC",
                nativeQuery = true)
    List<FechasServicio> findByDateEmail(@Param("date") Instant date);

    @Query(value = "SELECT f.* FROM fechas_servicio f "
    + " where extract(year from fecha) = :year "  
    + " and extract(month from fecha) = :month "           
    + " and extract(day from fecha) = :day "
    + " and extract(hour from fecha) = :hour " ,
    nativeQuery = true)
    List<FechasServicio> findByHour(@Param("year") int year, @Param("month") int month, @Param("day") int day, @Param("hour") int hour);
}
