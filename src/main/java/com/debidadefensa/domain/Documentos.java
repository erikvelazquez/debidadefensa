package com.debidadefensa.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Documentos.
 */
@Entity
@Table(name = "documentos")
@Document(indexName = "documentos")
public class Documentos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre_documento")
    private String nombreDocumento;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "ruta")
    private String ruta;

    @ManyToOne
    private Expediente expediente;

    @ManyToOne
    private ExpedienteAsociado expedienteAsociado;

    @ManyToOne
    private TramiteMigratorio tramiteMigratorio;

    @ManyToOne
    private TramiteGeneral tramiteGeneral;

    @OneToOne
    @JoinColumn(unique = true)
    private TipoServicio tipoServicioDocumentos;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreDocumento() {
        return nombreDocumento;
    }

    public Documentos nombreDocumento(String nombreDocumento) {
        this.nombreDocumento = nombreDocumento;
        return this;
    }

    public void setNombreDocumento(String nombreDocumento) {
        this.nombreDocumento = nombreDocumento;
    }

    public Instant getFecha() {
        return fecha;
    }

    public Documentos fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Documentos descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getRuta() {
        return ruta;
    }

    public Documentos ruta(String ruta) {
        this.ruta = ruta;
        return this;
    }

    public void setRuta(String ruta) {
        this.ruta = ruta;
    }

    public Expediente getExpediente() {
        return expediente;
    }

    public Documentos expediente(Expediente expediente) {
        this.expediente = expediente;
        return this;
    }

    public void setExpediente(Expediente expediente) {
        this.expediente = expediente;
    }

    public ExpedienteAsociado getExpedienteAsociado() {
        return expedienteAsociado;
    }

    public Documentos expedienteAsociado(ExpedienteAsociado expedienteAsociado) {
        this.expedienteAsociado = expedienteAsociado;
        return this;
    }

    public void setExpedienteAsociado(ExpedienteAsociado expedienteAsociado) {
        this.expedienteAsociado = expedienteAsociado;
    }

    public TramiteMigratorio getTramiteMigratorio() {
        return tramiteMigratorio;
    }

    public Documentos tramiteMigratorio(TramiteMigratorio tramiteMigratorio) {
        this.tramiteMigratorio = tramiteMigratorio;
        return this;
    }

    public void setTramiteMigratorio(TramiteMigratorio tramiteMigratorio) {
        this.tramiteMigratorio = tramiteMigratorio;
    }

    public TramiteGeneral getTramiteGeneral() {
        return tramiteGeneral;
    }

    public Documentos tramiteGeneral(TramiteGeneral tramiteGeneral) {
        this.tramiteGeneral = tramiteGeneral;
        return this;
    }

    public void setTramiteGeneral(TramiteGeneral tramiteGeneral) {
        this.tramiteGeneral = tramiteGeneral;
    }

    public TipoServicio getTipoServicioDocumentos() {
        return tipoServicioDocumentos;
    }

    public Documentos tipoServicioDocumentos(TipoServicio tipoServicio) {
        this.tipoServicioDocumentos = tipoServicio;
        return this;
    }

    public void setTipoServicioDocumentos(TipoServicio tipoServicio) {
        this.tipoServicioDocumentos = tipoServicio;
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
        Documentos documentos = (Documentos) o;
        if (documentos.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentos.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Documentos{" +
            "id=" + getId() +
            ", nombreDocumento='" + getNombreDocumento() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", ruta='" + getRuta() + "'" +
            "}";
    }
}
