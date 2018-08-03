package com.debidadefensa.service;

import com.debidadefensa.service.dto.CostoServicioDTO;
import java.util.List;

/**
 * Service Interface for managing CostoServicio.
 */
public interface CostoServicioService {

    /**
     * Save a costoServicio.
     *
     * @param costoServicioDTO the entity to save
     * @return the persisted entity
     */
    CostoServicioDTO save(CostoServicioDTO costoServicioDTO);

    /**
     * Get all the costoServicios.
     *
     * @return the list of entities
     */
    List<CostoServicioDTO> findAll();

    /**
     * Get the "id" costoServicio.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CostoServicioDTO findOne(Long id);

    /**
     * Delete the "id" costoServicio.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the costoServicio corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<CostoServicioDTO> search(String query);

    /**
     * Get all the expedientes by user.
     *
     * @param id the id of expediente
     * @return the list of entities
     */
    List<CostoServicioDTO> findByExpediente_id(Long id);

    /**
     * Get all the expedientes by user.
     *
     * @param id the id of tramite migratorio
     * @return the list of entities
     */
    List<CostoServicioDTO> findByTramite_migratorio_id(Long id);

    /**
     * Get all the expedientes by user.
     *
     * @param id the id of tramite general
     * @return the list of entities
     */
    List<CostoServicioDTO> findByTramite_general_id(Long id);
}
