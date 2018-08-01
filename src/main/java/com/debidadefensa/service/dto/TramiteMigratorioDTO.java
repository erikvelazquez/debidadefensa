package com.debidadefensa.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the TramiteMigratorio entity.
 */
public class TramiteMigratorioDTO implements Serializable {

    private Long id;

    private String nombreExtranjero;

    private String tipotramite;

    private String entidad;

    private Long nut;

    private String contraseniaNUT;

    private LocalDate fechaIngreso;

    private LocalDate fechaNotificacion;

    private LocalDate fechaResolucion;

    private String archivo;

    private String observaciones;

    private Long clienteId;
    
    private String clienteNombre;

    private Long estatusTramiteMigratorioId;

    private String estatusDescripcion;

    private Set<TramiteAsociadoDTO> tramitesMigraAsociados = new HashSet<>();

    public Long getId() {
        return id;
    }

    /**
	 * @return the estatusDescripcion
	 */
	public String getEstatusDescripcion() {
		return estatusDescripcion;
	}

	/**
	 * @param estatusDescripcion the estatusDescripcion to set
	 */
	public void setEstatusDescripcion(String estatusDescripcion) {
		this.estatusDescripcion = estatusDescripcion;
	}

	/**
	 * @return the clienteNombre
	 */
	public String getClienteNombre() {
		return clienteNombre;
	}

	/**
	 * @param clienteNombre the clienteNombre to set
	 */
	public void setClienteNombre(String clienteNombre) {
		this.clienteNombre = clienteNombre;
	}

	public void setId(Long id) {
        this.id = id;
    }

    public String getNombreExtranjero() {
        return nombreExtranjero;
    }

    public void setNombreExtranjero(String nombreExtranjero) {
        this.nombreExtranjero = nombreExtranjero;
    }

    public String getTipotramite() {
        return tipotramite;
    }

    public void setTipotramite(String tipotramite) {
        this.tipotramite = tipotramite;
    }

    public String getEntidad() {
        return entidad;
    }

    public void setEntidad(String entidad) {
        this.entidad = entidad;
    }

    public Long getNut() {
        return nut;
    }

    public void setNut(Long nut) {
        this.nut = nut;
    }

    public String getContraseniaNUT() {
        return contraseniaNUT;
    }

    public void setContraseniaNUT(String contraseniaNUT) {
        this.contraseniaNUT = contraseniaNUT;
    }

    public LocalDate getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public LocalDate getFechaNotificacion() {
        return fechaNotificacion;
    }

    public void setFechaNotificacion(LocalDate fechaNotificacion) {
        this.fechaNotificacion = fechaNotificacion;
    }

    public LocalDate getFechaResolucion() {
        return fechaResolucion;
    }

    public void setFechaResolucion(LocalDate fechaResolucion) {
        this.fechaResolucion = fechaResolucion;
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

    public Long getEstatusTramiteMigratorioId() {
        return estatusTramiteMigratorioId;
    }

    public void setEstatusTramiteMigratorioId(Long estatusId) {
        this.estatusTramiteMigratorioId = estatusId;
    }

    public Set<TramiteAsociadoDTO> getTramitesMigraAsociados() {
        return tramitesMigraAsociados;
    }

    public void setTramitesMigraAsociados(Set<TramiteAsociadoDTO> tramiteAsociados) {
        this.tramitesMigraAsociados = tramiteAsociados;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TramiteMigratorioDTO tramiteMigratorioDTO = (TramiteMigratorioDTO) o;
        if(tramiteMigratorioDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tramiteMigratorioDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TramiteMigratorioDTO{" +
            "id=" + getId() +
            ", nombreExtranjero='" + getNombreExtranjero() + "'" +
            ", tipotramite='" + getTipotramite() + "'" +
            ", entidad='" + getEntidad() + "'" +
            ", nut=" + getNut() +
            ", contraseniaNUT='" + getContraseniaNUT() + "'" +
            ", fechaIngreso='" + getFechaIngreso() + "'" +
            ", fechaNotificacion='" + getFechaNotificacion() + "'" +
            ", fechaResolucion='" + getFechaResolucion() + "'" +
            ", archivo='" + getArchivo() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            "}";
    }
}
