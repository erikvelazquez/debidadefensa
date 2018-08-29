package com.debidadefensa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.debidadefensa.service.DocumentosService;
import com.debidadefensa.web.rest.errors.BadRequestAlertException;
import com.debidadefensa.web.rest.util.HeaderUtil;
import com.debidadefensa.service.dto.DocumentosDTO;
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

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.http.MediaType;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Documentos.
 */
@RestController
@RequestMapping("/api")
public class DocumentosResource {

    private final Logger log = LoggerFactory.getLogger(DocumentosResource.class);

    private static final String ENTITY_NAME = "documentos";

    private final DocumentosService documentosService;

    public DocumentosResource(DocumentosService documentosService) {
        this.documentosService = documentosService;
    }


    //@Autowired
    //FileService fileservice;
    // @CrossOrigin(origins = "http://localhost:4200") // Call  from Local Angualar
    @PostMapping("/documentos/upload")
    public ResponseEntity <String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            File convertFile = new File("C:\\archivos\\"+ file.getOriginalFilename());		
            convertFile.createNewFile();		
            FileOutputStream fout = new FileOutputStream(convertFile);		
            fout.write(file.getBytes());		
            fout.close();	
            message = "You successfully uploaded " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message = "Fail to upload Profile Picture" + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }

    /**
     * POST  /documentos : Create a new documentos.
     *
     * @param documentosDTO the documentosDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentosDTO, or with status 400 (Bad Request) if the documentos has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/documentos")
    @Timed
    public ResponseEntity<DocumentosDTO> createDocumentos(@RequestBody DocumentosDTO documentosDTO) throws URISyntaxException {
        log.debug("REST request to save Documentos : {}", documentosDTO);
        if (documentosDTO.getId() != null) {
            throw new BadRequestAlertException("A new documentos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentosDTO result = documentosService.save(documentosDTO);
        return ResponseEntity.created(new URI("/api/documentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /documentos : Updates an existing documentos.
     *
     * @param documentosDTO the documentosDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentosDTO,
     * or with status 400 (Bad Request) if the documentosDTO is not valid,
     * or with status 500 (Internal Server Error) if the documentosDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/documentos")
    @Timed
    public ResponseEntity<DocumentosDTO> updateDocumentos(@RequestBody DocumentosDTO documentosDTO) throws URISyntaxException {
        log.debug("REST request to update Documentos : {}", documentosDTO);
        if (documentosDTO.getId() == null) {
            return createDocumentos(documentosDTO);
        }
        DocumentosDTO result = documentosService.save(documentosDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, documentosDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /documentos : get all the documentos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of documentos in body
     */
    @GetMapping("/documentos")
    @Timed
    public List<DocumentosDTO> getAllDocumentos() {
        log.debug("REST request to get all Documentos");
        return documentosService.findAll();
        }

    /**
     * GET  /documentos/:id : get the "id" documentos.
     *
     * @param id the id of the documentosDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentosDTO, or with status 404 (Not Found)
     */
    @GetMapping("/documentos/{id}")
    @Timed
    public ResponseEntity<DocumentosDTO> getDocumentos(@PathVariable Long id) {
        log.debug("REST request to get Documentos : {}", id);
        DocumentosDTO documentosDTO = documentosService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(documentosDTO));
    }

    /**
     * DELETE  /documentos/:id : delete the "id" documentos.
     *
     * @param id the id of the documentosDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/documentos/{id}")
    @Timed
    public ResponseEntity<Void> deleteDocumentos(@PathVariable Long id) {
        log.debug("REST request to delete Documentos : {}", id);
        documentosService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/documentos?query=:query : search for the documentos corresponding
     * to the query.
     *
     * @param query the query of the documentos search
     * @return the result of the search
     */
    @GetMapping("/_search/documentos")
    @Timed
    public List<DocumentosDTO> searchDocumentos(@RequestParam String query) {
        log.debug("REST request to search Documentos for query {}", query);
        return documentosService.search(query);
    }

    /**
     * GET  /expedientes : get all the expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/documentos/expediente/{id}")
    @Timed
    public ResponseEntity<List<DocumentosDTO>> getAllFechasByExpedienteId(@PathVariable Long id) {
        log.debug("REST request to get a page of Expedientes");
        List<DocumentosDTO> ls = documentosService.findByExpedienteId(id);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
        return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
    }

    /**
     * GET  /expedientes : get all the expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/documentos/migratorio/{id}")
    @Timed
    public ResponseEntity<List<DocumentosDTO>> getAllFechasByMigratoriosId(@PathVariable Long id) {
        log.debug("REST request to get a page of Expedientes");
        List<DocumentosDTO> ls = documentosService.findByMigratorio(id);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
        return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
    }

    /**
     * GET  /expedientes : get all the expedientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expedientes in body
     */
    @GetMapping("/documentos/general/{id}")
    @Timed
    public ResponseEntity<List<DocumentosDTO>> getAllFechasByGeneralesId(@PathVariable Long id) {
        log.debug("REST request to get a page of Expedientes");
        List<DocumentosDTO> ls = documentosService.findByGeneral(id);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(1, "/api/expedientes/user");
        return new ResponseEntity<>(ls, HeaderUtil.createAlert("ok", ""), HttpStatus.OK);     
    }

}
