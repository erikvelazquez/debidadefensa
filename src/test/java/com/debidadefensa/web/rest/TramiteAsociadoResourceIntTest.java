package com.debidadefensa.web.rest;

import com.debidadefensa.DebidadefensaApp;

import com.debidadefensa.domain.TramiteAsociado;
import com.debidadefensa.repository.TramiteAsociadoRepository;
import com.debidadefensa.service.TramiteAsociadoService;
import com.debidadefensa.repository.search.TramiteAsociadoSearchRepository;
import com.debidadefensa.service.dto.TramiteAsociadoDTO;
import com.debidadefensa.service.mapper.TramiteAsociadoMapper;
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
 * Test class for the TramiteAsociadoResource REST controller.
 *
 * @see TramiteAsociadoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DebidadefensaApp.class)
public class TramiteAsociadoResourceIntTest {

    private static final String DEFAULT_TIPO_TRAMITE = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_TRAMITE = "BBBBBBBBBB";

    private static final Long DEFAULT_ID_TRAMITE = 1L;
    private static final Long UPDATED_ID_TRAMITE = 2L;

    @Autowired
    private TramiteAsociadoRepository tramiteAsociadoRepository;

    @Autowired
    private TramiteAsociadoMapper tramiteAsociadoMapper;

    @Autowired
    private TramiteAsociadoService tramiteAsociadoService;

    @Autowired
    private TramiteAsociadoSearchRepository tramiteAsociadoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTramiteAsociadoMockMvc;

    private TramiteAsociado tramiteAsociado;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TramiteAsociadoResource tramiteAsociadoResource = new TramiteAsociadoResource(tramiteAsociadoService);
        this.restTramiteAsociadoMockMvc = MockMvcBuilders.standaloneSetup(tramiteAsociadoResource)
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
    public static TramiteAsociado createEntity(EntityManager em) {
        TramiteAsociado tramiteAsociado = new TramiteAsociado()
            .tipoTramite(DEFAULT_TIPO_TRAMITE)
            .idTramite(DEFAULT_ID_TRAMITE);
        return tramiteAsociado;
    }

    @Before
    public void initTest() {
        tramiteAsociadoSearchRepository.deleteAll();
        tramiteAsociado = createEntity(em);
    }

