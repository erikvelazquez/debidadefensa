package com.debidadefensa.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TramiteAsociado entity.
 */
public class TramiteAsociadoDTO implements Serializable {

    private Long id;

    private Long idTramite;

    private Long idTramiteAsociado;
    
    private Long tipoServicioId;

    private Long tipoServicioIdAsociado;


    public Long getId() {
        return id;
    }

    /**
	 * @return the tipoServicioIdAsociado
	 */
	public Long getTipoServicioIdAsociado() {
		return tipoServicioIdAsociado;
	}

	/**
	 * @param tipoServicioIdAsociado the tipoServicioIdAsociado to set
	 */
	public void setTipoServicioIdAsociado(Long tipoServicioIdAsociado) {
		this.tipoServicioIdAsociado = tipoServicioIdAsociado;
	}

	/**
	 * @return the tipoServicioId
	 */
	public Long getTipoServicioId() {
		return tipoServicioId;
	}

	/**
	 * @param tipoServicioId the tipoServicioId to set
	 */
	public void setTipoServicioId(Long tipoServicioId) {
		this.tipoServicioId = tipoServicioId;
	}

	/**
	 * @return the idTramiteAsociado
	 */
	public Long getIdTramiteAsociado() {
		return idTramiteAsociado;
	}

	/**
	 * @param idTramiteAsociado the idTramiteAsociado to set
	 */
	public void setIdTramiteAsociado(Long idTramiteAsociado) {
		this.idTramiteAsociado = idTramiteAsociado;
	}

	public void setId(Long id) {
        this.id = id;
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
            ", idTramite=" + getIdTramite() +
            "}";
    }
}
