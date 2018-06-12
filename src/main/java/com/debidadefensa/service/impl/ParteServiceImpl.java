package com.debidadefensa.service.impl;

import com.debidadefensa.service.ParteService;
import com.debidadefensa.domain.Parte;
import com.debidadefensa.repository.ParteRepository;
import com.debidadefensa.repository.search.ParteSearchRepository;
import com.debidadefensa.service.dto.ParteDTO;
import com.debidadefensa.service.mapper.ParteMapper;
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
 * Service Implementation for managing Parte.
 */
@Service
@Transactional
public class ParteServiceImpl implements ParteService {

    private final Logger log = LoggerFactory.getLogger(ParteServiceImpl.class);

    private final ParteRepository parteRepository;

    private final ParteMapper parteMapper;

    private final ParteSearchRepository parteSearchRepository;

    public ParteServiceImpl(ParteRepository parteRepository, ParteMapper parteMapper, ParteSearchRepository parteSearchRepository) {
        this.parteRepository = parteRepository;
        this.parteMapper = parteMapper;
        this.parteSearchRepository = parteSearchRepository;
    }

    /**
     * Save a parte.
     *
     * @param parteDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ParteDTO save(ParteDTO parteDTO) {
        log.debug("Request to save Parte : {}", parteDTO);
        Parte parte = parteMapper.toEntity(parteDTO);
        parte = parteRepository.save(parte);
        ParteDTO result = parteMapper.toDto(parte);
        parteSearchRepository.save(parte);
        return result;
    }

    /**
     * Get all the partes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ParteDTO> findAll() {
        log.debug("Request to get all Partes");
        return parteRepository.findAll().stream()
            .map(parteMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one parte by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ParteDTO findOne(Long id) {
        log.debug("Request to get Parte : {}", id);
        Parte parte = parteRepository.findOne(id);
        return parteMapper.toDto(parte);
    }

    /**
     * Delete the parte by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Parte : {}", id);
        parteRepository.delete(id);
        parteSearchRepository.delete(id);
    }

    /**
     * Search for the parte corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ParteDTO> search(String query) {
        log.debug("Request to search Partes for query {}", query);
        return StreamSupport
            .stream(parteSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(parteMapper::toDto)
            .collect(Collectors.toList());
    }
}
