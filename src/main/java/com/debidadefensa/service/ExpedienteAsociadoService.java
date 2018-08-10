package com.debidadefensa.service;

import com.debidadefensa.service.dto.ExpedienteAsociadoDTO;
import java.util.List;

/**
 * Service Interface for managing ExpedienteAsociado.
 */
public interface ExpedienteAsociadoService {

    /**
     * Save a expedienteAsociado.
     *
     * @param expedienteAsociadoDTO the entity to save
     * @return the persisted entity
     */
    ExpedienteAsociadoDTO save(ExpedienteAsociadoDTO expedienteAsociadoDTO);

    /**
     * Get all the expedienteAsociados.
     *
     * @return the list of entities
     */
    List<ExpedienteAsociadoDTO> findAll();

    /**
     * Get the "id" expedienteAsociado.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ExpedienteAsociadoDTO findOne(Long id);

    /**
     * Delete the "id" expedienteAsociado.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the expedienteAsociado corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<ExpedienteAsociadoDTO> search(String query);

    /**
     * Search for the expedienteAsociado corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<ExpedienteAsociadoDTO> findByExpediente_id(Long id);
}
