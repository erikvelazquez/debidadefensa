package com.debidadefensa.web.rest;

import com.debidadefensa.DebidadefensaApp;

import com.debidadefensa.domain.TipoServicio;
import com.debidadefensa.repository.TipoServicioRepository;
import com.debidadefensa.service.TipoServicioService;
import com.debidadefensa.repository.search.TipoServicioSearchRepository;
import com.debidadefensa.service.dto.TipoServicioDTO;
import com.debidadefensa.service.mapper.TipoServicioMapper;
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
import java.util.List;

import static com.debidadefensa.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TipoServicioResource REST controller.
 *
 * @see TipoServicioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DebidadefensaApp.class)
public class TipoServicioResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private TipoServicioRepository tipoServicioRepository;

    @Autowired
    private TipoServicioMapper tipoServicioMapper;

    @Autowired
    private TipoServicioService tipoServicioService;

    @Autowired
    private TipoServicioSearchRepository tipoServicioSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTipoServicioMockMvc;

    private TipoServicio tipoServicio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoServicioResource tipoServicioResource = new TipoServicioResource(tipoServicioService);
        this.restTipoServicioMockMvc = MockMvcBuilders.standaloneSetup(tipoServicioResource)
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
    public static TipoServicio createEntity(EntityManager em) {
        TipoServicio tipoServicio = new TipoServicio()
            .descripcion(DEFAULT_DESCRIPCION);
        return tipoServicio;
    }

    @Before
    public void initTest() {
        tipoServicioSearchRepository.deleteAll();
        tipoServicio = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoServicio() throws Exception {
        int databaseSizeBeforeCreate = tipoServicioRepository.findAll().size();

        // Create the TipoServicio
        TipoServicioDTO tipoServicioDTO = tipoServicioMapper.toDto(tipoServicio);
        restTipoServicioMockMvc.perform(post("/api/tipo-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoServicioDTO)))
            .andExpect(status().isCreated());

        // Validate the TipoServicio in the database
        List<TipoServicio> tipoServicioList = tipoServicioRepository.findAll();
        assertThat(tipoServicioList).hasSize(databaseSizeBeforeCreate + 1);
        TipoServicio testTipoServicio = tipoServicioList.get(tipoServicioList.size() - 1);
        assertThat(testTipoServicio.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);

        // Validate the TipoServicio in Elasticsearch
        TipoServicio tipoServicioEs = tipoServicioSearchRepository.findOne(testTipoServicio.getId());
        assertThat(tipoServicioEs).isEqualToIgnoringGivenFields(testTipoServicio);
    }

    @Test
    @Transactional
    public void createTipoServicioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoServicioRepository.findAll().size();

        // Create the TipoServicio with an existing ID
        tipoServicio.setId(1L);
        TipoServicioDTO tipoServicioDTO = tipoServicioMapper.toDto(tipoServicio);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoServicioMockMvc.perform(post("/api/tipo-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoServicioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoServicio in the database
        List<TipoServicio> tipoServicioList = tipoServicioRepository.findAll();
        assertThat(tipoServicioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTipoServicios() throws Exception {
        // Initialize the database
        tipoServicioRepository.saveAndFlush(tipoServicio);

        // Get all the tipoServicioList
        restTipoServicioMockMvc.perform(get("/api/tipo-servicios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoServicio.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void getTipoServicio() throws Exception {
        // Initialize the database
        tipoServicioRepository.saveAndFlush(tipoServicio);

        // Get the tipoServicio
        restTipoServicioMockMvc.perform(get("/api/tipo-servicios/{id}", tipoServicio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoServicio.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoServicio() throws Exception {
        // Get the tipoServicio
        restTipoServicioMockMvc.perform(get("/api/tipo-servicios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoServicio() throws Exception {
        // Initialize the database
        tipoServicioRepository.saveAndFlush(tipoServicio);
        tipoServicioSearchRepository.save(tipoServicio);
        int databaseSizeBeforeUpdate = tipoServicioRepository.findAll().size();

        // Update the tipoServicio
        TipoServicio updatedTipoServicio = tipoServicioRepository.findOne(tipoServicio.getId());
        // Disconnect from session so that the updates on updatedTipoServicio are not directly saved in db
        em.detach(updatedTipoServicio);
        updatedTipoServicio
            .descripcion(UPDATED_DESCRIPCION);
        TipoServicioDTO tipoServicioDTO = tipoServicioMapper.toDto(updatedTipoServicio);

        restTipoServicioMockMvc.perform(put("/api/tipo-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoServicioDTO)))
            .andExpect(status().isOk());

        // Validate the TipoServicio in the database
        List<TipoServicio> tipoServicioList = tipoServicioRepository.findAll();
        assertThat(tipoServicioList).hasSize(databaseSizeBeforeUpdate);
        TipoServicio testTipoServicio = tipoServicioList.get(tipoServicioList.size() - 1);
        assertThat(testTipoServicio.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);

        // Validate the TipoServicio in Elasticsearch
        TipoServicio tipoServicioEs = tipoServicioSearchRepository.findOne(testTipoServicio.getId());
        assertThat(tipoServicioEs).isEqualToIgnoringGivenFields(testTipoServicio);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoServicio() throws Exception {
        int databaseSizeBeforeUpdate = tipoServicioRepository.findAll().size();

        // Create the TipoServicio
        TipoServicioDTO tipoServicioDTO = tipoServicioMapper.toDto(tipoServicio);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTipoServicioMockMvc.perform(put("/api/tipo-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoServicioDTO)))
            .andExpect(status().isCreated());

        // Validate the TipoServicio in the database
        List<TipoServicio> tipoServicioList = tipoServicioRepository.findAll();
        assertThat(tipoServicioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTipoServicio() throws Exception {
        // Initialize the database
        tipoServicioRepository.saveAndFlush(tipoServicio);
        tipoServicioSearchRepository.save(tipoServicio);
        int databaseSizeBeforeDelete = tipoServicioRepository.findAll().size();

        // Get the tipoServicio
        restTipoServicioMockMvc.perform(delete("/api/tipo-servicios/{id}", tipoServicio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean tipoServicioExistsInEs = tipoServicioSearchRepository.exists(tipoServicio.getId());
        assertThat(tipoServicioExistsInEs).isFalse();

        // Validate the database is empty
        List<TipoServicio> tipoServicioList = tipoServicioRepository.findAll();
        assertThat(tipoServicioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTipoServicio() throws Exception {
        // Initialize the database
        tipoServicioRepository.saveAndFlush(tipoServicio);
        tipoServicioSearchRepository.save(tipoServicio);

        // Search the tipoServicio
        restTipoServicioMockMvc.perform(get("/api/_search/tipo-servicios?query=id:" + tipoServicio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoServicio.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoServicio.class);
        TipoServicio tipoServicio1 = new TipoServicio();
        tipoServicio1.setId(1L);
        TipoServicio tipoServicio2 = new TipoServicio();
        tipoServicio2.setId(tipoServicio1.getId());
        assertThat(tipoServicio1).isEqualTo(tipoServicio2);
        tipoServicio2.setId(2L);
        assertThat(tipoServicio1).isNotEqualTo(tipoServicio2);
        tipoServicio1.setId(null);
        assertThat(tipoServicio1).isNotEqualTo(tipoServicio2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoServicioDTO.class);
        TipoServicioDTO tipoServicioDTO1 = new TipoServicioDTO();
        tipoServicioDTO1.setId(1L);
        TipoServicioDTO tipoServicioDTO2 = new TipoServicioDTO();
        assertThat(tipoServicioDTO1).isNotEqualTo(tipoServicioDTO2);
        tipoServicioDTO2.setId(tipoServicioDTO1.getId());
        assertThat(tipoServicioDTO1).isEqualTo(tipoServicioDTO2);
        tipoServicioDTO2.setId(2L);
        assertThat(tipoServicioDTO1).isNotEqualTo(tipoServicioDTO2);
        tipoServicioDTO1.setId(null);
        assertThat(tipoServicioDTO1).isNotEqualTo(tipoServicioDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(tipoServicioMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(tipoServicioMapper.fromId(null)).isNull();
    }
}
