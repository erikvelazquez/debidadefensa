package com.debidadefensa.service;

import com.debidadefensa.service.dto.FechasServicioDTO;
import java.util.List;

/**
 * Service Interface for managing FechasServicio.
 */
public interface FechasServicioService {

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
    List<FechasServicioDTO> findByIdUser(Long idUser);
}
