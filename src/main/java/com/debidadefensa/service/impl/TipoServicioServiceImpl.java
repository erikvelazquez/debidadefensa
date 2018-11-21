package com.debidadefensa.service.impl;

import com.debidadefensa.service.TipoServicioService;
import com.debidadefensa.domain.TipoServicio;
import com.debidadefensa.repository.TipoServicioRepository;
import com.debidadefensa.repository.search.TipoServicioSearchRepository;
import com.debidadefensa.service.dto.TipoServicioDTO;
import com.debidadefensa.service.mapper.TipoServicioMapper;
import com.debidadefensa.service.util.RandomUtil;

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
 * Service Implementation for managing TipoServicio.
 */
@Service
@Transactional
public class TipoServicioServiceImpl implements TipoServicioService {

    private final Logger log = LoggerFactory.getLogger(TipoServicioServiceImpl.class);

    private final TipoServicioRepository tipoServicioRepository;

    private final TipoServicioMapper tipoServicioMapper;

    private final TipoServicioSearchRepository tipoServicioSearchRepository;

    public TipoServicioServiceImpl(TipoServicioRepository tipoServicioRepository, TipoServicioMapper tipoServicioMapper, TipoServicioSearchRepository tipoServicioSearchRepository) {
        this.tipoServicioRepository = tipoServicioRepository;
        this.tipoServicioMapper = tipoServicioMapper;
        this.tipoServicioSearchRepository = tipoServicioSearchRepository;
    }

    /**
     * Save a tipoServicio.
     *
     * @param tipoServicioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TipoServicioDTO save(TipoServicioDTO tipoServicioDTO) {
        log.debug("Request to save TipoServicio : {}", tipoServicioDTO);
        TipoServicio tipoServicio = tipoServicioMapper.toEntity(tipoServicioDTO);
        tipoServicio = tipoServicioRepository.save(tipoServicio);
        TipoServicioDTO result = tipoServicioMapper.toDto(tipoServicio);
        tipoServicioSearchRepository.save(tipoServicio);
        return result;
    }

    /**
     * Get all the tipoServicios.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoServicioDTO> findAll() {
        log.debug("Request to get all TipoServicios");
        return tipoServicioRepository.findAll().stream()
            .map(tipoServicioMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one tipoServicio by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TipoServicioDTO findOne(Long id) {
        log.debug("Request to get TipoServicio : {}", id);
        TipoServicio tipoServicio = tipoServicioRepository.findOne(id);
        return tipoServicioMapper.toDto(tipoServicio);
    }

    /**
     * Delete the tipoServicio by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoServicio : {}", id);
        tipoServicioRepository.delete(id);
        tipoServicioSearchRepository.delete(id);
    }

    /**
     * Search for the tipoServicio corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoServicioDTO> search(String query) {
        log.debug("Request to search TipoServicios for query {}", query);
        return StreamSupport
            .stream(tipoServicioSearchRepository.search(queryStringQuery(RandomUtil.cambiaString(query))).spliterator(), false)
            .map(tipoServicioMapper::toDto)
            .collect(Collectors.toList());
    }
}
