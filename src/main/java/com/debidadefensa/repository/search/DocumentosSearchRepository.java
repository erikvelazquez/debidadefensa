package com.debidadefensa.repository.search;

import com.debidadefensa.domain.Documentos;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Documentos entity.
 */
public interface DocumentosSearchRepository extends ElasticsearchRepository<Documentos, Long> {
}
