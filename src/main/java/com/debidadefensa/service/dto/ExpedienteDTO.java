package com.debidadefensa.service.dto;


import java.time.LocalDate;
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

    private String observaciones;

    private LocalDate fechaAlta;

    private LocalDate fechaSentencia;

    private Long clienteId;

    private String clienteNombre;

    private Long estatusExpedienteId;

    private String estatusDescripcion;

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

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public LocalDate getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(LocalDate fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public LocalDate getFechaSentencia() {
        return fechaSentencia;
    }

    public void setFechaSentencia(LocalDate fechaSentencia) {
        this.fechaSentencia = fechaSentencia;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public String getClienteNombre() {
        return clienteNombre;
    }

    public void setClienteNombre(String clienteNombre) {
        this.clienteNombre = clienteNombre;
    }    

    public Long getEstatusExpedienteId() {
        return estatusExpedienteId;
    }

    public void setEstatusExpedienteId(Long estatusId) {
        this.estatusExpedienteId = estatusId;
    }

    public String getEstatusDescripcion() {
        return estatusDescripcion;
    }

    public void setEstatusDescripcion(String estatusDescripcion) {
        this.estatusDescripcion = estatusDescripcion;
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
            ", observaciones='" + getObservaciones() + "'" +
            ", fechaAlta='" + getFechaAlta() + "'" +
            ", fechaSentencia='" + getFechaSentencia() + "'" +
            "}";
    }
}
