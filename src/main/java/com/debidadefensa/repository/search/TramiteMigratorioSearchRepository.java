package com.debidadefensa.repository.search;

import com.debidadefensa.domain.TramiteMigratorio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TramiteMigratorio entity.
 */
public interface TramiteMigratorioSearchRepository extends ElasticsearchRepository<TramiteMigratorio, Long> {
}
