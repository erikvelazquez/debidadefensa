package com.debidadefensa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TramiteGeneral.
 */
@Entity
@Table(name = "tramite_general")
@Document(indexName = "tramitegeneral")
public class TramiteGeneral implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "titular")
    private String titular;

    @Column(name = "dependencia")
    private String dependencia;

    @Column(name = "numero_tramite")
    private String numeroTramite;

    @Column(name = "tipo_tramite")
    private String tipoTramite;

    @Column(name = "fecha_ingreso")
    private LocalDate fechaIngreso;

    @Column(name = "fecha_resolucion")
    private LocalDate fechaResolucion;

    @Column(name = "fecha_notificacion")
    private LocalDate fechaNotificacion;

    @Column(name = "archivo")
    private String archivo;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "total_documentos")
    private Long totalDocumentos;

    @ManyToOne
    private Cliente cliente;

    @OneToMany(mappedBy = "tramiteGeneral")
    @JsonIgnore
    private Set<Pagos> tramiteGralPagos = new HashSet<>();

    @OneToMany(mappedBy = "tramiteGeneral")
    @JsonIgnore
    private Set<CostoServicio> tramiteGralCostos = new HashSet<>();

    @OneToMany(mappedBy = "tramiteGeneral")
    @JsonIgnore
    private Set<Documentos> tramiteGralDocumentos = new HashSet<>();

    @OneToMany(mappedBy = "tramiteGeneral")
    @JsonIgnore
    private Set<FechasServicio> fechasServicioTramiteGenerals = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "tramite_general_tramite_general_asociados",
               joinColumns = @JoinColumn(name="tramite_generals_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="tramite_general_asociados_id", referencedColumnName="id"))
    private Set<TramiteAsociado> tramiteGeneralAsociados = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    private Estatus estatusTramiteGeneral;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitular() {
        return titular;
    }

    public TramiteGeneral titular(String titular) {
        this.titular = titular;
        return this;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    public String getDependencia() {
        return dependencia;
    }

    public TramiteGeneral dependencia(String dependencia) {
        this.dependencia = dependencia;
        return this;
    }

    public void setDependencia(String dependencia) {
        this.dependencia = dependencia;
    }

    public String getNumeroTramite() {
        return numeroTramite;
    }

    public TramiteGeneral numeroTramite(String numeroTramite) {
        this.numeroTramite = numeroTramite;
        return this;
    }

    public void setNumeroTramite(String numeroTramite) {
        this.numeroTramite = numeroTramite;
    }

    public String getTipoTramite() {
        return tipoTramite;
    }

    public TramiteGeneral tipoTramite(String tipoTramite) {
        this.tipoTramite = tipoTramite;
        return this;
    }

    public void setTipoTramite(String tipoTramite) {
        this.tipoTramite = tipoTramite;
    }

    public LocalDate getFechaIngreso() {
        return fechaIngreso;
    }

    public TramiteGeneral fechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
        return this;
    }

    public void setFechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public LocalDate getFechaResolucion() {
        return fechaResolucion;
    }

    public TramiteGeneral fechaResolucion(LocalDate fechaResolucion) {
        this.fechaResolucion = fechaResolucion;
        return this;
    }

    public void setFechaResolucion(LocalDate fechaResolucion) {
        this.fechaResolucion = fechaResolucion;
    }

    public LocalDate getFechaNotificacion() {
        return fechaNotificacion;
    }

    public TramiteGeneral fechaNotificacion(LocalDate fechaNotificacion) {
        this.fechaNotificacion = fechaNotificacion;
        return this;
    }

    public void setFechaNotificacion(LocalDate fechaNotificacion) {
        this.fechaNotificacion = fechaNotificacion;
    }

    public String getArchivo() {
        return archivo;
    }

    public TramiteGeneral archivo(String archivo) {
        this.archivo = archivo;
        return this;
    }

    public void setArchivo(String archivo) {
        this.archivo = archivo;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public TramiteGeneral observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Long getTotalDocumentos() {
        return totalDocumentos;
    }

    public TramiteGeneral totalDocumentos(Long totalDocumentos) {
        this.totalDocumentos = totalDocumentos;
        return this;
    }

    public void setTotalDocumentos(Long totalDocumentos) {
        this.totalDocumentos = totalDocumentos;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public TramiteGeneral cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Set<Pagos> getTramiteGralPagos() {
        return tramiteGralPagos;
    }

    public TramiteGeneral tramiteGralPagos(Set<Pagos> pagos) {
        this.tramiteGralPagos = pagos;
        return this;
    }

    public TramiteGeneral addTramiteGralPagos(Pagos pagos) {
        this.tramiteGralPagos.add(pagos);
        pagos.setTramiteGeneral(this);
        return this;
    }

    public TramiteGeneral removeTramiteGralPagos(Pagos pagos) {
        this.tramiteGralPagos.remove(pagos);
        pagos.setTramiteGeneral(null);
        return this;
    }

    public void setTramiteGralPagos(Set<Pagos> pagos) {
        this.tramiteGralPagos = pagos;
    }

    public Set<CostoServicio> getTramiteGralCostos() {
        return tramiteGralCostos;
    }

    public TramiteGeneral tramiteGralCostos(Set<CostoServicio> costoServicios) {
        this.tramiteGralCostos = costoServicios;
        return this;
    }

    public TramiteGeneral addTramiteGralCostos(CostoServicio costoServicio) {
        this.tramiteGralCostos.add(costoServicio);
        costoServicio.setTramiteGeneral(this);
        return this;
    }

    public TramiteGeneral removeTramiteGralCostos(CostoServicio costoServicio) {
        this.tramiteGralCostos.remove(costoServicio);
        costoServicio.setTramiteGeneral(null);
        return this;
    }

    public void setTramiteGralCostos(Set<CostoServicio> costoServicios) {
        this.tramiteGralCostos = costoServicios;
    }

    public Set<Documentos> getTramiteGralDocumentos() {
        return tramiteGralDocumentos;
    }

    public TramiteGeneral tramiteGralDocumentos(Set<Documentos> documentos) {
        this.tramiteGralDocumentos = documentos;
        return this;
    }

    public TramiteGeneral addTramiteGralDocumentos(Documentos documentos) {
        this.tramiteGralDocumentos.add(documentos);
        documentos.setTramiteGeneral(this);
        return this;
    }

    public TramiteGeneral removeTramiteGralDocumentos(Documentos documentos) {
        this.tramiteGralDocumentos.remove(documentos);
        documentos.setTramiteGeneral(null);
        return this;
    }

    public void setTramiteGralDocumentos(Set<Documentos> documentos) {
        this.tramiteGralDocumentos = documentos;
    }

    public Set<FechasServicio> getFechasServicioTramiteGenerals() {
        return fechasServicioTramiteGenerals;
    }

    public TramiteGeneral fechasServicioTramiteGenerals(Set<FechasServicio> fechasServicios) {
        this.fechasServicioTramiteGenerals = fechasServicios;
        return this;
    }

    public TramiteGeneral addFechasServicioTramiteGeneral(FechasServicio fechasServicio) {
        this.fechasServicioTramiteGenerals.add(fechasServicio);
        fechasServicio.setTramiteGeneral(this);
        return this;
    }

    public TramiteGeneral removeFechasServicioTramiteGeneral(FechasServicio fechasServicio) {
        this.fechasServicioTramiteGenerals.remove(fechasServicio);
        fechasServicio.setTramiteGeneral(null);
        return this;
    }

    public void setFechasServicioTramiteGenerals(Set<FechasServicio> fechasServicios) {
        this.fechasServicioTramiteGenerals = fechasServicios;
    }

    public Set<TramiteAsociado> getTramiteGeneralAsociados() {
        return tramiteGeneralAsociados;
    }

    public TramiteGeneral tramiteGeneralAsociados(Set<TramiteAsociado> tramiteAsociados) {
        this.tramiteGeneralAsociados = tramiteAsociados;
        return this;
    }

    public TramiteGeneral addTramiteGeneralAsociados(TramiteAsociado tramiteAsociado) {
        this.tramiteGeneralAsociados.add(tramiteAsociado);
        return this;
    }

    public TramiteGeneral removeTramiteGeneralAsociados(TramiteAsociado tramiteAsociado) {
        this.tramiteGeneralAsociados.remove(tramiteAsociado);
        return this;
    }

    public void setTramiteGeneralAsociados(Set<TramiteAsociado> tramiteAsociados) {
        this.tramiteGeneralAsociados = tramiteAsociados;
    }

    public Estatus getEstatusTramiteGeneral() {
        return estatusTramiteGeneral;
    }

    public TramiteGeneral estatusTramiteGeneral(Estatus estatus) {
        this.estatusTramiteGeneral = estatus;
        return this;
    }

    public void setEstatusTramiteGeneral(Estatus estatus) {
        this.estatusTramiteGeneral = estatus;
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
        TramiteGeneral tramiteGeneral = (TramiteGeneral) o;
        if (tramiteGeneral.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tramiteGeneral.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TramiteGeneral{" +
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
            ", totalDocumentos=" + getTotalDocumentos() +
            "}";
    }
}
