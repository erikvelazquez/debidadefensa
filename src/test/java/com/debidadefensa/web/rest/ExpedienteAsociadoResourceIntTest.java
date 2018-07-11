package com.debidadefensa.web.rest;

import com.debidadefensa.DebidadefensaApp;

import com.debidadefensa.domain.ExpedienteAsociado;
import com.debidadefensa.repository.ExpedienteAsociadoRepository;
import com.debidadefensa.service.ExpedienteAsociadoService;
import com.debidadefensa.repository.search.ExpedienteAsociadoSearchRepository;
import com.debidadefensa.service.dto.ExpedienteAsociadoDTO;
import com.debidadefensa.service.mapper.ExpedienteAsociadoMapper;
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
 * Test class for the ExpedienteAsociadoResource REST controller.
 *
 * @see ExpedienteAsociadoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DebidadefensaApp.class)
public class ExpedienteAsociadoResourceIntTest {

    private static final String DEFAULT_NUMERO_EXPEDIENTE = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_EXPEDIENTE = "BBBBBBBBBB";

    private static final String DEFAULT_INSTANCIA = "AAAAAAAAAA";
    private static final String UPDATED_INSTANCIA = "BBBBBBBBBB";

    private static final String DEFAULT_ORGANOCOMPETENTE = "AAAAAAAAAA";
    private static final String UPDATED_ORGANOCOMPETENTE = "BBBBBBBBBB";

    private static final String DEFAULT_ARCHIVO = "AAAAAAAAAA";
    private static final String UPDATED_ARCHIVO = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_SENTENCIA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_SENTENCIA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ExpedienteAsociadoRepository expedienteAsociadoRepository;

    @Autowired
    private ExpedienteAsociadoMapper expedienteAsociadoMapper;

    @Autowired
    private ExpedienteAsociadoService expedienteAsociadoService;

    @Autowired
    private ExpedienteAsociadoSearchRepository expedienteAsociadoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restExpedienteAsociadoMockMvc;

    private ExpedienteAsociado expedienteAsociado;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExpedienteAsociadoResource expedienteAsociadoResource = new ExpedienteAsociadoResource(expedienteAsociadoService);
        this.restExpedienteAsociadoMockMvc = MockMvcBuilders.standaloneSetup(expedienteAsociadoResource)
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
    public static ExpedienteAsociado createEntity(EntityManager em) {
        ExpedienteAsociado expedienteAsociado = new ExpedienteAsociado()
            .numeroExpediente(DEFAULT_NUMERO_EXPEDIENTE)
            .instancia(DEFAULT_INSTANCIA)
            .organocompetente(DEFAULT_ORGANOCOMPETENTE)
            .archivo(DEFAULT_ARCHIVO)
            .observaciones(DEFAULT_OBSERVACIONES)
            .fechaSentencia(DEFAULT_FECHA_SENTENCIA);
        return expedienteAsociado;
    }

