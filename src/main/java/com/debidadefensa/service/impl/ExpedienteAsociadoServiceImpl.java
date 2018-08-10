package com.debidadefensa.service.impl;

import com.debidadefensa.service.ExpedienteAsociadoService;
import com.debidadefensa.domain.ExpedienteAsociado;
import com.debidadefensa.repository.ExpedienteAsociadoRepository;
import com.debidadefensa.repository.search.ExpedienteAsociadoSearchRepository;
import com.debidadefensa.service.dto.ExpedienteAsociadoDTO;
import com.debidadefensa.service.mapper.ExpedienteAsociadoMapper;
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
 * Service Implementation for managing ExpedienteAsociado.
 */
@Service
@Transactional
public class ExpedienteAsociadoServiceImpl implements ExpedienteAsociadoService {

    private final Logger log = LoggerFactory.getLogger(ExpedienteAsociadoServiceImpl.class);

    private final ExpedienteAsociadoRepository expedienteAsociadoRepository;

    private final ExpedienteAsociadoMapper expedienteAsociadoMapper;

    private final ExpedienteAsociadoSearchRepository expedienteAsociadoSearchRepository;

    public ExpedienteAsociadoServiceImpl(ExpedienteAsociadoRepository expedienteAsociadoRepository, ExpedienteAsociadoMapper expedienteAsociadoMapper, ExpedienteAsociadoSearchRepository expedienteAsociadoSearchRepository) {
        this.expedienteAsociadoRepository = expedienteAsociadoRepository;
        this.expedienteAsociadoMapper = expedienteAsociadoMapper;
        this.expedienteAsociadoSearchRepository = expedienteAsociadoSearchRepository;
    }

    /**
     * Save a expedienteAsociado.
     *
     * @param expedienteAsociadoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ExpedienteAsociadoDTO save(ExpedienteAsociadoDTO expedienteAsociadoDTO) {
        log.debug("Request to save ExpedienteAsociado : {}", expedienteAsociadoDTO);
        ExpedienteAsociado expedienteAsociado = expedienteAsociadoMapper.toEntity(expedienteAsociadoDTO);
        expedienteAsociado = expedienteAsociadoRepository.save(expedienteAsociado);
        ExpedienteAsociadoDTO result = expedienteAsociadoMapper.toDto(expedienteAsociado);
        expedienteAsociadoSearchRepository.save(expedienteAsociado);
        return result;
    }

    /**
     * Get all the expedienteAsociados.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ExpedienteAsociadoDTO> findAll() {
        log.debug("Request to get all ExpedienteAsociados");
        return expedienteAsociadoRepository.findAll().stream()
            .map(expedienteAsociadoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one expedienteAsociado by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ExpedienteAsociadoDTO findOne(Long id) {
        log.debug("Request to get ExpedienteAsociado : {}", id);
        ExpedienteAsociado expedienteAsociado = expedienteAsociadoRepository.findOne(id);
        return expedienteAsociadoMapper.toDto(expedienteAsociado);
    }

    /**
     * Delete the expedienteAsociado by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ExpedienteAsociado : {}", id);
        expedienteAsociadoRepository.delete(id);
        expedienteAsociadoSearchRepository.delete(id);
    }

    /**
     * Search for the expedienteAsociado corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ExpedienteAsociadoDTO> search(String query) {
        log.debug("Request to search ExpedienteAsociados for query {}", query);
        return StreamSupport
            .stream(expedienteAsociadoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(expedienteAsociadoMapper::toDto)
            .collect(Collectors.toList());
    }


    @Override
    @Transactional(readOnly = true)
    public List<ExpedienteAsociadoDTO> findByExpediente_id(Long id) {
        log.debug("Request to get all Expedientes by user"); 
       return expedienteAsociadoRepository.findByExpediente_id(id).stream().map(expedienteAsociadoMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
      //  return result.map(expedienteMapper::toDto);
    }
}
