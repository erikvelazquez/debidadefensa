package com.debidadefensa.web.rest;

import com.debidadefensa.DebidadefensaApp;

import com.debidadefensa.domain.TramiteMigratorio;
import com.debidadefensa.repository.TramiteMigratorioRepository;
import com.debidadefensa.service.TramiteMigratorioService;
import com.debidadefensa.repository.search.TramiteMigratorioSearchRepository;
import com.debidadefensa.service.dto.TramiteMigratorioDTO;
import com.debidadefensa.service.mapper.TramiteMigratorioMapper;
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
 * Test class for the TramiteMigratorioResource REST controller.
 *
 * @see TramiteMigratorioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DebidadefensaApp.class)
public class TramiteMigratorioResourceIntTest {

    private static final String DEFAULT_NOMBRE_EXTRANJERO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_EXTRANJERO = "BBBBBBBBBB";

    private static final String DEFAULT_TIPOTRAMITE = "AAAAAAAAAA";
    private static final String UPDATED_TIPOTRAMITE = "BBBBBBBBBB";

    private static final String DEFAULT_ENTIDAD = "AAAAAAAAAA";
    private static final String UPDATED_ENTIDAD = "BBBBBBBBBB";

    private static final Long DEFAULT_NUT = 1L;
    private static final Long UPDATED_NUT = 2L;

    private static final String DEFAULT_CONTRASENIA_NUT = "AAAAAAAAAA";
    private static final String UPDATED_CONTRASENIA_NUT = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA_INGRESO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_INGRESO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FECHA_NOTIFICACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_NOTIFICACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FECHA_RESOLUCION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_RESOLUCION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ARCHIVO = "AAAAAAAAAA";
    private static final String UPDATED_ARCHIVO = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    @Autowired
    private TramiteMigratorioRepository tramiteMigratorioRepository;

    @Autowired
    private TramiteMigratorioMapper tramiteMigratorioMapper;

    @Autowired
    private TramiteMigratorioService tramiteMigratorioService;

    @Autowired
    private TramiteMigratorioSearchRepository tramiteMigratorioSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTramiteMigratorioMockMvc;

    private TramiteMigratorio tramiteMigratorio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TramiteMigratorioResource tramiteMigratorioResource = new TramiteMigratorioResource(tramiteMigratorioService);
        this.restTramiteMigratorioMockMvc = MockMvcBuilders.standaloneSetup(tramiteMigratorioResource)
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
    public static TramiteMigratorio createEntity(EntityManager em) {
        TramiteMigratorio tramiteMigratorio = new TramiteMigratorio()
            .nombreExtranjero(DEFAULT_NOMBRE_EXTRANJERO)
            .tipotramite(DEFAULT_TIPOTRAMITE)
            .entidad(DEFAULT_ENTIDAD)
            .nut(DEFAULT_NUT)
            .contraseniaNUT(DEFAULT_CONTRASENIA_NUT)
            .fechaIngreso(DEFAULT_FECHA_INGRESO)
            .fechaNotificacion(DEFAULT_FECHA_NOTIFICACION)
            .fechaResolucion(DEFAULT_FECHA_RESOLUCION)
            .archivo(DEFAULT_ARCHIVO)
            .observaciones(DEFAULT_OBSERVACIONES);
        return tramiteMigratorio;
    }

    @Before
    public void initTest() {
        tramiteMigratorioSearchRepository.deleteAll();
        tramiteMigratorio = createEntity(em);
    }

