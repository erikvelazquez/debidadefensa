package com.debidadefensa.service;

import com.debidadefensa.service.dto.TramiteGeneralDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing TramiteGeneral.
 */
public interface TramiteGeneralService {

    /**
     * Save a tramiteGeneral.
     *
     * @param tramiteGeneralDTO the entity to save
     * @return the persisted entity
     */
    TramiteGeneralDTO save(TramiteGeneralDTO tramiteGeneralDTO);

    /**
     * Get all the tramiteGenerals.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TramiteGeneralDTO> findAll(Pageable pageable);

    /**
     * Get the "id" tramiteGeneral.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TramiteGeneralDTO findOne(Long id);

    /**
     * Delete the "id" tramiteGeneral.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the tramiteGeneral corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TramiteGeneralDTO> search(String query, Pageable pageable);

    /**
     * Get all the expedientes by user.
     *
     * @param idUser the id of user
     * @return the list of entities
     */
    Page<TramiteGeneralDTO> findByIdUser( Pageable pageable, Long idUser);

    List<TramiteGeneralDTO> findByFaltantes(Long id, Long tipo, Long idCliente);

    List<TramiteGeneralDTO> findByAsociados(Long id, Long tipo);
}
