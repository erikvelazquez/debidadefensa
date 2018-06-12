package com.debidadefensa.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the TramiteGeneral entity.
 */
public class TramiteGeneralDTO implements Serializable {

    private Long id;

    private String titular;

    private String dependencia;

    private String numeroTramite;

    private String tipoTramite;

    private Instant fechaIngreso;

    private Instant fechaResolucion;

    private Instant fechaNotificacion;

    private String archivo;

    private String observaciones;

    private Long clienteId;

    private Long estatusTramiteGeneralId;

    private Set<TramiteAsociadoDTO> tramiteGeneralAsociados = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitular() {
        return titular;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    public String getDependencia() {
        return dependencia;
    }

    public void setDependencia(String dependencia) {
        this.dependencia = dependencia;
    }

    public String getNumeroTramite() {
        return numeroTramite;
    }

    public void setNumeroTramite(String numeroTramite) {
        this.numeroTramite = numeroTramite;
    }

    public String getTipoTramite() {
        return tipoTramite;
    }

    public void setTipoTramite(String tipoTramite) {
        this.tipoTramite = tipoTramite;
    }

    public Instant getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(Instant fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public Instant getFechaResolucion() {
        return fechaResolucion;
    }

    public void setFechaResolucion(Instant fechaResolucion) {
        this.fechaResolucion = fechaResolucion;
    }

    public Instant getFechaNotificacion() {
        return fechaNotificacion;
    }

    public void setFechaNotificacion(Instant fechaNotificacion) {
        this.fechaNotificacion = fechaNotificacion;
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

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public Long getEstatusTramiteGeneralId() {
        return estatusTramiteGeneralId;
    }

    public void setEstatusTramiteGeneralId(Long estatusId) {
        this.estatusTramiteGeneralId = estatusId;
    }

    public Set<TramiteAsociadoDTO> getTramiteGeneralAsociados() {
        return tramiteGeneralAsociados;
    }

    public void setTramiteGeneralAsociados(Set<TramiteAsociadoDTO> tramiteAsociados) {
        this.tramiteGeneralAsociados = tramiteAsociados;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TramiteGeneralDTO tramiteGeneralDTO = (TramiteGeneralDTO) o;
        if(tramiteGeneralDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tramiteGeneralDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TramiteGeneralDTO{" +
            "id=" + getId() +
            ", titular='" + getTitular() + "'" +
            ", dependencia='" + getDependencia() + "'" +
            ", numeroTramite='" + getNumeroTramite() + "'" +
            ", tipoTramite='" + getTipoTramite() + "'" +
            ", fechaIngreso='" + getFechaIngreso() + "'" +
            ", fechaResolucion='" + getFechaResolucion() + "'" +
            ", fechaNotificacion='" + getFechaNotificacion() + "'" +
            ", archivo='" + getArchivo() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            "}";
    }
}
