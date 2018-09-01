package com.debidadefensa.web.rest;

import com.debidadefensa.DebidadefensaApp;

import com.debidadefensa.domain.Expediente;
import com.debidadefensa.domain.Estatus;
import com.debidadefensa.repository.ExpedienteRepository;
import com.debidadefensa.service.ExpedienteService;
import com.debidadefensa.repository.search.ExpedienteSearchRepository;
import com.debidadefensa.service.dto.ExpedienteDTO;
import com.debidadefensa.service.mapper.ExpedienteMapper;
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
 * Test class for the ExpedienteResource REST controller.
 *
 * @see ExpedienteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DebidadefensaApp.class)
public class ExpedienteResourceIntTest {

    private static final String DEFAULT_JUZGADO = "AAAAAAAAAA";
    private static final String UPDATED_JUZGADO = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_EXPEDIENTE = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_EXPEDIENTE = "BBBBBBBBBB";

    private static final String DEFAULT_JUICIO = "AAAAAAAAAA";
    private static final String UPDATED_JUICIO = "BBBBBBBBBB";

    private static final String DEFAULT_RESPONSABLE = "AAAAAAAAAA";
    private static final String UPDATED_RESPONSABLE = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_ALTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ALTA = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_SENTENCIA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_SENTENCIA = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_TOTAL_DOCUMENTOS = 1L;
    private static final Long UPDATED_TOTAL_DOCUMENTOS = 2L;

    @Autowired
    private ExpedienteRepository expedienteRepository;

    @Autowired
    private ExpedienteMapper expedienteMapper;

    @Autowired
    private ExpedienteService expedienteService;

    @Autowired
    private ExpedienteSearchRepository expedienteSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restExpedienteMockMvc;

    private Expediente expediente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExpedienteResource expedienteResource = new ExpedienteResource(expedienteService);
        this.restExpedienteMockMvc = MockMvcBuilders.standaloneSetup(expedienteResource)
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
    public static Expediente createEntity(EntityManager em) {
        Expediente expediente = new Expediente()
            .juzgado(DEFAULT_JUZGADO)
            .numeroExpediente(DEFAULT_NUMERO_EXPEDIENTE)
            .juicio(DEFAULT_JUICIO)
            .responsable(DEFAULT_RESPONSABLE)
            .observaciones(DEFAULT_OBSERVACIONES)
            .fechaAlta(DEFAULT_FECHA_ALTA)
            .fechaSentencia(DEFAULT_FECHA_SENTENCIA)
            .totalDocumentos(DEFAULT_TOTAL_DOCUMENTOS);
        // Add required entity
        Estatus estatusExpediente = EstatusResourceIntTest.createEntity(em);
        em.persist(estatusExpediente);
        em.flush();
        expediente.setEstatusExpediente(estatusExpediente);
        return expediente;
    }