    @Before
    public void initTest() {
        expedienteAsociadoSearchRepository.deleteAll();
        expedienteAsociado = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpedienteAsociado() throws Exception {
        int databaseSizeBeforeCreate = expedienteAsociadoRepository.findAll().size();

        // Create the ExpedienteAsociado
        ExpedienteAsociadoDTO expedienteAsociadoDTO = expedienteAsociadoMapper.toDto(expedienteAsociado);
        restExpedienteAsociadoMockMvc.perform(post("/api/expediente-asociados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expedienteAsociadoDTO)))
            .andExpect(status().isCreated());

        // Validate the ExpedienteAsociado in the database
        List<ExpedienteAsociado> expedienteAsociadoList = expedienteAsociadoRepository.findAll();
        assertThat(expedienteAsociadoList).hasSize(databaseSizeBeforeCreate + 1);
        ExpedienteAsociado testExpedienteAsociado = expedienteAsociadoList.get(expedienteAsociadoList.size() - 1);
        assertThat(testExpedienteAsociado.getNumeroExpediente()).isEqualTo(DEFAULT_NUMERO_EXPEDIENTE);
        assertThat(testExpedienteAsociado.getInstancia()).isEqualTo(DEFAULT_INSTANCIA);
        assertThat(testExpedienteAsociado.getOrganocompetente()).isEqualTo(DEFAULT_ORGANOCOMPETENTE);
        assertThat(testExpedienteAsociado.getArchivo()).isEqualTo(DEFAULT_ARCHIVO);
        assertThat(testExpedienteAsociado.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
        assertThat(testExpedienteAsociado.getFechaSentencia()).isEqualTo(DEFAULT_FECHA_SENTENCIA);

        // Validate the ExpedienteAsociado in Elasticsearch
        ExpedienteAsociado expedienteAsociadoEs = expedienteAsociadoSearchRepository.findOne(testExpedienteAsociado.getId());
        assertThat(expedienteAsociadoEs).isEqualToIgnoringGivenFields(testExpedienteAsociado);
    }

    @Test
    @Transactional
    public void createExpedienteAsociadoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = expedienteAsociadoRepository.findAll().size();

        // Create the ExpedienteAsociado with an existing ID
        expedienteAsociado.setId(1L);
        ExpedienteAsociadoDTO expedienteAsociadoDTO = expedienteAsociadoMapper.toDto(expedienteAsociado);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExpedienteAsociadoMockMvc.perform(post("/api/expediente-asociados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expedienteAsociadoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ExpedienteAsociado in the database
        List<ExpedienteAsociado> expedienteAsociadoList = expedienteAsociadoRepository.findAll();
        assertThat(expedienteAsociadoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllExpedienteAsociados() throws Exception {
        // Initialize the database
        expedienteAsociadoRepository.saveAndFlush(expedienteAsociado);

        // Get all the expedienteAsociadoList
        restExpedienteAsociadoMockMvc.perform(get("/api/expediente-asociados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expedienteAsociado.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroExpediente").value(hasItem(DEFAULT_NUMERO_EXPEDIENTE.toString())))
            .andExpect(jsonPath("$.[*].instancia").value(hasItem(DEFAULT_INSTANCIA.toString())))
            .andExpect(jsonPath("$.[*].organocompetente").value(hasItem(DEFAULT_ORGANOCOMPETENTE.toString())))
            .andExpect(jsonPath("$.[*].archivo").value(hasItem(DEFAULT_ARCHIVO.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].fechaSentencia").value(hasItem(DEFAULT_FECHA_SENTENCIA.toString())));
    }

    @Test
    @Transactional
    public void getExpedienteAsociado() throws Exception {
        // Initialize the database
        expedienteAsociadoRepository.saveAndFlush(expedienteAsociado);

        // Get the expedienteAsociado
        restExpedienteAsociadoMockMvc.perform(get("/api/expediente-asociados/{id}", expedienteAsociado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expedienteAsociado.getId().intValue()))
            .andExpect(jsonPath("$.numeroExpediente").value(DEFAULT_NUMERO_EXPEDIENTE.toString()))
            .andExpect(jsonPath("$.instancia").value(DEFAULT_INSTANCIA.toString()))
            .andExpect(jsonPath("$.organocompetente").value(DEFAULT_ORGANOCOMPETENTE.toString()))
            .andExpect(jsonPath("$.archivo").value(DEFAULT_ARCHIVO.toString()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()))
            .andExpect(jsonPath("$.fechaSentencia").value(DEFAULT_FECHA_SENTENCIA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExpedienteAsociado() throws Exception {
        // Get the expedienteAsociado
        restExpedienteAsociadoMockMvc.perform(get("/api/expediente-asociados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpedienteAsociado() throws Exception {
        // Initialize the database
        expedienteAsociadoRepository.saveAndFlush(expedienteAsociado);
        expedienteAsociadoSearchRepository.save(expedienteAsociado);
        int databaseSizeBeforeUpdate = expedienteAsociadoRepository.findAll().size();

        // Update the expedienteAsociado
        ExpedienteAsociado updatedExpedienteAsociado = expedienteAsociadoRepository.findOne(expedienteAsociado.getId());
        // Disconnect from session so that the updates on updatedExpedienteAsociado are not directly saved in db
        em.detach(updatedExpedienteAsociado);
        updatedExpedienteAsociado
            .numeroExpediente(UPDATED_NUMERO_EXPEDIENTE)
            .instancia(UPDATED_INSTANCIA)
            .organocompetente(UPDATED_ORGANOCOMPETENTE)
            .archivo(UPDATED_ARCHIVO)
            .observaciones(UPDATED_OBSERVACIONES)
            .fechaSentencia(UPDATED_FECHA_SENTENCIA);
        ExpedienteAsociadoDTO expedienteAsociadoDTO = expedienteAsociadoMapper.toDto(updatedExpedienteAsociado);

        restExpedienteAsociadoMockMvc.perform(put("/api/expediente-asociados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expedienteAsociadoDTO)))
            .andExpect(status().isOk());

        // Validate the ExpedienteAsociado in the database
        List<ExpedienteAsociado> expedienteAsociadoList = expedienteAsociadoRepository.findAll();
        assertThat(expedienteAsociadoList).hasSize(databaseSizeBeforeUpdate);
        ExpedienteAsociado testExpedienteAsociado = expedienteAsociadoList.get(expedienteAsociadoList.size() - 1);
        assertThat(testExpedienteAsociado.getNumeroExpediente()).isEqualTo(UPDATED_NUMERO_EXPEDIENTE);
        assertThat(testExpedienteAsociado.getInstancia()).isEqualTo(UPDATED_INSTANCIA);
        assertThat(testExpedienteAsociado.getOrganocompetente()).isEqualTo(UPDATED_ORGANOCOMPETENTE);
        assertThat(testExpedienteAsociado.getArchivo()).isEqualTo(UPDATED_ARCHIVO);
        assertThat(testExpedienteAsociado.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
        assertThat(testExpedienteAsociado.getFechaSentencia()).isEqualTo(UPDATED_FECHA_SENTENCIA);

        // Validate the ExpedienteAsociado in Elasticsearch
        ExpedienteAsociado expedienteAsociadoEs = expedienteAsociadoSearchRepository.findOne(testExpedienteAsociado.getId());
        assertThat(expedienteAsociadoEs).isEqualToIgnoringGivenFields(testExpedienteAsociado);
    }

    @Test
    @Transactional
    public void updateNonExistingExpedienteAsociado() throws Exception {
        int databaseSizeBeforeUpdate = expedienteAsociadoRepository.findAll().size();

        // Create the ExpedienteAsociado
        ExpedienteAsociadoDTO expedienteAsociadoDTO = expedienteAsociadoMapper.toDto(expedienteAsociado);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restExpedienteAsociadoMockMvc.perform(put("/api/expediente-asociados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expedienteAsociadoDTO)))
            .andExpect(status().isCreated());

        // Validate the ExpedienteAsociado in the database
        List<ExpedienteAsociado> expedienteAsociadoList = expedienteAsociadoRepository.findAll();
        assertThat(expedienteAsociadoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteExpedienteAsociado() throws Exception {
        // Initialize the database
        expedienteAsociadoRepository.saveAndFlush(expedienteAsociado);
        expedienteAsociadoSearchRepository.save(expedienteAsociado);
        int databaseSizeBeforeDelete = expedienteAsociadoRepository.findAll().size();

        // Get the expedienteAsociado
        restExpedienteAsociadoMockMvc.perform(delete("/api/expediente-asociados/{id}", expedienteAsociado.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean expedienteAsociadoExistsInEs = expedienteAsociadoSearchRepository.exists(expedienteAsociado.getId());
        assertThat(expedienteAsociadoExistsInEs).isFalse();

        // Validate the database is empty
        List<ExpedienteAsociado> expedienteAsociadoList = expedienteAsociadoRepository.findAll();
        assertThat(expedienteAsociadoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchExpedienteAsociado() throws Exception {
        // Initialize the database
        expedienteAsociadoRepository.saveAndFlush(expedienteAsociado);
        expedienteAsociadoSearchRepository.save(expedienteAsociado);

        // Search the expedienteAsociado
        restExpedienteAsociadoMockMvc.perform(get("/api/_search/expediente-asociados?query=id:" + expedienteAsociado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expedienteAsociado.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroExpediente").value(hasItem(DEFAULT_NUMERO_EXPEDIENTE.toString())))
            .andExpect(jsonPath("$.[*].instancia").value(hasItem(DEFAULT_INSTANCIA.toString())))
            .andExpect(jsonPath("$.[*].organocompetente").value(hasItem(DEFAULT_ORGANOCOMPETENTE.toString())))
            .andExpect(jsonPath("$.[*].archivo").value(hasItem(DEFAULT_ARCHIVO.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].fechaSentencia").value(hasItem(DEFAULT_FECHA_SENTENCIA.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExpedienteAsociado.class);
        ExpedienteAsociado expedienteAsociado1 = new ExpedienteAsociado();
        expedienteAsociado1.setId(1L);
        ExpedienteAsociado expedienteAsociado2 = new ExpedienteAsociado();
        expedienteAsociado2.setId(expedienteAsociado1.getId());
        assertThat(expedienteAsociado1).isEqualTo(expedienteAsociado2);
        expedienteAsociado2.setId(2L);
        assertThat(expedienteAsociado1).isNotEqualTo(expedienteAsociado2);
        expedienteAsociado1.setId(null);
        assertThat(expedienteAsociado1).isNotEqualTo(expedienteAsociado2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExpedienteAsociadoDTO.class);
        ExpedienteAsociadoDTO expedienteAsociadoDTO1 = new ExpedienteAsociadoDTO();
        expedienteAsociadoDTO1.setId(1L);
        ExpedienteAsociadoDTO expedienteAsociadoDTO2 = new ExpedienteAsociadoDTO();
        assertThat(expedienteAsociadoDTO1).isNotEqualTo(expedienteAsociadoDTO2);
        expedienteAsociadoDTO2.setId(expedienteAsociadoDTO1.getId());
        assertThat(expedienteAsociadoDTO1).isEqualTo(expedienteAsociadoDTO2);
        expedienteAsociadoDTO2.setId(2L);
        assertThat(expedienteAsociadoDTO1).isNotEqualTo(expedienteAsociadoDTO2);
        expedienteAsociadoDTO1.setId(null);
        assertThat(expedienteAsociadoDTO1).isNotEqualTo(expedienteAsociadoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(expedienteAsociadoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(expedienteAsociadoMapper.fromId(null)).isNull();
    }
}
