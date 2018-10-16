package com.debidadefensa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.debidadefensa.service.CostoServicioService;
import com.debidadefensa.web.rest.errors.BadRequestAlertException;
import com.debidadefensa.web.rest.util.HeaderUtil;
import com.debidadefensa.service.dto.CostoServicioDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing CostoServicio.
 */
@RestController
@RequestMapping("/api")
public class CostoServicioResource {

    private final Logger log = LoggerFactory.getLogger(CostoServicioResource.class);

    private static final String ENTITY_NAME = "costoServicio";

    private final CostoServicioService costoServicioService;

    public CostoServicioResource(CostoServicioService costoServicioService) {
        this.costoServicioService = costoServicioService;
    }

    /**
     * POST  /costo-servicios : Create a new costoServicio.
     *
     * @param costoServicioDTO the costoServicioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new costoServicioDTO, or with status 400 (Bad Request) if the costoServicio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/costo-servicios")
    @Timed
    public ResponseEntity<CostoServicioDTO> createCostoServicio(@RequestBody CostoServicioDTO costoServicioDTO) throws URISyntaxException {
        log.debug("REST request to save CostoServicio : {}", costoServicioDTO);
        if (costoServicioDTO.getId() != null) {
            throw new BadRequestAlertException("A new costoServicio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CostoServicioDTO result = costoServicioService.save(costoServicioDTO);
        return ResponseEntity.created(new URI("/api/costo-servicios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /costo-servicios : Updates an existing costoServicio.
     *
     * @param costoServicioDTO the costoServicioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated costoServicioDTO,
     * or with status 400 (Bad Request) if the costoServicioDTO is not valid,
     * or with status 500 (Internal Server Error) if the costoServicioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/costo-servicios")
    @Timed
    public ResponseEntity<CostoServicioDTO> updateCostoServicio(@RequestBody CostoServicioDTO costoServicioDTO) throws URISyntaxException {
        log.debug("REST request to update CostoServicio : {}", costoServicioDTO);
        if (costoServicioDTO.getId() == null) {
            return createCostoServicio(costoServicioDTO);
        }
        CostoServicioDTO result = costoServicioService.save(costoServicioDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, costoServicioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /costo-servicios : get all the costoServicios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of costoServicios in body
     */
    @GetMapping("/costo-servicios")
    @Timed
    public List<CostoServicioDTO> getAllCostoServicios() {
        log.debug("REST request to get all CostoServicios");
        return costoServicioService.findAll();
        }

    /**
     * GET  /costo-servicios/:id : get the "id" costoServicio.
     *
     * @param id the id of the costoServicioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the costoServicioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/costo-servicios/{id}")
    @Timed
    public ResponseEntity<CostoServicioDTO> getCostoServicio(@PathVariable Long id) {
        log.debug("REST request to get CostoServicio : {}", id);
        CostoServicioDTO costoServicioDTO = costoServicioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(costoServicioDTO));
    }

    /**
     * DELETE  /costo-servicios/:id : delete the "id" costoServicio.
     *
     * @param id the id of the costoServicioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/costo-servicios/{id}")
    @Timed
    public ResponseEntity<Void> deleteCostoServicio(@PathVariable Long id) {
        log.debug("REST request to delete CostoServicio : {}", id);
        costoServicioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/costo-servicios?query=:query : search for the costoServicio corresponding
     * to the query.
     *
     * @param query the query of the costoServicio search
     * @return the result of the search
     */
    @GetMapping("/_search/costo-servicios")
    @Timed
    public List<CostoServicioDTO> searchCostoServicios(@RequestParam String query) {
        log.debug("REST request to search CostoServicios for query {}", query);
        return costoServicioService.search(query);
    }

/**
     * GET  /expedientes : get all by expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/costo-servicios/expediente/{id}")
    @Timed
    public List<CostoServicioDTO> getAllCostosByExpedienteId(@PathVariable Long id) {
        log.debug("REST request to get a page of Expedientes");
        List<CostoServicioDTO> ls = costoServicioService.findByExpediente_id(id);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
       // return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
       return ls;
    }

    /**
     * GET  /expedientes : get all by expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/costo-servicios/migratorio/{id}")
    @Timed
    public List<CostoServicioDTO> getAllCostosMigratorioById(@PathVariable Long id) {
        log.debug("REST request to get a page of Expedientes");
        List<CostoServicioDTO> ls = costoServicioService.findByTramite_migratorio_id(id);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
       //  return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
       return ls;
    }

    /**
     * GET  /expedientes : get all by expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/costo-servicios/general/{id}")
    @Timed
    public List<CostoServicioDTO> getAllCostosGeneralById(@PathVariable Long id) {
        log.debug("REST request to get a page of Expedientes");
        List<CostoServicioDTO> ls = costoServicioService.findByTramite_general_id(id);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
        // return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
        return ls;
    }
}
