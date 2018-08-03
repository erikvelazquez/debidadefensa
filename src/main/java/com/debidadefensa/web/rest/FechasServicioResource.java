package com.debidadefensa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.debidadefensa.service.FechasServicioService;
import com.debidadefensa.web.rest.errors.BadRequestAlertException;
import com.debidadefensa.web.rest.util.HeaderUtil;
import com.debidadefensa.service.dto.FechasServicioDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing FechasServicio.
 */
@RestController
@RequestMapping("/api")
public class FechasServicioResource {

    private final Logger log = LoggerFactory.getLogger(FechasServicioResource.class);

    private static final String ENTITY_NAME = "fechasServicio";

    private final FechasServicioService fechasServicioService;

    public FechasServicioResource(FechasServicioService fechasServicioService) {
        this.fechasServicioService = fechasServicioService;
    }

    /**
     * POST  /fechas-servicios : Create a new fechasServicio.
     *
     * @param fechasServicioDTO the fechasServicioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fechasServicioDTO, or with status 400 (Bad Request) if the fechasServicio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fechas-servicios")
    @Timed
    public ResponseEntity<FechasServicioDTO> createFechasServicio(@RequestBody FechasServicioDTO fechasServicioDTO) throws URISyntaxException {
        log.debug("REST request to save FechasServicio : {}", fechasServicioDTO);
        if (fechasServicioDTO.getId() != null) {
            throw new BadRequestAlertException("A new fechasServicio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FechasServicioDTO result = fechasServicioService.save(fechasServicioDTO);
        return ResponseEntity.created(new URI("/api/fechas-servicios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fechas-servicios : Updates an existing fechasServicio.
     *
     * @param fechasServicioDTO the fechasServicioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fechasServicioDTO,
     * or with status 400 (Bad Request) if the fechasServicioDTO is not valid,
     * or with status 500 (Internal Server Error) if the fechasServicioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fechas-servicios")
    @Timed
    public ResponseEntity<FechasServicioDTO> updateFechasServicio(@RequestBody FechasServicioDTO fechasServicioDTO) throws URISyntaxException {
        log.debug("REST request to update FechasServicio : {}", fechasServicioDTO);
        if (fechasServicioDTO.getId() == null) {
            return createFechasServicio(fechasServicioDTO);
        }
        FechasServicioDTO result = fechasServicioService.save(fechasServicioDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fechasServicioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fechas-servicios : get all the fechasServicios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fechasServicios in body
     */
    @GetMapping("/fechas-servicios")
    @Timed
    public List<FechasServicioDTO> getAllFechasServicios() {
        log.debug("REST request to get all FechasServicios");
        return fechasServicioService.findAll();
        }

    /**
     * GET  /fechas-servicios/:id : get the "id" fechasServicio.
     *
     * @param id the id of the fechasServicioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fechasServicioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/fechas-servicios/{id}")
    @Timed
    public ResponseEntity<FechasServicioDTO> getFechasServicio(@PathVariable Long id) {
        log.debug("REST request to get FechasServicio : {}", id);
        FechasServicioDTO fechasServicioDTO = fechasServicioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(fechasServicioDTO));
    }

    /**
     * DELETE  /fechas-servicios/:id : delete the "id" fechasServicio.
     *
     * @param id the id of the fechasServicioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fechas-servicios/{id}")
    @Timed
    public ResponseEntity<Void> deleteFechasServicio(@PathVariable Long id) {
        log.debug("REST request to delete FechasServicio : {}", id);
        fechasServicioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/fechas-servicios?query=:query : search for the fechasServicio corresponding
     * to the query.
     *
     * @param query the query of the fechasServicio search
     * @return the result of the search
     */
    @GetMapping("/_search/fechas-servicios")
    @Timed
    public List<FechasServicioDTO> searchFechasServicios(@RequestParam String query) {
        log.debug("REST request to search FechasServicios for query {}", query);
        return fechasServicioService.search(query);
    }

/**
     * GET  /expedientes : get all the expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/fechas-servicios/expediente/{id}")
    @Timed
    public ResponseEntity<List<FechasServicioDTO>> getAllFechasByExpedienteId(@PathVariable Long id) {
        log.debug("REST request to get a page of Expedientes");
        List<FechasServicioDTO> ls = fechasServicioService.findByExpedienteId(id);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
        return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
    }

    /**
     * GET  /expedientes : get all the expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/fechas-servicios/migratorio/{id}")
    @Timed
    public ResponseEntity<List<FechasServicioDTO>> getAllFechasByMigratoriosId(@PathVariable Long id) {
        log.debug("REST request to get a page of Expedientes");
        List<FechasServicioDTO> ls = fechasServicioService.findByMigratorio(id);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
        return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
    }

    /**
     * GET  /expedientes : get all the expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/fechas-servicios/general/{id}")
    @Timed
    public ResponseEntity<List<FechasServicioDTO>> getAllFechasByGeneralesId(@PathVariable Long id) {
        log.debug("REST request to get a page of Expedientes");
        List<FechasServicioDTO> ls = fechasServicioService.findByGeneral(id);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
        return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
    }



}
