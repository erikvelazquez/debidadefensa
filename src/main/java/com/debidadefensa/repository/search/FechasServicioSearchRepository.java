package com.debidadefensa.repository.search;

import com.debidadefensa.domain.FechasServicio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the FechasServicio entity.
 */
public interface FechasServicioSearchRepository extends ElasticsearchRepository<FechasServicio, Long> {
}
