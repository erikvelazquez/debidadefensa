package com.debidadefensa.web.rest;

import com.debidadefensa.DebidadefensaApp;

import com.debidadefensa.domain.CostoServicio;
import com.debidadefensa.repository.CostoServicioRepository;
import com.debidadefensa.service.CostoServicioService;
import com.debidadefensa.repository.search.CostoServicioSearchRepository;
import com.debidadefensa.service.dto.CostoServicioDTO;
import com.debidadefensa.service.mapper.CostoServicioMapper;
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
 * Test class for the CostoServicioResource REST controller.
 *
 * @see CostoServicioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DebidadefensaApp.class)
public class CostoServicioResourceIntTest {

    private static final String DEFAULT_TIPO_COSTO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_COSTO = "BBBBBBBBBB";

    private static final String DEFAULT_CONCEPTO = "AAAAAAAAAA";
    private static final String UPDATED_CONCEPTO = "BBBBBBBBBB";

    private static final Float DEFAULT_COSTO = 1F;
    private static final Float UPDATED_COSTO = 2F;

    @Autowired
    private CostoServicioRepository costoServicioRepository;

    @Autowired
    private CostoServicioMapper costoServicioMapper;

    @Autowired
    private CostoServicioService costoServicioService;

    @Autowired
    private CostoServicioSearchRepository costoServicioSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCostoServicioMockMvc;

    private CostoServicio costoServicio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CostoServicioResource costoServicioResource = new CostoServicioResource(costoServicioService);
        this.restCostoServicioMockMvc = MockMvcBuilders.standaloneSetup(costoServicioResource)
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
    public static CostoServicio createEntity(EntityManager em) {
        CostoServicio costoServicio = new CostoServicio()
            .tipoCosto(DEFAULT_TIPO_COSTO)
            .concepto(DEFAULT_CONCEPTO)
            .costo(DEFAULT_COSTO);
        return costoServicio;
    }

    @Before
    public void initTest() {
        costoServicioSearchRepository.deleteAll();
        costoServicio = createEntity(em);
    }

