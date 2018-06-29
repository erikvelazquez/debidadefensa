package com.debidadefensa.web.rest;

import com.debidadefensa.DebidadefensaApp;

import com.debidadefensa.domain.Pagos;
import com.debidadefensa.repository.PagosRepository;
import com.debidadefensa.service.PagosService;
import com.debidadefensa.repository.search.PagosSearchRepository;
import com.debidadefensa.service.dto.PagosDTO;
import com.debidadefensa.service.mapper.PagosMapper;
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
 * Test class for the PagosResource REST controller.
 *
 * @see PagosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DebidadefensaApp.class)
public class PagosResourceIntTest {

    private static final Float DEFAULT_CANTIDAD = 1F;
    private static final Float UPDATED_CANTIDAD = 2F;

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_FORMA_PAGO = "AAAAAAAAAA";
    private static final String UPDATED_FORMA_PAGO = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO_ABONO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_ABONO = "BBBBBBBBBB";

    @Autowired
    private PagosRepository pagosRepository;

    @Autowired
    private PagosMapper pagosMapper;

    @Autowired
    private PagosService pagosService;

    @Autowired
    private PagosSearchRepository pagosSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPagosMockMvc;

    private Pagos pagos;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PagosResource pagosResource = new PagosResource(pagosService);
        this.restPagosMockMvc = MockMvcBuilders.standaloneSetup(pagosResource)
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
    public static Pagos createEntity(EntityManager em) {
        Pagos pagos = new Pagos()
            .cantidad(DEFAULT_CANTIDAD)
            .fecha(DEFAULT_FECHA)
            .formaPago(DEFAULT_FORMA_PAGO)
            .tipoAbono(DEFAULT_TIPO_ABONO);
        return pagos;
    }

    @Before
    public void initTest() {
        pagosSearchRepository.deleteAll();
        pagos = createEntity(em);
    }

