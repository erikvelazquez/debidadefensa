package com.debidadefensa.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Estatus entity.
 */
public class EstatusDTO implements Serializable {

    private Long id;

    private String descripcion;

    private Long tipoServicioEstatusId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Long getTipoServicioEstatusId() {
        return tipoServicioEstatusId;
    }

    public void setTipoServicioEstatusId(Long tipoServicioId) {
        this.tipoServicioEstatusId = tipoServicioId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EstatusDTO estatusDTO = (EstatusDTO) o;
        if(estatusDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), estatusDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EstatusDTO{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
