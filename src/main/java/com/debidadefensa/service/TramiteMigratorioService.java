package com.debidadefensa.service;

import com.debidadefensa.service.dto.TramiteMigratorioDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
/**
 * Service Interface for managing TramiteMigratorio.
 */
public interface TramiteMigratorioService {

    /**
     * Save a tramiteMigratorio.
     *
     * @param tramiteMigratorioDTO the entity to save
     * @return the persisted entity
     */
    TramiteMigratorioDTO save(TramiteMigratorioDTO tramiteMigratorioDTO);

    /**
     * Get all the tramiteMigratorios.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TramiteMigratorioDTO> findAll(Pageable pageable);

    /**
     * Get the "id" tramiteMigratorio.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TramiteMigratorioDTO findOne(Long id);

    /**
     * Delete the "id" tramiteMigratorio.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the tramiteMigratorio corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TramiteMigratorioDTO> search(String query, Pageable pageable);


    /**
     * Get all the expedientes by user.
     *
     * @param idUser the id of user
     * @return the list of entities
     */
    List<TramiteMigratorioDTO> findByIdUser(Long idUser);
}
