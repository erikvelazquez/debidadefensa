package com.debidadefensa.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TramiteAsociado entity.
 */
public class TramiteAsociadoDTO implements Serializable {

    private Long id;

    private String tipoTramite;

    private Long idTramite;

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
            "}";
    }
}
