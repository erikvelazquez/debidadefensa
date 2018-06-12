package com.debidadefensa.web.rest;

import com.debidadefensa.DebidadefensaApp;

import com.debidadefensa.domain.Estatus;
import com.debidadefensa.repository.EstatusRepository;
import com.debidadefensa.service.EstatusService;
import com.debidadefensa.repository.search.EstatusSearchRepository;
import com.debidadefensa.service.dto.EstatusDTO;
import com.debidadefensa.service.mapper.EstatusMapper;
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
 * Test class for the EstatusResource REST controller.
 *
 * @see EstatusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DebidadefensaApp.class)
public class EstatusResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private EstatusRepository estatusRepository;

    @Autowired
    private EstatusMapper estatusMapper;

    @Autowired
    private EstatusService estatusService;

    @Autowired
    private EstatusSearchRepository estatusSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEstatusMockMvc;

    private Estatus estatus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstatusResource estatusResource = new EstatusResource(estatusService);
        this.restEstatusMockMvc = MockMvcBuilders.standaloneSetup(estatusResource)
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
    public static Estatus createEntity(EntityManager em) {
        Estatus estatus = new Estatus()
            .descripcion(DEFAULT_DESCRIPCION);
        return estatus;
    }

    @Before
    public void initTest() {
        estatusSearchRepository.deleteAll();
        estatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstatus() throws Exception {
        int databaseSizeBeforeCreate = estatusRepository.findAll().size();

        // Create the Estatus
        EstatusDTO estatusDTO = estatusMapper.toDto(estatus);
        restEstatusMockMvc.perform(post("/api/estatuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estatusDTO)))
            .andExpect(status().isCreated());

        // Validate the Estatus in the database
        List<Estatus> estatusList = estatusRepository.findAll();
        assertThat(estatusList).hasSize(databaseSizeBeforeCreate + 1);
        Estatus testEstatus = estatusList.get(estatusList.size() - 1);
        assertThat(testEstatus.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);

        // Validate the Estatus in Elasticsearch
        Estatus estatusEs = estatusSearchRepository.findOne(testEstatus.getId());
        assertThat(estatusEs).isEqualToIgnoringGivenFields(testEstatus);
    }

    @Test
    @Transactional
    public void createEstatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estatusRepository.findAll().size();

        // Create the Estatus with an existing ID
        estatus.setId(1L);
        EstatusDTO estatusDTO = estatusMapper.toDto(estatus);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstatusMockMvc.perform(post("/api/estatuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estatusDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Estatus in the database
        List<Estatus> estatusList = estatusRepository.findAll();
        assertThat(estatusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEstatuses() throws Exception {
        // Initialize the database
        estatusRepository.saveAndFlush(estatus);

        // Get all the estatusList
        restEstatusMockMvc.perform(get("/api/estatuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void getEstatus() throws Exception {
        // Initialize the database
        estatusRepository.saveAndFlush(estatus);

        // Get the estatus
        restEstatusMockMvc.perform(get("/api/estatuses/{id}", estatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estatus.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEstatus() throws Exception {
        // Get the estatus
        restEstatusMockMvc.perform(get("/api/estatuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstatus() throws Exception {
        // Initialize the database
        estatusRepository.saveAndFlush(estatus);
        estatusSearchRepository.save(estatus);
        int databaseSizeBeforeUpdate = estatusRepository.findAll().size();

        // Update the estatus
        Estatus updatedEstatus = estatusRepository.findOne(estatus.getId());
        // Disconnect from session so that the updates on updatedEstatus are not directly saved in db
        em.detach(updatedEstatus);
        updatedEstatus
            .descripcion(UPDATED_DESCRIPCION);
        EstatusDTO estatusDTO = estatusMapper.toDto(updatedEstatus);

        restEstatusMockMvc.perform(put("/api/estatuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estatusDTO)))
            .andExpect(status().isOk());

        // Validate the Estatus in the database
        List<Estatus> estatusList = estatusRepository.findAll();
        assertThat(estatusList).hasSize(databaseSizeBeforeUpdate);
        Estatus testEstatus = estatusList.get(estatusList.size() - 1);
        assertThat(testEstatus.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);

        // Validate the Estatus in Elasticsearch
        Estatus estatusEs = estatusSearchRepository.findOne(testEstatus.getId());
        assertThat(estatusEs).isEqualToIgnoringGivenFields(testEstatus);
    }

    @Test
    @Transactional
    public void updateNonExistingEstatus() throws Exception {
        int databaseSizeBeforeUpdate = estatusRepository.findAll().size();

        // Create the Estatus
        EstatusDTO estatusDTO = estatusMapper.toDto(estatus);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEstatusMockMvc.perform(put("/api/estatuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estatusDTO)))
            .andExpect(status().isCreated());

        // Validate the Estatus in the database
        List<Estatus> estatusList = estatusRepository.findAll();
        assertThat(estatusList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEstatus() throws Exception {
        // Initialize the database
        estatusRepository.saveAndFlush(estatus);
        estatusSearchRepository.save(estatus);
        int databaseSizeBeforeDelete = estatusRepository.findAll().size();

        // Get the estatus
        restEstatusMockMvc.perform(delete("/api/estatuses/{id}", estatus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean estatusExistsInEs = estatusSearchRepository.exists(estatus.getId());
        assertThat(estatusExistsInEs).isFalse();

        // Validate the database is empty
        List<Estatus> estatusList = estatusRepository.findAll();
        assertThat(estatusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchEstatus() throws Exception {
        // Initialize the database
        estatusRepository.saveAndFlush(estatus);
        estatusSearchRepository.save(estatus);

        // Search the estatus
        restEstatusMockMvc.perform(get("/api/_search/estatuses?query=id:" + estatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Estatus.class);
        Estatus estatus1 = new Estatus();
        estatus1.setId(1L);
        Estatus estatus2 = new Estatus();
        estatus2.setId(estatus1.getId());
        assertThat(estatus1).isEqualTo(estatus2);
        estatus2.setId(2L);
        assertThat(estatus1).isNotEqualTo(estatus2);
        estatus1.setId(null);
        assertThat(estatus1).isNotEqualTo(estatus2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstatusDTO.class);
        EstatusDTO estatusDTO1 = new EstatusDTO();
        estatusDTO1.setId(1L);
        EstatusDTO estatusDTO2 = new EstatusDTO();
        assertThat(estatusDTO1).isNotEqualTo(estatusDTO2);
        estatusDTO2.setId(estatusDTO1.getId());
        assertThat(estatusDTO1).isEqualTo(estatusDTO2);
        estatusDTO2.setId(2L);
        assertThat(estatusDTO1).isNotEqualTo(estatusDTO2);
        estatusDTO1.setId(null);
        assertThat(estatusDTO1).isNotEqualTo(estatusDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(estatusMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(estatusMapper.fromId(null)).isNull();
    }
}
