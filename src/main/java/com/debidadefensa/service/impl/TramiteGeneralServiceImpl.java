package com.debidadefensa.service.impl;

import com.debidadefensa.service.TramiteGeneralService;
import com.debidadefensa.domain.TramiteGeneral;
import com.debidadefensa.repository.TramiteGeneralRepository;
import com.debidadefensa.repository.search.TramiteGeneralSearchRepository;
import com.debidadefensa.service.dto.TramiteGeneralDTO;
import com.debidadefensa.service.mapper.TramiteGeneralMapper;
import com.debidadefensa.service.util.RandomUtil;

import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.stream.Collectors;
import java.util.LinkedList;
import java.util.List;
import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing TramiteGeneral.
 */
@Service
@Transactional
public class TramiteGeneralServiceImpl implements TramiteGeneralService {

    private final Logger log = LoggerFactory.getLogger(TramiteGeneralServiceImpl.class);

    private final TramiteGeneralRepository tramiteGeneralRepository;

    private final TramiteGeneralMapper tramiteGeneralMapper;

    private final TramiteGeneralSearchRepository tramiteGeneralSearchRepository;

    public TramiteGeneralServiceImpl(TramiteGeneralRepository tramiteGeneralRepository, TramiteGeneralMapper tramiteGeneralMapper, TramiteGeneralSearchRepository tramiteGeneralSearchRepository) {
        this.tramiteGeneralRepository = tramiteGeneralRepository;
        this.tramiteGeneralMapper = tramiteGeneralMapper;
        this.tramiteGeneralSearchRepository = tramiteGeneralSearchRepository;
    }

    /**
     * Save a tramiteGeneral.
     *
     * @param tramiteGeneralDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TramiteGeneralDTO save(TramiteGeneralDTO tramiteGeneralDTO) {
        log.debug("Request to save TramiteGeneral : {}", tramiteGeneralDTO);
        TramiteGeneral tramiteGeneral = tramiteGeneralMapper.toEntity(tramiteGeneralDTO);
        tramiteGeneral = tramiteGeneralRepository.save(tramiteGeneral);
        TramiteGeneralDTO result = tramiteGeneralMapper.toDto(tramiteGeneral);
        tramiteGeneralSearchRepository.save(tramiteGeneral);
        return result;
    }

    /**
     * Get all the tramiteGenerals.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TramiteGeneralDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TramiteGenerals");
        return tramiteGeneralRepository.findAllItems(pageable)
            .map(tramiteGeneralMapper::toDto);
    }

    /**
     * Get one tramiteGeneral by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TramiteGeneralDTO findOne(Long id) {
        log.debug("Request to get TramiteGeneral : {}", id);
        TramiteGeneral tramiteGeneral = tramiteGeneralRepository.findOneWithEagerRelationships(id);
        return tramiteGeneralMapper.toDto(tramiteGeneral);
    }

    /**
     * Delete the tramiteGeneral by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TramiteGeneral : {}", id);
        tramiteGeneralRepository.delete(id);
        tramiteGeneralSearchRepository.delete(id);
    }

    /**
     * Search for the tramiteGeneral corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TramiteGeneralDTO> search(String query, Pageable pageable) {
        MultiMatchQueryBuilder queryBuilder2 = QueryBuilders.multiMatchQuery(query, "titular", "dependencia", "numero_tramite", "tipo_tramite", "observaciones", "_all").type("phrase_prefix").analyzer("spanish");      
        log.info("Query: {}", queryBuilder2);       
        Page<TramiteGeneral> result = tramiteGeneralSearchRepository.search(queryBuilder2, pageable);
        return result.map(tramiteGeneralMapper::toDto);

        // log.debug("Request to search for a page of TramiteGenerals for query {}", query);
        // Page<TramiteGeneral> result = tramiteGeneralSearchRepository.search(queryStringQuery(RandomUtil.cambiaString(query)), pageable);
        // return result.map(tramiteGeneralMapper::toDto);
    }

    /**
     * Get all the expedientes.
     *
     * @Long iduser the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TramiteGeneralDTO> findByIdUser(Pageable pageable, Long idUser) {

        log.debug("Request to get all TramiteGenerals");
        return tramiteGeneralRepository.findByCliente_id(pageable, idUser)
            .map(tramiteGeneralMapper::toDto);


        //log.debug("Request to get all Expedientes by user");       
       /*  Cliente cliente = new Cliente();
        cliente.setId(idUser);
        Expediente exp = new Expediente();
        exp.setCliente(cliente);
        Example<Expediente> expediente = Example.of(exp);*/
     //  return tramiteGeneralRepository.findByCliente_id(idUser).stream().map(tramiteGeneralMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
      //  return result.map(expedienteMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TramiteGeneralDTO> findByFaltantes(Long id, Long tipo, Long idCliente) {
        log.debug("Request to get all tramites generales not in asociados");  
        return tramiteGeneralRepository.findByFaltantes(id, tipo, idCliente).stream().map(tramiteGeneralMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public List<TramiteGeneralDTO> findByAsociados(Long id, Long tipo) {
        log.debug("Request to get all tramites generales not in asociados");       
    
        return tramiteGeneralRepository.findByAsociados(id, tipo).stream().map(tramiteGeneralMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }
}
