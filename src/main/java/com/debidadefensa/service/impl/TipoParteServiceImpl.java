package com.debidadefensa.service.impl;

import com.debidadefensa.service.TipoParteService;
import com.debidadefensa.domain.TipoParte;
import com.debidadefensa.repository.TipoParteRepository;
import com.debidadefensa.repository.search.TipoParteSearchRepository;
import com.debidadefensa.service.dto.TipoParteDTO;
import com.debidadefensa.service.mapper.TipoParteMapper;
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
 * Service Implementation for managing TipoParte.
 */
@Service
@Transactional
public class TipoParteServiceImpl implements TipoParteService {

    private final Logger log = LoggerFactory.getLogger(TipoParteServiceImpl.class);

    private final TipoParteRepository tipoParteRepository;

    private final TipoParteMapper tipoParteMapper;

    private final TipoParteSearchRepository tipoParteSearchRepository;

    public TipoParteServiceImpl(TipoParteRepository tipoParteRepository, TipoParteMapper tipoParteMapper, TipoParteSearchRepository tipoParteSearchRepository) {
        this.tipoParteRepository = tipoParteRepository;
        this.tipoParteMapper = tipoParteMapper;
        this.tipoParteSearchRepository = tipoParteSearchRepository;
    }

    /**
     * Save a tipoParte.
     *
     * @param tipoParteDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TipoParteDTO save(TipoParteDTO tipoParteDTO) {
        log.debug("Request to save TipoParte : {}", tipoParteDTO);
        TipoParte tipoParte = tipoParteMapper.toEntity(tipoParteDTO);
        tipoParte = tipoParteRepository.save(tipoParte);
        TipoParteDTO result = tipoParteMapper.toDto(tipoParte);
        tipoParteSearchRepository.save(tipoParte);
        return result;
    }

    /**
     * Get all the tipoPartes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoParteDTO> findAll() {
        log.debug("Request to get all TipoPartes");
        return tipoParteRepository.findAll().stream()
            .map(tipoParteMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one tipoParte by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TipoParteDTO findOne(Long id) {
        log.debug("Request to get TipoParte : {}", id);
        TipoParte tipoParte = tipoParteRepository.findOne(id);
        return tipoParteMapper.toDto(tipoParte);
    }

    /**
     * Delete the tipoParte by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoParte : {}", id);
        tipoParteRepository.delete(id);
        tipoParteSearchRepository.delete(id);
    }

    /**
     * Search for the tipoParte corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoParteDTO> search(String query) {
        log.debug("Request to search TipoPartes for query {}", query);
        return StreamSupport
            .stream(tipoParteSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(tipoParteMapper::toDto)
            .collect(Collectors.toList());
    }
}
