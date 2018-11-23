package com.debidadefensa.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldIndex;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A FechasServicio.
 */
@Entity
@Table(name = "fechas_servicio")
@Document(indexName =  "fechas_servicio", type = "fechas_servicio", shards = 1, replicas = 0)
public class FechasServicio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Field(index = FieldIndex.analyzed, store  = true, type = FieldType.Long)
    private Long id;

    @Column(name = "descripcion")
    @Field(index = FieldIndex.analyzed, store  = true, type = FieldType.String, analyzer = "spanish", searchAnalyzer = "spanish")
    private String descripcion;

    @Column(name = "observaciones")
    @Field(index = FieldIndex.analyzed, store  = true, type = FieldType.String, analyzer = "spanish", searchAnalyzer = "spanish")
    private String observaciones;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private Instant fecha;

    @ManyToOne
    private Expediente expediente;

    @ManyToOne
    private TramiteMigratorio tramiteMigratorio;

    @ManyToOne
    private TramiteGeneral tramiteGeneral;

    @ManyToOne
    private TipoServicio tipoServicio;

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

    public FechasServicio descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public FechasServicio observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Instant getFecha() {
        return fecha;
    }

    public FechasServicio fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Expediente getExpediente() {
        return expediente;
    }

    public FechasServicio expediente(Expediente expediente) {
        this.expediente = expediente;
        return this;
    }

    public void setExpediente(Expediente expediente) {
        this.expediente = expediente;
    }

    public TramiteMigratorio getTramiteMigratorio() {
        return tramiteMigratorio;
    }

    public FechasServicio tramiteMigratorio(TramiteMigratorio tramiteMigratorio) {
        this.tramiteMigratorio = tramiteMigratorio;
        return this;
    }

    public void setTramiteMigratorio(TramiteMigratorio tramiteMigratorio) {
        this.tramiteMigratorio = tramiteMigratorio;
    }

    public TramiteGeneral getTramiteGeneral() {
        return tramiteGeneral;
    }

    public FechasServicio tramiteGeneral(TramiteGeneral tramiteGeneral) {
        this.tramiteGeneral = tramiteGeneral;
        return this;
    }

    public void setTramiteGeneral(TramiteGeneral tramiteGeneral) {
        this.tramiteGeneral = tramiteGeneral;
    }

    public TipoServicio getTipoServicio() {
        return tipoServicio;
    }

    public FechasServicio tipoServicio(TipoServicio tipoServicio) {
        this.tipoServicio = tipoServicio;
        return this;
    }

    public void setTipoServicio(TipoServicio tipoServicio) {
        this.tipoServicio = tipoServicio;
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
        FechasServicio fechasServicio = (FechasServicio) o;
        if (fechasServicio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fechasServicio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FechasServicio{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
