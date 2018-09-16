package com.debidadefensa.service.impl;

import com.debidadefensa.service.TramiteAsociadoService;
import com.debidadefensa.domain.TramiteAsociado;
import com.debidadefensa.repository.TramiteAsociadoRepository;
import com.debidadefensa.repository.search.TramiteAsociadoSearchRepository;
import com.debidadefensa.service.dto.TramiteAsociadoDTO;
import com.debidadefensa.service.mapper.TramiteAsociadoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing TramiteAsociado.
 */
@Service
@Transactional
public class TramiteAsociadoServiceImpl implements TramiteAsociadoService {

    private final Logger log = LoggerFactory.getLogger(TramiteAsociadoServiceImpl.class);

    private final TramiteAsociadoRepository tramiteAsociadoRepository;

    private final TramiteAsociadoMapper tramiteAsociadoMapper;

    private final TramiteAsociadoSearchRepository tramiteAsociadoSearchRepository;

    public TramiteAsociadoServiceImpl(TramiteAsociadoRepository tramiteAsociadoRepository, TramiteAsociadoMapper tramiteAsociadoMapper, TramiteAsociadoSearchRepository tramiteAsociadoSearchRepository) {
        this.tramiteAsociadoRepository = tramiteAsociadoRepository;
        this.tramiteAsociadoMapper = tramiteAsociadoMapper;
        this.tramiteAsociadoSearchRepository = tramiteAsociadoSearchRepository;
    }

    /**
     * Save a tramiteAsociado.
     *
     * @param tramiteAsociadoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TramiteAsociadoDTO save(TramiteAsociadoDTO[] tramiteAsociadoDTO) {
        // log.debug("Request to save TramiteAsociado : {}", tramiteAsociadoDTO);

        for (TramiteAsociadoDTO item: tramiteAsociadoDTO) {
 
            TramiteAsociado tramiteAsociado = tramiteAsociadoMapper.toEntity(item);        
            tramiteAsociado = tramiteAsociadoRepository.save(tramiteAsociado);
            TramiteAsociadoDTO result = tramiteAsociadoMapper.toDto(tramiteAsociado);
            tramiteAsociadoSearchRepository.save(tramiteAsociado);
 
        }      

        return new TramiteAsociadoDTO();
    }

    /**
     * Get all the tramiteAsociados.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TramiteAsociadoDTO> findAll() {
        log.debug("Request to get all TramiteAsociados");
        return tramiteAsociadoRepository.findAll().stream()
            .map(tramiteAsociadoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one tramiteAsociado by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TramiteAsociadoDTO findOne(Long id) {
        log.debug("Request to get TramiteAsociado : {}", id);
        TramiteAsociado tramiteAsociado = tramiteAsociadoRepository.findOne(id);
        return tramiteAsociadoMapper.toDto(tramiteAsociado);
    }

    /**
     * Delete the tramiteAsociado by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id, Long tiposervicio, Long idasociado) {
        log.debug("Request to delete TramiteAsociado : {}", id);
        TramiteAsociado tramite = tramiteAsociadoRepository.findAsociado(id, tiposervicio, idasociado);
        tramiteAsociadoRepository.delete(tramite.getId());
        tramiteAsociadoSearchRepository.delete(tramite.getId());
    }

    /**
     * Search for the tramiteAsociado corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TramiteAsociadoDTO> search(String query) {
        log.debug("Request to search TramiteAsociados for query {}", query);
        return StreamSupport
            .stream(tramiteAsociadoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(tramiteAsociadoMapper::toDto)
            .collect(Collectors.toList());
    }    
}
