package com.debidadefensa.service;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.debidadefensa.domain.*;
import com.debidadefensa.repository.*;
import com.debidadefensa.repository.search.*;
import org.elasticsearch.indices.IndexAlreadyExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.ManyToMany;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ElasticsearchIndexService {

    private static final Lock reindexLock = new ReentrantLock();

    private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexService.class);

    private final ClienteRepository clienteRepository;

    private final ClienteSearchRepository clienteSearchRepository;

    private final CostoServicioRepository costoServicioRepository;

    private final CostoServicioSearchRepository costoServicioSearchRepository;

    private final DocumentosRepository documentosRepository;

    private final DocumentosSearchRepository documentosSearchRepository;

    private final EstatusRepository estatusRepository;

    private final EstatusSearchRepository estatusSearchRepository;

    private final ExpedienteRepository expedienteRepository;

    private final ExpedienteSearchRepository expedienteSearchRepository;

    private final ExpedienteAsociadoRepository expedienteAsociadoRepository;

    private final ExpedienteAsociadoSearchRepository expedienteAsociadoSearchRepository;

    private final FechasServicioRepository fechasServicioRepository;

    private final FechasServicioSearchRepository fechasServicioSearchRepository;

    private final PagosRepository pagosRepository;

    private final PagosSearchRepository pagosSearchRepository;

    private final ParteRepository parteRepository;

    private final ParteSearchRepository parteSearchRepository;

    private final TipoParteRepository tipoParteRepository;

    private final TipoParteSearchRepository tipoParteSearchRepository;

    private final TipoServicioRepository tipoServicioRepository;

    private final TipoServicioSearchRepository tipoServicioSearchRepository;

    private final TramiteAsociadoRepository tramiteAsociadoRepository;

    private final TramiteAsociadoSearchRepository tramiteAsociadoSearchRepository;

    private final TramiteGeneralRepository tramiteGeneralRepository;

    private final TramiteGeneralSearchRepository tramiteGeneralSearchRepository;

    private final TramiteMigratorioRepository tramiteMigratorioRepository;

    private final TramiteMigratorioSearchRepository tramiteMigratorioSearchRepository;

    private final UserRepository userRepository;

    private final UserSearchRepository userSearchRepository;

    private final ElasticsearchTemplate elasticsearchTemplate;

    public ElasticsearchIndexService(
        UserRepository userRepository,
        UserSearchRepository userSearchRepository,
        ClienteRepository clienteRepository,
        ClienteSearchRepository clienteSearchRepository,
        CostoServicioRepository costoServicioRepository,
        CostoServicioSearchRepository costoServicioSearchRepository,
        DocumentosRepository documentosRepository,
        DocumentosSearchRepository documentosSearchRepository,
        EstatusRepository estatusRepository,
        EstatusSearchRepository estatusSearchRepository,
        ExpedienteRepository expedienteRepository,
        ExpedienteSearchRepository expedienteSearchRepository,
        ExpedienteAsociadoRepository expedienteAsociadoRepository,
        ExpedienteAsociadoSearchRepository expedienteAsociadoSearchRepository,
        FechasServicioRepository fechasServicioRepository,
        FechasServicioSearchRepository fechasServicioSearchRepository,
        PagosRepository pagosRepository,
        PagosSearchRepository pagosSearchRepository,
        ParteRepository parteRepository,
        ParteSearchRepository parteSearchRepository,
        TipoParteRepository tipoParteRepository,
        TipoParteSearchRepository tipoParteSearchRepository,
        TipoServicioRepository tipoServicioRepository,
        TipoServicioSearchRepository tipoServicioSearchRepository,
        TramiteAsociadoRepository tramiteAsociadoRepository,
        TramiteAsociadoSearchRepository tramiteAsociadoSearchRepository,
        TramiteGeneralRepository tramiteGeneralRepository,
        TramiteGeneralSearchRepository tramiteGeneralSearchRepository,
        TramiteMigratorioRepository tramiteMigratorioRepository,
        TramiteMigratorioSearchRepository tramiteMigratorioSearchRepository,
        ElasticsearchTemplate elasticsearchTemplate) {
        this.userRepository = userRepository;
        this.userSearchRepository = userSearchRepository;
        this.clienteRepository = clienteRepository;
        this.clienteSearchRepository = clienteSearchRepository;
        this.costoServicioRepository = costoServicioRepository;
        this.costoServicioSearchRepository = costoServicioSearchRepository;
        this.documentosRepository = documentosRepository;
        this.documentosSearchRepository = documentosSearchRepository;
        this.estatusRepository = estatusRepository;
        this.estatusSearchRepository = estatusSearchRepository;
        this.expedienteRepository = expedienteRepository;
        this.expedienteSearchRepository = expedienteSearchRepository;
        this.expedienteAsociadoRepository = expedienteAsociadoRepository;
        this.expedienteAsociadoSearchRepository = expedienteAsociadoSearchRepository;
        this.fechasServicioRepository = fechasServicioRepository;
        this.fechasServicioSearchRepository = fechasServicioSearchRepository;
        this.pagosRepository = pagosRepository;
        this.pagosSearchRepository = pagosSearchRepository;
        this.parteRepository = parteRepository;
        this.parteSearchRepository = parteSearchRepository;
        this.tipoParteRepository = tipoParteRepository;
        this.tipoParteSearchRepository = tipoParteSearchRepository;
        this.tipoServicioRepository = tipoServicioRepository;
        this.tipoServicioSearchRepository = tipoServicioSearchRepository;
        this.tramiteAsociadoRepository = tramiteAsociadoRepository;
        this.tramiteAsociadoSearchRepository = tramiteAsociadoSearchRepository;
        this.tramiteGeneralRepository = tramiteGeneralRepository;
        this.tramiteGeneralSearchRepository = tramiteGeneralSearchRepository;
        this.tramiteMigratorioRepository = tramiteMigratorioRepository;
        this.tramiteMigratorioSearchRepository = tramiteMigratorioSearchRepository;
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Async
    @Timed
    public void reindexAll() {
        if (reindexLock.tryLock()) {
            try {
                reindexForClass(Cliente.class, clienteRepository, clienteSearchRepository);
                reindexForClass(CostoServicio.class, costoServicioRepository, costoServicioSearchRepository);
                reindexForClass(Documentos.class, documentosRepository, documentosSearchRepository);
                reindexForClass(Estatus.class, estatusRepository, estatusSearchRepository);
                reindexForClass(Expediente.class, expedienteRepository, expedienteSearchRepository);
                reindexForClass(ExpedienteAsociado.class, expedienteAsociadoRepository, expedienteAsociadoSearchRepository);
                reindexForClass(FechasServicio.class, fechasServicioRepository, fechasServicioSearchRepository);
                reindexForClass(Pagos.class, pagosRepository, pagosSearchRepository);
                reindexForClass(Parte.class, parteRepository, parteSearchRepository);
                reindexForClass(TipoParte.class, tipoParteRepository, tipoParteSearchRepository);
                reindexForClass(TipoServicio.class, tipoServicioRepository, tipoServicioSearchRepository);
                reindexForClass(TramiteAsociado.class, tramiteAsociadoRepository, tramiteAsociadoSearchRepository);
                reindexForClass(TramiteGeneral.class, tramiteGeneralRepository, tramiteGeneralSearchRepository);
                reindexForClass(TramiteMigratorio.class, tramiteMigratorioRepository, tramiteMigratorioSearchRepository);
                reindexForClass(User.class, userRepository, userSearchRepository);

                log.info("Elasticsearch: Successfully performed reindexing");
            } finally {
                reindexLock.unlock();
            }
        } else {
            log.info("Elasticsearch: concurrent reindexing attempt");
        }
    }

    @SuppressWarnings("unchecked")
    private <T, ID extends Serializable> void reindexForClass(Class<T> entityClass, JpaRepository<T, ID> jpaRepository,
                                                              ElasticsearchRepository<T, ID> elasticsearchRepository) {
        elasticsearchTemplate.deleteIndex(entityClass);
        try {
            elasticsearchTemplate.createIndex(entityClass);
        } catch (IndexAlreadyExistsException e) {
            // Do nothing. Index was already concurrently recreated by some other service.
        }
        elasticsearchTemplate.putMapping(entityClass);
        if (jpaRepository.count() > 0) {
            // if a JHipster entity field is the owner side of a many-to-many relationship, it should be loaded manually
            List<Method> relationshipGetters = Arrays.stream(entityClass.getDeclaredFields())
                .filter(field -> field.getType().equals(Set.class))
                .filter(field -> field.getAnnotation(ManyToMany.class) != null)
                .filter(field -> field.getAnnotation(ManyToMany.class).mappedBy().isEmpty())
                .filter(field -> field.getAnnotation(JsonIgnore.class) == null)
                .map(field -> {
                    try {
                        return new PropertyDescriptor(field.getName(), entityClass).getReadMethod();
                    } catch (IntrospectionException e) {
                        log.error("Error retrieving getter for class {}, field {}. Field will NOT be indexed",
                            entityClass.getSimpleName(), field.getName(), e);
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

            int size = 100;
            for (int i = 0; i <= jpaRepository.count() / size; i++) {
                Pageable page = new PageRequest(i, size);
                log.info("Indexing page {} of {}, size {}", i, jpaRepository.count() / size, size);
                Page<T> results = jpaRepository.findAll(page);
                results.map(result -> {
                    // if there are any relationships to load, do it now
                    relationshipGetters.forEach(method -> {
                        try {
                            // eagerly load the relationship set
                            ((Set) method.invoke(result)).size();
                        } catch (Exception ex) {
                            log.error(ex.getMessage());
                        }
                    });
                    return result;
                });
                elasticsearchRepository.save(results.getContent());
            }
        }
        log.info("Elasticsearch: Indexed all rows for {}", entityClass.getSimpleName());
    }
}
