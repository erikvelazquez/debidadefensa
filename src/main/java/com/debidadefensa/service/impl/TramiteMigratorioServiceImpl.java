package com.debidadefensa.service.impl;

import com.debidadefensa.service.TramiteMigratorioService;
import com.debidadefensa.domain.TramiteMigratorio;
import com.debidadefensa.repository.TramiteMigratorioRepository;
import com.debidadefensa.repository.search.TramiteMigratorioSearchRepository;
import com.debidadefensa.service.dto.TramiteMigratorioDTO;
import com.debidadefensa.service.mapper.TramiteMigratorioMapper;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.elasticsearch.index.search.MultiMatchQuery;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;
import java.util.LinkedList;
import java.util.List;
// import static org.elasticsearch.index.query.QueryBuilders.*;

import com.debidadefensa.service.util.RandomUtil;
/**
 * Service Implementation for managing TramiteMigratorio.
 */
@Service
@Transactional
public class TramiteMigratorioServiceImpl implements TramiteMigratorioService {

    private final Logger log = LoggerFactory.getLogger(TramiteMigratorioServiceImpl.class);

    private final TramiteMigratorioRepository tramiteMigratorioRepository;

    private final TramiteMigratorioMapper tramiteMigratorioMapper;

    private final TramiteMigratorioSearchRepository tramiteMigratorioSearchRepository;

    public TramiteMigratorioServiceImpl(TramiteMigratorioRepository tramiteMigratorioRepository, TramiteMigratorioMapper tramiteMigratorioMapper, TramiteMigratorioSearchRepository tramiteMigratorioSearchRepository) {
        this.tramiteMigratorioRepository = tramiteMigratorioRepository;
        this.tramiteMigratorioMapper = tramiteMigratorioMapper;
        this.tramiteMigratorioSearchRepository = tramiteMigratorioSearchRepository;
    }

    /**
     * Save a tramiteMigratorio.
     *
     * @param tramiteMigratorioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TramiteMigratorioDTO save(TramiteMigratorioDTO tramiteMigratorioDTO) {
        log.debug("Request to save TramiteMigratorio : {}", tramiteMigratorioDTO);
        TramiteMigratorio tramiteMigratorio = tramiteMigratorioMapper.toEntity(tramiteMigratorioDTO);
        tramiteMigratorio = tramiteMigratorioRepository.save(tramiteMigratorio);
        TramiteMigratorioDTO result = tramiteMigratorioMapper.toDto(tramiteMigratorio);
        tramiteMigratorioSearchRepository.save(tramiteMigratorio);
        return result;
    }

    /**
     * Get all the tramiteMigratorios.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TramiteMigratorioDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TramiteMigratorios");
        return tramiteMigratorioRepository.findAllItems(pageable)
            .map(tramiteMigratorioMapper::toDto);
    }

    /**
     * Get one tramiteMigratorio by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TramiteMigratorioDTO findOne(Long id) {
        log.debug("Request to get TramiteMigratorio : {}", id);
        TramiteMigratorio tramiteMigratorio = tramiteMigratorioRepository.findOneWithEagerRelationships(id);
        return tramiteMigratorioMapper.toDto(tramiteMigratorio);
    }

    /**
     * Delete the tramiteMigratorio by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TramiteMigratorio : {}", id);
        tramiteMigratorioRepository.delete(id);
        tramiteMigratorioSearchRepository.delete(id);
    }

    /**
     * Search for the tramiteMigratorio corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TramiteMigratorioDTO> search(String query, Pageable pageable) {       
        MultiMatchQueryBuilder queryBuilder2 = QueryBuilders.multiMatchQuery(query, "nombreExtranjero", "tipotramite", "entidad", "observaciones", "_all").type("phrase_prefix").analyzer("spanish");      
        log.info("Query: {}", queryBuilder2);       
        Page<TramiteMigratorio> result = tramiteMigratorioSearchRepository.search(queryBuilder2, pageable);
        return result.map(tramiteMigratorioMapper::toDto);
    }

    /**
     * Get all the expedientes.
     *
     * @Long iduser the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TramiteMigratorioDTO> findByIdUser(Pageable pageable, Long idUser) {
        log.debug("Request to get all Expedientes by user");       
       
        return tramiteMigratorioRepository.findByCliente_id(pageable, idUser)
            .map(tramiteMigratorioMapper::toDto);
            
        //List<TramiteMigratorio> result = tramiteMigratorioRepository.findByCliente_id(idUser);
        // return result.stream().map(tramiteMigratorioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
      //  return result.map(expedienteMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TramiteMigratorioDTO> findByFaltantes(Long id, Long tipo, Long idCliente) {
        log.debug("Request to get all tramites generales not in asociados"); 
        return tramiteMigratorioRepository.findByFaltantes(id, tipo, idCliente).stream().map(tramiteMigratorioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public List<TramiteMigratorioDTO> findByAsociados(Long id, Long tipo) {
        log.debug("Request to get all tramites generales not in asociados");       
    
        return tramiteMigratorioRepository.findByAsociados(id, tipo).stream().map(tramiteMigratorioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }



}
