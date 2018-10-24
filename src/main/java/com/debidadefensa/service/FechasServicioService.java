package com.debidadefensa.service;

import com.debidadefensa.service.dto.FechasServicioDTO;

import java.time.Instant;
import java.util.List;

/**
 * Service Interface for managing FechasServicio.
 */
public abstract interface FechasServicioService {

    /**
     * Save a fechasServicio.
     *
     * @param fechasServicioDTO the entity to save
     * @return the persisted entity
     */
    FechasServicioDTO save(FechasServicioDTO fechasServicioDTO);

    /**
     * Get all the fechasServicios.
     *
     * @return the list of entities
     */
    List<FechasServicioDTO> findAll();

    /**
     * Get the "id" fechasServicio.
     *
     * @param id the id of the entity
     * @return the entity
     */
    FechasServicioDTO findOne(Long id);

    /**
     * Delete the "id" fechasServicio.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the fechasServicio corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<FechasServicioDTO> search(String query);

    /**
     * Get all the expedientes by user.
     *
     * @param idUser the id of user
     * @return the list of entities
     */
    List<FechasServicioDTO> findByExpedienteId(Long id);

     /**
     * Get all the expedientes by user.
     *
     * @param idUser the id of user
     * @return the list of entities
     */
    List<FechasServicioDTO> findByMigratorio(Long id);

     /**
     * Get all the expedientes by user.
     *
     * @param idUser the id of user
     * @return the list of entities
     */
    List<FechasServicioDTO> findByGeneral(Long id);

    /**
     * Get all the expedientes by month.
     *
     * @param month
     * @return the list of entities
     */
    List<FechasServicioDTO> findByDate(Long month, Long year);


    /**
     * Get all the expedientes by month.
     *
     * @param date
     * @return the list of entities
     */
    String ConsultaFechasEmail(Instant fecha);
}
