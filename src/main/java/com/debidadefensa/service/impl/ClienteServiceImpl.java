package com.debidadefensa.service.impl;

import com.debidadefensa.service.ClienteService;
import com.debidadefensa.domain.Cliente;
import com.debidadefensa.repository.ClienteRepository;
import com.debidadefensa.repository.search.ClienteSearchRepository;
import com.debidadefensa.service.dto.ClienteDTO;
import com.debidadefensa.service.mapper.ClienteMapper;
import com.debidadefensa.service.util.RandomUtil;

import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

import java.util.List;

/**
 * Service Implementation for managing Cliente.
 */
@Service
@Transactional
public class ClienteServiceImpl implements ClienteService {

    private final Logger log = LoggerFactory.getLogger(ClienteServiceImpl.class);

    private final ClienteRepository clienteRepository;

    private final ClienteMapper clienteMapper;

    private final ClienteSearchRepository clienteSearchRepository;

    public ClienteServiceImpl(ClienteRepository clienteRepository, ClienteMapper clienteMapper, ClienteSearchRepository clienteSearchRepository) {
        this.clienteRepository = clienteRepository;
        this.clienteMapper = clienteMapper;
        this.clienteSearchRepository = clienteSearchRepository;
    }

    /**
     * Save a cliente.
     *
     * @param clienteDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ClienteDTO save(ClienteDTO clienteDTO) {
        log.debug("Request to save Cliente : {}", clienteDTO);
        Cliente cliente = clienteMapper.toEntity(clienteDTO);
        cliente = clienteRepository.save(cliente);
        ClienteDTO result = clienteMapper.toDto(cliente);
        clienteSearchRepository.save(cliente);
        return result;
    }

    /**
     * Get all the clientes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ClienteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Clientes");
        //return clienteRepository.findClientes(pageable);
       // .map(clienteMapper::toDto);
       Page<Cliente> page = clienteRepository.findClientes(pageable);
       List<Cliente> clientlist = page.getContent();

       for (int i = 0; i < clientlist.size(); i++) {
            clienteSearchRepository.save(clientlist.get(i));
        }
       return page.map(clienteMapper::toDto);
    }

    /**
     * Get one cliente by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ClienteDTO findOne(Long id) {
        log.debug("Request to get Cliente : {}", id);
        Cliente cliente = clienteRepository.findCliente(id);
        return clienteMapper.toDto(cliente);
    }

    /**
     * Delete the cliente by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cliente : {}", id);
        clienteRepository.delete(id);
        clienteSearchRepository.delete(id);
    }

    /**
     * Search for the cliente corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ClienteDTO> search(String query, Pageable pageable) {
        MultiMatchQueryBuilder queryBuilder2 = QueryBuilders.multiMatchQuery(query, "nombre", "telefonos", "correo_electronico", "domicilio", "referencia", "rfc", "_all").type("phrase_prefix").analyzer("spanish");      
        log.info("Query: {}", queryBuilder2);       
        Page<Cliente> result = clienteSearchRepository.search(queryBuilder2, pageable);
        return result.map(clienteMapper::toDto);

        // log.debug("Request to search for a page of Clientes for query {}", query);
        // Page<Cliente> result = clienteSearchRepository.search(queryStringQuery(RandomUtil.cambiaString(query)), pageable);
        // return result.map(clienteMapper::toDto);
    }
}
