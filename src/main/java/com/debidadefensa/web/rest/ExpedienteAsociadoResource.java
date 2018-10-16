package com.debidadefensa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.debidadefensa.service.ExpedienteAsociadoService;
import com.debidadefensa.web.rest.errors.BadRequestAlertException;
import com.debidadefensa.web.rest.util.HeaderUtil;
import com.debidadefensa.service.dto.ExpedienteAsociadoDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * REST controller for managing ExpedienteAsociado.
 */
@RestController
@RequestMapping("/api")
public class ExpedienteAsociadoResource {

    private final Logger log = LoggerFactory.getLogger(ExpedienteAsociadoResource.class);

    private static final String ENTITY_NAME = "expedienteAsociado";

    private final ExpedienteAsociadoService expedienteAsociadoService;

    public ExpedienteAsociadoResource(ExpedienteAsociadoService expedienteAsociadoService) {
        this.expedienteAsociadoService = expedienteAsociadoService;
    }

    /**
     * POST  /expediente-asociados : Create a new expedienteAsociado.
     *
     * @param expedienteAsociadoDTO the expedienteAsociadoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new expedienteAsociadoDTO, or with status 400 (Bad Request) if the expedienteAsociado has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/expediente-asociados")
    @Timed
    public ResponseEntity<ExpedienteAsociadoDTO> createExpedienteAsociado(@RequestBody ExpedienteAsociadoDTO expedienteAsociadoDTO) throws URISyntaxException {
        log.debug("REST request to save ExpedienteAsociado : {}", expedienteAsociadoDTO);
        if (expedienteAsociadoDTO.getId() != null) {
            throw new BadRequestAlertException("A new expedienteAsociado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExpedienteAsociadoDTO result = expedienteAsociadoService.save(expedienteAsociadoDTO);
        return ResponseEntity.created(new URI("/api/expediente-asociados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /expediente-asociados : Updates an existing expedienteAsociado.
     *
     * @param expedienteAsociadoDTO the expedienteAsociadoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated expedienteAsociadoDTO,
     * or with status 400 (Bad Request) if the expedienteAsociadoDTO is not valid,
     * or with status 500 (Internal Server Error) if the expedienteAsociadoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/expediente-asociados")
    @Timed
    public ResponseEntity<ExpedienteAsociadoDTO> updateExpedienteAsociado(@RequestBody ExpedienteAsociadoDTO expedienteAsociadoDTO) throws URISyntaxException {
        log.debug("REST request to update ExpedienteAsociado : {}", expedienteAsociadoDTO);
        if (expedienteAsociadoDTO.getId() == null) {
            return createExpedienteAsociado(expedienteAsociadoDTO);
        }
        ExpedienteAsociadoDTO result = expedienteAsociadoService.save(expedienteAsociadoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, expedienteAsociadoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /expediente-asociados : get all the expedienteAsociados.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of expedienteAsociados in body
     */
    @GetMapping("/expediente-asociados")
    @Timed
    public List<ExpedienteAsociadoDTO> getAllExpedienteAsociados() {
        log.debug("REST request to get all ExpedienteAsociados");
        return expedienteAsociadoService.findAll();
        }

    /**
     * GET  /expediente-asociados/:id : get the "id" expedienteAsociado.
     *
     * @param id the id of the expedienteAsociadoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the expedienteAsociadoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/expediente-asociados/{id}")
    @Timed
    public ResponseEntity<ExpedienteAsociadoDTO> getExpedienteAsociado(@PathVariable Long id) {
        log.debug("REST request to get ExpedienteAsociado : {}", id);
        ExpedienteAsociadoDTO expedienteAsociadoDTO = expedienteAsociadoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(expedienteAsociadoDTO));
    }

    /**
     * DELETE  /expediente-asociados/:id : delete the "id" expedienteAsociado.
     *
     * @param id the id of the expedienteAsociadoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/expediente-asociados/{id}")
    @Timed
    public ResponseEntity<Void> deleteExpedienteAsociado(@PathVariable Long id) {
        log.debug("REST request to delete ExpedienteAsociado : {}", id);
        expedienteAsociadoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/expediente-asociados?query=:query : search for the expedienteAsociado corresponding
     * to the query.
     *
     * @param query the query of the expedienteAsociado search
     * @return the result of the search
     */
    @GetMapping("/_search/expediente-asociados")
    @Timed
    public List<ExpedienteAsociadoDTO> searchExpedienteAsociados(@RequestParam String query) {
        log.debug("REST request to search ExpedienteAsociados for query {}", query);
        return expedienteAsociadoService.search(query);
    }


    /**
     * GET  /expedientes : get all by expedientes id.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/expediente-asociados/expediente/{id}")
    @Timed
    public List<ExpedienteAsociadoDTO> getAllCostosGeneralById(@PathVariable Long id) {
        log.debug("REST request to get a page of Expedientes");
        List<ExpedienteAsociadoDTO> ls = expedienteAsociadoService.findByExpediente_id(id);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
        // return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
        return ls;
    }

}
