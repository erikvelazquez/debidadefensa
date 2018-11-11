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

    private Long tipoServicioId;

    private String tipoServicioNombre;

    public Long getId() {
        return id;
    }

    /**
     * @return the tipoServicioNombre
     */
    public String getTipoServicioNombre() {
        return tipoServicioNombre;
    }

    /**
     * @param tipoServicioNombre the tipoServicioNombre to set
     */
    public void setTipoServicioNombre(String tipoServicioNombre) {
        this.tipoServicioNombre = tipoServicioNombre;
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

    public Long getTipoServicioId() {
        return tipoServicioId;
    }

    public void setTipoServicioId(Long tipoServicioId) {
        this.tipoServicioId = tipoServicioId;
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
