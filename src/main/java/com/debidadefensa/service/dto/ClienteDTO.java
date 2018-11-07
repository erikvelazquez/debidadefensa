package com.debidadefensa.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Cliente entity.
 */
public class ClienteDTO implements Serializable {

    private Long id;

    private String nombre;

    private String telefonos;

    private String correoElectronico;

    private String domicilio;

    private String rfc;

    private String referencia;

    private Long totalExpediente = (long)0;

    private Long totalMigratorios = (long)0;

    private Long totalGenerales = (long)0;

    private Float totalCosto = (float)0;

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

    public String getTelefonos() {
        return telefonos;
    }

    public void setTelefonos(String telefonos) {
        this.telefonos = telefonos;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public String getRfc() {
        return rfc;
    }

    public void setRfc(String rfc) {
        this.rfc = rfc;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public Long getTotalExpediente() {
        return totalExpediente;
    }

    public void setTotalExpediente(Long totalExpediente) {
        this.totalExpediente = totalExpediente;
    }

    public Long getTotalMigratorios() {
        return totalMigratorios;
    }

    public void setTotalMigratorios(Long totalMigratorios) {
        this.totalMigratorios = totalMigratorios;
    }

    public Long getTotalGenerales() {
        return totalGenerales;
    }

    public void setTotalGenerales(Long totalGenerales) {
        this.totalGenerales = totalGenerales;
    }

    public Float getTotalCosto() {
        return totalCosto;
    }

    public void setTotalCosto(Float totalCosto) {
        this.totalCosto = totalCosto;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClienteDTO clienteDTO = (ClienteDTO) o;
        if(clienteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clienteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClienteDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", telefonos='" + getTelefonos() + "'" +
            ", correoElectronico='" + getCorreoElectronico() + "'" +
            ", domicilio='" + getDomicilio() + "'" +
            ", rfc='" + getRfc() + "'" +
            ", referencia='" + getReferencia() + "'" +
            ", totalExpediente=" + getTotalExpediente() +
            ", totalMigratorios=" + getTotalMigratorios() +
            ", totalGenerales=" + getTotalGenerales() +
            ", totalCosto=" + getTotalCosto() +
            "}";
    }
}
