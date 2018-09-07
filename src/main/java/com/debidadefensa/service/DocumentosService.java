package com.debidadefensa.service;

import com.debidadefensa.service.dto.DocumentosDTO;
import java.util.List;

/**
 * Service Interface for managing Documentos.
 */
public interface DocumentosService {

    /**
     * Save a documentos.
     *
     * @param documentosDTO the entity to save
     * @return the persisted entity
     */
    DocumentosDTO save(DocumentosDTO documentosDTO);

    /**
     * Get all the documentos.
     *
     * @return the list of entities
     */
    List<DocumentosDTO> findAll();

    /**
     * Get the "id" documentos.
     *
     * @param id the id of the entity
     * @return the entity
     */
    DocumentosDTO findOne(Long id);

    /**
     * Delete the "id" documentos.
     *
     * @param id the id of the entity
     */
    DocumentosDTO delete(Long id);

    /**
     * Search for the documentos corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<DocumentosDTO> search(String query);

    /**
     * Get all the expedientes by user.
     *
     * @param idUser the id of user
     * @return the list of entities
     */
    List<DocumentosDTO> findByExpedienteId(Long id);

     /**
     * Get all the expedientes by user.
     *
     * @param idUser the id of user
     * @return the list of entities
     */
    List<DocumentosDTO> findByMigratorio(Long id);

     /**
     * Get all the expedientes by user.
     *
     * @param idUser the id of user
     * @return the list of entities
     */
    List<DocumentosDTO> findByGeneral(Long id);
}
