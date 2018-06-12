package com.debidadefensa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.debidadefensa.service.TipoParteService;
import com.debidadefensa.web.rest.errors.BadRequestAlertException;
import com.debidadefensa.web.rest.util.HeaderUtil;
import com.debidadefensa.service.dto.TipoParteDTO;
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
 * REST controller for managing TipoParte.
 */
@RestController
@RequestMapping("/api")
public class TipoParteResource {

    private final Logger log = LoggerFactory.getLogger(TipoParteResource.class);

    private static final String ENTITY_NAME = "tipoParte";

    private final TipoParteService tipoParteService;

    public TipoParteResource(TipoParteService tipoParteService) {
        this.tipoParteService = tipoParteService;
    }

    /**
     * POST  /tipo-partes : Create a new tipoParte.
     *
     * @param tipoParteDTO the tipoParteDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoParteDTO, or with status 400 (Bad Request) if the tipoParte has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-partes")
    @Timed
    public ResponseEntity<TipoParteDTO> createTipoParte(@RequestBody TipoParteDTO tipoParteDTO) throws URISyntaxException {
        log.debug("REST request to save TipoParte : {}", tipoParteDTO);
        if (tipoParteDTO.getId() != null) {
            throw new BadRequestAlertException("A new tipoParte cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoParteDTO result = tipoParteService.save(tipoParteDTO);
        return ResponseEntity.created(new URI("/api/tipo-partes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-partes : Updates an existing tipoParte.
     *
     * @param tipoParteDTO the tipoParteDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoParteDTO,
     * or with status 400 (Bad Request) if the tipoParteDTO is not valid,
     * or with status 500 (Internal Server Error) if the tipoParteDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-partes")
    @Timed
    public ResponseEntity<TipoParteDTO> updateTipoParte(@RequestBody TipoParteDTO tipoParteDTO) throws URISyntaxException {
        log.debug("REST request to update TipoParte : {}", tipoParteDTO);
        if (tipoParteDTO.getId() == null) {
            return createTipoParte(tipoParteDTO);
        }
        TipoParteDTO result = tipoParteService.save(tipoParteDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoParteDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-partes : get all the tipoPartes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoPartes in body
     */
    @GetMapping("/tipo-partes")
    @Timed
    public List<TipoParteDTO> getAllTipoPartes() {
        log.debug("REST request to get all TipoPartes");
        return tipoParteService.findAll();
        }

    /**
     * GET  /tipo-partes/:id : get the "id" tipoParte.
     *
     * @param id the id of the tipoParteDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoParteDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-partes/{id}")
    @Timed
    public ResponseEntity<TipoParteDTO> getTipoParte(@PathVariable Long id) {
        log.debug("REST request to get TipoParte : {}", id);
        TipoParteDTO tipoParteDTO = tipoParteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tipoParteDTO));
    }

    /**
     * DELETE  /tipo-partes/:id : delete the "id" tipoParte.
     *
     * @param id the id of the tipoParteDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-partes/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoParte(@PathVariable Long id) {
        log.debug("REST request to delete TipoParte : {}", id);
        tipoParteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tipo-partes?query=:query : search for the tipoParte corresponding
     * to the query.
     *
     * @param query the query of the tipoParte search
     * @return the result of the search
     */
    @GetMapping("/_search/tipo-partes")
    @Timed
    public List<TipoParteDTO> searchTipoPartes(@RequestParam String query) {
        log.debug("REST request to search TipoPartes for query {}", query);
        return tipoParteService.search(query);
    }

}
