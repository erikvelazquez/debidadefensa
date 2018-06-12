package com.debidadefensa.web.rest;

import com.debidadefensa.DebidadefensaApp;

import com.debidadefensa.domain.Parte;
import com.debidadefensa.repository.ParteRepository;
import com.debidadefensa.service.ParteService;
import com.debidadefensa.repository.search.ParteSearchRepository;
import com.debidadefensa.service.dto.ParteDTO;
import com.debidadefensa.service.mapper.ParteMapper;
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
 * Test class for the ParteResource REST controller.
 *
 * @see ParteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DebidadefensaApp.class)
public class ParteResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private ParteRepository parteRepository;

    @Autowired
    private ParteMapper parteMapper;

    @Autowired
    private ParteService parteService;

    @Autowired
    private ParteSearchRepository parteSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restParteMockMvc;

    private Parte parte;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParteResource parteResource = new ParteResource(parteService);
        this.restParteMockMvc = MockMvcBuilders.standaloneSetup(parteResource)
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
    public static Parte createEntity(EntityManager em) {
        Parte parte = new Parte()
            .nombre(DEFAULT_NOMBRE);
        return parte;
    }

    @Before
    public void initTest() {
        parteSearchRepository.deleteAll();
        parte = createEntity(em);
    }

    @Test
    @Transactional
    public void createParte() throws Exception {
        int databaseSizeBeforeCreate = parteRepository.findAll().size();

        // Create the Parte
        ParteDTO parteDTO = parteMapper.toDto(parte);
        restParteMockMvc.perform(post("/api/partes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parteDTO)))
            .andExpect(status().isCreated());

        // Validate the Parte in the database
        List<Parte> parteList = parteRepository.findAll();
        assertThat(parteList).hasSize(databaseSizeBeforeCreate + 1);
        Parte testParte = parteList.get(parteList.size() - 1);
        assertThat(testParte.getNombre()).isEqualTo(DEFAULT_NOMBRE);

        // Validate the Parte in Elasticsearch
        Parte parteEs = parteSearchRepository.findOne(testParte.getId());
        assertThat(parteEs).isEqualToIgnoringGivenFields(testParte);
    }

    @Test
    @Transactional
    public void createParteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parteRepository.findAll().size();

        // Create the Parte with an existing ID
        parte.setId(1L);
        ParteDTO parteDTO = parteMapper.toDto(parte);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParteMockMvc.perform(post("/api/partes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Parte in the database
        List<Parte> parteList = parteRepository.findAll();
        assertThat(parteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPartes() throws Exception {
        // Initialize the database
        parteRepository.saveAndFlush(parte);

        // Get all the parteList
        restParteMockMvc.perform(get("/api/partes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parte.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void getParte() throws Exception {
        // Initialize the database
        parteRepository.saveAndFlush(parte);

        // Get the parte
        restParteMockMvc.perform(get("/api/partes/{id}", parte.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parte.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingParte() throws Exception {
        // Get the parte
        restParteMockMvc.perform(get("/api/partes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParte() throws Exception {
        // Initialize the database
        parteRepository.saveAndFlush(parte);
        parteSearchRepository.save(parte);
        int databaseSizeBeforeUpdate = parteRepository.findAll().size();

        // Update the parte
        Parte updatedParte = parteRepository.findOne(parte.getId());
        // Disconnect from session so that the updates on updatedParte are not directly saved in db
        em.detach(updatedParte);
        updatedParte
            .nombre(UPDATED_NOMBRE);
        ParteDTO parteDTO = parteMapper.toDto(updatedParte);

        restParteMockMvc.perform(put("/api/partes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parteDTO)))
            .andExpect(status().isOk());

        // Validate the Parte in the database
        List<Parte> parteList = parteRepository.findAll();
        assertThat(parteList).hasSize(databaseSizeBeforeUpdate);
        Parte testParte = parteList.get(parteList.size() - 1);
        assertThat(testParte.getNombre()).isEqualTo(UPDATED_NOMBRE);

        // Validate the Parte in Elasticsearch
        Parte parteEs = parteSearchRepository.findOne(testParte.getId());
        assertThat(parteEs).isEqualToIgnoringGivenFields(testParte);
    }

    @Test
    @Transactional
    public void updateNonExistingParte() throws Exception {
        int databaseSizeBeforeUpdate = parteRepository.findAll().size();

        // Create the Parte
        ParteDTO parteDTO = parteMapper.toDto(parte);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restParteMockMvc.perform(put("/api/partes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parteDTO)))
            .andExpect(status().isCreated());

        // Validate the Parte in the database
        List<Parte> parteList = parteRepository.findAll();
        assertThat(parteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteParte() throws Exception {
        // Initialize the database
        parteRepository.saveAndFlush(parte);
        parteSearchRepository.save(parte);
        int databaseSizeBeforeDelete = parteRepository.findAll().size();

        // Get the parte
        restParteMockMvc.perform(delete("/api/partes/{id}", parte.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean parteExistsInEs = parteSearchRepository.exists(parte.getId());
        assertThat(parteExistsInEs).isFalse();

        // Validate the database is empty
        List<Parte> parteList = parteRepository.findAll();
        assertThat(parteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchParte() throws Exception {
        // Initialize the database
        parteRepository.saveAndFlush(parte);
        parteSearchRepository.save(parte);

        // Search the parte
        restParteMockMvc.perform(get("/api/_search/partes?query=id:" + parte.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parte.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Parte.class);
        Parte parte1 = new Parte();
        parte1.setId(1L);
        Parte parte2 = new Parte();
        parte2.setId(parte1.getId());
        assertThat(parte1).isEqualTo(parte2);
        parte2.setId(2L);
        assertThat(parte1).isNotEqualTo(parte2);
        parte1.setId(null);
        assertThat(parte1).isNotEqualTo(parte2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParteDTO.class);
        ParteDTO parteDTO1 = new ParteDTO();
        parteDTO1.setId(1L);
        ParteDTO parteDTO2 = new ParteDTO();
        assertThat(parteDTO1).isNotEqualTo(parteDTO2);
        parteDTO2.setId(parteDTO1.getId());
        assertThat(parteDTO1).isEqualTo(parteDTO2);
        parteDTO2.setId(2L);
        assertThat(parteDTO1).isNotEqualTo(parteDTO2);
        parteDTO1.setId(null);
        assertThat(parteDTO1).isNotEqualTo(parteDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(parteMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(parteMapper.fromId(null)).isNull();
    }
}
