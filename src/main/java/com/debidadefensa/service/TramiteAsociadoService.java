package com.debidadefensa.service;

import com.debidadefensa.service.dto.TramiteAsociadoDTO;
import java.util.List;

/**
 * Service Interface for managing TramiteAsociado.
 */
public interface TramiteAsociadoService {

    /**
     * Save a tramiteAsociado.
     *
     * @param tramiteAsociadoDTO the entity to save
     * @return the persisted entity
     */
    TramiteAsociadoDTO save(TramiteAsociadoDTO[] tramiteAsociadoDTO);

    /**
     * Get all the tramiteAsociados.
     *
     * @return the list of entities
     */
    List<TramiteAsociadoDTO> findAll();

    /**
     * Get the "id" tramiteAsociado.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TramiteAsociadoDTO findOne(Long id);

    /**
     * Delete the "id" tramiteAsociado.
     *
     * @param id the id of the entity
     */
    void delete(Long id, Long itiposerviciod, Long idasociado, Long tiposervicioasociado);

    /**
     * Search for the tramiteAsociado corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TramiteAsociadoDTO> search(String query);

}
