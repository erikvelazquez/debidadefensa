package com.debidadefensa.web.rest;

import com.debidadefensa.DebidadefensaApp;

import com.debidadefensa.domain.TramiteGeneral;
import com.debidadefensa.repository.TramiteGeneralRepository;
import com.debidadefensa.service.TramiteGeneralService;
import com.debidadefensa.repository.search.TramiteGeneralSearchRepository;
import com.debidadefensa.service.dto.TramiteGeneralDTO;
import com.debidadefensa.service.mapper.TramiteGeneralMapper;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.debidadefensa.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TramiteGeneralResource REST controller.
 *
 * @see TramiteGeneralResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DebidadefensaApp.class)
public class TramiteGeneralResourceIntTest {

    private static final String DEFAULT_TITULAR = "AAAAAAAAAA";
    private static final String UPDATED_TITULAR = "BBBBBBBBBB";

    private static final String DEFAULT_DEPENDENCIA = "AAAAAAAAAA";
    private static final String UPDATED_DEPENDENCIA = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_TRAMITE = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_TRAMITE = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO_TRAMITE = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_TRAMITE = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA_INGRESO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_INGRESO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FECHA_RESOLUCION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_RESOLUCION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FECHA_NOTIFICACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_NOTIFICACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ARCHIVO = "AAAAAAAAAA";
    private static final String UPDATED_ARCHIVO = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    @Autowired
    private TramiteGeneralRepository tramiteGeneralRepository;

    @Autowired
    private TramiteGeneralMapper tramiteGeneralMapper;

    @Autowired
    private TramiteGeneralService tramiteGeneralService;

    @Autowired
    private TramiteGeneralSearchRepository tramiteGeneralSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTramiteGeneralMockMvc;

    private TramiteGeneral tramiteGeneral;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TramiteGeneralResource tramiteGeneralResource = new TramiteGeneralResource(tramiteGeneralService);
        this.restTramiteGeneralMockMvc = MockMvcBuilders.standaloneSetup(tramiteGeneralResource)
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
    public static TramiteGeneral createEntity(EntityManager em) {
        TramiteGeneral tramiteGeneral = new TramiteGeneral()
            .titular(DEFAULT_TITULAR)
            .dependencia(DEFAULT_DEPENDENCIA)
            .numeroTramite(DEFAULT_NUMERO_TRAMITE)
            .tipoTramite(DEFAULT_TIPO_TRAMITE)
            .fechaIngreso(DEFAULT_FECHA_INGRESO)
            .fechaResolucion(DEFAULT_FECHA_RESOLUCION)
            .fechaNotificacion(DEFAULT_FECHA_NOTIFICACION)
            .archivo(DEFAULT_ARCHIVO)
            .observaciones(DEFAULT_OBSERVACIONES);
        return tramiteGeneral;
    }

    @Before
    public void initTest() {
        tramiteGeneralSearchRepository.deleteAll();
        tramiteGeneral = createEntity(em);
    }

