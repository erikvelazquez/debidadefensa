package com.debidadefensa.repository.search;

import com.debidadefensa.domain.Estatus;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Estatus entity.
 */
public interface EstatusSearchRepository extends ElasticsearchRepository<Estatus, Long> {
}
