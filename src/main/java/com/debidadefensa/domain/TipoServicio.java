package com.debidadefensa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldIndex;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Setting;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TipoServicio.
 */
@Entity
@Table(name = "tipo_servicio")
@Document(indexName = "tramite_asociado", type = "tipo_servicio", shards = 1, replicas = 0)
@Setting(settingPath = "/config/es-settings.json")
public class TipoServicio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Field(index = FieldIndex.analyzed, store  = true, type = FieldType.Long)
    private Long id;

    @Column(name = "descripcion")
    @Field(index = FieldIndex.analyzed, store  = true, type = FieldType.String, analyzer = "spanish", searchAnalyzer = "spanish")
    private String descripcion;

    @OneToMany(mappedBy = "tipoServicio")
    @JsonIgnore
    private Set<Estatus> tipoServicioEstatuses = new HashSet<>();

    @OneToMany(mappedBy = "tipoServicio")
    @JsonIgnore
    private Set<Expediente> tipoServicioExpedientes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public TipoServicio descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Estatus> getTipoServicioEstatuses() {
        return tipoServicioEstatuses;
    }

    public TipoServicio tipoServicioEstatuses(Set<Estatus> estatuses) {
        this.tipoServicioEstatuses = estatuses;
        return this;
    }

    public TipoServicio addTipoServicioEstatus(Estatus estatus) {
        this.tipoServicioEstatuses.add(estatus);
        estatus.setTipoServicio(this);
        return this;
    }

    public TipoServicio removeTipoServicioEstatus(Estatus estatus) {
        this.tipoServicioEstatuses.remove(estatus);
        estatus.setTipoServicio(null);
        return this;
    }

    public void setTipoServicioEstatuses(Set<Estatus> estatuses) {
        this.tipoServicioEstatuses = estatuses;
    }

    public Set<Expediente> getTipoServicioExpedientes() {
        return tipoServicioExpedientes;
    }

    public TipoServicio tipoServicioExpedientes(Set<Expediente> expedientes) {
        this.tipoServicioExpedientes = expedientes;
        return this;
    }

    public TipoServicio addTipoServicioExpediente(Expediente expediente) {
        this.tipoServicioExpedientes.add(expediente);
        expediente.setTipoServicio(this);
        return this;
    }

    public TipoServicio removeTipoServicioExpediente(Expediente expediente) {
        this.tipoServicioExpedientes.remove(expediente);
        expediente.setTipoServicio(null);
        return this;
    }

    public void setTipoServicioExpedientes(Set<Expediente> expedientes) {
        this.tipoServicioExpedientes = expedientes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TipoServicio tipoServicio = (TipoServicio) o;
        if (tipoServicio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoServicio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoServicio{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
