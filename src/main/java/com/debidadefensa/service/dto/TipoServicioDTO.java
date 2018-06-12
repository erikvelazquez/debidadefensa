package com.debidadefensa.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TipoServicio entity.
 */
public class TipoServicioDTO implements Serializable {

    private Long id;

    private String descripcion;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TipoServicioDTO tipoServicioDTO = (TipoServicioDTO) o;
        if(tipoServicioDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoServicioDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoServicioDTO{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
