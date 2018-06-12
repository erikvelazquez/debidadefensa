package com.debidadefensa.repository.search;

import com.debidadefensa.domain.TramiteGeneral;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TramiteGeneral entity.
 */
public interface TramiteGeneralSearchRepository extends ElasticsearchRepository<TramiteGeneral, Long> {
}
