package com.debidadefensa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.debidadefensa.service.TipoServicioService;
import com.debidadefensa.web.rest.errors.BadRequestAlertException;
import com.debidadefensa.web.rest.util.HeaderUtil;
import com.debidadefensa.service.dto.TipoServicioDTO;
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
 * REST controller for managing TipoServicio.
 */
@RestController
@RequestMapping("/api")
public class TipoServicioResource {

    private final Logger log = LoggerFactory.getLogger(TipoServicioResource.class);

    private static final String ENTITY_NAME = "tipoServicio";

    private final TipoServicioService tipoServicioService;

    public TipoServicioResource(TipoServicioService tipoServicioService) {
        this.tipoServicioService = tipoServicioService;
    }

    /**
     * POST  /tipo-servicios : Create a new tipoServicio.
     *
     * @param tipoServicioDTO the tipoServicioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoServicioDTO, or with status 400 (Bad Request) if the tipoServicio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-servicios")
    @Timed
    public ResponseEntity<TipoServicioDTO> createTipoServicio(@RequestBody TipoServicioDTO tipoServicioDTO) throws URISyntaxException {
        log.debug("REST request to save TipoServicio : {}", tipoServicioDTO);
        if (tipoServicioDTO.getId() != null) {
            throw new BadRequestAlertException("A new tipoServicio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoServicioDTO result = tipoServicioService.save(tipoServicioDTO);
        return ResponseEntity.created(new URI("/api/tipo-servicios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-servicios : Updates an existing tipoServicio.
     *
     * @param tipoServicioDTO the tipoServicioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoServicioDTO,
     * or with status 400 (Bad Request) if the tipoServicioDTO is not valid,
     * or with status 500 (Internal Server Error) if the tipoServicioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-servicios")
    @Timed
    public ResponseEntity<TipoServicioDTO> updateTipoServicio(@RequestBody TipoServicioDTO tipoServicioDTO) throws URISyntaxException {
        log.debug("REST request to update TipoServicio : {}", tipoServicioDTO);
        if (tipoServicioDTO.getId() == null) {
            return createTipoServicio(tipoServicioDTO);
        }
        TipoServicioDTO result = tipoServicioService.save(tipoServicioDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoServicioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-servicios : get all the tipoServicios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoServicios in body
     */
    @GetMapping("/tipo-servicios")
    @Timed
    public List<TipoServicioDTO> getAllTipoServicios() {
        log.debug("REST request to get all TipoServicios");
        return tipoServicioService.findAll();
        }

    /**
     * GET  /tipo-servicios/:id : get the "id" tipoServicio.
     *
     * @param id the id of the tipoServicioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoServicioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-servicios/{id}")
    @Timed
    public ResponseEntity<TipoServicioDTO> getTipoServicio(@PathVariable Long id) {
        log.debug("REST request to get TipoServicio : {}", id);
        TipoServicioDTO tipoServicioDTO = tipoServicioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tipoServicioDTO));
    }

    /**
     * DELETE  /tipo-servicios/:id : delete the "id" tipoServicio.
     *
     * @param id the id of the tipoServicioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-servicios/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoServicio(@PathVariable Long id) {
        log.debug("REST request to delete TipoServicio : {}", id);
        tipoServicioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tipo-servicios?query=:query : search for the tipoServicio corresponding
     * to the query.
     *
     * @param query the query of the tipoServicio search
     * @return the result of the search
     */
    @GetMapping("/_search/tipo-servicios")
    @Timed
    public List<TipoServicioDTO> searchTipoServicios(@RequestParam String query) {
        log.debug("REST request to search TipoServicios for query {}", query);
        return tipoServicioService.search(query);
    }

}
