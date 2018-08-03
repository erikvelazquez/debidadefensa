package com.debidadefensa.service.impl;

import com.debidadefensa.service.CostoServicioService;
import com.debidadefensa.domain.CostoServicio;
import com.debidadefensa.repository.CostoServicioRepository;
import com.debidadefensa.repository.search.CostoServicioSearchRepository;
import com.debidadefensa.service.dto.CostoServicioDTO;
import com.debidadefensa.service.mapper.CostoServicioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing CostoServicio.
 */
@Service
@Transactional
public class CostoServicioServiceImpl implements CostoServicioService {

    private final Logger log = LoggerFactory.getLogger(CostoServicioServiceImpl.class);

    private final CostoServicioRepository costoServicioRepository;

    private final CostoServicioMapper costoServicioMapper;

    private final CostoServicioSearchRepository costoServicioSearchRepository;

    public CostoServicioServiceImpl(CostoServicioRepository costoServicioRepository, CostoServicioMapper costoServicioMapper, CostoServicioSearchRepository costoServicioSearchRepository) {
        this.costoServicioRepository = costoServicioRepository;
        this.costoServicioMapper = costoServicioMapper;
        this.costoServicioSearchRepository = costoServicioSearchRepository;
    }

    /**
     * Save a costoServicio.
     *
     * @param costoServicioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CostoServicioDTO save(CostoServicioDTO costoServicioDTO) {
        log.debug("Request to save CostoServicio : {}", costoServicioDTO);
        CostoServicio costoServicio = costoServicioMapper.toEntity(costoServicioDTO);
        costoServicio = costoServicioRepository.save(costoServicio);
        CostoServicioDTO result = costoServicioMapper.toDto(costoServicio);
        costoServicioSearchRepository.save(costoServicio);
        return result;
    }

    /**
     * Get all the costoServicios.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CostoServicioDTO> findAll() {
        log.debug("Request to get all CostoServicios");
        return costoServicioRepository.findAll().stream()
            .map(costoServicioMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one costoServicio by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CostoServicioDTO findOne(Long id) {
        log.debug("Request to get CostoServicio : {}", id);
        CostoServicio costoServicio = costoServicioRepository.findOne(id);
        return costoServicioMapper.toDto(costoServicio);
    }

    /**
     * Delete the costoServicio by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CostoServicio : {}", id);
        costoServicioRepository.delete(id);
        costoServicioSearchRepository.delete(id);
    }

    /**
     * Search for the costoServicio corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CostoServicioDTO> search(String query) {
        log.debug("Request to search CostoServicios for query {}", query);
        return StreamSupport
            .stream(costoServicioSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(costoServicioMapper::toDto)
            .collect(Collectors.toList());
    }

    /**
     * Get all the expedientes.
     *
     * @Long iduser the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CostoServicioDTO> findByExpediente_id(Long id) {
        log.debug("Request to get all Expedientes by user");             
       return costoServicioRepository.findByExpediente_id(id).stream().map(costoServicioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
      //  return result.map(expedienteMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CostoServicioDTO> findByTramite_migratorio_id(Long id) {
        log.debug("Request to get all Expedientes by user");     
       return costoServicioRepository.findByTramiteMigratorio_id(id).stream().map(costoServicioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
      //  return result.map(expedienteMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CostoServicioDTO> findByTramite_general_id(Long id) {
        log.debug("Request to get all Expedientes by user");   
       return costoServicioRepository.findByTramiteGeneral_id(id).stream().map(costoServicioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
      //  return result.map(expedienteMapper::toDto);
    }
}