    @Test
    @Transactional
    public void createTramiteMigratorio() throws Exception {
        int databaseSizeBeforeCreate = tramiteMigratorioRepository.findAll().size();

        // Create the TramiteMigratorio
        TramiteMigratorioDTO tramiteMigratorioDTO = tramiteMigratorioMapper.toDto(tramiteMigratorio);
        restTramiteMigratorioMockMvc.perform(post("/api/tramite-migratorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tramiteMigratorioDTO)))
            .andExpect(status().isCreated());

        // Validate the TramiteMigratorio in the database
        List<TramiteMigratorio> tramiteMigratorioList = tramiteMigratorioRepository.findAll();
        assertThat(tramiteMigratorioList).hasSize(databaseSizeBeforeCreate + 1);
        TramiteMigratorio testTramiteMigratorio = tramiteMigratorioList.get(tramiteMigratorioList.size() - 1);
        assertThat(testTramiteMigratorio.getNombreExtranjero()).isEqualTo(DEFAULT_NOMBRE_EXTRANJERO);
        assertThat(testTramiteMigratorio.getTipotramite()).isEqualTo(DEFAULT_TIPOTRAMITE);
        assertThat(testTramiteMigratorio.getEntidad()).isEqualTo(DEFAULT_ENTIDAD);
        assertThat(testTramiteMigratorio.getNut()).isEqualTo(DEFAULT_NUT);
        assertThat(testTramiteMigratorio.getContraseniaNUT()).isEqualTo(DEFAULT_CONTRASENIA_NUT);
        assertThat(testTramiteMigratorio.getFechaIngreso()).isEqualTo(DEFAULT_FECHA_INGRESO);
        assertThat(testTramiteMigratorio.getFechaNotificacion()).isEqualTo(DEFAULT_FECHA_NOTIFICACION);
        assertThat(testTramiteMigratorio.getFechaResolucion()).isEqualTo(DEFAULT_FECHA_RESOLUCION);
        assertThat(testTramiteMigratorio.getArchivo()).isEqualTo(DEFAULT_ARCHIVO);
        assertThat(testTramiteMigratorio.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);

        // Validate the TramiteMigratorio in Elasticsearch
        TramiteMigratorio tramiteMigratorioEs = tramiteMigratorioSearchRepository.findOne(testTramiteMigratorio.getId());
        assertThat(tramiteMigratorioEs).isEqualToIgnoringGivenFields(testTramiteMigratorio);
    }

    @Test
    @Transactional
    public void createTramiteMigratorioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tramiteMigratorioRepository.findAll().size();

        // Create the TramiteMigratorio with an existing ID
        tramiteMigratorio.setId(1L);
        TramiteMigratorioDTO tramiteMigratorioDTO = tramiteMigratorioMapper.toDto(tramiteMigratorio);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTramiteMigratorioMockMvc.perform(post("/api/tramite-migratorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tramiteMigratorioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TramiteMigratorio in the database
        List<TramiteMigratorio> tramiteMigratorioList = tramiteMigratorioRepository.findAll();
        assertThat(tramiteMigratorioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTramiteMigratorios() throws Exception {
        // Initialize the database
        tramiteMigratorioRepository.saveAndFlush(tramiteMigratorio);

        // Get all the tramiteMigratorioList
        restTramiteMigratorioMockMvc.perform(get("/api/tramite-migratorios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tramiteMigratorio.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreExtranjero").value(hasItem(DEFAULT_NOMBRE_EXTRANJERO.toString())))
            .andExpect(jsonPath("$.[*].tipotramite").value(hasItem(DEFAULT_TIPOTRAMITE.toString())))
            .andExpect(jsonPath("$.[*].entidad").value(hasItem(DEFAULT_ENTIDAD.toString())))
            .andExpect(jsonPath("$.[*].nut").value(hasItem(DEFAULT_NUT.intValue())))
            .andExpect(jsonPath("$.[*].contraseniaNUT").value(hasItem(DEFAULT_CONTRASENIA_NUT.toString())))
            .andExpect(jsonPath("$.[*].fechaIngreso").value(hasItem(DEFAULT_FECHA_INGRESO.toString())))
            .andExpect(jsonPath("$.[*].fechaNotificacion").value(hasItem(DEFAULT_FECHA_NOTIFICACION.toString())))
            .andExpect(jsonPath("$.[*].fechaResolucion").value(hasItem(DEFAULT_FECHA_RESOLUCION.toString())))
            .andExpect(jsonPath("$.[*].archivo").value(hasItem(DEFAULT_ARCHIVO.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }

    @Test
    @Transactional
    public void getTramiteMigratorio() throws Exception {
        // Initialize the database
        tramiteMigratorioRepository.saveAndFlush(tramiteMigratorio);

        // Get the tramiteMigratorio
        restTramiteMigratorioMockMvc.perform(get("/api/tramite-migratorios/{id}", tramiteMigratorio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tramiteMigratorio.getId().intValue()))
            .andExpect(jsonPath("$.nombreExtranjero").value(DEFAULT_NOMBRE_EXTRANJERO.toString()))
            .andExpect(jsonPath("$.tipotramite").value(DEFAULT_TIPOTRAMITE.toString()))
            .andExpect(jsonPath("$.entidad").value(DEFAULT_ENTIDAD.toString()))
            .andExpect(jsonPath("$.nut").value(DEFAULT_NUT.intValue()))
            .andExpect(jsonPath("$.contraseniaNUT").value(DEFAULT_CONTRASENIA_NUT.toString()))
            .andExpect(jsonPath("$.fechaIngreso").value(DEFAULT_FECHA_INGRESO.toString()))
            .andExpect(jsonPath("$.fechaNotificacion").value(DEFAULT_FECHA_NOTIFICACION.toString()))
            .andExpect(jsonPath("$.fechaResolucion").value(DEFAULT_FECHA_RESOLUCION.toString()))
            .andExpect(jsonPath("$.archivo").value(DEFAULT_ARCHIVO.toString()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTramiteMigratorio() throws Exception {
        // Get the tramiteMigratorio
        restTramiteMigratorioMockMvc.perform(get("/api/tramite-migratorios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTramiteMigratorio() throws Exception {
        // Initialize the database
        tramiteMigratorioRepository.saveAndFlush(tramiteMigratorio);
        tramiteMigratorioSearchRepository.save(tramiteMigratorio);
        int databaseSizeBeforeUpdate = tramiteMigratorioRepository.findAll().size();

        // Update the tramiteMigratorio
        TramiteMigratorio updatedTramiteMigratorio = tramiteMigratorioRepository.findOne(tramiteMigratorio.getId());
        // Disconnect from session so that the updates on updatedTramiteMigratorio are not directly saved in db
        em.detach(updatedTramiteMigratorio);
        updatedTramiteMigratorio
            .nombreExtranjero(UPDATED_NOMBRE_EXTRANJERO)
            .tipotramite(UPDATED_TIPOTRAMITE)
            .entidad(UPDATED_ENTIDAD)
            .nut(UPDATED_NUT)
            .contraseniaNUT(UPDATED_CONTRASENIA_NUT)
            .fechaIngreso(UPDATED_FECHA_INGRESO)
            .fechaNotificacion(UPDATED_FECHA_NOTIFICACION)
            .fechaResolucion(UPDATED_FECHA_RESOLUCION)
            .archivo(UPDATED_ARCHIVO)
            .observaciones(UPDATED_OBSERVACIONES);
        TramiteMigratorioDTO tramiteMigratorioDTO = tramiteMigratorioMapper.toDto(updatedTramiteMigratorio);

        restTramiteMigratorioMockMvc.perform(put("/api/tramite-migratorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tramiteMigratorioDTO)))
            .andExpect(status().isOk());

        // Validate the TramiteMigratorio in the database
        List<TramiteMigratorio> tramiteMigratorioList = tramiteMigratorioRepository.findAll();
        assertThat(tramiteMigratorioList).hasSize(databaseSizeBeforeUpdate);
        TramiteMigratorio testTramiteMigratorio = tramiteMigratorioList.get(tramiteMigratorioList.size() - 1);
        assertThat(testTramiteMigratorio.getNombreExtranjero()).isEqualTo(UPDATED_NOMBRE_EXTRANJERO);
        assertThat(testTramiteMigratorio.getTipotramite()).isEqualTo(UPDATED_TIPOTRAMITE);
        assertThat(testTramiteMigratorio.getEntidad()).isEqualTo(UPDATED_ENTIDAD);
        assertThat(testTramiteMigratorio.getNut()).isEqualTo(UPDATED_NUT);
        assertThat(testTramiteMigratorio.getContraseniaNUT()).isEqualTo(UPDATED_CONTRASENIA_NUT);
        assertThat(testTramiteMigratorio.getFechaIngreso()).isEqualTo(UPDATED_FECHA_INGRESO);
        assertThat(testTramiteMigratorio.getFechaNotificacion()).isEqualTo(UPDATED_FECHA_NOTIFICACION);
        assertThat(testTramiteMigratorio.getFechaResolucion()).isEqualTo(UPDATED_FECHA_RESOLUCION);
        assertThat(testTramiteMigratorio.getArchivo()).isEqualTo(UPDATED_ARCHIVO);
        assertThat(testTramiteMigratorio.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);

        // Validate the TramiteMigratorio in Elasticsearch
        TramiteMigratorio tramiteMigratorioEs = tramiteMigratorioSearchRepository.findOne(testTramiteMigratorio.getId());
        assertThat(tramiteMigratorioEs).isEqualToIgnoringGivenFields(testTramiteMigratorio);
    }

    @Test
    @Transactional
    public void updateNonExistingTramiteMigratorio() throws Exception {
        int databaseSizeBeforeUpdate = tramiteMigratorioRepository.findAll().size();

        // Create the TramiteMigratorio
        TramiteMigratorioDTO tramiteMigratorioDTO = tramiteMigratorioMapper.toDto(tramiteMigratorio);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTramiteMigratorioMockMvc.perform(put("/api/tramite-migratorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tramiteMigratorioDTO)))
            .andExpect(status().isCreated());

        // Validate the TramiteMigratorio in the database
        List<TramiteMigratorio> tramiteMigratorioList = tramiteMigratorioRepository.findAll();
        assertThat(tramiteMigratorioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTramiteMigratorio() throws Exception {
        // Initialize the database
        tramiteMigratorioRepository.saveAndFlush(tramiteMigratorio);
        tramiteMigratorioSearchRepository.save(tramiteMigratorio);
        int databaseSizeBeforeDelete = tramiteMigratorioRepository.findAll().size();

        // Get the tramiteMigratorio
        restTramiteMigratorioMockMvc.perform(delete("/api/tramite-migratorios/{id}", tramiteMigratorio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean tramiteMigratorioExistsInEs = tramiteMigratorioSearchRepository.exists(tramiteMigratorio.getId());
        assertThat(tramiteMigratorioExistsInEs).isFalse();

        // Validate the database is empty
        List<TramiteMigratorio> tramiteMigratorioList = tramiteMigratorioRepository.findAll();
        assertThat(tramiteMigratorioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTramiteMigratorio() throws Exception {
        // Initialize the database
        tramiteMigratorioRepository.saveAndFlush(tramiteMigratorio);
        tramiteMigratorioSearchRepository.save(tramiteMigratorio);

        // Search the tramiteMigratorio
        restTramiteMigratorioMockMvc.perform(get("/api/_search/tramite-migratorios?query=id:" + tramiteMigratorio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tramiteMigratorio.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreExtranjero").value(hasItem(DEFAULT_NOMBRE_EXTRANJERO.toString())))
            .andExpect(jsonPath("$.[*].tipotramite").value(hasItem(DEFAULT_TIPOTRAMITE.toString())))
            .andExpect(jsonPath("$.[*].entidad").value(hasItem(DEFAULT_ENTIDAD.toString())))
            .andExpect(jsonPath("$.[*].nut").value(hasItem(DEFAULT_NUT.intValue())))
            .andExpect(jsonPath("$.[*].contraseniaNUT").value(hasItem(DEFAULT_CONTRASENIA_NUT.toString())))
            .andExpect(jsonPath("$.[*].fechaIngreso").value(hasItem(DEFAULT_FECHA_INGRESO.toString())))
            .andExpect(jsonPath("$.[*].fechaNotificacion").value(hasItem(DEFAULT_FECHA_NOTIFICACION.toString())))
            .andExpect(jsonPath("$.[*].fechaResolucion").value(hasItem(DEFAULT_FECHA_RESOLUCION.toString())))
            .andExpect(jsonPath("$.[*].archivo").value(hasItem(DEFAULT_ARCHIVO.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TramiteMigratorio.class);
        TramiteMigratorio tramiteMigratorio1 = new TramiteMigratorio();
        tramiteMigratorio1.setId(1L);
        TramiteMigratorio tramiteMigratorio2 = new TramiteMigratorio();
        tramiteMigratorio2.setId(tramiteMigratorio1.getId());
        assertThat(tramiteMigratorio1).isEqualTo(tramiteMigratorio2);
        tramiteMigratorio2.setId(2L);
        assertThat(tramiteMigratorio1).isNotEqualTo(tramiteMigratorio2);
        tramiteMigratorio1.setId(null);
        assertThat(tramiteMigratorio1).isNotEqualTo(tramiteMigratorio2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TramiteMigratorioDTO.class);
        TramiteMigratorioDTO tramiteMigratorioDTO1 = new TramiteMigratorioDTO();
        tramiteMigratorioDTO1.setId(1L);
        TramiteMigratorioDTO tramiteMigratorioDTO2 = new TramiteMigratorioDTO();
        assertThat(tramiteMigratorioDTO1).isNotEqualTo(tramiteMigratorioDTO2);
        tramiteMigratorioDTO2.setId(tramiteMigratorioDTO1.getId());
        assertThat(tramiteMigratorioDTO1).isEqualTo(tramiteMigratorioDTO2);
        tramiteMigratorioDTO2.setId(2L);
        assertThat(tramiteMigratorioDTO1).isNotEqualTo(tramiteMigratorioDTO2);
        tramiteMigratorioDTO1.setId(null);
        assertThat(tramiteMigratorioDTO1).isNotEqualTo(tramiteMigratorioDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(tramiteMigratorioMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(tramiteMigratorioMapper.fromId(null)).isNull();
    }
}
