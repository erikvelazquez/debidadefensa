package com.debidadefensa.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Pagos entity.
 */
public class PagosDTO implements Serializable {

    private Long id;

    private String tipoServicio;

    private Long idServicio;

    private Float cantidad;

    private Instant fecha;

    private String formaPago;

    private String tipoAbono;

    private Long expedienteId;

    private Long tramiteMigratorioId;

    private Long tramiteGeneralId;

    private Long tipoServicioPagosId;

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

    public Long getIdServicio() {
        return idServicio;
    }

    public void setIdServicio(Long idServicio) {
        this.idServicio = idServicio;
    }

    public Float getCantidad() {
        return cantidad;
    }

    public void setCantidad(Float cantidad) {
        this.cantidad = cantidad;
    }

    public Instant getFecha() {
        return fecha;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public String getFormaPago() {
        return formaPago;
    }

    public void setFormaPago(String formaPago) {
        this.formaPago = formaPago;
    }

    public String getTipoAbono() {
        return tipoAbono;
    }

    public void setTipoAbono(String tipoAbono) {
        this.tipoAbono = tipoAbono;
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

    public Long getTipoServicioPagosId() {
        return tipoServicioPagosId;
    }

    public void setTipoServicioPagosId(Long tipoServicioId) {
        this.tipoServicioPagosId = tipoServicioId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PagosDTO pagosDTO = (PagosDTO) o;
        if(pagosDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pagosDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PagosDTO{" +
            "id=" + getId() +
            ", tipoServicio='" + getTipoServicio() + "'" +
            ", idServicio=" + getIdServicio() +
            ", cantidad=" + getCantidad() +
            ", fecha='" + getFecha() + "'" +
            ", formaPago='" + getFormaPago() + "'" +
            ", tipoAbono='" + getTipoAbono() + "'" +
            "}";
    }
}
