package com.debidadefensa.service.impl;

import com.debidadefensa.service.EstatusService;
import com.debidadefensa.domain.Estatus;
import com.debidadefensa.repository.EstatusRepository;
import com.debidadefensa.repository.search.EstatusSearchRepository;
import com.debidadefensa.service.dto.EstatusDTO;
import com.debidadefensa.service.mapper.EstatusMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Estatus.
 */
@Service
@Transactional
public class EstatusServiceImpl implements EstatusService {

    private final Logger log = LoggerFactory.getLogger(EstatusServiceImpl.class);

    private final EstatusRepository estatusRepository;

    private final EstatusMapper estatusMapper;

    private final EstatusSearchRepository estatusSearchRepository;

    public EstatusServiceImpl(EstatusRepository estatusRepository, EstatusMapper estatusMapper, EstatusSearchRepository estatusSearchRepository) {
        this.estatusRepository = estatusRepository;
        this.estatusMapper = estatusMapper;
        this.estatusSearchRepository = estatusSearchRepository;
    }

    /**
     * Save a estatus.
     *
     * @param estatusDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EstatusDTO save(EstatusDTO estatusDTO) {
        log.debug("Request to save Estatus : {}", estatusDTO);
        Estatus estatus = estatusMapper.toEntity(estatusDTO);
        estatus = estatusRepository.save(estatus);
        EstatusDTO result = estatusMapper.toDto(estatus);
        estatusSearchRepository.save(estatus);
        return result;
    }

    /**
     * Get all the estatuses.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<EstatusDTO> findAll() {
        log.debug("Request to get all Estatuses");        
        List<EstatusDTO> ls = estatusRepository.findAll().stream()
                                .sorted(Comparator.comparing(Estatus::getDescripcion))
                                .map(estatusMapper::toDto)
                                .collect(Collectors.toCollection(LinkedList::new));

        return ls;
    }

    /**
     * Get one estatus by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EstatusDTO findOne(Long id) {
        log.debug("Request to get Estatus : {}", id);
        Estatus estatus = estatusRepository.findOne(id);
        return estatusMapper.toDto(estatus);
    }

    /**
     * Delete the estatus by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Estatus : {}", id);
        estatusRepository.delete(id);
        estatusSearchRepository.delete(id);
    }

    /**
     * Search for the estatus corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<EstatusDTO> search(String query) {
        log.debug("Request to search Estatuses for query {}", query);
        return StreamSupport
            .stream(estatusSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(estatusMapper::toDto)
            .collect(Collectors.toList());
    }
}
