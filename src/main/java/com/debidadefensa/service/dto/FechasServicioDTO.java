package com.debidadefensa.service.dto;


import java.time.Instant;
import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the FechasServicio entity.
 */
public class FechasServicioDTO implements Serializable {

    private Long id;

    private String tipoServicio;

    private Instant fecha;

    private String descripcion;

    private LocalDate hora;

    private String observaciones;

    private Long expedienteId;

    private Long tramiteMigratorioId;

    private Long tramiteGeneralId;

    private Long tipoServicioFechasId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipoServicio() {
        return tipoServicio;
    }

    public void setTipoServicio(String tipoServicio) {
        this.tipoServicio = tipoServicio;
    }

    public Instant getFecha() {
        return fecha;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDate getHora() {
        return hora;
    }

    public void setHora(LocalDate hora) {
        this.hora = hora;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Long getExpedienteId() {
        return expedienteId;
    }

    public void setExpedienteId(Long expedienteId) {
        this.expedienteId = expedienteId;
    }

    public Long getTramiteMigratorioId() {
        return tramiteMigratorioId;
    }

    public void setTramiteMigratorioId(Long tramiteMigratorioId) {
        this.tramiteMigratorioId = tramiteMigratorioId;
    }

    public Long getTramiteGeneralId() {
        return tramiteGeneralId;
    }

    public void setTramiteGeneralId(Long tramiteGeneralId) {
        this.tramiteGeneralId = tramiteGeneralId;
    }

    public Long getTipoServicioFechasId() {
        return tipoServicioFechasId;
    }

    public void setTipoServicioFechasId(Long tipoServicioId) {
        this.tipoServicioFechasId = tipoServicioId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FechasServicioDTO fechasServicioDTO = (FechasServicioDTO) o;
        if(fechasServicioDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fechasServicioDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FechasServicioDTO{" +
            "id=" + getId() +
            ", tipoServicio='" + getTipoServicio() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", hora='" + getHora() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            "}";
    }
}
