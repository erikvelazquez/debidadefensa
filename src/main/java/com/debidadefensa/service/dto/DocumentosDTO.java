package com.debidadefensa.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Documentos entity.
 */
public class DocumentosDTO implements Serializable {

    private Long id;

    private String nombreDocumento;

    private Instant fecha;

    private String descripcion;

    private String ruta;

    private Long expedienteId;

    private Long expedienteAsociadoId;

    private Long tramiteMigratorioId;

    private Long tramiteGeneralId;

    private Long tipoServicioDocumentosId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreDocumento() {
        return nombreDocumento;
    }

    public void setNombreDocumento(String nombreDocumento) {
        this.nombreDocumento = nombreDocumento;
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

    public String getRuta() {
        return ruta;
    }

    public void setRuta(String ruta) {
        this.ruta = ruta;
    }

    public Long getExpedienteId() {
        return expedienteId;
    }

    public void setExpedienteId(Long expedienteId) {
        this.expedienteId = expedienteId;
    }

    public Long getExpedienteAsociadoId() {
        return expedienteAsociadoId;
    }

    public void setExpedienteAsociadoId(Long expedienteAsociadoId) {
        this.expedienteAsociadoId = expedienteAsociadoId;
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

    public Long getTipoServicioDocumentosId() {
        return tipoServicioDocumentosId;
    }

    public void setTipoServicioDocumentosId(Long tipoServicioId) {
        this.tipoServicioDocumentosId = tipoServicioId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DocumentosDTO documentosDTO = (DocumentosDTO) o;
        if(documentosDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentosDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DocumentosDTO{" +
            "id=" + getId() +
            ", nombreDocumento='" + getNombreDocumento() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", ruta='" + getRuta() + "'" +
            "}";
    }
}
