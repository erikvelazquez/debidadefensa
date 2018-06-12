package com.debidadefensa.service;

import com.debidadefensa.service.dto.TipoServicioDTO;
import java.util.List;

/**
 * Service Interface for managing TipoServicio.
 */
public interface TipoServicioService {

    /**
     * Save a tipoServicio.
     *
     * @param tipoServicioDTO the entity to save
     * @return the persisted entity
     */
    TipoServicioDTO save(TipoServicioDTO tipoServicioDTO);

    /**
     * Get all the tipoServicios.
     *
     * @return the list of entities
     */
    List<TipoServicioDTO> findAll();

    /**
     * Get the "id" tipoServicio.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TipoServicioDTO findOne(Long id);

    /**
     * Delete the "id" tipoServicio.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the tipoServicio corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TipoServicioDTO> search(String query);
}
