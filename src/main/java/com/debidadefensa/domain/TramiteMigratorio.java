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
 * A TramiteMigratorio.
 */
@Entity
@Table(name = "tramite_migratorio")
@Document(indexName = "tramitemigratorio")
public class TramiteMigratorio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre_extranjero")
    private String nombreExtranjero;

    @Column(name = "tipotramite")
    private String tipotramite;

    @Column(name = "entidad")
    private String entidad;

    @Column(name = "nut")
    private Long nut;

    @Column(name = "contrasenia_nut")
    private String contraseniaNUT;

    @Column(name = "fecha_ingreso")
    private LocalDate fechaIngreso;

    @Column(name = "fecha_notificacion")
    private LocalDate fechaNotificacion;

    @Column(name = "fecha_resolucion")
    private LocalDate fechaResolucion;

    @Column(name = "archivo")
    private String archivo;

    @Column(name = "observaciones")
    private String observaciones;

    @ManyToOne
    private Cliente cliente;

    @OneToMany(mappedBy = "tramiteMigratorio")
    @JsonIgnore
    private Set<CostoServicio> tramitteMigratorioCostos = new HashSet<>();

    @OneToMany(mappedBy = "tramiteMigratorio")
    @JsonIgnore
    private Set<Pagos> tramitteMigratorioPagos = new HashSet<>();

    @OneToMany(mappedBy = "tramiteMigratorio")
    @JsonIgnore
    private Set<Documentos> tramitteMigratorioDocumentos = new HashSet<>();

    @OneToMany(mappedBy = "tramiteMigratorio")
    @JsonIgnore
    private Set<FechasServicio> fechasServicioTramiteMigratorios = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "tramite_migratorio_tramites_migra_asociados",
               joinColumns = @JoinColumn(name="tramite_migratorios_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="tramites_migra_asociados_id", referencedColumnName="id"))
    private Set<TramiteAsociado> tramitesMigraAsociados = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    private Estatus estatusTramiteMigratorio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreExtranjero() {
        return nombreExtranjero;
    }

    public TramiteMigratorio nombreExtranjero(String nombreExtranjero) {
        this.nombreExtranjero = nombreExtranjero;
        return this;
    }

    public void setNombreExtranjero(String nombreExtranjero) {
        this.nombreExtranjero = nombreExtranjero;
    }

    public String getTipotramite() {
        return tipotramite;
    }

    public TramiteMigratorio tipotramite(String tipotramite) {
        this.tipotramite = tipotramite;
        return this;
    }

    public void setTipotramite(String tipotramite) {
        this.tipotramite = tipotramite;
    }

    public String getEntidad() {
        return entidad;
    }

    public TramiteMigratorio entidad(String entidad) {
        this.entidad = entidad;
        return this;
    }

    public void setEntidad(String entidad) {
        this.entidad = entidad;
    }

    public Long getNut() {
        return nut;
    }

    public TramiteMigratorio nut(Long nut) {
        this.nut = nut;
        return this;
    }

    public void setNut(Long nut) {
        this.nut = nut;
    }

    public String getContraseniaNUT() {
        return contraseniaNUT;
    }

    public TramiteMigratorio contraseniaNUT(String contraseniaNUT) {
        this.contraseniaNUT = contraseniaNUT;
        return this;
    }

    public void setContraseniaNUT(String contraseniaNUT) {
        this.contraseniaNUT = contraseniaNUT;
    }

    public LocalDate getFechaIngreso() {
        return fechaIngreso;
    }

    public TramiteMigratorio fechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
        return this;
    }

    public void setFechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public LocalDate getFechaNotificacion() {
        return fechaNotificacion;
    }

    public TramiteMigratorio fechaNotificacion(LocalDate fechaNotificacion) {
        this.fechaNotificacion = fechaNotificacion;
        return this;
    }

    public void setFechaNotificacion(LocalDate fechaNotificacion) {
        this.fechaNotificacion = fechaNotificacion;
    }

    public LocalDate getFechaResolucion() {
        return fechaResolucion;
    }

    public TramiteMigratorio fechaResolucion(LocalDate fechaResolucion) {
        this.fechaResolucion = fechaResolucion;
        return this;
    }

    public void setFechaResolucion(LocalDate fechaResolucion) {
        this.fechaResolucion = fechaResolucion;
    }

    public String getArchivo() {
        return archivo;
    }

    public TramiteMigratorio archivo(String archivo) {
        this.archivo = archivo;
        return this;
    }

    public void setArchivo(String archivo) {
        this.archivo = archivo;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public TramiteMigratorio observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public TramiteMigratorio cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Set<CostoServicio> getTramitteMigratorioCostos() {
        return tramitteMigratorioCostos;
    }

    public TramiteMigratorio tramitteMigratorioCostos(Set<CostoServicio> costoServicios) {
        this.tramitteMigratorioCostos = costoServicios;
        return this;
    }

    public TramiteMigratorio addTramitteMigratorioCosto(CostoServicio costoServicio) {
        this.tramitteMigratorioCostos.add(costoServicio);
        costoServicio.setTramiteMigratorio(this);
        return this;
    }

    public TramiteMigratorio removeTramitteMigratorioCosto(CostoServicio costoServicio) {
        this.tramitteMigratorioCostos.remove(costoServicio);
        costoServicio.setTramiteMigratorio(null);
        return this;
    }

    public void setTramitteMigratorioCostos(Set<CostoServicio> costoServicios) {
        this.tramitteMigratorioCostos = costoServicios;
    }

    public Set<Pagos> getTramitteMigratorioPagos() {
        return tramitteMigratorioPagos;
    }

    public TramiteMigratorio tramitteMigratorioPagos(Set<Pagos> pagos) {
        this.tramitteMigratorioPagos = pagos;
        return this;
    }

    public TramiteMigratorio addTramitteMigratorioPago(Pagos pagos) {
        this.tramitteMigratorioPagos.add(pagos);
        pagos.setTramiteMigratorio(this);
        return this;
    }

    public TramiteMigratorio removeTramitteMigratorioPago(Pagos pagos) {
        this.tramitteMigratorioPagos.remove(pagos);
        pagos.setTramiteMigratorio(null);
        return this;
    }

    public void setTramitteMigratorioPagos(Set<Pagos> pagos) {
        this.tramitteMigratorioPagos = pagos;
    }

    public Set<Documentos> getTramitteMigratorioDocumentos() {
        return tramitteMigratorioDocumentos;
    }

    public TramiteMigratorio tramitteMigratorioDocumentos(Set<Documentos> documentos) {
        this.tramitteMigratorioDocumentos = documentos;
        return this;
    }

    public TramiteMigratorio addTramitteMigratorioDocumentos(Documentos documentos) {
        this.tramitteMigratorioDocumentos.add(documentos);
        documentos.setTramiteMigratorio(this);
        return this;
    }

    public TramiteMigratorio removeTramitteMigratorioDocumentos(Documentos documentos) {
        this.tramitteMigratorioDocumentos.remove(documentos);
        documentos.setTramiteMigratorio(null);
        return this;
    }

    public void setTramitteMigratorioDocumentos(Set<Documentos> documentos) {
        this.tramitteMigratorioDocumentos = documentos;
    }

    public Set<FechasServicio> getFechasServicioTramiteMigratorios() {
        return fechasServicioTramiteMigratorios;
    }

    public TramiteMigratorio fechasServicioTramiteMigratorios(Set<FechasServicio> fechasServicios) {
        this.fechasServicioTramiteMigratorios = fechasServicios;
        return this;
    }

    public TramiteMigratorio addFechasServicioTramiteMigratorio(FechasServicio fechasServicio) {
        this.fechasServicioTramiteMigratorios.add(fechasServicio);
        fechasServicio.setTramiteMigratorio(this);
        return this;
    }

    public TramiteMigratorio removeFechasServicioTramiteMigratorio(FechasServicio fechasServicio) {
        this.fechasServicioTramiteMigratorios.remove(fechasServicio);
        fechasServicio.setTramiteMigratorio(null);
        return this;
    }

    public void setFechasServicioTramiteMigratorios(Set<FechasServicio> fechasServicios) {
        this.fechasServicioTramiteMigratorios = fechasServicios;
    }

    public Set<TramiteAsociado> getTramitesMigraAsociados() {
        return tramitesMigraAsociados;
    }

    public TramiteMigratorio tramitesMigraAsociados(Set<TramiteAsociado> tramiteAsociados) {
        this.tramitesMigraAsociados = tramiteAsociados;
        return this;
    }

    public TramiteMigratorio addTramitesMigraAsociados(TramiteAsociado tramiteAsociado) {
        this.tramitesMigraAsociados.add(tramiteAsociado);
        return this;
    }

    public TramiteMigratorio removeTramitesMigraAsociados(TramiteAsociado tramiteAsociado) {
        this.tramitesMigraAsociados.remove(tramiteAsociado);
        return this;
    }

    public void setTramitesMigraAsociados(Set<TramiteAsociado> tramiteAsociados) {
        this.tramitesMigraAsociados = tramiteAsociados;
    }

    public Estatus getEstatusTramiteMigratorio() {
        return estatusTramiteMigratorio;
    }

    public TramiteMigratorio estatusTramiteMigratorio(Estatus estatus) {
        this.estatusTramiteMigratorio = estatus;
        return this;
    }

    public void setEstatusTramiteMigratorio(Estatus estatus) {
        this.estatusTramiteMigratorio = estatus;
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
        TramiteMigratorio tramiteMigratorio = (TramiteMigratorio) o;
        if (tramiteMigratorio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tramiteMigratorio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TramiteMigratorio{" +
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
