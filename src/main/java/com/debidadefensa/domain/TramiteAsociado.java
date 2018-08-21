package com.debidadefensa.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TramiteAsociado.
 */
@Entity
@Table(name = "tramite_asociado")
@Document(indexName = "tramiteasociado")
public class TramiteAsociado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "tipo_tramite")
    private String tipoTramite;

    @Column(name = "id_tramite")
    private Long idTramite;

    @NotNull
    @Column(name = "id_tramiteasociado", nullable = false)
    private Long idTramiteasociado;

    @NotNull
    @Column(name = "tipo_servicio_id", nullable = false)
    private Long tipoServicioId;

    @NotNull
    @Column(name = "tipo_servicio_id_asociado", nullable = false)
    private Long tipoServicioIdAsociado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipoTramite() {
        return tipoTramite;
    }

    public TramiteAsociado tipoTramite(String tipoTramite) {
        this.tipoTramite = tipoTramite;
        return this;
    }

    public void setTipoTramite(String tipoTramite) {
        this.tipoTramite = tipoTramite;
    }

    public Long getIdTramite() {
        return idTramite;
    }

    public TramiteAsociado idTramite(Long idTramite) {
        this.idTramite = idTramite;
        return this;
    }

    public void setIdTramite(Long idTramite) {
        this.idTramite = idTramite;
    }

    public Long getIdTramiteasociado() {
        return idTramiteasociado;
    }

    public TramiteAsociado idTramiteasociado(Long idTramiteasociado) {
        this.idTramiteasociado = idTramiteasociado;
        return this;
    }

    public void setIdTramiteasociado(Long idTramiteasociado) {
        this.idTramiteasociado = idTramiteasociado;
    }

    public Long getTipoServicioId() {
        return tipoServicioId;
    }

    public TramiteAsociado tipoServicioId(Long tipoServicioId) {
        this.tipoServicioId = tipoServicioId;
        return this;
    }

    public void setTipoServicioId(Long tipoServicioId) {
        this.tipoServicioId = tipoServicioId;
    }

    public Long getTipoServicioIdAsociado() {
        return tipoServicioIdAsociado;
    }

    public TramiteAsociado tipoServicioIdAsociado(Long tipoServicioIdAsociado) {
        this.tipoServicioIdAsociado = tipoServicioIdAsociado;
        return this;
    }

    public void setTipoServicioIdAsociado(Long tipoServicioIdAsociado) {
        this.tipoServicioIdAsociado = tipoServicioIdAsociado;
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
        TramiteAsociado tramiteAsociado = (TramiteAsociado) o;
        if (tramiteAsociado.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tramiteAsociado.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TramiteAsociado{" +
            "id=" + getId() +
            ", tipoTramite='" + getTipoTramite() + "'" +
            ", idTramite=" + getIdTramite() +
            ", idTramiteasociado=" + getIdTramiteasociado() +
            ", tipoServicioId=" + getTipoServicioId() +
            ", tipoServicioIdAsociado=" + getTipoServicioIdAsociado() +
            "}";
    }
}
