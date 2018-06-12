package com.debidadefensa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.debidadefensa.service.ParteService;
import com.debidadefensa.web.rest.errors.BadRequestAlertException;
import com.debidadefensa.web.rest.util.HeaderUtil;
import com.debidadefensa.service.dto.ParteDTO;
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
 * REST controller for managing Parte.
 */
@RestController
@RequestMapping("/api")
public class ParteResource {

    private final Logger log = LoggerFactory.getLogger(ParteResource.class);

    private static final String ENTITY_NAME = "parte";

    private final ParteService parteService;

    public ParteResource(ParteService parteService) {
        this.parteService = parteService;
    }

    /**
     * POST  /partes : Create a new parte.
     *
     * @param parteDTO the parteDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parteDTO, or with status 400 (Bad Request) if the parte has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/partes")
    @Timed
    public ResponseEntity<ParteDTO> createParte(@RequestBody ParteDTO parteDTO) throws URISyntaxException {
        log.debug("REST request to save Parte : {}", parteDTO);
        if (parteDTO.getId() != null) {
            throw new BadRequestAlertException("A new parte cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParteDTO result = parteService.save(parteDTO);
        return ResponseEntity.created(new URI("/api/partes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /partes : Updates an existing parte.
     *
     * @param parteDTO the parteDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parteDTO,
     * or with status 400 (Bad Request) if the parteDTO is not valid,
     * or with status 500 (Internal Server Error) if the parteDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/partes")
    @Timed
    public ResponseEntity<ParteDTO> updateParte(@RequestBody ParteDTO parteDTO) throws URISyntaxException {
        log.debug("REST request to update Parte : {}", parteDTO);
        if (parteDTO.getId() == null) {
            return createParte(parteDTO);
        }
        ParteDTO result = parteService.save(parteDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parteDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /partes : get all the partes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of partes in body
     */
    @GetMapping("/partes")
    @Timed
    public List<ParteDTO> getAllPartes() {
        log.debug("REST request to get all Partes");
        return parteService.findAll();
        }

    /**
     * GET  /partes/:id : get the "id" parte.
     *
     * @param id the id of the parteDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the parteDTO, or with status 404 (Not Found)
     */
    @GetMapping("/partes/{id}")
    @Timed
    public ResponseEntity<ParteDTO> getParte(@PathVariable Long id) {
        log.debug("REST request to get Parte : {}", id);
        ParteDTO parteDTO = parteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(parteDTO));
    }

    /**
     * DELETE  /partes/:id : delete the "id" parte.
     *
     * @param id the id of the parteDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/partes/{id}")
    @Timed
    public ResponseEntity<Void> deleteParte(@PathVariable Long id) {
        log.debug("REST request to delete Parte : {}", id);
        parteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/partes?query=:query : search for the parte corresponding
     * to the query.
     *
     * @param query the query of the parte search
     * @return the result of the search
     */
    @GetMapping("/_search/partes")
    @Timed
    public List<ParteDTO> searchPartes(@RequestParam String query) {
        log.debug("REST request to search Partes for query {}", query);
        return parteService.search(query);
    }

}
