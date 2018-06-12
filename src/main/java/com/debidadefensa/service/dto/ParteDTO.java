package com.debidadefensa.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Parte entity.
 */
public class ParteDTO implements Serializable {

    private Long id;

    private String nombre;

    private Long expedienteId;

    private Long tipoParteId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getExpedienteId() {
        return expedienteId;
    }

    public void setExpedienteId(Long expedienteId) {
        this.expedienteId = expedienteId;
    }

    public Long getTipoParteId() {
        return tipoParteId;
    }

    public void setTipoParteId(Long tipoParteId) {
        this.tipoParteId = tipoParteId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ParteDTO parteDTO = (ParteDTO) o;
        if(parteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ParteDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
