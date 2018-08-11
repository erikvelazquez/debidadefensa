package com.debidadefensa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.debidadefensa.service.TramiteGeneralService;
import com.debidadefensa.web.rest.errors.BadRequestAlertException;
import com.debidadefensa.web.rest.util.HeaderUtil;
import com.debidadefensa.web.rest.util.PaginationUtil;
import com.debidadefensa.service.dto.TramiteGeneralDTO;
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
 * REST controller for managing TramiteGeneral.
 */
@RestController
@RequestMapping("/api")
public class TramiteGeneralResource {

    private final Logger log = LoggerFactory.getLogger(TramiteGeneralResource.class);

    private static final String ENTITY_NAME = "tramiteGeneral";

    private final TramiteGeneralService tramiteGeneralService;

    public TramiteGeneralResource(TramiteGeneralService tramiteGeneralService) {
        this.tramiteGeneralService = tramiteGeneralService;
    }

    /**
     * POST  /tramite-generals : Create a new tramiteGeneral.
     *
     * @param tramiteGeneralDTO the tramiteGeneralDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tramiteGeneralDTO, or with status 400 (Bad Request) if the tramiteGeneral has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tramite-generals")
    @Timed
    public ResponseEntity<TramiteGeneralDTO> createTramiteGeneral(@RequestBody TramiteGeneralDTO tramiteGeneralDTO) throws URISyntaxException {
        log.debug("REST request to save TramiteGeneral : {}", tramiteGeneralDTO);
        if (tramiteGeneralDTO.getId() != null) {
            throw new BadRequestAlertException("A new tramiteGeneral cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TramiteGeneralDTO result = tramiteGeneralService.save(tramiteGeneralDTO);
        return ResponseEntity.created(new URI("/api/tramite-generals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tramite-generals : Updates an existing tramiteGeneral.
     *
     * @param tramiteGeneralDTO the tramiteGeneralDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tramiteGeneralDTO,
     * or with status 400 (Bad Request) if the tramiteGeneralDTO is not valid,
     * or with status 500 (Internal Server Error) if the tramiteGeneralDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tramite-generals")
    @Timed
    public ResponseEntity<TramiteGeneralDTO> updateTramiteGeneral(@RequestBody TramiteGeneralDTO tramiteGeneralDTO) throws URISyntaxException {
        log.debug("REST request to update TramiteGeneral : {}", tramiteGeneralDTO);
        if (tramiteGeneralDTO.getId() == null) {
            return createTramiteGeneral(tramiteGeneralDTO);
        }
        TramiteGeneralDTO result = tramiteGeneralService.save(tramiteGeneralDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tramiteGeneralDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tramite-generals : get all the tramiteGenerals.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tramiteGenerals in body
     */
    @GetMapping("/tramite-generals")
    @Timed
    public ResponseEntity<List<TramiteGeneralDTO>> getAllTramiteGenerals(Pageable pageable) {
        log.debug("REST request to get a page of TramiteGenerals");
        Page<TramiteGeneralDTO> page = tramiteGeneralService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tramite-generals");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tramite-generals/:id : get the "id" tramiteGeneral.
     *
     * @param id the id of the tramiteGeneralDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tramiteGeneralDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tramite-generals/{id}")
    @Timed
    public ResponseEntity<TramiteGeneralDTO> getTramiteGeneral(@PathVariable Long id) {
        log.debug("REST request to get TramiteGeneral : {}", id);
        TramiteGeneralDTO tramiteGeneralDTO = tramiteGeneralService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tramiteGeneralDTO));
    }

    /**
     * DELETE  /tramite-generals/:id : delete the "id" tramiteGeneral.
     *
     * @param id the id of the tramiteGeneralDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tramite-generals/{id}")
    @Timed
    public ResponseEntity<Void> deleteTramiteGeneral(@PathVariable Long id) {
        log.debug("REST request to delete TramiteGeneral : {}", id);
        tramiteGeneralService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tramite-generals?query=:query : search for the tramiteGeneral corresponding
     * to the query.
     *
     * @param query the query of the tramiteGeneral search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/tramite-generals")
    @Timed
    public ResponseEntity<List<TramiteGeneralDTO>> searchTramiteGenerals(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of TramiteGenerals for query {}", query);
        Page<TramiteGeneralDTO> page = tramiteGeneralService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/tramite-generals");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /expedientes : get all the expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/tramite-generals/user/{iduser}")
    @Timed
    public ResponseEntity<List<TramiteGeneralDTO>> getAllTramitesGeneralesById(@PathVariable Long iduser) {
        log.debug("REST request to get a page of Expedientes");
        List<TramiteGeneralDTO> ls = tramiteGeneralService.findByIdUser(iduser);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
        return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
    }

    /**
     * GET  /expedientes : get all the expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/tramite-generals/faltante/{id}")
    @Timed
    public ResponseEntity<List<TramiteGeneralDTO>> getAllTramitesGeneralesByFaltantes(@PathVariable Long id) {
        log.debug("REST request to get a page of Expedientes");
        List<TramiteGeneralDTO> ls = tramiteGeneralService.findByFaltantes(id);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
        return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
    }

    /**
     * GET  /expedientes : get all the expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/tramite-generals/asociado/{id}")
    @Timed
    public ResponseEntity<List<TramiteGeneralDTO>> getAllTramitesGeneralesByAsociados(@PathVariable Long id) {
        log.debug("REST request to get a page of Expedientes");
        List<TramiteGeneralDTO> ls = tramiteGeneralService.findByAsociados(id);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
        return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
    }

}
