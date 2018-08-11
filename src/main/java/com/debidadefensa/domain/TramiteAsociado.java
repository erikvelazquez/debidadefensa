package com.debidadefensa.domain;


import javax.persistence.*;

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

    @Column(name = "id_tramiteasociado")
    private Long idTramiteAsociado;

    @Column(name = "tipo_servicio_id")
    private Long tipoServicioId;

    @Column(name = "tipo_servicio_idasociado")
    private Long tipoServicioIdAsociado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
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



	public void setId(Long id) {
        this.id = id;
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
            ", idTramite=" + getIdTramite() +
            ", idTramiteAsociado=" + getIdTramiteAsociado() +
            ", tipoServicioId=" + getTipoServicioId() +
            ", tipoServicioIdAsociado=" + getTipoServicioIdAsociado() +
            "}";
    }
}
