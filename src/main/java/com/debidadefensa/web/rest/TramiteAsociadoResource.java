package com.debidadefensa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.debidadefensa.service.TramiteAsociadoService;
import com.debidadefensa.web.rest.errors.BadRequestAlertException;
import com.debidadefensa.web.rest.util.HeaderUtil;
import com.debidadefensa.service.dto.TramiteAsociadoDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing TramiteAsociado.
 */
@RestController
@RequestMapping("/api")
public class TramiteAsociadoResource {

    private final Logger log = LoggerFactory.getLogger(TramiteAsociadoResource.class);

    private static final String ENTITY_NAME = "tramiteAsociado";

    private final TramiteAsociadoService tramiteAsociadoService;

    public TramiteAsociadoResource(TramiteAsociadoService tramiteAsociadoService) {
        this.tramiteAsociadoService = tramiteAsociadoService;
    }

    /**
     * POST  /tramite-asociados : Create a new tramiteAsociado.
     *
     * @param tramiteAsociadoDTO the tramiteAsociadoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tramiteAsociadoDTO, or with status 400 (Bad Request) if the tramiteAsociado has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tramite-asociados")
    @Timed
    public ResponseEntity<TramiteAsociadoDTO> createTramiteAsociado(@RequestBody TramiteAsociadoDTO[] tramiteAsociadoDTO) throws URISyntaxException {
        // log.debug("REST request to save TramiteAsociado : {}", tramiteAsociadoDTO);
        
        TramiteAsociadoDTO result = tramiteAsociadoService.save(tramiteAsociadoDTO);
        return ResponseEntity.created(new URI("/api/tramite-asociados/0"))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, "0"))
            .body(result);
    }

    /**
     * PUT  /tramite-asociados : Updates an existing tramiteAsociado.
     *
     * @param tramiteAsociadoDTO the tramiteAsociadoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tramiteAsociadoDTO,
     * or with status 400 (Bad Request) if the tramiteAsociadoDTO is not valid,
     * or with status 500 (Internal Server Error) if the tramiteAsociadoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    /*@PutMapping("/tramite-asociados")
    @Timed
    public ResponseEntity<TramiteAsociadoDTO> updateTramiteAsociado(@RequestBody TramiteAsociadoDTO tramiteAsociadoDTO) throws URISyntaxException {
        log.debug("REST request to update TramiteAsociado : {}", tramiteAsociadoDTO);
        if (tramiteAsociadoDTO.getId() == null) {
            return createTramiteAsociado(tramiteAsociadoDTO);
        }
        TramiteAsociadoDTO result = tramiteAsociadoService.save(tramiteAsociadoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tramiteAsociadoDTO.getId().toString()))
            .body(result);
    }*/

    /**
     * GET  /tramite-asociados : get all the tramiteAsociados.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tramiteAsociados in body
     */
    @GetMapping("/tramite-asociados")
    @Timed
    public List<TramiteAsociadoDTO> getAllTramiteAsociados() {
        log.debug("REST request to get all TramiteAsociados");
        return tramiteAsociadoService.findAll();
        }

    /**
     * GET  /tramite-asociados/:id : get the "id" tramiteAsociado.
     *
     * @param id the id of the tramiteAsociadoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tramiteAsociadoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tramite-asociados/{id}")
    @Timed
    public ResponseEntity<TramiteAsociadoDTO> getTramiteAsociado(@PathVariable Long id) {
        log.debug("REST request to get TramiteAsociado : {}", id);
        TramiteAsociadoDTO tramiteAsociadoDTO = tramiteAsociadoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tramiteAsociadoDTO));
    }

    /**
     * DELETE  /tramite-asociados/:id : delete the "id" tramiteAsociado.
     *
     * @param id the id of the tramiteAsociadoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tramite-asociados/{id}/{tiposervicio}/{idasociado}")
    @Timed
    public ResponseEntity<Void> deleteTramiteAsociado(@PathVariable Long id, @PathVariable Long tiposervicio, @PathVariable Long idasociado) {
        log.debug("REST request to delete TramiteAsociado : {}", id);
        tramiteAsociadoService.delete(id, tiposervicio, idasociado);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tramite-asociados?query=:query : search for the tramiteAsociado corresponding
     * to the query.
     *
     * @param query the query of the tramiteAsociado search
     * @return the result of the search
     */
    @GetMapping("/_search/tramite-asociados")
    @Timed
    public List<TramiteAsociadoDTO> searchTramiteAsociados(@RequestParam String query) {
        log.debug("REST request to search TramiteAsociados for query {}", query);
        return tramiteAsociadoService.search(query);
    }

}
