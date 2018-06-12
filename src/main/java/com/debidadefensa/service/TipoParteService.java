package com.debidadefensa.service;

import com.debidadefensa.service.dto.TipoParteDTO;
import java.util.List;

/**
 * Service Interface for managing TipoParte.
 */
public interface TipoParteService {

    /**
     * Save a tipoParte.
     *
     * @param tipoParteDTO the entity to save
     * @return the persisted entity
     */
    TipoParteDTO save(TipoParteDTO tipoParteDTO);

    /**
     * Get all the tipoPartes.
     *
     * @return the list of entities
     */
    List<TipoParteDTO> findAll();

    /**
     * Get the "id" tipoParte.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TipoParteDTO findOne(Long id);

    /**
     * Delete the "id" tipoParte.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the tipoParte corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TipoParteDTO> search(String query);
}
