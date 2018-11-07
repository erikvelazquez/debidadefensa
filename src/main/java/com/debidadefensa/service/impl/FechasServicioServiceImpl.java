package com.debidadefensa.service.impl;

import com.debidadefensa.service.ExpedienteService;
import com.debidadefensa.service.FechasServicioService;
import com.debidadefensa.domain.FechasServicio;
import com.debidadefensa.domain.Authority;
import com.debidadefensa.repository.FechasServicioRepository;
import com.debidadefensa.repository.UserRepository;
import com.debidadefensa.repository.search.FechasServicioSearchRepository;
import com.debidadefensa.service.dto.ExpedienteDTO;
import com.debidadefensa.service.dto.FechasServicioDTO;
import com.debidadefensa.service.dto.TramiteGeneralDTO;
import com.debidadefensa.service.dto.TramiteMigratorioDTO;
import com.debidadefensa.service.mapper.FechasServicioMapper;
import com.debidadefensa.service.MailService;
import com.debidadefensa.service.TramiteGeneralService;
import com.debidadefensa.service.TramiteMigratorioService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import io.github.jhipster.config.JHipsterProperties;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.springframework.beans.factory.annotation.Value;
import com.debidadefensa.domain.User;
import com.debidadefensa.service.dto.UserDTO;
import com.debidadefensa.service.mapper.UserMapper;
import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing FechasServicio.
 */
@Service
@Transactional
public class FechasServicioServiceImpl implements FechasServicioService {

    private final Logger log = LoggerFactory.getLogger(FechasServicioServiceImpl.class);

    private final FechasServicioRepository fechasServicioRepository;

    private final FechasServicioMapper fechasServicioMapper;    
    
    private final FechasServicioSearchRepository fechasServicioSearchRepository;

    private final UserMapper userMapper;
    
    private JHipsterProperties jHipsterProperties = new JHipsterProperties();

    private MessageSource messageSource;

    private SpringTemplateEngine templateEngine;

    private UserRepository userRepository ;

    private JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

    private final ExpedienteService expedienteService;
    private final TramiteGeneralService tramiteGeneralService;
    private final TramiteMigratorioService tramiteMigratorioService;


    public FechasServicioServiceImpl(FechasServicioRepository fechasServicioRepository, 
                                     FechasServicioMapper fechasServicioMapper, 
                                     FechasServicioSearchRepository fechasServicioSearchRepository, 
                                     UserRepository userRepository, 
                                     UserMapper userMapper,
                                     ExpedienteService expedienteService,
                                     TramiteGeneralService tramiteGeneralService,
                                     TramiteMigratorioService tramiteMigratorioService) {
        this.fechasServicioRepository = fechasServicioRepository;
        this.fechasServicioMapper = fechasServicioMapper;
        this.fechasServicioSearchRepository = fechasServicioSearchRepository;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.expedienteService = expedienteService;
        this.tramiteGeneralService = tramiteGeneralService;
        this.tramiteMigratorioService = tramiteMigratorioService;

    }

    @Value("${spring.mail.host}")
    private String host;

    @Value("${spring.mail.port}")
    private int port;

    @Value("${spring.mail.username}")
    private String username;

    @Value("${spring.mail.password}")
    private String password;

    @Value("${spring.mail.protocol}")
    private String protocol;

