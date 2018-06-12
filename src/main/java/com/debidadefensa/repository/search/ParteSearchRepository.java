package com.debidadefensa.repository.search;

import com.debidadefensa.domain.Parte;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Parte entity.
 */
public interface ParteSearchRepository extends ElasticsearchRepository<Parte, Long> {
}