    @Test
    @Transactional
    public void createTramiteAsociado() throws Exception {
        int databaseSizeBeforeCreate = tramiteAsociadoRepository.findAll().size();

        // Create the TramiteAsociado
        TramiteAsociadoDTO tramiteAsociadoDTO = tramiteAsociadoMapper.toDto(tramiteAsociado);
        restTramiteAsociadoMockMvc.perform(post("/api/tramite-asociados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tramiteAsociadoDTO)))
            .andExpect(status().isCreated());

        // Validate the TramiteAsociado in the database
        List<TramiteAsociado> tramiteAsociadoList = tramiteAsociadoRepository.findAll();
        assertThat(tramiteAsociadoList).hasSize(databaseSizeBeforeCreate + 1);
        TramiteAsociado testTramiteAsociado = tramiteAsociadoList.get(tramiteAsociadoList.size() - 1);
        assertThat(testTramiteAsociado.getTipoTramite()).isEqualTo(DEFAULT_TIPO_TRAMITE);
        assertThat(testTramiteAsociado.getIdTramite()).isEqualTo(DEFAULT_ID_TRAMITE);

        // Validate the TramiteAsociado in Elasticsearch
        TramiteAsociado tramiteAsociadoEs = tramiteAsociadoSearchRepository.findOne(testTramiteAsociado.getId());
        assertThat(tramiteAsociadoEs).isEqualToIgnoringGivenFields(testTramiteAsociado);
    }

    @Test
    @Transactional
    public void createTramiteAsociadoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tramiteAsociadoRepository.findAll().size();

        // Create the TramiteAsociado with an existing ID
        tramiteAsociado.setId(1L);
        TramiteAsociadoDTO tramiteAsociadoDTO = tramiteAsociadoMapper.toDto(tramiteAsociado);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTramiteAsociadoMockMvc.perform(post("/api/tramite-asociados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tramiteAsociadoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TramiteAsociado in the database
        List<TramiteAsociado> tramiteAsociadoList = tramiteAsociadoRepository.findAll();
        assertThat(tramiteAsociadoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTramiteAsociados() throws Exception {
        // Initialize the database
        tramiteAsociadoRepository.saveAndFlush(tramiteAsociado);

        // Get all the tramiteAsociadoList
        restTramiteAsociadoMockMvc.perform(get("/api/tramite-asociados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tramiteAsociado.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipoTramite").value(hasItem(DEFAULT_TIPO_TRAMITE.toString())))
            .andExpect(jsonPath("$.[*].idTramite").value(hasItem(DEFAULT_ID_TRAMITE.intValue())));
    }

    @Test
    @Transactional
    public void getTramiteAsociado() throws Exception {
        // Initialize the database
        tramiteAsociadoRepository.saveAndFlush(tramiteAsociado);

        // Get the tramiteAsociado
        restTramiteAsociadoMockMvc.perform(get("/api/tramite-asociados/{id}", tramiteAsociado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tramiteAsociado.getId().intValue()))
            .andExpect(jsonPath("$.tipoTramite").value(DEFAULT_TIPO_TRAMITE.toString()))
            .andExpect(jsonPath("$.idTramite").value(DEFAULT_ID_TRAMITE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTramiteAsociado() throws Exception {
        // Get the tramiteAsociado
        restTramiteAsociadoMockMvc.perform(get("/api/tramite-asociados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTramiteAsociado() throws Exception {
        // Initialize the database
        tramiteAsociadoRepository.saveAndFlush(tramiteAsociado);
        tramiteAsociadoSearchRepository.save(tramiteAsociado);
        int databaseSizeBeforeUpdate = tramiteAsociadoRepository.findAll().size();

        // Update the tramiteAsociado
        TramiteAsociado updatedTramiteAsociado = tramiteAsociadoRepository.findOne(tramiteAsociado.getId());
        // Disconnect from session so that the updates on updatedTramiteAsociado are not directly saved in db
        em.detach(updatedTramiteAsociado);
        updatedTramiteAsociado
            .tipoTramite(UPDATED_TIPO_TRAMITE)
            .idTramite(UPDATED_ID_TRAMITE);
        TramiteAsociadoDTO tramiteAsociadoDTO = tramiteAsociadoMapper.toDto(updatedTramiteAsociado);

        restTramiteAsociadoMockMvc.perform(put("/api/tramite-asociados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tramiteAsociadoDTO)))
            .andExpect(status().isOk());

        // Validate the TramiteAsociado in the database
        List<TramiteAsociado> tramiteAsociadoList = tramiteAsociadoRepository.findAll();
        assertThat(tramiteAsociadoList).hasSize(databaseSizeBeforeUpdate);
        TramiteAsociado testTramiteAsociado = tramiteAsociadoList.get(tramiteAsociadoList.size() - 1);
        assertThat(testTramiteAsociado.getTipoTramite()).isEqualTo(UPDATED_TIPO_TRAMITE);
        assertThat(testTramiteAsociado.getIdTramite()).isEqualTo(UPDATED_ID_TRAMITE);

        // Validate the TramiteAsociado in Elasticsearch
        TramiteAsociado tramiteAsociadoEs = tramiteAsociadoSearchRepository.findOne(testTramiteAsociado.getId());
        assertThat(tramiteAsociadoEs).isEqualToIgnoringGivenFields(testTramiteAsociado);
    }

    @Test
    @Transactional
    public void updateNonExistingTramiteAsociado() throws Exception {
        int databaseSizeBeforeUpdate = tramiteAsociadoRepository.findAll().size();

        // Create the TramiteAsociado
        TramiteAsociadoDTO tramiteAsociadoDTO = tramiteAsociadoMapper.toDto(tramiteAsociado);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTramiteAsociadoMockMvc.perform(put("/api/tramite-asociados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tramiteAsociadoDTO)))
            .andExpect(status().isCreated());

        // Validate the TramiteAsociado in the database
        List<TramiteAsociado> tramiteAsociadoList = tramiteAsociadoRepository.findAll();
        assertThat(tramiteAsociadoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTramiteAsociado() throws Exception {
        // Initialize the database
        tramiteAsociadoRepository.saveAndFlush(tramiteAsociado);
        tramiteAsociadoSearchRepository.save(tramiteAsociado);
        int databaseSizeBeforeDelete = tramiteAsociadoRepository.findAll().size();

        // Get the tramiteAsociado
        restTramiteAsociadoMockMvc.perform(delete("/api/tramite-asociados/{id}", tramiteAsociado.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean tramiteAsociadoExistsInEs = tramiteAsociadoSearchRepository.exists(tramiteAsociado.getId());
        assertThat(tramiteAsociadoExistsInEs).isFalse();

        // Validate the database is empty
        List<TramiteAsociado> tramiteAsociadoList = tramiteAsociadoRepository.findAll();
        assertThat(tramiteAsociadoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTramiteAsociado() throws Exception {
        // Initialize the database
        tramiteAsociadoRepository.saveAndFlush(tramiteAsociado);
        tramiteAsociadoSearchRepository.save(tramiteAsociado);

        // Search the tramiteAsociado
        restTramiteAsociadoMockMvc.perform(get("/api/_search/tramite-asociados?query=id:" + tramiteAsociado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tramiteAsociado.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipoTramite").value(hasItem(DEFAULT_TIPO_TRAMITE.toString())))
            .andExpect(jsonPath("$.[*].idTramite").value(hasItem(DEFAULT_ID_TRAMITE.intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TramiteAsociado.class);
        TramiteAsociado tramiteAsociado1 = new TramiteAsociado();
        tramiteAsociado1.setId(1L);
        TramiteAsociado tramiteAsociado2 = new TramiteAsociado();
        tramiteAsociado2.setId(tramiteAsociado1.getId());
        assertThat(tramiteAsociado1).isEqualTo(tramiteAsociado2);
        tramiteAsociado2.setId(2L);
        assertThat(tramiteAsociado1).isNotEqualTo(tramiteAsociado2);
        tramiteAsociado1.setId(null);
        assertThat(tramiteAsociado1).isNotEqualTo(tramiteAsociado2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TramiteAsociadoDTO.class);
        TramiteAsociadoDTO tramiteAsociadoDTO1 = new TramiteAsociadoDTO();
        tramiteAsociadoDTO1.setId(1L);
        TramiteAsociadoDTO tramiteAsociadoDTO2 = new TramiteAsociadoDTO();
        assertThat(tramiteAsociadoDTO1).isNotEqualTo(tramiteAsociadoDTO2);
        tramiteAsociadoDTO2.setId(tramiteAsociadoDTO1.getId());
        assertThat(tramiteAsociadoDTO1).isEqualTo(tramiteAsociadoDTO2);
        tramiteAsociadoDTO2.setId(2L);
        assertThat(tramiteAsociadoDTO1).isNotEqualTo(tramiteAsociadoDTO2);
        tramiteAsociadoDTO1.setId(null);
        assertThat(tramiteAsociadoDTO1).isNotEqualTo(tramiteAsociadoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(tramiteAsociadoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(tramiteAsociadoMapper.fromId(null)).isNull();
    }
}
