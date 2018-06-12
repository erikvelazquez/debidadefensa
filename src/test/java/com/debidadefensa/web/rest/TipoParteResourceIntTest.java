package com.debidadefensa.web.rest;

import com.debidadefensa.DebidadefensaApp;

import com.debidadefensa.domain.TipoParte;
import com.debidadefensa.repository.TipoParteRepository;
import com.debidadefensa.service.TipoParteService;
import com.debidadefensa.repository.search.TipoParteSearchRepository;
import com.debidadefensa.service.dto.TipoParteDTO;
import com.debidadefensa.service.mapper.TipoParteMapper;
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
 * Test class for the TipoParteResource REST controller.
 *
 * @see TipoParteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DebidadefensaApp.class)
public class TipoParteResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private TipoParteRepository tipoParteRepository;

    @Autowired
    private TipoParteMapper tipoParteMapper;

    @Autowired
    private TipoParteService tipoParteService;

    @Autowired
    private TipoParteSearchRepository tipoParteSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTipoParteMockMvc;

    private TipoParte tipoParte;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoParteResource tipoParteResource = new TipoParteResource(tipoParteService);
        this.restTipoParteMockMvc = MockMvcBuilders.standaloneSetup(tipoParteResource)
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
    public static TipoParte createEntity(EntityManager em) {
        TipoParte tipoParte = new TipoParte()
            .descripcion(DEFAULT_DESCRIPCION);
        return tipoParte;
    }

    @Before
    public void initTest() {
        tipoParteSearchRepository.deleteAll();
        tipoParte = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoParte() throws Exception {
        int databaseSizeBeforeCreate = tipoParteRepository.findAll().size();

        // Create the TipoParte
        TipoParteDTO tipoParteDTO = tipoParteMapper.toDto(tipoParte);
        restTipoParteMockMvc.perform(post("/api/tipo-partes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoParteDTO)))
            .andExpect(status().isCreated());

        // Validate the TipoParte in the database
        List<TipoParte> tipoParteList = tipoParteRepository.findAll();
        assertThat(tipoParteList).hasSize(databaseSizeBeforeCreate + 1);
        TipoParte testTipoParte = tipoParteList.get(tipoParteList.size() - 1);
        assertThat(testTipoParte.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);

        // Validate the TipoParte in Elasticsearch
        TipoParte tipoParteEs = tipoParteSearchRepository.findOne(testTipoParte.getId());
        assertThat(tipoParteEs).isEqualToIgnoringGivenFields(testTipoParte);
    }

    @Test
    @Transactional
    public void createTipoParteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoParteRepository.findAll().size();

        // Create the TipoParte with an existing ID
        tipoParte.setId(1L);
        TipoParteDTO tipoParteDTO = tipoParteMapper.toDto(tipoParte);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoParteMockMvc.perform(post("/api/tipo-partes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoParteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoParte in the database
        List<TipoParte> tipoParteList = tipoParteRepository.findAll();
        assertThat(tipoParteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTipoPartes() throws Exception {
        // Initialize the database
        tipoParteRepository.saveAndFlush(tipoParte);

        // Get all the tipoParteList
        restTipoParteMockMvc.perform(get("/api/tipo-partes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoParte.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void getTipoParte() throws Exception {
        // Initialize the database
        tipoParteRepository.saveAndFlush(tipoParte);

        // Get the tipoParte
        restTipoParteMockMvc.perform(get("/api/tipo-partes/{id}", tipoParte.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoParte.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoParte() throws Exception {
        // Get the tipoParte
        restTipoParteMockMvc.perform(get("/api/tipo-partes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoParte() throws Exception {
        // Initialize the database
        tipoParteRepository.saveAndFlush(tipoParte);
        tipoParteSearchRepository.save(tipoParte);
        int databaseSizeBeforeUpdate = tipoParteRepository.findAll().size();

        // Update the tipoParte
        TipoParte updatedTipoParte = tipoParteRepository.findOne(tipoParte.getId());
        // Disconnect from session so that the updates on updatedTipoParte are not directly saved in db
        em.detach(updatedTipoParte);
        updatedTipoParte
            .descripcion(UPDATED_DESCRIPCION);
        TipoParteDTO tipoParteDTO = tipoParteMapper.toDto(updatedTipoParte);

        restTipoParteMockMvc.perform(put("/api/tipo-partes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoParteDTO)))
            .andExpect(status().isOk());

        // Validate the TipoParte in the database
        List<TipoParte> tipoParteList = tipoParteRepository.findAll();
        assertThat(tipoParteList).hasSize(databaseSizeBeforeUpdate);
        TipoParte testTipoParte = tipoParteList.get(tipoParteList.size() - 1);
        assertThat(testTipoParte.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);

        // Validate the TipoParte in Elasticsearch
        TipoParte tipoParteEs = tipoParteSearchRepository.findOne(testTipoParte.getId());
        assertThat(tipoParteEs).isEqualToIgnoringGivenFields(testTipoParte);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoParte() throws Exception {
        int databaseSizeBeforeUpdate = tipoParteRepository.findAll().size();

        // Create the TipoParte
        TipoParteDTO tipoParteDTO = tipoParteMapper.toDto(tipoParte);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTipoParteMockMvc.perform(put("/api/tipo-partes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoParteDTO)))
            .andExpect(status().isCreated());

        // Validate the TipoParte in the database
        List<TipoParte> tipoParteList = tipoParteRepository.findAll();
        assertThat(tipoParteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTipoParte() throws Exception {
        // Initialize the database
        tipoParteRepository.saveAndFlush(tipoParte);
        tipoParteSearchRepository.save(tipoParte);
        int databaseSizeBeforeDelete = tipoParteRepository.findAll().size();

        // Get the tipoParte
        restTipoParteMockMvc.perform(delete("/api/tipo-partes/{id}", tipoParte.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean tipoParteExistsInEs = tipoParteSearchRepository.exists(tipoParte.getId());
        assertThat(tipoParteExistsInEs).isFalse();

        // Validate the database is empty
        List<TipoParte> tipoParteList = tipoParteRepository.findAll();
        assertThat(tipoParteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTipoParte() throws Exception {
        // Initialize the database
        tipoParteRepository.saveAndFlush(tipoParte);
        tipoParteSearchRepository.save(tipoParte);

        // Search the tipoParte
        restTipoParteMockMvc.perform(get("/api/_search/tipo-partes?query=id:" + tipoParte.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoParte.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoParte.class);
        TipoParte tipoParte1 = new TipoParte();
        tipoParte1.setId(1L);
        TipoParte tipoParte2 = new TipoParte();
        tipoParte2.setId(tipoParte1.getId());
        assertThat(tipoParte1).isEqualTo(tipoParte2);
        tipoParte2.setId(2L);
        assertThat(tipoParte1).isNotEqualTo(tipoParte2);
        tipoParte1.setId(null);
        assertThat(tipoParte1).isNotEqualTo(tipoParte2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoParteDTO.class);
        TipoParteDTO tipoParteDTO1 = new TipoParteDTO();
        tipoParteDTO1.setId(1L);
        TipoParteDTO tipoParteDTO2 = new TipoParteDTO();
        assertThat(tipoParteDTO1).isNotEqualTo(tipoParteDTO2);
        tipoParteDTO2.setId(tipoParteDTO1.getId());
        assertThat(tipoParteDTO1).isEqualTo(tipoParteDTO2);
        tipoParteDTO2.setId(2L);
        assertThat(tipoParteDTO1).isNotEqualTo(tipoParteDTO2);
        tipoParteDTO1.setId(null);
        assertThat(tipoParteDTO1).isNotEqualTo(tipoParteDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(tipoParteMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(tipoParteMapper.fromId(null)).isNull();
    }
}
