package com.debidadefensa.repository.search;

import com.debidadefensa.domain.TramiteAsociado;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TramiteAsociado entity.
 */
public interface TramiteAsociadoSearchRepository extends ElasticsearchRepository<TramiteAsociado, Long> {
}
