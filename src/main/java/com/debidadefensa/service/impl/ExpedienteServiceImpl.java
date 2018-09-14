package com.debidadefensa.service.impl;

import com.debidadefensa.service.ExpedienteService;
import com.debidadefensa.domain.Expediente;
import com.debidadefensa.domain.Cliente;
import com.debidadefensa.repository.ExpedienteRepository;
import com.debidadefensa.repository.search.ExpedienteSearchRepository;
import com.debidadefensa.service.dto.ExpedienteDTO;
import com.debidadefensa.service.mapper.ExpedienteMapper;

import org.hibernate.annotations.Any;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.bytebuddy.dynamic.scaffold.MethodGraph.Linked;

import static org.elasticsearch.index.query.QueryBuilders.*;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Expediente.
 */
@Service
@Transactional
public class ExpedienteServiceImpl implements ExpedienteService {

    private final Logger log = LoggerFactory.getLogger(ExpedienteServiceImpl.class);

    private final ExpedienteRepository expedienteRepository;

    private final ExpedienteMapper expedienteMapper;

    private final ExpedienteSearchRepository expedienteSearchRepository;

    public ExpedienteServiceImpl(ExpedienteRepository expedienteRepository, ExpedienteMapper expedienteMapper, ExpedienteSearchRepository expedienteSearchRepository) {
        this.expedienteRepository = expedienteRepository;
        this.expedienteMapper = expedienteMapper;
        this.expedienteSearchRepository = expedienteSearchRepository;
    }

    /**
     * Save a expediente.
     *
     * @param expedienteDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ExpedienteDTO save(ExpedienteDTO expedienteDTO) {
        log.debug("Request to save Expediente : {}", expedienteDTO);
        Expediente expediente = expedienteMapper.toEntity(expedienteDTO);
        expediente = expedienteRepository.save(expediente);
        ExpedienteDTO result = expedienteMapper.toDto(expediente);
        expedienteSearchRepository.save(expediente);
        return result;
    }

    /**
     * Get all the expedientes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ExpedienteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Expedientes");
        Page<Expediente> expedientes = expedienteRepository.findAllItems(pageable);
        return expedientes.map(expedienteMapper::toDto);
    }

    /**
     * Get all the expedientes.
     *
     * @Long iduser the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ExpedienteDTO> findByIdUser(Pageable pageable, Long idUser) {
        log.debug("Request to get all Expedientes");
        Page<Expediente> expedientes = expedienteRepository.findByCliente_id(pageable, idUser);
        return expedientes.map(expedienteMapper::toDto);

        /*log.debug("Request to get all Expedientes by user");       
        List<Expediente>  lsExpedientes = expedienteRepository.findByCliente_id(idUser);
        return lsExpedientes.stream().map(expedienteMapper::toDto).collect(Collectors.toCollection(LinkedList::new));*/
      //  return result.map(expedienteMapper::toDto);
    }


    /**
     * Get one expediente by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ExpedienteDTO findOne(Long id) {
        log.debug("Request to get Expediente : {}", id);
        Expediente expediente = expedienteRepository.findOne(id);
        return expedienteMapper.toDto(expediente);
    }

    /**
     * Delete the expediente by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Expediente : {}", id);
        expedienteRepository.delete(id);
        expedienteSearchRepository.delete(id);
    }

    /**
     * Search for the expediente corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ExpedienteDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Expedientes for query {}", query);
        Page<Expediente> result = expedienteSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(expedienteMapper::toDto);
    }
}
