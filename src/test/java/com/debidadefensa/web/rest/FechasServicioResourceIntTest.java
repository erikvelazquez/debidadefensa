package com.debidadefensa.web.rest;

import com.debidadefensa.DebidadefensaApp;

import com.debidadefensa.domain.FechasServicio;
import com.debidadefensa.repository.FechasServicioRepository;
import com.debidadefensa.service.FechasServicioService;
import com.debidadefensa.repository.search.FechasServicioSearchRepository;
import com.debidadefensa.service.dto.FechasServicioDTO;
import com.debidadefensa.service.mapper.FechasServicioMapper;
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
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.debidadefensa.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FechasServicioResource REST controller.
 *
 * @see FechasServicioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DebidadefensaApp.class)
public class FechasServicioResourceIntTest {

    private static final String DEFAULT_TIPO_SERVICIO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_SERVICIO = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_HORA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_HORA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    @Autowired
    private FechasServicioRepository fechasServicioRepository;

    @Autowired
    private FechasServicioMapper fechasServicioMapper;

    @Autowired
    private FechasServicioService fechasServicioService;

    @Autowired
    private FechasServicioSearchRepository fechasServicioSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFechasServicioMockMvc;

    private FechasServicio fechasServicio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FechasServicioResource fechasServicioResource = new FechasServicioResource(fechasServicioService);
        this.restFechasServicioMockMvc = MockMvcBuilders.standaloneSetup(fechasServicioResource)
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
    public static FechasServicio createEntity(EntityManager em) {
        FechasServicio fechasServicio = new FechasServicio()
            .tipoServicio(DEFAULT_TIPO_SERVICIO)
            .fecha(DEFAULT_FECHA)
            .descripcion(DEFAULT_DESCRIPCION)
            .hora(DEFAULT_HORA)
            .observaciones(DEFAULT_OBSERVACIONES);
        return fechasServicio;
    }

    @Before
    public void initTest() {
        fechasServicioSearchRepository.deleteAll();
        fechasServicio = createEntity(em);
    }

