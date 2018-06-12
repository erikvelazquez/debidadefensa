package com.debidadefensa.service;

import com.debidadefensa.service.dto.EstatusDTO;
import java.util.List;

/**
 * Service Interface for managing Estatus.
 */
public interface EstatusService {

    /**
     * Save a estatus.
     *
     * @param estatusDTO the entity to save
     * @return the persisted entity
     */
    EstatusDTO save(EstatusDTO estatusDTO);

    /**
     * Get all the estatuses.
     *
     * @return the list of entities
     */
    List<EstatusDTO> findAll();

    /**
     * Get the "id" estatus.
     *
     * @param id the id of the entity
     * @return the entity
     */
    EstatusDTO findOne(Long id);

    /**
     * Delete the "id" estatus.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the estatus corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<EstatusDTO> search(String query);
}
