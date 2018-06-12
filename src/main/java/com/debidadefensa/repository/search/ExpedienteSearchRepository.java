package com.debidadefensa.repository.search;

import com.debidadefensa.domain.Expediente;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Expediente entity.
 */
public interface ExpedienteSearchRepository extends ElasticsearchRepository<Expediente, Long> {
}
