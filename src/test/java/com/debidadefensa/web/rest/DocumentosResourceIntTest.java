package com.debidadefensa.web.rest;

import com.debidadefensa.DebidadefensaApp;

import com.debidadefensa.domain.Documentos;
import com.debidadefensa.repository.DocumentosRepository;
import com.debidadefensa.service.DocumentosService;
import com.debidadefensa.repository.search.DocumentosSearchRepository;
import com.debidadefensa.service.dto.DocumentosDTO;
import com.debidadefensa.service.mapper.DocumentosMapper;
import com.debidadefensa.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.debidadefensa.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DocumentosResource REST controller.
 *
 * @see DocumentosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DebidadefensaApp.class)
public class DocumentosResourceIntTest {

    private static final String DEFAULT_NOMBRE_DOCUMENTO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_DOCUMENTO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_RUTA = "AAAAAAAAAA";
    private static final String UPDATED_RUTA = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    @Autowired
    private DocumentosRepository documentosRepository;

    @Autowired
    private DocumentosMapper documentosMapper;

    @Autowired
    private DocumentosService documentosService;

    @Autowired
    private DocumentosSearchRepository documentosSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDocumentosMockMvc;

    private Documentos documentos;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentosResource documentosResource = new DocumentosResource(documentosService);
        this.restDocumentosMockMvc = MockMvcBuilders.standaloneSetup(documentosResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Documentos createEntity(EntityManager em) {
        Documentos documentos = new Documentos()
            .nombreDocumento(DEFAULT_NOMBRE_DOCUMENTO)
            .fecha(DEFAULT_FECHA)
            .descripcion(DEFAULT_DESCRIPCION)
            .ruta(DEFAULT_RUTA)
            .observaciones(DEFAULT_OBSERVACIONES);
        return documentos;
    }

    @Before
    public void initTest() {
        documentosSearchRepository.deleteAll();
        documentos = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentos() throws Exception {
        int databaseSizeBeforeCreate = documentosRepository.findAll().size();

        // Create the Documentos
        DocumentosDTO documentosDTO = documentosMapper.toDto(documentos);
        restDocumentosMockMvc.perform(post("/api/documentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentosDTO)))
            .andExpect(status().isCreated());

        // Validate the Documentos in the database
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeCreate + 1);
        Documentos testDocumentos = documentosList.get(documentosList.size() - 1);
        assertThat(testDocumentos.getNombreDocumento()).isEqualTo(DEFAULT_NOMBRE_DOCUMENTO);
        assertThat(testDocumentos.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testDocumentos.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testDocumentos.getRuta()).isEqualTo(DEFAULT_RUTA);
        assertThat(testDocumentos.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);

        // Validate the Documentos in Elasticsearch
        Documentos documentosEs = documentosSearchRepository.findOne(testDocumentos.getId());
        assertThat(documentosEs).isEqualToIgnoringGivenFields(testDocumentos);
    }

    @Test
    @Transactional
    public void createDocumentosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentosRepository.findAll().size();

        // Create the Documentos with an existing ID
        documentos.setId(1L);
        DocumentosDTO documentosDTO = documentosMapper.toDto(documentos);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentosMockMvc.perform(post("/api/documentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentosDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Documentos in the database
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDocumentos() throws Exception {
        // Initialize the database
        documentosRepository.saveAndFlush(documentos);

        // Get all the documentosList
        restDocumentosMockMvc.perform(get("/api/documentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreDocumento").value(hasItem(DEFAULT_NOMBRE_DOCUMENTO.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].ruta").value(hasItem(DEFAULT_RUTA.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }

    @Test
    @Transactional
    public void getDocumentos() throws Exception {
        // Initialize the database
        documentosRepository.saveAndFlush(documentos);

        // Get the documentos
        restDocumentosMockMvc.perform(get("/api/documentos/{id}", documentos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentos.getId().intValue()))
            .andExpect(jsonPath("$.nombreDocumento").value(DEFAULT_NOMBRE_DOCUMENTO.toString()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.ruta").value(DEFAULT_RUTA.toString()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentos() throws Exception {
        // Get the documentos
        restDocumentosMockMvc.perform(get("/api/documentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentos() throws Exception {
        // Initialize the database
        documentosRepository.saveAndFlush(documentos);
        documentosSearchRepository.save(documentos);
        int databaseSizeBeforeUpdate = documentosRepository.findAll().size();

        // Update the documentos
        Documentos updatedDocumentos = documentosRepository.findOne(documentos.getId());
        // Disconnect from session so that the updates on updatedDocumentos are not directly saved in db
        em.detach(updatedDocumentos);
        updatedDocumentos
            .nombreDocumento(UPDATED_NOMBRE_DOCUMENTO)
            .fecha(UPDATED_FECHA)
            .descripcion(UPDATED_DESCRIPCION)
            .ruta(UPDATED_RUTA)
            .observaciones(UPDATED_OBSERVACIONES);
        DocumentosDTO documentosDTO = documentosMapper.toDto(updatedDocumentos);

        restDocumentosMockMvc.perform(put("/api/documentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentosDTO)))
            .andExpect(status().isOk());

        // Validate the Documentos in the database
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeUpdate);
        Documentos testDocumentos = documentosList.get(documentosList.size() - 1);
        assertThat(testDocumentos.getNombreDocumento()).isEqualTo(UPDATED_NOMBRE_DOCUMENTO);
        assertThat(testDocumentos.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testDocumentos.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testDocumentos.getRuta()).isEqualTo(UPDATED_RUTA);
        assertThat(testDocumentos.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);

        // Validate the Documentos in Elasticsearch
        Documentos documentosEs = documentosSearchRepository.findOne(testDocumentos.getId());
        assertThat(documentosEs).isEqualToIgnoringGivenFields(testDocumentos);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentos() throws Exception {
        int databaseSizeBeforeUpdate = documentosRepository.findAll().size();

        // Create the Documentos
        DocumentosDTO documentosDTO = documentosMapper.toDto(documentos);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDocumentosMockMvc.perform(put("/api/documentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentosDTO)))
            .andExpect(status().isCreated());

        // Validate the Documentos in the database
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDocumentos() throws Exception {
        // Initialize the database
        documentosRepository.saveAndFlush(documentos);
        documentosSearchRepository.save(documentos);
        int databaseSizeBeforeDelete = documentosRepository.findAll().size();

        // Get the documentos
        restDocumentosMockMvc.perform(delete("/api/documentos/{id}", documentos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean documentosExistsInEs = documentosSearchRepository.exists(documentos.getId());
        assertThat(documentosExistsInEs).isFalse();

        // Validate the database is empty
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchDocumentos() throws Exception {
        // Initialize the database
        documentosRepository.saveAndFlush(documentos);
        documentosSearchRepository.save(documentos);

        // Search the documentos
        restDocumentosMockMvc.perform(get("/api/_search/documentos?query=id:" + documentos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreDocumento").value(hasItem(DEFAULT_NOMBRE_DOCUMENTO.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].ruta").value(hasItem(DEFAULT_RUTA.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Documentos.class);
        Documentos documentos1 = new Documentos();
        documentos1.setId(1L);
        Documentos documentos2 = new Documentos();
        documentos2.setId(documentos1.getId());
        assertThat(documentos1).isEqualTo(documentos2);
        documentos2.setId(2L);
        assertThat(documentos1).isNotEqualTo(documentos2);
        documentos1.setId(null);
        assertThat(documentos1).isNotEqualTo(documentos2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentosDTO.class);
        DocumentosDTO documentosDTO1 = new DocumentosDTO();
        documentosDTO1.setId(1L);
        DocumentosDTO documentosDTO2 = new DocumentosDTO();
        assertThat(documentosDTO1).isNotEqualTo(documentosDTO2);
        documentosDTO2.setId(documentosDTO1.getId());
        assertThat(documentosDTO1).isEqualTo(documentosDTO2);
        documentosDTO2.setId(2L);
        assertThat(documentosDTO1).isNotEqualTo(documentosDTO2);
        documentosDTO1.setId(null);
        assertThat(documentosDTO1).isNotEqualTo(documentosDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(documentosMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(documentosMapper.fromId(null)).isNull();
    }
}
