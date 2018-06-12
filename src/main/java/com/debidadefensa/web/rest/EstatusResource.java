package com.debidadefensa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.debidadefensa.service.EstatusService;
import com.debidadefensa.web.rest.errors.BadRequestAlertException;
import com.debidadefensa.web.rest.util.HeaderUtil;
import com.debidadefensa.service.dto.EstatusDTO;
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
 * REST controller for managing Estatus.
 */
@RestController
@RequestMapping("/api")
public class EstatusResource {

    private final Logger log = LoggerFactory.getLogger(EstatusResource.class);

    private static final String ENTITY_NAME = "estatus";

    private final EstatusService estatusService;

    public EstatusResource(EstatusService estatusService) {
        this.estatusService = estatusService;
    }

    /**
     * POST  /estatuses : Create a new estatus.
     *
     * @param estatusDTO the estatusDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new estatusDTO, or with status 400 (Bad Request) if the estatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/estatuses")
    @Timed
    public ResponseEntity<EstatusDTO> createEstatus(@RequestBody EstatusDTO estatusDTO) throws URISyntaxException {
        log.debug("REST request to save Estatus : {}", estatusDTO);
        if (estatusDTO.getId() != null) {
            throw new BadRequestAlertException("A new estatus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstatusDTO result = estatusService.save(estatusDTO);
        return ResponseEntity.created(new URI("/api/estatuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /estatuses : Updates an existing estatus.
     *
     * @param estatusDTO the estatusDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated estatusDTO,
     * or with status 400 (Bad Request) if the estatusDTO is not valid,
     * or with status 500 (Internal Server Error) if the estatusDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/estatuses")
    @Timed
    public ResponseEntity<EstatusDTO> updateEstatus(@RequestBody EstatusDTO estatusDTO) throws URISyntaxException {
        log.debug("REST request to update Estatus : {}", estatusDTO);
        if (estatusDTO.getId() == null) {
            return createEstatus(estatusDTO);
        }
        EstatusDTO result = estatusService.save(estatusDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, estatusDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /estatuses : get all the estatuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of estatuses in body
     */
    @GetMapping("/estatuses")
    @Timed
    public List<EstatusDTO> getAllEstatuses() {
        log.debug("REST request to get all Estatuses");
        return estatusService.findAll();
        }

    /**
     * GET  /estatuses/:id : get the "id" estatus.
     *
     * @param id the id of the estatusDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the estatusDTO, or with status 404 (Not Found)
     */
    @GetMapping("/estatuses/{id}")
    @Timed
    public ResponseEntity<EstatusDTO> getEstatus(@PathVariable Long id) {
        log.debug("REST request to get Estatus : {}", id);
        EstatusDTO estatusDTO = estatusService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(estatusDTO));
    }

    /**
     * DELETE  /estatuses/:id : delete the "id" estatus.
     *
     * @param id the id of the estatusDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/estatuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteEstatus(@PathVariable Long id) {
        log.debug("REST request to delete Estatus : {}", id);
        estatusService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/estatuses?query=:query : search for the estatus corresponding
     * to the query.
     *
     * @param query the query of the estatus search
     * @return the result of the search
     */
    @GetMapping("/_search/estatuses")
    @Timed
    public List<EstatusDTO> searchEstatuses(@RequestParam String query) {
        log.debug("REST request to search Estatuses for query {}", query);
        return estatusService.search(query);
    }

}
