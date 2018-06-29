package com.debidadefensa.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Expediente entity.
 */
public class ExpedienteDTO implements Serializable {

    private Long id;

    private String juzgado;

    private String numeroExpediente;

    private String juicio;

    private String responsable;

    private String archivo;

    private String observaciones;

    private Instant fechaAlta;

    private Instant fechaSentencia;

    private Long clienteId;

    private Long estatusExpedienteId;

    private Long tipoServicioId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJuzgado() {
        return juzgado;
    }

    public void setJuzgado(String juzgado) {
        this.juzgado = juzgado;
    }

    public String getNumeroExpediente() {
        return numeroExpediente;
    }

    public void setNumeroExpediente(String numeroExpediente) {
        this.numeroExpediente = numeroExpediente;
    }

    public String getJuicio() {
        return juicio;
    }

    public void setJuicio(String juicio) {
        this.juicio = juicio;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
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

    public Instant getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(Instant fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public Instant getFechaSentencia() {
        return fechaSentencia;
    }

    public void setFechaSentencia(Instant fechaSentencia) {
        this.fechaSentencia = fechaSentencia;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public Long getEstatusExpedienteId() {
        return estatusExpedienteId;
    }

    public void setEstatusExpedienteId(Long estatusId) {
        this.estatusExpedienteId = estatusId;
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

        ExpedienteDTO expedienteDTO = (ExpedienteDTO) o;
        if(expedienteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), expedienteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExpedienteDTO{" +
            "id=" + getId() +
            ", juzgado='" + getJuzgado() + "'" +
            ", numeroExpediente='" + getNumeroExpediente() + "'" +
            ", juicio='" + getJuicio() + "'" +
            ", responsable='" + getResponsable() + "'" +
            ", archivo='" + getArchivo() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            ", fechaAlta='" + getFechaAlta() + "'" +
            ", fechaSentencia='" + getFechaSentencia() + "'" +
            "}";
    }
}
