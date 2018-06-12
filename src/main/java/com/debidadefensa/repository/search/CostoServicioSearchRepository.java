package com.debidadefensa.repository.search;

import com.debidadefensa.domain.CostoServicio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CostoServicio entity.
 */
public interface CostoServicioSearchRepository extends ElasticsearchRepository<CostoServicio, Long> {
}
