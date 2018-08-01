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

    private Long totalExpediente;

    public ClienteDTO() {
    }

    public ClienteDTO (Long _id, 
                        String _nombre, 
                        String _telefonos, 
                        String _correoElectronico, 
                        String _domicilio, 
                        String _rfc, 
                        String _referencia, 
                        Long _totalExpediente) {
    this.id = _id;
    this.nombre = _nombre;
    this.telefonos = _telefonos;
    this.correoElectronico = _correoElectronico;
    this.domicilio = _domicilio;
    this.rfc = _rfc;
    this.referencia = _referencia;
    this.totalExpediente = _totalExpediente;
    }

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

    /**
	 * @return the totalExpediente
	 */
	public Long getTotalExpediente() {
		return totalExpediente;
	}

	/**
	 * @param totalExpediente the totalExpediente to set
	 */
	public void setTotalExpediente(Long totalExpediente) {
		this.totalExpediente = totalExpediente;
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
            ", totalExpediente='" + getTotalExpediente() + "'" +
            "}";
    }
}
