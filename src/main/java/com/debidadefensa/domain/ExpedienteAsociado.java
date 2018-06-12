package com.debidadefensa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ExpedienteAsociado.
 */
@Entity
@Table(name = "expediente_asociado")
@Document(indexName = "expedienteasociado")
public class ExpedienteAsociado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "numero_expediente")
    private String numeroExpediente;

    @Column(name = "instancia")
    private String instancia;

    @Column(name = "organocompetente")
    private String organocompetente;

    @Column(name = "archivo")
    private String archivo;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "fecha_sentencia")
    private Instant fechaSentencia;

    @ManyToOne
    private Expediente expediente;

    @OneToOne
    @JoinColumn(unique = true)
    private Estatus estatusExpedienteAsociado;

    @OneToMany(mappedBy = "expedienteAsociado")
    @JsonIgnore
    private Set<Documentos> expedienteAsociadoDocumentos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroExpediente() {
        return numeroExpediente;
    }

    public ExpedienteAsociado numeroExpediente(String numeroExpediente) {
        this.numeroExpediente = numeroExpediente;
        return this;
    }

    public void setNumeroExpediente(String numeroExpediente) {
        this.numeroExpediente = numeroExpediente;
    }

    public String getInstancia() {
        return instancia;
    }

    public ExpedienteAsociado instancia(String instancia) {
        this.instancia = instancia;
        return this;
    }

    public void setInstancia(String instancia) {
        this.instancia = instancia;
    }

    public String getOrganocompetente() {
        return organocompetente;
    }

    public ExpedienteAsociado organocompetente(String organocompetente) {
        this.organocompetente = organocompetente;
        return this;
    }

    public void setOrganocompetente(String organocompetente) {
        this.organocompetente = organocompetente;
    }

    public String getArchivo() {
        return archivo;
    }

    public ExpedienteAsociado archivo(String archivo) {
        this.archivo = archivo;
        return this;
    }

    public void setArchivo(String archivo) {
        this.archivo = archivo;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public ExpedienteAsociado observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Instant getFechaSentencia() {
        return fechaSentencia;
    }

    public ExpedienteAsociado fechaSentencia(Instant fechaSentencia) {
        this.fechaSentencia = fechaSentencia;
        return this;
    }

    public void setFechaSentencia(Instant fechaSentencia) {
        this.fechaSentencia = fechaSentencia;
    }

    public Expediente getExpediente() {
        return expediente;
    }

    public ExpedienteAsociado expediente(Expediente expediente) {
        this.expediente = expediente;
        return this;
    }

    public void setExpediente(Expediente expediente) {
        this.expediente = expediente;
    }

    public Estatus getEstatusExpedienteAsociado() {
        return estatusExpedienteAsociado;
    }

    public ExpedienteAsociado estatusExpedienteAsociado(Estatus estatus) {
        this.estatusExpedienteAsociado = estatus;
        return this;
    }

    public void setEstatusExpedienteAsociado(Estatus estatus) {
        this.estatusExpedienteAsociado = estatus;
    }

    public Set<Documentos> getExpedienteAsociadoDocumentos() {
        return expedienteAsociadoDocumentos;
    }

    public ExpedienteAsociado expedienteAsociadoDocumentos(Set<Documentos> documentos) {
        this.expedienteAsociadoDocumentos = documentos;
        return this;
    }

    public ExpedienteAsociado addExpedienteAsociadoDocumentos(Documentos documentos) {
        this.expedienteAsociadoDocumentos.add(documentos);
        documentos.setExpedienteAsociado(this);
        return this;
    }

    public ExpedienteAsociado removeExpedienteAsociadoDocumentos(Documentos documentos) {
        this.expedienteAsociadoDocumentos.remove(documentos);
        documentos.setExpedienteAsociado(null);
        return this;
    }

    public void setExpedienteAsociadoDocumentos(Set<Documentos> documentos) {
        this.expedienteAsociadoDocumentos = documentos;
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
        ExpedienteAsociado expedienteAsociado = (ExpedienteAsociado) o;
        if (expedienteAsociado.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), expedienteAsociado.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExpedienteAsociado{" +
            "id=" + getId() +
            ", numeroExpediente='" + getNumeroExpediente() + "'" +
            ", instancia='" + getInstancia() + "'" +
            ", organocompetente='" + getOrganocompetente() + "'" +
            ", archivo='" + getArchivo() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            ", fechaSentencia='" + getFechaSentencia() + "'" +
            "}";
    }
}
