package com.debidadefensa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.debidadefensa.service.TramiteMigratorioService;
import com.debidadefensa.web.rest.errors.BadRequestAlertException;
import com.debidadefensa.web.rest.util.HeaderUtil;
import com.debidadefensa.web.rest.util.PaginationUtil;
import com.debidadefensa.service.dto.TramiteMigratorioDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing TramiteMigratorio.
 */
@RestController
@RequestMapping("/api")
public class TramiteMigratorioResource {

    private final Logger log = LoggerFactory.getLogger(TramiteMigratorioResource.class);

    private static final String ENTITY_NAME = "tramiteMigratorio";

    private final TramiteMigratorioService tramiteMigratorioService;

    public TramiteMigratorioResource(TramiteMigratorioService tramiteMigratorioService) {
        this.tramiteMigratorioService = tramiteMigratorioService;
    }

    /**
     * POST  /tramite-migratorios : Create a new tramiteMigratorio.
     *
     * @param tramiteMigratorioDTO the tramiteMigratorioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tramiteMigratorioDTO, or with status 400 (Bad Request) if the tramiteMigratorio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tramite-migratorios")
    @Timed
    public ResponseEntity<TramiteMigratorioDTO> createTramiteMigratorio(@RequestBody TramiteMigratorioDTO tramiteMigratorioDTO) throws URISyntaxException {
        log.debug("REST request to save TramiteMigratorio : {}", tramiteMigratorioDTO);
        if (tramiteMigratorioDTO.getId() != null) {
            throw new BadRequestAlertException("A new tramiteMigratorio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TramiteMigratorioDTO result = tramiteMigratorioService.save(tramiteMigratorioDTO);
        return ResponseEntity.created(new URI("/api/tramite-migratorios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tramite-migratorios : Updates an existing tramiteMigratorio.
     *
     * @param tramiteMigratorioDTO the tramiteMigratorioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tramiteMigratorioDTO,
     * or with status 400 (Bad Request) if the tramiteMigratorioDTO is not valid,
     * or with status 500 (Internal Server Error) if the tramiteMigratorioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tramite-migratorios")
    @Timed
    public ResponseEntity<TramiteMigratorioDTO> updateTramiteMigratorio(@RequestBody TramiteMigratorioDTO tramiteMigratorioDTO) throws URISyntaxException {
        log.debug("REST request to update TramiteMigratorio : {}", tramiteMigratorioDTO);
        if (tramiteMigratorioDTO.getId() == null) {
            return createTramiteMigratorio(tramiteMigratorioDTO);
        }
        TramiteMigratorioDTO result = tramiteMigratorioService.save(tramiteMigratorioDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tramiteMigratorioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tramite-migratorios : get all the tramiteMigratorios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tramiteMigratorios in body
     */
    @GetMapping("/tramite-migratorios")
    @Timed
    public ResponseEntity<List<TramiteMigratorioDTO>> getAllTramiteMigratorios(Pageable pageable) {
        log.debug("REST request to get a page of TramiteMigratorios");
        Page<TramiteMigratorioDTO> page = tramiteMigratorioService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tramite-migratorios");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /expedientes : get all the expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/tramite-migratorios/user/{iduser}")
    @Timed
    public ResponseEntity<List<TramiteMigratorioDTO>> getAllTramitesMigratoriosById(Pageable pageable, @PathVariable Long iduser) {
        log.debug("REST request to get a page of Expedientes");
        Page<TramiteMigratorioDTO> page = tramiteMigratorioService.findByIdUser(pageable, iduser);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tramite-migratorios");
//      HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
      //  return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
    }

    /**
     * GET  /tramite-migratorios/:id : get the "id" tramiteMigratorio.
     *
     * @param id the id of the tramiteMigratorioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tramiteMigratorioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tramite-migratorios/{id}")
    @Timed
    public ResponseEntity<TramiteMigratorioDTO> getTramiteMigratorio(@PathVariable Long id) {
        log.debug("REST request to get TramiteMigratorio : {}", id);
        TramiteMigratorioDTO tramiteMigratorioDTO = tramiteMigratorioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tramiteMigratorioDTO));
    }

    /**
     * DELETE  /tramite-migratorios/:id : delete the "id" tramiteMigratorio.
     *
     * @param id the id of the tramiteMigratorioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tramite-migratorios/{id}")
    @Timed
    public ResponseEntity<Void> deleteTramiteMigratorio(@PathVariable Long id) {
        log.debug("REST request to delete TramiteMigratorio : {}", id);
        tramiteMigratorioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tramite-migratorios?query=:query : search for the tramiteMigratorio corresponding
     * to the query.
     *
     * @param query the query of the tramiteMigratorio search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/tramite-migratorios")
    @Timed
    public ResponseEntity<List<TramiteMigratorioDTO>> searchTramiteMigratorios(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of TramiteMigratorios for query {}", query);
        Page<TramiteMigratorioDTO> page = tramiteMigratorioService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/tramite-migratorios");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }    

    /**
     * GET  /expedientes : get all the expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/tramite-migratorios/faltante/{id}/{idCliente}")
    @Timed
    public List<TramiteMigratorioDTO> getAllTramitesMigratoriosByFaltantes(@PathVariable Long id, @PathVariable Long idCliente) {
        log.debug("REST request to get a page of migratorios");
        List<TramiteMigratorioDTO> ls = tramiteMigratorioService.findByFaltantes(id, idCliente);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
        // return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
        return ls;
    }

    /**
     * GET  /expedientes : get all the expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/tramite-migratorios/asociado/{id}")
    @Timed
    public List<TramiteMigratorioDTO> getAllTramitesMigratriosByAsociados(@PathVariable Long id) {
        log.debug("REST request to get a page of migratorios");
        List<TramiteMigratorioDTO> ls = tramiteMigratorioService.findByAsociados(id);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
        // return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
        return ls;
    }

}
