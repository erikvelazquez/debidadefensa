package com.debidadefensa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.debidadefensa.service.PagosService;
import com.debidadefensa.web.rest.errors.BadRequestAlertException;
import com.debidadefensa.web.rest.util.HeaderUtil;
import com.debidadefensa.service.dto.PagosDTO;
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
 * REST controller for managing Pagos.
 */
@RestController
@RequestMapping("/api")
public class PagosResource {

    private final Logger log = LoggerFactory.getLogger(PagosResource.class);

    private static final String ENTITY_NAME = "pagos";

    private final PagosService pagosService;

    public PagosResource(PagosService pagosService) {
        this.pagosService = pagosService;
    }

    /**
     * POST  /pagos : Create a new pagos.
     *
     * @param pagosDTO the pagosDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pagosDTO, or with status 400 (Bad Request) if the pagos has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pagos")
    @Timed
    public ResponseEntity<PagosDTO> createPagos(@RequestBody PagosDTO pagosDTO) throws URISyntaxException {
        log.debug("REST request to save Pagos : {}", pagosDTO);
        if (pagosDTO.getId() != null) {
            throw new BadRequestAlertException("A new pagos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PagosDTO result = pagosService.save(pagosDTO);
        return ResponseEntity.created(new URI("/api/pagos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pagos : Updates an existing pagos.
     *
     * @param pagosDTO the pagosDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pagosDTO,
     * or with status 400 (Bad Request) if the pagosDTO is not valid,
     * or with status 500 (Internal Server Error) if the pagosDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pagos")
    @Timed
    public ResponseEntity<PagosDTO> updatePagos(@RequestBody PagosDTO pagosDTO) throws URISyntaxException {
        log.debug("REST request to update Pagos : {}", pagosDTO);
        if (pagosDTO.getId() == null) {
            return createPagos(pagosDTO);
        }
        PagosDTO result = pagosService.save(pagosDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pagosDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pagos : get all the pagos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pagos in body
     */
    @GetMapping("/pagos")
    @Timed
    public List<PagosDTO> getAllPagos() {
        log.debug("REST request to get all Pagos");
        return pagosService.findAll();
        }

    /**
     * GET  /pagos/:id : get the "id" pagos.
     *
     * @param id the id of the pagosDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pagosDTO, or with status 404 (Not Found)
     */
    @GetMapping("/pagos/{id}")
    @Timed
    public ResponseEntity<PagosDTO> getPagos(@PathVariable Long id) {
        log.debug("REST request to get Pagos : {}", id);
        PagosDTO pagosDTO = pagosService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pagosDTO));
    }

    /**
     * DELETE  /pagos/:id : delete the "id" pagos.
     *
     * @param id the id of the pagosDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pagos/{id}")
    @Timed
    public ResponseEntity<Void> deletePagos(@PathVariable Long id) {
        log.debug("REST request to delete Pagos : {}", id);
        pagosService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/pagos?query=:query : search for the pagos corresponding
     * to the query.
     *
     * @param query the query of the pagos search
     * @return the result of the search
     */
    @GetMapping("/_search/pagos")
    @Timed
    public List<PagosDTO> searchPagos(@RequestParam String query) {
        log.debug("REST request to search Pagos for query {}", query);
        return pagosService.search(query);
    }

}