    @Before
    public void initTest() {
        expedienteSearchRepository.deleteAll();
        expediente = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpediente() throws Exception {
        int databaseSizeBeforeCreate = expedienteRepository.findAll().size();

        // Create the Expediente
        ExpedienteDTO expedienteDTO = expedienteMapper.toDto(expediente);
        restExpedienteMockMvc.perform(post("/api/expedientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expedienteDTO)))
            .andExpect(status().isCreated());

        // Validate the Expediente in the database
        List<Expediente> expedienteList = expedienteRepository.findAll();
        assertThat(expedienteList).hasSize(databaseSizeBeforeCreate + 1);
        Expediente testExpediente = expedienteList.get(expedienteList.size() - 1);
        assertThat(testExpediente.getJuzgado()).isEqualTo(DEFAULT_JUZGADO);
        assertThat(testExpediente.getNumeroExpediente()).isEqualTo(DEFAULT_NUMERO_EXPEDIENTE);
        assertThat(testExpediente.getJuicio()).isEqualTo(DEFAULT_JUICIO);
        assertThat(testExpediente.getResponsable()).isEqualTo(DEFAULT_RESPONSABLE);
        assertThat(testExpediente.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
        assertThat(testExpediente.getFechaAlta()).isEqualTo(DEFAULT_FECHA_ALTA);
        assertThat(testExpediente.getFechaSentencia()).isEqualTo(DEFAULT_FECHA_SENTENCIA);
        assertThat(testExpediente.getTotalDocumentos()).isEqualTo(DEFAULT_TOTAL_DOCUMENTOS);

        // Validate the Expediente in Elasticsearch
        Expediente expedienteEs = expedienteSearchRepository.findOne(testExpediente.getId());
        assertThat(expedienteEs).isEqualToIgnoringGivenFields(testExpediente);
    }

    @Test
    @Transactional
    public void createExpedienteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = expedienteRepository.findAll().size();

        // Create the Expediente with an existing ID
        expediente.setId(1L);
        ExpedienteDTO expedienteDTO = expedienteMapper.toDto(expediente);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExpedienteMockMvc.perform(post("/api/expedientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expedienteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Expediente in the database
        List<Expediente> expedienteList = expedienteRepository.findAll();
        assertThat(expedienteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllExpedientes() throws Exception {
        // Initialize the database
        expedienteRepository.saveAndFlush(expediente);

        // Get all the expedienteList
        restExpedienteMockMvc.perform(get("/api/expedientes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expediente.getId().intValue())))
            .andExpect(jsonPath("$.[*].juzgado").value(hasItem(DEFAULT_JUZGADO.toString())))
            .andExpect(jsonPath("$.[*].numeroExpediente").value(hasItem(DEFAULT_NUMERO_EXPEDIENTE.toString())))
            .andExpect(jsonPath("$.[*].juicio").value(hasItem(DEFAULT_JUICIO.toString())))
            .andExpect(jsonPath("$.[*].responsable").value(hasItem(DEFAULT_RESPONSABLE.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].fechaAlta").value(hasItem(DEFAULT_FECHA_ALTA.toString())))
            .andExpect(jsonPath("$.[*].fechaSentencia").value(hasItem(DEFAULT_FECHA_SENTENCIA.toString())))
            .andExpect(jsonPath("$.[*].totalDocumentos").value(hasItem(DEFAULT_TOTAL_DOCUMENTOS.intValue())));
    }

    @Test
    @Transactional
    public void getExpediente() throws Exception {
        // Initialize the database
        expedienteRepository.saveAndFlush(expediente);

        // Get the expediente
        restExpedienteMockMvc.perform(get("/api/expedientes/{id}", expediente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expediente.getId().intValue()))
            .andExpect(jsonPath("$.juzgado").value(DEFAULT_JUZGADO.toString()))
            .andExpect(jsonPath("$.numeroExpediente").value(DEFAULT_NUMERO_EXPEDIENTE.toString()))
            .andExpect(jsonPath("$.juicio").value(DEFAULT_JUICIO.toString()))
            .andExpect(jsonPath("$.responsable").value(DEFAULT_RESPONSABLE.toString()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()))
            .andExpect(jsonPath("$.fechaAlta").value(DEFAULT_FECHA_ALTA.toString()))
            .andExpect(jsonPath("$.fechaSentencia").value(DEFAULT_FECHA_SENTENCIA.toString()))
            .andExpect(jsonPath("$.totalDocumentos").value(DEFAULT_TOTAL_DOCUMENTOS.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingExpediente() throws Exception {
        // Get the expediente
        restExpedienteMockMvc.perform(get("/api/expedientes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpediente() throws Exception {
        // Initialize the database
        expedienteRepository.saveAndFlush(expediente);
        expedienteSearchRepository.save(expediente);
        int databaseSizeBeforeUpdate = expedienteRepository.findAll().size();

        // Update the expediente
        Expediente updatedExpediente = expedienteRepository.findOne(expediente.getId());
        // Disconnect from session so that the updates on updatedExpediente are not directly saved in db
        em.detach(updatedExpediente);
        updatedExpediente
            .juzgado(UPDATED_JUZGADO)
            .numeroExpediente(UPDATED_NUMERO_EXPEDIENTE)
            .juicio(UPDATED_JUICIO)
            .responsable(UPDATED_RESPONSABLE)
            .observaciones(UPDATED_OBSERVACIONES)
            .fechaAlta(UPDATED_FECHA_ALTA)
            .fechaSentencia(UPDATED_FECHA_SENTENCIA)
            .totalDocumentos(UPDATED_TOTAL_DOCUMENTOS);
        ExpedienteDTO expedienteDTO = expedienteMapper.toDto(updatedExpediente);

        restExpedienteMockMvc.perform(put("/api/expedientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expedienteDTO)))
            .andExpect(status().isOk());

        // Validate the Expediente in the database
        List<Expediente> expedienteList = expedienteRepository.findAll();
        assertThat(expedienteList).hasSize(databaseSizeBeforeUpdate);
        Expediente testExpediente = expedienteList.get(expedienteList.size() - 1);
        assertThat(testExpediente.getJuzgado()).isEqualTo(UPDATED_JUZGADO);
        assertThat(testExpediente.getNumeroExpediente()).isEqualTo(UPDATED_NUMERO_EXPEDIENTE);
        assertThat(testExpediente.getJuicio()).isEqualTo(UPDATED_JUICIO);
        assertThat(testExpediente.getResponsable()).isEqualTo(UPDATED_RESPONSABLE);
        assertThat(testExpediente.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
        assertThat(testExpediente.getFechaAlta()).isEqualTo(UPDATED_FECHA_ALTA);
        assertThat(testExpediente.getFechaSentencia()).isEqualTo(UPDATED_FECHA_SENTENCIA);
        assertThat(testExpediente.getTotalDocumentos()).isEqualTo(UPDATED_TOTAL_DOCUMENTOS);

        // Validate the Expediente in Elasticsearch
        Expediente expedienteEs = expedienteSearchRepository.findOne(testExpediente.getId());
        assertThat(expedienteEs).isEqualToIgnoringGivenFields(testExpediente);
    }

    @Test
    @Transactional
    public void updateNonExistingExpediente() throws Exception {
        int databaseSizeBeforeUpdate = expedienteRepository.findAll().size();

        // Create the Expediente
        ExpedienteDTO expedienteDTO = expedienteMapper.toDto(expediente);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restExpedienteMockMvc.perform(put("/api/expedientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expedienteDTO)))
            .andExpect(status().isCreated());

        // Validate the Expediente in the database
        List<Expediente> expedienteList = expedienteRepository.findAll();
        assertThat(expedienteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteExpediente() throws Exception {
        // Initialize the database
        expedienteRepository.saveAndFlush(expediente);
        expedienteSearchRepository.save(expediente);
        int databaseSizeBeforeDelete = expedienteRepository.findAll().size();

        // Get the expediente
        restExpedienteMockMvc.perform(delete("/api/expedientes/{id}", expediente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean expedienteExistsInEs = expedienteSearchRepository.exists(expediente.getId());
        assertThat(expedienteExistsInEs).isFalse();

        // Validate the database is empty
        List<Expediente> expedienteList = expedienteRepository.findAll();
        assertThat(expedienteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchExpediente() throws Exception {
        // Initialize the database
        expedienteRepository.saveAndFlush(expediente);
        expedienteSearchRepository.save(expediente);

        // Search the expediente
        restExpedienteMockMvc.perform(get("/api/_search/expedientes?query=id:" + expediente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expediente.getId().intValue())))
            .andExpect(jsonPath("$.[*].juzgado").value(hasItem(DEFAULT_JUZGADO.toString())))
            .andExpect(jsonPath("$.[*].numeroExpediente").value(hasItem(DEFAULT_NUMERO_EXPEDIENTE.toString())))
            .andExpect(jsonPath("$.[*].juicio").value(hasItem(DEFAULT_JUICIO.toString())))
            .andExpect(jsonPath("$.[*].responsable").value(hasItem(DEFAULT_RESPONSABLE.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].fechaAlta").value(hasItem(DEFAULT_FECHA_ALTA.toString())))
            .andExpect(jsonPath("$.[*].fechaSentencia").value(hasItem(DEFAULT_FECHA_SENTENCIA.toString())))
            .andExpect(jsonPath("$.[*].totalDocumentos").value(hasItem(DEFAULT_TOTAL_DOCUMENTOS.intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Expediente.class);
        Expediente expediente1 = new Expediente();
        expediente1.setId(1L);
        Expediente expediente2 = new Expediente();
        expediente2.setId(expediente1.getId());
        assertThat(expediente1).isEqualTo(expediente2);
        expediente2.setId(2L);
        assertThat(expediente1).isNotEqualTo(expediente2);
        expediente1.setId(null);
        assertThat(expediente1).isNotEqualTo(expediente2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExpedienteDTO.class);
        ExpedienteDTO expedienteDTO1 = new ExpedienteDTO();
        expedienteDTO1.setId(1L);
        ExpedienteDTO expedienteDTO2 = new ExpedienteDTO();
        assertThat(expedienteDTO1).isNotEqualTo(expedienteDTO2);
        expedienteDTO2.setId(expedienteDTO1.getId());
        assertThat(expedienteDTO1).isEqualTo(expedienteDTO2);
        expedienteDTO2.setId(2L);
        assertThat(expedienteDTO1).isNotEqualTo(expedienteDTO2);
        expedienteDTO1.setId(null);
        assertThat(expedienteDTO1).isNotEqualTo(expedienteDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(expedienteMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(expedienteMapper.fromId(null)).isNull();
    }
}