    @Test
    @Transactional
    public void createPagos() throws Exception {
        int databaseSizeBeforeCreate = pagosRepository.findAll().size();

        // Create the Pagos
        PagosDTO pagosDTO = pagosMapper.toDto(pagos);
        restPagosMockMvc.perform(post("/api/pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagosDTO)))
            .andExpect(status().isCreated());

        // Validate the Pagos in the database
        List<Pagos> pagosList = pagosRepository.findAll();
        assertThat(pagosList).hasSize(databaseSizeBeforeCreate + 1);
        Pagos testPagos = pagosList.get(pagosList.size() - 1);
        assertThat(testPagos.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testPagos.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testPagos.getFormaPago()).isEqualTo(DEFAULT_FORMA_PAGO);
        assertThat(testPagos.getTipoAbono()).isEqualTo(DEFAULT_TIPO_ABONO);

        // Validate the Pagos in Elasticsearch
        Pagos pagosEs = pagosSearchRepository.findOne(testPagos.getId());
        assertThat(pagosEs).isEqualToIgnoringGivenFields(testPagos);
    }

    @Test
    @Transactional
    public void createPagosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pagosRepository.findAll().size();

        // Create the Pagos with an existing ID
        pagos.setId(1L);
        PagosDTO pagosDTO = pagosMapper.toDto(pagos);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPagosMockMvc.perform(post("/api/pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagosDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Pagos in the database
        List<Pagos> pagosList = pagosRepository.findAll();
        assertThat(pagosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPagos() throws Exception {
        // Initialize the database
        pagosRepository.saveAndFlush(pagos);

        // Get all the pagosList
        restPagosMockMvc.perform(get("/api/pagos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pagos.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.doubleValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].formaPago").value(hasItem(DEFAULT_FORMA_PAGO.toString())))
            .andExpect(jsonPath("$.[*].tipoAbono").value(hasItem(DEFAULT_TIPO_ABONO.toString())));
    }

    @Test
    @Transactional
    public void getPagos() throws Exception {
        // Initialize the database
        pagosRepository.saveAndFlush(pagos);

        // Get the pagos
        restPagosMockMvc.perform(get("/api/pagos/{id}", pagos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pagos.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD.doubleValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.formaPago").value(DEFAULT_FORMA_PAGO.toString()))
            .andExpect(jsonPath("$.tipoAbono").value(DEFAULT_TIPO_ABONO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPagos() throws Exception {
        // Get the pagos
        restPagosMockMvc.perform(get("/api/pagos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePagos() throws Exception {
        // Initialize the database
        pagosRepository.saveAndFlush(pagos);
        pagosSearchRepository.save(pagos);
        int databaseSizeBeforeUpdate = pagosRepository.findAll().size();

        // Update the pagos
        Pagos updatedPagos = pagosRepository.findOne(pagos.getId());
        // Disconnect from session so that the updates on updatedPagos are not directly saved in db
        em.detach(updatedPagos);
        updatedPagos
            .cantidad(UPDATED_CANTIDAD)
            .fecha(UPDATED_FECHA)
            .formaPago(UPDATED_FORMA_PAGO)
            .tipoAbono(UPDATED_TIPO_ABONO);
        PagosDTO pagosDTO = pagosMapper.toDto(updatedPagos);

        restPagosMockMvc.perform(put("/api/pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagosDTO)))
            .andExpect(status().isOk());

        // Validate the Pagos in the database
        List<Pagos> pagosList = pagosRepository.findAll();
        assertThat(pagosList).hasSize(databaseSizeBeforeUpdate);
        Pagos testPagos = pagosList.get(pagosList.size() - 1);
        assertThat(testPagos.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testPagos.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testPagos.getFormaPago()).isEqualTo(UPDATED_FORMA_PAGO);
        assertThat(testPagos.getTipoAbono()).isEqualTo(UPDATED_TIPO_ABONO);

        // Validate the Pagos in Elasticsearch
        Pagos pagosEs = pagosSearchRepository.findOne(testPagos.getId());
        assertThat(pagosEs).isEqualToIgnoringGivenFields(testPagos);
    }

    @Test
    @Transactional
    public void updateNonExistingPagos() throws Exception {
        int databaseSizeBeforeUpdate = pagosRepository.findAll().size();

        // Create the Pagos
        PagosDTO pagosDTO = pagosMapper.toDto(pagos);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPagosMockMvc.perform(put("/api/pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagosDTO)))
            .andExpect(status().isCreated());

        // Validate the Pagos in the database
        List<Pagos> pagosList = pagosRepository.findAll();
        assertThat(pagosList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePagos() throws Exception {
        // Initialize the database
        pagosRepository.saveAndFlush(pagos);
        pagosSearchRepository.save(pagos);
        int databaseSizeBeforeDelete = pagosRepository.findAll().size();

        // Get the pagos
        restPagosMockMvc.perform(delete("/api/pagos/{id}", pagos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean pagosExistsInEs = pagosSearchRepository.exists(pagos.getId());
        assertThat(pagosExistsInEs).isFalse();

        // Validate the database is empty
        List<Pagos> pagosList = pagosRepository.findAll();
        assertThat(pagosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPagos() throws Exception {
        // Initialize the database
        pagosRepository.saveAndFlush(pagos);
        pagosSearchRepository.save(pagos);

        // Search the pagos
        restPagosMockMvc.perform(get("/api/_search/pagos?query=id:" + pagos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pagos.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.doubleValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].formaPago").value(hasItem(DEFAULT_FORMA_PAGO.toString())))
            .andExpect(jsonPath("$.[*].tipoAbono").value(hasItem(DEFAULT_TIPO_ABONO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pagos.class);
        Pagos pagos1 = new Pagos();
        pagos1.setId(1L);
        Pagos pagos2 = new Pagos();
        pagos2.setId(pagos1.getId());
        assertThat(pagos1).isEqualTo(pagos2);
        pagos2.setId(2L);
        assertThat(pagos1).isNotEqualTo(pagos2);
        pagos1.setId(null);
        assertThat(pagos1).isNotEqualTo(pagos2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PagosDTO.class);
        PagosDTO pagosDTO1 = new PagosDTO();
        pagosDTO1.setId(1L);
        PagosDTO pagosDTO2 = new PagosDTO();
        assertThat(pagosDTO1).isNotEqualTo(pagosDTO2);
        pagosDTO2.setId(pagosDTO1.getId());
        assertThat(pagosDTO1).isEqualTo(pagosDTO2);
        pagosDTO2.setId(2L);
        assertThat(pagosDTO1).isNotEqualTo(pagosDTO2);
        pagosDTO1.setId(null);
        assertThat(pagosDTO1).isNotEqualTo(pagosDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(pagosMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(pagosMapper.fromId(null)).isNull();
    }
}