    /**
     * Save a fechasServicio.
     *
     * @param fechasServicioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FechasServicioDTO save(FechasServicioDTO fechasServicioDTO) {
        log.debug("Request to save FechasServicio : {}", fechasServicioDTO);
        FechasServicio fechasServicio = fechasServicioMapper.toEntity(fechasServicioDTO);
        fechasServicio = fechasServicioRepository.save(fechasServicio);
        FechasServicioDTO result = fechasServicioMapper.toDto(fechasServicio);
        fechasServicioSearchRepository.save(fechasServicio); 
        EnviaCoreo(fechasServicioDTO);
        
        return result;
    }

    public String ConsultaFechasEmail(){
        Instant fecha = new Date().toInstant();
     /*   fecha.minusSeconds(0);
        List<FechasServicioDTO> fechas = fechasServicioRepository.findByDateEmail(fecha).stream().map(fechasServicioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
        if (fechas.size() > 0) {
            for (FechasServicioDTO var : fechas) {
                EnviaCoreo(var);
            }
        }
*/
        return "lo envie " + fecha;
    }

    public void EnviaCoreo(FechasServicioDTO fechasServicioDTO){
        List<UserDTO> lsUsers = userMapper.usersToUserDTOs(userRepository.findAll()); // .stream().map(UserDTO::new).collect(Collectors.toCollection(LinkedList::new));
        List<String> lsRoles = Arrays.asList("ROLE_ABOGADO","ROLE_ADMIN");        
       
        mailSender.setHost(host);
        mailSender.setPort(port);
        
        mailSender.setUsername(username);
        mailSender.setPassword(password);
        
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", protocol);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");        
        MailService mailService = new MailService(jHipsterProperties, mailSender, messageSource, templateEngine);

        String asunto = "";
        String cuerpo = "";

        if(fechasServicioDTO.getTipoServicioId() == null){
            fechasServicioDTO.setTipoServicioId(new Long(0));
        }

        switch ((int)(fechasServicioDTO.getTipoServicioId() % 100000)) {
            case 1002:
                asunto = "Debida Defensa - Notificación Trámite Migratorio – Cliente - " + ConvierteFecha(fechasServicioDTO.getFecha());
                cuerpo =  ObtenMigratorio(fechasServicioDTO.getTramiteMigratorioId(), fechasServicioDTO);
                break;
            case 1003:
                asunto = "Debida Defensa - Notificación Trámite General – Cliente - " + ConvierteFecha(fechasServicioDTO.getFecha());
                cuerpo =  ObtenGeneral(fechasServicioDTO.getTramiteGeneralId(), fechasServicioDTO);
                break;
            case 1001:
                asunto = "Debida Defensa - Notificación Expediente – Cliente - " + ConvierteFecha(fechasServicioDTO.getFecha());
                cuerpo =  ObtenExpediente(fechasServicioDTO.getExpedienteId(), fechasServicioDTO);
                break;
            default:
                asunto = "Debida Defensa - Notificación evento - " + ConvierteFecha(fechasServicioDTO.getFecha());
                cuerpo =  ObtenEvento(fechasServicioDTO);
        }

        
        for (UserDTO var : lsUsers) {
            List<String> lsRolesUsuario = var.getAuthorities().stream().collect(Collectors.toList());
            boolean res = !Collections.disjoint(lsRolesUsuario, lsRoles);
         
            if (res){
                mailService.sendEmail(var.getEmail(), asunto, cuerpo, false, true);            
            }
        }

    }

    private String ObtenMigratorio(Long id, FechasServicioDTO fechasServicioDTO){
        TramiteMigratorioDTO migratorioDTO = tramiteMigratorioService.findOne(id);

        String cuerpo = "<p style='margin-left: 35.4pt;'>Cliente: " + migratorioDTO.getClienteNombre() + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Nombre del Extranjero: " + migratorioDTO.getNombreExtranjero() + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Entidad: " + migratorioDTO.getEntidad() + "</p>";
        cuerpo = cuerpo +  "<p style='margin-left: 35.4pt;'>Estatus: " + migratorioDTO.getEstatusDescripcion() + "</p>";
        cuerpo = cuerpo +  "<p style='margin-left: 35.4pt;'>_______________________________</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Recordatorio: " + ConvierteFecha(fechasServicioDTO.getFecha()) + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Descripción: " + fechasServicioDTO.getDescripcion() + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Observaciones: " + fechasServicioDTO.getObservaciones() + "</p>";
        
        return cuerpo;
    }

    private String ObtenGeneral(Long id, FechasServicioDTO fechasServicioDTO){
        TramiteGeneralDTO generalDTO = tramiteGeneralService.findOne(id);

        String cuerpo = "<p style='margin-left: 35.4pt;'>Cliente: " + generalDTO.getClienteNombre() + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Titular: " + generalDTO.getTitular() + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Dependencia: " + generalDTO.getDependencia() + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Tipo de tr&aacute;mite: " + generalDTO.getTipoTramite() + "</p>";
        cuerpo = cuerpo +  "<p style='margin-left: 35.4pt;'>Estatus: " + generalDTO.getEstatusDescripcion() + "</p>";
        cuerpo = cuerpo +  "<p style='margin-left: 35.4pt;'>_______________________________</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Recordatorio: " + ConvierteFecha(fechasServicioDTO.getFecha()) + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Descripción: " + fechasServicioDTO.getDescripcion() + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Observaciones: " + fechasServicioDTO.getObservaciones() + "</p>";
        
        return cuerpo;
    }

    private String ObtenExpediente(Long id, FechasServicioDTO fechasServicioDTO){
        ExpedienteDTO expedienteDTO = expedienteService.findOne(id);

        String cuerpo = "<p style='margin-left: 35.4pt;'>Cliente: " + expedienteDTO.getClienteNombre() + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Expediente: " + expedienteDTO.getNumeroExpediente() + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Juicio: " + expedienteDTO.getJuicio() + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Juzgado: " + expedienteDTO.getJuzgado() + "</p>";
        cuerpo = cuerpo +  "<p style='margin-left: 35.4pt;'>Estatus: " + expedienteDTO.getEstatusDescripcion() + "</p>";
        cuerpo = cuerpo +  "<p style='margin-left: 35.4pt;'>_______________________________</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Recordatorio: " + ConvierteFecha(fechasServicioDTO.getFecha()) + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Descripción: " + fechasServicioDTO.getDescripcion() + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Observaciones: " + fechasServicioDTO.getObservaciones() + "</p>";
        
        return cuerpo;
    }

    private String ObtenEvento(FechasServicioDTO fechasServicioDTO){
        String cuerpo = "<p style='margin-left: 35.4pt;'>Recordatorio: " + ConvierteFecha(fechasServicioDTO.getFecha()) + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Descripción: " + fechasServicioDTO.getDescripcion() + "</p>";
        cuerpo = cuerpo + "<p style='margin-left: 35.4pt;'>Observaciones: " + fechasServicioDTO.getObservaciones() + "</p>";
        return cuerpo;
    }

    private String ConvierteFecha(Instant fecha){
        return LocalDateTime.ofInstant(fecha, ZoneId.systemDefault()).format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")) + "";
    }

    /**
     * Get all the fechasServicios.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FechasServicioDTO> findAll() {
        log.debug("Request to get all FechasServicios");
        return fechasServicioRepository.findAll().stream()
            .map(fechasServicioMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one fechasServicio by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FechasServicioDTO findOne(Long id) {
        log.debug("Request to get FechasServicio : {}", id);
        FechasServicio fechasServicio = fechasServicioRepository.findOne(id);
        return fechasServicioMapper.toDto(fechasServicio);
    }

    /**
     * Delete the fechasServicio by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FechasServicio : {}", id);
        fechasServicioRepository.delete(id);
        fechasServicioSearchRepository.delete(id);
    }

    /**
     * Search for the fechasServicio corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FechasServicioDTO> search(String query) {
        log.debug("Request to search FechasServicios for query {}", query);
        return StreamSupport
            .stream(fechasServicioSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(fechasServicioMapper::toDto)
            .collect(Collectors.toList());
    }


    /**
     * Get all the expedientes.
     *
     * @Long iduser the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FechasServicioDTO> findByExpedienteId(Long id) {
        log.debug("Request to get all Expedientes by user");       
       /*  Cliente cliente = new Cliente();
        cliente.setId(idUser);
        Expediente exp = new Expediente();
        exp.setCliente(cliente);
        Example<Expediente> expediente = Example.of(exp);*/
       return fechasServicioRepository.findByExpediente_id(id).stream().map(fechasServicioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
      //  return result.map(expedienteMapper::toDto);
    }


    /**
     * Get all the expedientes.
     *
     * @Long iduser the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FechasServicioDTO> findByMigratorio(Long id) {
        log.debug("Request to get all Expedientes by user");       
       /*  Cliente cliente = new Cliente();
        cliente.setId(idUser);
        Expediente exp = new Expediente();
        exp.setCliente(cliente);
        Example<Expediente> expediente = Example.of(exp);*/
       return fechasServicioRepository.findByTramiteMigratorio_id(id).stream().map(fechasServicioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
      //  return result.map(expedienteMapper::toDto);
    }

    /**
     * Get all the expedientes.
     *
     * @Long iduser the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FechasServicioDTO> findByGeneral(Long id) {
        log.debug("Request to get all Expedientes by user");       
       /*  Cliente cliente = new Cliente();
        cliente.setId(idUser);
        Expediente exp = new Expediente();
        exp.setCliente(cliente);
        Example<Expediente> expediente = Example.of(exp);*/
       return fechasServicioRepository.findByTramiteGeneral_id(id).stream().map(fechasServicioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
      //  return result.map(expedienteMapper::toDto);
    }

    /**
     * Get all the expedientes.
     *
     * @Long iduser the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FechasServicioDTO> findByDate(Long month, Long year) {
        log.debug("Request to get all Expedientes by month"); 
       return fechasServicioRepository.findByDate(month, year).stream().map(fechasServicioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));      
    }
}
