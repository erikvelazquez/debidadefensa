package com.debidadefensa.repository.search;

import com.debidadefensa.domain.Pagos;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Pagos entity.
 */
public interface PagosSearchRepository extends ElasticsearchRepository<Pagos, Long> {
}
