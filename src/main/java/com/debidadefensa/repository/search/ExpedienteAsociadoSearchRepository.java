package com.debidadefensa.repository.search;

import com.debidadefensa.domain.ExpedienteAsociado;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ExpedienteAsociado entity.
 */
public interface ExpedienteAsociadoSearchRepository extends ElasticsearchRepository<ExpedienteAsociado, Long> {
}