    @Test
    @Transactional
    public void createTramiteGeneral() throws Exception {
        int databaseSizeBeforeCreate = tramiteGeneralRepository.findAll().size();

        // Create the TramiteGeneral
        TramiteGeneralDTO tramiteGeneralDTO = tramiteGeneralMapper.toDto(tramiteGeneral);
        restTramiteGeneralMockMvc.perform(post("/api/tramite-generals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tramiteGeneralDTO)))
            .andExpect(status().isCreated());

        // Validate the TramiteGeneral in the database
        List<TramiteGeneral> tramiteGeneralList = tramiteGeneralRepository.findAll();
        assertThat(tramiteGeneralList).hasSize(databaseSizeBeforeCreate + 1);
        TramiteGeneral testTramiteGeneral = tramiteGeneralList.get(tramiteGeneralList.size() - 1);
        assertThat(testTramiteGeneral.getTitular()).isEqualTo(DEFAULT_TITULAR);
        assertThat(testTramiteGeneral.getDependencia()).isEqualTo(DEFAULT_DEPENDENCIA);
        assertThat(testTramiteGeneral.getNumeroTramite()).isEqualTo(DEFAULT_NUMERO_TRAMITE);
        assertThat(testTramiteGeneral.getTipoTramite()).isEqualTo(DEFAULT_TIPO_TRAMITE);
        assertThat(testTramiteGeneral.getFechaIngreso()).isEqualTo(DEFAULT_FECHA_INGRESO);
        assertThat(testTramiteGeneral.getFechaResolucion()).isEqualTo(DEFAULT_FECHA_RESOLUCION);
        assertThat(testTramiteGeneral.getFechaNotificacion()).isEqualTo(DEFAULT_FECHA_NOTIFICACION);
        assertThat(testTramiteGeneral.getArchivo()).isEqualTo(DEFAULT_ARCHIVO);
        assertThat(testTramiteGeneral.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);

        // Validate the TramiteGeneral in Elasticsearch
        TramiteGeneral tramiteGeneralEs = tramiteGeneralSearchRepository.findOne(testTramiteGeneral.getId());
        assertThat(tramiteGeneralEs).isEqualToIgnoringGivenFields(testTramiteGeneral);
    }

    @Test
    @Transactional
    public void createTramiteGeneralWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tramiteGeneralRepository.findAll().size();

        // Create the TramiteGeneral with an existing ID
        tramiteGeneral.setId(1L);
        TramiteGeneralDTO tramiteGeneralDTO = tramiteGeneralMapper.toDto(tramiteGeneral);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTramiteGeneralMockMvc.perform(post("/api/tramite-generals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tramiteGeneralDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TramiteGeneral in the database
        List<TramiteGeneral> tramiteGeneralList = tramiteGeneralRepository.findAll();
        assertThat(tramiteGeneralList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTramiteGenerals() throws Exception {
        // Initialize the database
        tramiteGeneralRepository.saveAndFlush(tramiteGeneral);

        // Get all the tramiteGeneralList
        restTramiteGeneralMockMvc.perform(get("/api/tramite-generals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tramiteGeneral.getId().intValue())))
            .andExpect(jsonPath("$.[*].titular").value(hasItem(DEFAULT_TITULAR.toString())))
            .andExpect(jsonPath("$.[*].dependencia").value(hasItem(DEFAULT_DEPENDENCIA.toString())))
            .andExpect(jsonPath("$.[*].numeroTramite").value(hasItem(DEFAULT_NUMERO_TRAMITE.toString())))
            .andExpect(jsonPath("$.[*].tipoTramite").value(hasItem(DEFAULT_TIPO_TRAMITE.toString())))
            .andExpect(jsonPath("$.[*].fechaIngreso").value(hasItem(DEFAULT_FECHA_INGRESO.toString())))
            .andExpect(jsonPath("$.[*].fechaResolucion").value(hasItem(DEFAULT_FECHA_RESOLUCION.toString())))
            .andExpect(jsonPath("$.[*].fechaNotificacion").value(hasItem(DEFAULT_FECHA_NOTIFICACION.toString())))
            .andExpect(jsonPath("$.[*].archivo").value(hasItem(DEFAULT_ARCHIVO.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }

    @Test
    @Transactional
    public void getTramiteGeneral() throws Exception {
        // Initialize the database
        tramiteGeneralRepository.saveAndFlush(tramiteGeneral);

        // Get the tramiteGeneral
        restTramiteGeneralMockMvc.perform(get("/api/tramite-generals/{id}", tramiteGeneral.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tramiteGeneral.getId().intValue()))
            .andExpect(jsonPath("$.titular").value(DEFAULT_TITULAR.toString()))
            .andExpect(jsonPath("$.dependencia").value(DEFAULT_DEPENDENCIA.toString()))
            .andExpect(jsonPath("$.numeroTramite").value(DEFAULT_NUMERO_TRAMITE.toString()))
            .andExpect(jsonPath("$.tipoTramite").value(DEFAULT_TIPO_TRAMITE.toString()))
            .andExpect(jsonPath("$.fechaIngreso").value(DEFAULT_FECHA_INGRESO.toString()))
            .andExpect(jsonPath("$.fechaResolucion").value(DEFAULT_FECHA_RESOLUCION.toString()))
            .andExpect(jsonPath("$.fechaNotificacion").value(DEFAULT_FECHA_NOTIFICACION.toString()))
            .andExpect(jsonPath("$.archivo").value(DEFAULT_ARCHIVO.toString()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTramiteGeneral() throws Exception {
        // Get the tramiteGeneral
        restTramiteGeneralMockMvc.perform(get("/api/tramite-generals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTramiteGeneral() throws Exception {
        // Initialize the database
        tramiteGeneralRepository.saveAndFlush(tramiteGeneral);
        tramiteGeneralSearchRepository.save(tramiteGeneral);
        int databaseSizeBeforeUpdate = tramiteGeneralRepository.findAll().size();

        // Update the tramiteGeneral
        TramiteGeneral updatedTramiteGeneral = tramiteGeneralRepository.findOne(tramiteGeneral.getId());
        // Disconnect from session so that the updates on updatedTramiteGeneral are not directly saved in db
        em.detach(updatedTramiteGeneral);
        updatedTramiteGeneral
            .titular(UPDATED_TITULAR)
            .dependencia(UPDATED_DEPENDENCIA)
            .numeroTramite(UPDATED_NUMERO_TRAMITE)
            .tipoTramite(UPDATED_TIPO_TRAMITE)
            .fechaIngreso(UPDATED_FECHA_INGRESO)
            .fechaResolucion(UPDATED_FECHA_RESOLUCION)
            .fechaNotificacion(UPDATED_FECHA_NOTIFICACION)
            .archivo(UPDATED_ARCHIVO)
            .observaciones(UPDATED_OBSERVACIONES);
        TramiteGeneralDTO tramiteGeneralDTO = tramiteGeneralMapper.toDto(updatedTramiteGeneral);

        restTramiteGeneralMockMvc.perform(put("/api/tramite-generals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tramiteGeneralDTO)))
            .andExpect(status().isOk());

        // Validate the TramiteGeneral in the database
        List<TramiteGeneral> tramiteGeneralList = tramiteGeneralRepository.findAll();
        assertThat(tramiteGeneralList).hasSize(databaseSizeBeforeUpdate);
        TramiteGeneral testTramiteGeneral = tramiteGeneralList.get(tramiteGeneralList.size() - 1);
        assertThat(testTramiteGeneral.getTitular()).isEqualTo(UPDATED_TITULAR);
        assertThat(testTramiteGeneral.getDependencia()).isEqualTo(UPDATED_DEPENDENCIA);
        assertThat(testTramiteGeneral.getNumeroTramite()).isEqualTo(UPDATED_NUMERO_TRAMITE);
        assertThat(testTramiteGeneral.getTipoTramite()).isEqualTo(UPDATED_TIPO_TRAMITE);
        assertThat(testTramiteGeneral.getFechaIngreso()).isEqualTo(UPDATED_FECHA_INGRESO);
        assertThat(testTramiteGeneral.getFechaResolucion()).isEqualTo(UPDATED_FECHA_RESOLUCION);
        assertThat(testTramiteGeneral.getFechaNotificacion()).isEqualTo(UPDATED_FECHA_NOTIFICACION);
        assertThat(testTramiteGeneral.getArchivo()).isEqualTo(UPDATED_ARCHIVO);
        assertThat(testTramiteGeneral.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);

        // Validate the TramiteGeneral in Elasticsearch
        TramiteGeneral tramiteGeneralEs = tramiteGeneralSearchRepository.findOne(testTramiteGeneral.getId());
        assertThat(tramiteGeneralEs).isEqualToIgnoringGivenFields(testTramiteGeneral);
    }

    @Test
    @Transactional
    public void updateNonExistingTramiteGeneral() throws Exception {
        int databaseSizeBeforeUpdate = tramiteGeneralRepository.findAll().size();

        // Create the TramiteGeneral
        TramiteGeneralDTO tramiteGeneralDTO = tramiteGeneralMapper.toDto(tramiteGeneral);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTramiteGeneralMockMvc.perform(put("/api/tramite-generals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tramiteGeneralDTO)))
            .andExpect(status().isCreated());

        // Validate the TramiteGeneral in the database
        List<TramiteGeneral> tramiteGeneralList = tramiteGeneralRepository.findAll();
        assertThat(tramiteGeneralList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTramiteGeneral() throws Exception {
        // Initialize the database
        tramiteGeneralRepository.saveAndFlush(tramiteGeneral);
        tramiteGeneralSearchRepository.save(tramiteGeneral);
        int databaseSizeBeforeDelete = tramiteGeneralRepository.findAll().size();

        // Get the tramiteGeneral
        restTramiteGeneralMockMvc.perform(delete("/api/tramite-generals/{id}", tramiteGeneral.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean tramiteGeneralExistsInEs = tramiteGeneralSearchRepository.exists(tramiteGeneral.getId());
        assertThat(tramiteGeneralExistsInEs).isFalse();

        // Validate the database is empty
        List<TramiteGeneral> tramiteGeneralList = tramiteGeneralRepository.findAll();
        assertThat(tramiteGeneralList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTramiteGeneral() throws Exception {
        // Initialize the database
        tramiteGeneralRepository.saveAndFlush(tramiteGeneral);
        tramiteGeneralSearchRepository.save(tramiteGeneral);

        // Search the tramiteGeneral
        restTramiteGeneralMockMvc.perform(get("/api/_search/tramite-generals?query=id:" + tramiteGeneral.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tramiteGeneral.getId().intValue())))
            .andExpect(jsonPath("$.[*].titular").value(hasItem(DEFAULT_TITULAR.toString())))
            .andExpect(jsonPath("$.[*].dependencia").value(hasItem(DEFAULT_DEPENDENCIA.toString())))
            .andExpect(jsonPath("$.[*].numeroTramite").value(hasItem(DEFAULT_NUMERO_TRAMITE.toString())))
            .andExpect(jsonPath("$.[*].tipoTramite").value(hasItem(DEFAULT_TIPO_TRAMITE.toString())))
            .andExpect(jsonPath("$.[*].fechaIngreso").value(hasItem(DEFAULT_FECHA_INGRESO.toString())))
            .andExpect(jsonPath("$.[*].fechaResolucion").value(hasItem(DEFAULT_FECHA_RESOLUCION.toString())))
            .andExpect(jsonPath("$.[*].fechaNotificacion").value(hasItem(DEFAULT_FECHA_NOTIFICACION.toString())))
            .andExpect(jsonPath("$.[*].archivo").value(hasItem(DEFAULT_ARCHIVO.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TramiteGeneral.class);
        TramiteGeneral tramiteGeneral1 = new TramiteGeneral();
        tramiteGeneral1.setId(1L);
        TramiteGeneral tramiteGeneral2 = new TramiteGeneral();
        tramiteGeneral2.setId(tramiteGeneral1.getId());
        assertThat(tramiteGeneral1).isEqualTo(tramiteGeneral2);
        tramiteGeneral2.setId(2L);
        assertThat(tramiteGeneral1).isNotEqualTo(tramiteGeneral2);
        tramiteGeneral1.setId(null);
        assertThat(tramiteGeneral1).isNotEqualTo(tramiteGeneral2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TramiteGeneralDTO.class);
        TramiteGeneralDTO tramiteGeneralDTO1 = new TramiteGeneralDTO();
        tramiteGeneralDTO1.setId(1L);
        TramiteGeneralDTO tramiteGeneralDTO2 = new TramiteGeneralDTO();
        assertThat(tramiteGeneralDTO1).isNotEqualTo(tramiteGeneralDTO2);
        tramiteGeneralDTO2.setId(tramiteGeneralDTO1.getId());
        assertThat(tramiteGeneralDTO1).isEqualTo(tramiteGeneralDTO2);
        tramiteGeneralDTO2.setId(2L);
        assertThat(tramiteGeneralDTO1).isNotEqualTo(tramiteGeneralDTO2);
        tramiteGeneralDTO1.setId(null);
        assertThat(tramiteGeneralDTO1).isNotEqualTo(tramiteGeneralDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(tramiteGeneralMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(tramiteGeneralMapper.fromId(null)).isNull();
    }
}