    @Test
    @Transactional
    public void createCostoServicio() throws Exception {
        int databaseSizeBeforeCreate = costoServicioRepository.findAll().size();

        // Create the CostoServicio
        CostoServicioDTO costoServicioDTO = costoServicioMapper.toDto(costoServicio);
        restCostoServicioMockMvc.perform(post("/api/costo-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costoServicioDTO)))
            .andExpect(status().isCreated());

        // Validate the CostoServicio in the database
        List<CostoServicio> costoServicioList = costoServicioRepository.findAll();
        assertThat(costoServicioList).hasSize(databaseSizeBeforeCreate + 1);
        CostoServicio testCostoServicio = costoServicioList.get(costoServicioList.size() - 1);
        assertThat(testCostoServicio.getTipoCosto()).isEqualTo(DEFAULT_TIPO_COSTO);
        assertThat(testCostoServicio.getConcepto()).isEqualTo(DEFAULT_CONCEPTO);
        assertThat(testCostoServicio.getCosto()).isEqualTo(DEFAULT_COSTO);

        // Validate the CostoServicio in Elasticsearch
        CostoServicio costoServicioEs = costoServicioSearchRepository.findOne(testCostoServicio.getId());
        assertThat(costoServicioEs).isEqualToIgnoringGivenFields(testCostoServicio);
    }

    @Test
    @Transactional
    public void createCostoServicioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = costoServicioRepository.findAll().size();

        // Create the CostoServicio with an existing ID
        costoServicio.setId(1L);
        CostoServicioDTO costoServicioDTO = costoServicioMapper.toDto(costoServicio);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCostoServicioMockMvc.perform(post("/api/costo-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costoServicioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CostoServicio in the database
        List<CostoServicio> costoServicioList = costoServicioRepository.findAll();
        assertThat(costoServicioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCostoServicios() throws Exception {
        // Initialize the database
        costoServicioRepository.saveAndFlush(costoServicio);

        // Get all the costoServicioList
        restCostoServicioMockMvc.perform(get("/api/costo-servicios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(costoServicio.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipoCosto").value(hasItem(DEFAULT_TIPO_COSTO.toString())))
            .andExpect(jsonPath("$.[*].concepto").value(hasItem(DEFAULT_CONCEPTO.toString())))
            .andExpect(jsonPath("$.[*].costo").value(hasItem(DEFAULT_COSTO.doubleValue())));
    }

    @Test
    @Transactional
    public void getCostoServicio() throws Exception {
        // Initialize the database
        costoServicioRepository.saveAndFlush(costoServicio);

        // Get the costoServicio
        restCostoServicioMockMvc.perform(get("/api/costo-servicios/{id}", costoServicio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(costoServicio.getId().intValue()))
            .andExpect(jsonPath("$.tipoCosto").value(DEFAULT_TIPO_COSTO.toString()))
            .andExpect(jsonPath("$.concepto").value(DEFAULT_CONCEPTO.toString()))
            .andExpect(jsonPath("$.costo").value(DEFAULT_COSTO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCostoServicio() throws Exception {
        // Get the costoServicio
        restCostoServicioMockMvc.perform(get("/api/costo-servicios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCostoServicio() throws Exception {
        // Initialize the database
        costoServicioRepository.saveAndFlush(costoServicio);
        costoServicioSearchRepository.save(costoServicio);
        int databaseSizeBeforeUpdate = costoServicioRepository.findAll().size();

        // Update the costoServicio
        CostoServicio updatedCostoServicio = costoServicioRepository.findOne(costoServicio.getId());
        // Disconnect from session so that the updates on updatedCostoServicio are not directly saved in db
        em.detach(updatedCostoServicio);
        updatedCostoServicio
            .tipoCosto(UPDATED_TIPO_COSTO)
            .concepto(UPDATED_CONCEPTO)
            .costo(UPDATED_COSTO);
        CostoServicioDTO costoServicioDTO = costoServicioMapper.toDto(updatedCostoServicio);

        restCostoServicioMockMvc.perform(put("/api/costo-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costoServicioDTO)))
            .andExpect(status().isOk());

        // Validate the CostoServicio in the database
        List<CostoServicio> costoServicioList = costoServicioRepository.findAll();
        assertThat(costoServicioList).hasSize(databaseSizeBeforeUpdate);
        CostoServicio testCostoServicio = costoServicioList.get(costoServicioList.size() - 1);
        assertThat(testCostoServicio.getTipoCosto()).isEqualTo(UPDATED_TIPO_COSTO);
        assertThat(testCostoServicio.getConcepto()).isEqualTo(UPDATED_CONCEPTO);
        assertThat(testCostoServicio.getCosto()).isEqualTo(UPDATED_COSTO);

        // Validate the CostoServicio in Elasticsearch
        CostoServicio costoServicioEs = costoServicioSearchRepository.findOne(testCostoServicio.getId());
        assertThat(costoServicioEs).isEqualToIgnoringGivenFields(testCostoServicio);
    }

    @Test
    @Transactional
    public void updateNonExistingCostoServicio() throws Exception {
        int databaseSizeBeforeUpdate = costoServicioRepository.findAll().size();

        // Create the CostoServicio
        CostoServicioDTO costoServicioDTO = costoServicioMapper.toDto(costoServicio);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCostoServicioMockMvc.perform(put("/api/costo-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costoServicioDTO)))
            .andExpect(status().isCreated());

        // Validate the CostoServicio in the database
        List<CostoServicio> costoServicioList = costoServicioRepository.findAll();
        assertThat(costoServicioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCostoServicio() throws Exception {
        // Initialize the database
        costoServicioRepository.saveAndFlush(costoServicio);
        costoServicioSearchRepository.save(costoServicio);
        int databaseSizeBeforeDelete = costoServicioRepository.findAll().size();

        // Get the costoServicio
        restCostoServicioMockMvc.perform(delete("/api/costo-servicios/{id}", costoServicio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean costoServicioExistsInEs = costoServicioSearchRepository.exists(costoServicio.getId());
        assertThat(costoServicioExistsInEs).isFalse();

        // Validate the database is empty
        List<CostoServicio> costoServicioList = costoServicioRepository.findAll();
        assertThat(costoServicioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCostoServicio() throws Exception {
        // Initialize the database
        costoServicioRepository.saveAndFlush(costoServicio);
        costoServicioSearchRepository.save(costoServicio);

        // Search the costoServicio
        restCostoServicioMockMvc.perform(get("/api/_search/costo-servicios?query=id:" + costoServicio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(costoServicio.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipoCosto").value(hasItem(DEFAULT_TIPO_COSTO.toString())))
            .andExpect(jsonPath("$.[*].concepto").value(hasItem(DEFAULT_CONCEPTO.toString())))
            .andExpect(jsonPath("$.[*].costo").value(hasItem(DEFAULT_COSTO.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CostoServicio.class);
        CostoServicio costoServicio1 = new CostoServicio();
        costoServicio1.setId(1L);
        CostoServicio costoServicio2 = new CostoServicio();
        costoServicio2.setId(costoServicio1.getId());
        assertThat(costoServicio1).isEqualTo(costoServicio2);
        costoServicio2.setId(2L);
        assertThat(costoServicio1).isNotEqualTo(costoServicio2);
        costoServicio1.setId(null);
        assertThat(costoServicio1).isNotEqualTo(costoServicio2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CostoServicioDTO.class);
        CostoServicioDTO costoServicioDTO1 = new CostoServicioDTO();
        costoServicioDTO1.setId(1L);
        CostoServicioDTO costoServicioDTO2 = new CostoServicioDTO();
        assertThat(costoServicioDTO1).isNotEqualTo(costoServicioDTO2);
        costoServicioDTO2.setId(costoServicioDTO1.getId());
        assertThat(costoServicioDTO1).isEqualTo(costoServicioDTO2);
        costoServicioDTO2.setId(2L);
        assertThat(costoServicioDTO1).isNotEqualTo(costoServicioDTO2);
        costoServicioDTO1.setId(null);
        assertThat(costoServicioDTO1).isNotEqualTo(costoServicioDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(costoServicioMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(costoServicioMapper.fromId(null)).isNull();
    }
}
