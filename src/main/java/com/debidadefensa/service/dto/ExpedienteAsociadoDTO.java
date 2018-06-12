package com.debidadefensa.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ExpedienteAsociado entity.
 */
public class ExpedienteAsociadoDTO implements Serializable {

    private Long id;

    private String numeroExpediente;

    private String instancia;

    private String organocompetente;

    private String archivo;

    private String observaciones;

    private Instant fechaSentencia;

    private Long expedienteId;

    private Long estatusExpedienteAsociadoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroExpediente() {
        return numeroExpediente;
    }

    public void setNumeroExpediente(String numeroExpediente) {
        this.numeroExpediente = numeroExpediente;
    }

    public String getInstancia() {
        return instancia;
    }

    public void setInstancia(String instancia) {
        this.instancia = instancia;
    }

    public String getOrganocompetente() {
        return organocompetente;
    }

    public void setOrganocompetente(String organocompetente) {
        this.organocompetente = organocompetente;
    }

    public String getArchivo() {
        return archivo;
    }

    public void setArchivo(String archivo) {
        this.archivo = archivo;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Instant getFechaSentencia() {
        return fechaSentencia;
    }

    public void setFechaSentencia(Instant fechaSentencia) {
        this.fechaSentencia = fechaSentencia;
    }

    public Long getExpedienteId() {
        return expedienteId;
    }

    public void setExpedienteId(Long expedienteId) {
        this.expedienteId = expedienteId;
    }

    public Long getEstatusExpedienteAsociadoId() {
        return estatusExpedienteAsociadoId;
    }

    public void setEstatusExpedienteAsociadoId(Long estatusId) {
        this.estatusExpedienteAsociadoId = estatusId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ExpedienteAsociadoDTO expedienteAsociadoDTO = (ExpedienteAsociadoDTO) o;
        if(expedienteAsociadoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), expedienteAsociadoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExpedienteAsociadoDTO{" +
            "id=" + getId() +
            ", numeroExpediente='" + getNumeroExpediente() + "'" +
            ", instancia='" + getInstancia() + "'" +
            ", organocompetente='" + getOrganocompetente() + "'" +
            ", archivo='" + getArchivo() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            ", fechaSentencia='" + getFechaSentencia() + "'" +
            "}";
    }
}
