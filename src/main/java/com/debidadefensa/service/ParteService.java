package com.debidadefensa.service;

import com.debidadefensa.service.dto.ParteDTO;
import java.util.List;

/**
 * Service Interface for managing Parte.
 */
public interface ParteService {

    /**
     * Save a parte.
     *
     * @param parteDTO the entity to save
     * @return the persisted entity
     */
    ParteDTO save(ParteDTO parteDTO);

    /**
     * Get all the partes.
     *
     * @return the list of entities
     */
    List<ParteDTO> findAll();

    /**
     * Get the "id" parte.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ParteDTO findOne(Long id);

    /**
     * Delete the "id" parte.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the parte corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<ParteDTO> search(String query);

    /**
     * Get all the expedientes by user.
     *
     * @param idUser the id of user
     * @return the list of entities
     */
    List<ParteDTO> findByExpediente_id(Long id);
}