    @Test
    @Transactional
    public void createFechasServicio() throws Exception {
        int databaseSizeBeforeCreate = fechasServicioRepository.findAll().size();

        // Create the FechasServicio
        FechasServicioDTO fechasServicioDTO = fechasServicioMapper.toDto(fechasServicio);
        restFechasServicioMockMvc.perform(post("/api/fechas-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fechasServicioDTO)))
            .andExpect(status().isCreated());

        // Validate the FechasServicio in the database
        List<FechasServicio> fechasServicioList = fechasServicioRepository.findAll();
        assertThat(fechasServicioList).hasSize(databaseSizeBeforeCreate + 1);
        FechasServicio testFechasServicio = fechasServicioList.get(fechasServicioList.size() - 1);
        assertThat(testFechasServicio.getTipoServicio()).isEqualTo(DEFAULT_TIPO_SERVICIO);
        assertThat(testFechasServicio.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testFechasServicio.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testFechasServicio.getHora()).isEqualTo(DEFAULT_HORA);
        assertThat(testFechasServicio.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);

        // Validate the FechasServicio in Elasticsearch
        FechasServicio fechasServicioEs = fechasServicioSearchRepository.findOne(testFechasServicio.getId());
        assertThat(fechasServicioEs).isEqualToIgnoringGivenFields(testFechasServicio);
    }

    @Test
    @Transactional
    public void createFechasServicioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fechasServicioRepository.findAll().size();

        // Create the FechasServicio with an existing ID
        fechasServicio.setId(1L);
        FechasServicioDTO fechasServicioDTO = fechasServicioMapper.toDto(fechasServicio);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFechasServicioMockMvc.perform(post("/api/fechas-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fechasServicioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FechasServicio in the database
        List<FechasServicio> fechasServicioList = fechasServicioRepository.findAll();
        assertThat(fechasServicioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFechasServicios() throws Exception {
        // Initialize the database
        fechasServicioRepository.saveAndFlush(fechasServicio);

        // Get all the fechasServicioList
        restFechasServicioMockMvc.perform(get("/api/fechas-servicios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fechasServicio.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipoServicio").value(hasItem(DEFAULT_TIPO_SERVICIO.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].hora").value(hasItem(DEFAULT_HORA.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }

    @Test
    @Transactional
    public void getFechasServicio() throws Exception {
        // Initialize the database
        fechasServicioRepository.saveAndFlush(fechasServicio);

        // Get the fechasServicio
        restFechasServicioMockMvc.perform(get("/api/fechas-servicios/{id}", fechasServicio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fechasServicio.getId().intValue()))
            .andExpect(jsonPath("$.tipoServicio").value(DEFAULT_TIPO_SERVICIO.toString()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.hora").value(DEFAULT_HORA.toString()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFechasServicio() throws Exception {
        // Get the fechasServicio
        restFechasServicioMockMvc.perform(get("/api/fechas-servicios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFechasServicio() throws Exception {
        // Initialize the database
        fechasServicioRepository.saveAndFlush(fechasServicio);
        fechasServicioSearchRepository.save(fechasServicio);
        int databaseSizeBeforeUpdate = fechasServicioRepository.findAll().size();

        // Update the fechasServicio
        FechasServicio updatedFechasServicio = fechasServicioRepository.findOne(fechasServicio.getId());
        // Disconnect from session so that the updates on updatedFechasServicio are not directly saved in db
        em.detach(updatedFechasServicio);
        updatedFechasServicio
            .tipoServicio(UPDATED_TIPO_SERVICIO)
            .fecha(UPDATED_FECHA)
            .descripcion(UPDATED_DESCRIPCION)
            .hora(UPDATED_HORA)
            .observaciones(UPDATED_OBSERVACIONES);
        FechasServicioDTO fechasServicioDTO = fechasServicioMapper.toDto(updatedFechasServicio);

        restFechasServicioMockMvc.perform(put("/api/fechas-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fechasServicioDTO)))
            .andExpect(status().isOk());

        // Validate the FechasServicio in the database
        List<FechasServicio> fechasServicioList = fechasServicioRepository.findAll();
        assertThat(fechasServicioList).hasSize(databaseSizeBeforeUpdate);
        FechasServicio testFechasServicio = fechasServicioList.get(fechasServicioList.size() - 1);
        assertThat(testFechasServicio.getTipoServicio()).isEqualTo(UPDATED_TIPO_SERVICIO);
        assertThat(testFechasServicio.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testFechasServicio.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testFechasServicio.getHora()).isEqualTo(UPDATED_HORA);
        assertThat(testFechasServicio.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);

        // Validate the FechasServicio in Elasticsearch
        FechasServicio fechasServicioEs = fechasServicioSearchRepository.findOne(testFechasServicio.getId());
        assertThat(fechasServicioEs).isEqualToIgnoringGivenFields(testFechasServicio);
    }

    @Test
    @Transactional
    public void updateNonExistingFechasServicio() throws Exception {
        int databaseSizeBeforeUpdate = fechasServicioRepository.findAll().size();

        // Create the FechasServicio
        FechasServicioDTO fechasServicioDTO = fechasServicioMapper.toDto(fechasServicio);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFechasServicioMockMvc.perform(put("/api/fechas-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fechasServicioDTO)))
            .andExpect(status().isCreated());

        // Validate the FechasServicio in the database
        List<FechasServicio> fechasServicioList = fechasServicioRepository.findAll();
        assertThat(fechasServicioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFechasServicio() throws Exception {
        // Initialize the database
        fechasServicioRepository.saveAndFlush(fechasServicio);
        fechasServicioSearchRepository.save(fechasServicio);
        int databaseSizeBeforeDelete = fechasServicioRepository.findAll().size();

        // Get the fechasServicio
        restFechasServicioMockMvc.perform(delete("/api/fechas-servicios/{id}", fechasServicio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean fechasServicioExistsInEs = fechasServicioSearchRepository.exists(fechasServicio.getId());
        assertThat(fechasServicioExistsInEs).isFalse();

        // Validate the database is empty
        List<FechasServicio> fechasServicioList = fechasServicioRepository.findAll();
        assertThat(fechasServicioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchFechasServicio() throws Exception {
        // Initialize the database
        fechasServicioRepository.saveAndFlush(fechasServicio);
        fechasServicioSearchRepository.save(fechasServicio);

        // Search the fechasServicio
        restFechasServicioMockMvc.perform(get("/api/_search/fechas-servicios?query=id:" + fechasServicio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fechasServicio.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipoServicio").value(hasItem(DEFAULT_TIPO_SERVICIO.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].hora").value(hasItem(DEFAULT_HORA.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FechasServicio.class);
        FechasServicio fechasServicio1 = new FechasServicio();
        fechasServicio1.setId(1L);
        FechasServicio fechasServicio2 = new FechasServicio();
        fechasServicio2.setId(fechasServicio1.getId());
        assertThat(fechasServicio1).isEqualTo(fechasServicio2);
        fechasServicio2.setId(2L);
        assertThat(fechasServicio1).isNotEqualTo(fechasServicio2);
        fechasServicio1.setId(null);
        assertThat(fechasServicio1).isNotEqualTo(fechasServicio2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FechasServicioDTO.class);
        FechasServicioDTO fechasServicioDTO1 = new FechasServicioDTO();
        fechasServicioDTO1.setId(1L);
        FechasServicioDTO fechasServicioDTO2 = new FechasServicioDTO();
        assertThat(fechasServicioDTO1).isNotEqualTo(fechasServicioDTO2);
        fechasServicioDTO2.setId(fechasServicioDTO1.getId());
        assertThat(fechasServicioDTO1).isEqualTo(fechasServicioDTO2);
        fechasServicioDTO2.setId(2L);
        assertThat(fechasServicioDTO1).isNotEqualTo(fechasServicioDTO2);
        fechasServicioDTO1.setId(null);
        assertThat(fechasServicioDTO1).isNotEqualTo(fechasServicioDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(fechasServicioMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(fechasServicioMapper.fromId(null)).isNull();
    }
}
