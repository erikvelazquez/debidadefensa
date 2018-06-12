package com.debidadefensa.service.impl;

import com.debidadefensa.service.PagosService;
import com.debidadefensa.domain.Pagos;
import com.debidadefensa.repository.PagosRepository;
import com.debidadefensa.repository.search.PagosSearchRepository;
import com.debidadefensa.service.dto.PagosDTO;
import com.debidadefensa.service.mapper.PagosMapper;
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
 * Service Implementation for managing Pagos.
 */
@Service
@Transactional
public class PagosServiceImpl implements PagosService {

    private final Logger log = LoggerFactory.getLogger(PagosServiceImpl.class);

    private final PagosRepository pagosRepository;

    private final PagosMapper pagosMapper;

    private final PagosSearchRepository pagosSearchRepository;

    public PagosServiceImpl(PagosRepository pagosRepository, PagosMapper pagosMapper, PagosSearchRepository pagosSearchRepository) {
        this.pagosRepository = pagosRepository;
        this.pagosMapper = pagosMapper;
        this.pagosSearchRepository = pagosSearchRepository;
    }

    /**
     * Save a pagos.
     *
     * @param pagosDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PagosDTO save(PagosDTO pagosDTO) {
        log.debug("Request to save Pagos : {}", pagosDTO);
        Pagos pagos = pagosMapper.toEntity(pagosDTO);
        pagos = pagosRepository.save(pagos);
        PagosDTO result = pagosMapper.toDto(pagos);
        pagosSearchRepository.save(pagos);
        return result;
    }

    /**
     * Get all the pagos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PagosDTO> findAll() {
        log.debug("Request to get all Pagos");
        return pagosRepository.findAll().stream()
            .map(pagosMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one pagos by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PagosDTO findOne(Long id) {
        log.debug("Request to get Pagos : {}", id);
        Pagos pagos = pagosRepository.findOne(id);
        return pagosMapper.toDto(pagos);
    }

    /**
     * Delete the pagos by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pagos : {}", id);
        pagosRepository.delete(id);
        pagosSearchRepository.delete(id);
    }

    /**
     * Search for the pagos corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PagosDTO> search(String query) {
        log.debug("Request to search Pagos for query {}", query);
        return StreamSupport
            .stream(pagosSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(pagosMapper::toDto)
            .collect(Collectors.toList());
    }
}
