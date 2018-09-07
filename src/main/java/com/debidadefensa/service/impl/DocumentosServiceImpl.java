package com.debidadefensa.service.impl;

import com.debidadefensa.service.DocumentosService;
import com.debidadefensa.domain.Documentos;
import com.debidadefensa.repository.DocumentosRepository;
import com.debidadefensa.repository.search.DocumentosSearchRepository;
import com.debidadefensa.service.dto.DocumentosDTO;
import com.debidadefensa.service.mapper.DocumentosMapper;
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
 * Service Implementation for managing Documentos.
 */
@Service
@Transactional
public class DocumentosServiceImpl implements DocumentosService {

    private final Logger log = LoggerFactory.getLogger(DocumentosServiceImpl.class);

    private final DocumentosRepository documentosRepository;

    private final DocumentosMapper documentosMapper;

    private final DocumentosSearchRepository documentosSearchRepository;

    public DocumentosServiceImpl(DocumentosRepository documentosRepository, DocumentosMapper documentosMapper, DocumentosSearchRepository documentosSearchRepository) {
        this.documentosRepository = documentosRepository;
        this.documentosMapper = documentosMapper;
        this.documentosSearchRepository = documentosSearchRepository;
    }

    /**
     * Save a documentos.
     *
     * @param documentosDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DocumentosDTO save(DocumentosDTO documentosDTO) {
        log.debug("Request to save Documentos : {}", documentosDTO);
        Documentos documentos = documentosMapper.toEntity(documentosDTO);
        documentos = documentosRepository.save(documentos);
        DocumentosDTO result = documentosMapper.toDto(documentos);
        documentosSearchRepository.save(documentos);
        return result;
    }

    /**
     * Get all the documentos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DocumentosDTO> findAll() {
        log.debug("Request to get all Documentos");
        return documentosRepository.findAll().stream()
            .map(documentosMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one documentos by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DocumentosDTO findOne(Long id) {
        log.debug("Request to get Documentos : {}", id);
        Documentos documentos = documentosRepository.findOne(id);
        return documentosMapper.toDto(documentos);
    }

    /**
     * Delete the documentos by id.
     *
     * @param id the id of the entity
     */
    @Override
    public DocumentosDTO delete(Long id) {
        log.debug("Request to delete Documentos : {}", id);
        DocumentosDTO documento = findOne(id);
        documentosRepository.delete(id);
        documentosSearchRepository.delete(id);
        return documento;
    }

    /**
     * Search for the documentos corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DocumentosDTO> search(String query) {
        log.debug("Request to search Documentos for query {}", query);
        return StreamSupport
            .stream(documentosSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(documentosMapper::toDto)
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
    public List<DocumentosDTO> findByExpedienteId(Long id) {
        log.debug("Request to get all Expedientes by user");       
       /*  Cliente cliente = new Cliente();
        cliente.setId(idUser);
        Expediente exp = new Expediente();
        exp.setCliente(cliente);
        Example<Expediente> expediente = Example.of(exp);*/
       return documentosRepository.findByExpediente_id(id).stream().map(documentosMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
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
    public List<DocumentosDTO> findByMigratorio(Long id) {
        log.debug("Request to get all Expedientes by user");       
       /*  Cliente cliente = new Cliente();
        cliente.setId(idUser);
        Expediente exp = new Expediente();
        exp.setCliente(cliente);
        Example<Expediente> expediente = Example.of(exp);*/
       return documentosRepository.findByTramiteMigratorio_id(id).stream().map(documentosMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
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
    public List<DocumentosDTO> findByGeneral(Long id) {
        log.debug("Request to get all Expedientes by user");       
       /*  Cliente cliente = new Cliente();
        cliente.setId(idUser);
        Expediente exp = new Expediente();
        exp.setCliente(cliente);
        Example<Expediente> expediente = Example.of(exp);*/
       return documentosRepository.findByTramiteGeneral_id(id).stream().map(documentosMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
      //  return result.map(expedienteMapper::toDto);
    }

}
