package com.debidadefensa.repository.search;

import com.debidadefensa.domain.TipoParte;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TipoParte entity.
 */
public interface TipoParteSearchRepository extends ElasticsearchRepository<TipoParte, Long> {
}
