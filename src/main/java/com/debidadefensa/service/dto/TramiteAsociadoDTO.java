package com.debidadefensa.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TramiteAsociado entity.
 */
public class TramiteAsociadoDTO implements Serializable {

    private Long id;

    private String tipoTramite;

    private Long idTramite;

    @NotNull
    private Long idTramiteasociado;

    @NotNull
    private Long tipoServicioId;

    @NotNull
    private Long tipoServicioIdAsociado;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipoTramite() {
        return tipoTramite;
    }

    public void setTipoTramite(String tipoTramite) {
        this.tipoTramite = tipoTramite;
    }

    public Long getIdTramite() {
        return idTramite;
    }

    public void setIdTramite(Long idTramite) {
        this.idTramite = idTramite;
    }

    public Long getIdTramiteasociado() {
        return idTramiteasociado;
    }

    public void setIdTramiteasociado(Long idTramiteasociado) {
        this.idTramiteasociado = idTramiteasociado;
    }

    public Long getTipoServicioId() {
        return tipoServicioId;
    }

    public void setTipoServicioId(Long tipoServicioId) {
        this.tipoServicioId = tipoServicioId;
    }

    public Long getTipoServicioIdAsociado() {
        return tipoServicioIdAsociado;
    }

    public void setTipoServicioIdAsociado(Long tipoServicioIdAsociado) {
        this.tipoServicioIdAsociado = tipoServicioIdAsociado;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TramiteAsociadoDTO tramiteAsociadoDTO = (TramiteAsociadoDTO) o;
        if(tramiteAsociadoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tramiteAsociadoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TramiteAsociadoDTO{" +
            "id=" + getId() +
            ", tipoTramite='" + getTipoTramite() + "'" +
            ", idTramite=" + getIdTramite() +
            ", idTramiteasociado=" + getIdTramiteasociado() +
            ", tipoServicioId=" + getTipoServicioId() +
            ", tipoServicioIdAsociado=" + getTipoServicioIdAsociado() +
            "}";
    }
}
