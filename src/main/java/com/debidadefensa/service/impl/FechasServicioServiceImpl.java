package com.debidadefensa.service.impl;

import com.debidadefensa.service.FechasServicioService;
import com.debidadefensa.domain.FechasServicio;
import com.debidadefensa.repository.FechasServicioRepository;
import com.debidadefensa.repository.search.FechasServicioSearchRepository;
import com.debidadefensa.service.dto.FechasServicioDTO;
import com.debidadefensa.service.mapper.FechasServicioMapper;
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
 * Service Implementation for managing FechasServicio.
 */
@Service
@Transactional
public class FechasServicioServiceImpl implements FechasServicioService {

    private final Logger log = LoggerFactory.getLogger(FechasServicioServiceImpl.class);

    private final FechasServicioRepository fechasServicioRepository;

    private final FechasServicioMapper fechasServicioMapper;

    private final FechasServicioSearchRepository fechasServicioSearchRepository;

    public FechasServicioServiceImpl(FechasServicioRepository fechasServicioRepository, FechasServicioMapper fechasServicioMapper, FechasServicioSearchRepository fechasServicioSearchRepository) {
        this.fechasServicioRepository = fechasServicioRepository;
        this.fechasServicioMapper = fechasServicioMapper;
        this.fechasServicioSearchRepository = fechasServicioSearchRepository;
    }

    /**
     * Save a fechasServicio.
     *
     * @param fechasServicioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FechasServicioDTO save(FechasServicioDTO fechasServicioDTO) {
        log.debug("Request to save FechasServicio : {}", fechasServicioDTO);
        FechasServicio fechasServicio = fechasServicioMapper.toEntity(fechasServicioDTO);
        fechasServicio = fechasServicioRepository.save(fechasServicio);
        FechasServicioDTO result = fechasServicioMapper.toDto(fechasServicio);
        fechasServicioSearchRepository.save(fechasServicio);
        return result;
    }

    /**
     * Get all the fechasServicios.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FechasServicioDTO> findAll() {
        log.debug("Request to get all FechasServicios");
        return fechasServicioRepository.findAll().stream()
            .map(fechasServicioMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one fechasServicio by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FechasServicioDTO findOne(Long id) {
        log.debug("Request to get FechasServicio : {}", id);
        FechasServicio fechasServicio = fechasServicioRepository.findOne(id);
        return fechasServicioMapper.toDto(fechasServicio);
    }

    /**
     * Delete the fechasServicio by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FechasServicio : {}", id);
        fechasServicioRepository.delete(id);
        fechasServicioSearchRepository.delete(id);
    }

    /**
     * Search for the fechasServicio corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FechasServicioDTO> search(String query) {
        log.debug("Request to search FechasServicios for query {}", query);
        return StreamSupport
            .stream(fechasServicioSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(fechasServicioMapper::toDto)
            .collect(Collectors.toList());
    }


    /**
     * Get all the expedientes.
     *
     * @Long iduser the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FechasServicioDTO> findByExpedienteId(Long id) {
        log.debug("Request to get all Expedientes by user");       
       /*  Cliente cliente = new Cliente();
        cliente.setId(idUser);
        Expediente exp = new Expediente();
        exp.setCliente(cliente);
        Example<Expediente> expediente = Example.of(exp);*/
       return fechasServicioRepository.findByExpediente_id(id).stream().map(fechasServicioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
      //  return result.map(expedienteMapper::toDto);
    }


    /**
     * Get all the expedientes.
     *
     * @Long iduser the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FechasServicioDTO> findByMigratorio(Long id) {
        log.debug("Request to get all Expedientes by user");       
       /*  Cliente cliente = new Cliente();
        cliente.setId(idUser);
        Expediente exp = new Expediente();
        exp.setCliente(cliente);
        Example<Expediente> expediente = Example.of(exp);*/
       return fechasServicioRepository.findByTramiteMigratorio_id(id).stream().map(fechasServicioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
      //  return result.map(expedienteMapper::toDto);
    }

    /**
     * Get all the expedientes.
     *
     * @Long iduser the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FechasServicioDTO> findByGeneral(Long id) {
        log.debug("Request to get all Expedientes by user");       
       /*  Cliente cliente = new Cliente();
        cliente.setId(idUser);
        Expediente exp = new Expediente();
        exp.setCliente(cliente);
        Example<Expediente> expediente = Example.of(exp);*/
       return fechasServicioRepository.findByTramiteGeneral_id(id).stream().map(fechasServicioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
      //  return result.map(expedienteMapper::toDto);
    }

    /**
     * Get all the expedientes.
     *
     * @Long iduser the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FechasServicioDTO> findByDate(Long month, Long year) {
        log.debug("Request to get all Expedientes by month"); 
       return fechasServicioRepository.findByDate(month, year).stream().map(fechasServicioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));      
    }
}
