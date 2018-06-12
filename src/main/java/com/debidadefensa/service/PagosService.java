package com.debidadefensa.service;

import com.debidadefensa.service.dto.PagosDTO;
import java.util.List;

/**
 * Service Interface for managing Pagos.
 */
public interface PagosService {

    /**
     * Save a pagos.
     *
     * @param pagosDTO the entity to save
     * @return the persisted entity
     */
    PagosDTO save(PagosDTO pagosDTO);

    /**
     * Get all the pagos.
     *
     * @return the list of entities
     */
    List<PagosDTO> findAll();

    /**
     * Get the "id" pagos.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PagosDTO findOne(Long id);

    /**
     * Delete the "id" pagos.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the pagos corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<PagosDTO> search(String query);
}
