package com.debidadefensa.repository.search;

import com.debidadefensa.domain.TipoServicio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TipoServicio entity.
 */
public interface TipoServicioSearchRepository extends ElasticsearchRepository<TipoServicio, Long> {
}
