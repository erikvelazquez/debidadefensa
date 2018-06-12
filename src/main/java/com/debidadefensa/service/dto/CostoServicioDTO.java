package com.debidadefensa.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the CostoServicio entity.
 */
public class CostoServicioDTO implements Serializable {

    private Long id;

    private String tipoServicio;

    private Long idServicio;

    private String tipoCosto;

    private String concepto;

    private Float costo;

    private Long expedienteId;

    private Long tramiteMigratorioId;

    private Long tramiteGeneralId;

    private Long tipoServicioCostoServicioId;

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

    public String getTipoCosto() {
        return tipoCosto;
    }

    public void setTipoCosto(String tipoCosto) {
        this.tipoCosto = tipoCosto;
    }

    public String getConcepto() {
        return concepto;
    }

    public void setConcepto(String concepto) {
        this.concepto = concepto;
    }

    public Float getCosto() {
        return costo;
    }

    public void setCosto(Float costo) {
        this.costo = costo;
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

    public Long getTipoServicioCostoServicioId() {
        return tipoServicioCostoServicioId;
    }

    public void setTipoServicioCostoServicioId(Long tipoServicioId) {
        this.tipoServicioCostoServicioId = tipoServicioId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CostoServicioDTO costoServicioDTO = (CostoServicioDTO) o;
        if(costoServicioDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), costoServicioDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CostoServicioDTO{" +
            "id=" + getId() +
            ", tipoServicio='" + getTipoServicio() + "'" +
            ", idServicio=" + getIdServicio() +
            ", tipoCosto='" + getTipoCosto() + "'" +
            ", concepto='" + getConcepto() + "'" +
            ", costo=" + getCosto() +
            "}";
    }
}
