package com.debidadefensa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Expediente.
 */
@Entity
@Table(name = "expediente")
@Document(indexName = "expediente")
public class Expediente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "juzgado")
    private String juzgado;

    @Column(name = "numero_expediente")
    private String numeroExpediente;

    @Column(name = "juicio")
    private String juicio;

    @Column(name = "responsable")
    private String responsable;

    @Column(name = "archivo")
    private String archivo;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "fecha_alta")
    private Instant fechaAlta;

    @Column(name = "fecha_sentencia")
    private Instant fechaSentencia;

    @ManyToOne
    private Cliente cliente;

    @OneToOne
    @JoinColumn(unique = true)
    private Estatus estatusExpediente;

    @OneToMany(mappedBy = "expediente")
    @JsonIgnore
    private Set<Parte> partes = new HashSet<>();

    @OneToMany(mappedBy = "expediente")
    @JsonIgnore
    private Set<ExpedienteAsociado> expAsociados = new HashSet<>();

    @OneToMany(mappedBy = "expediente")
    @JsonIgnore
    private Set<CostoServicio> costos = new HashSet<>();

    @OneToMany(mappedBy = "expediente")
    @JsonIgnore
    private Set<Pagos> pagos = new HashSet<>();

    @OneToMany(mappedBy = "expediente")
    @JsonIgnore
    private Set<Documentos> documentosExpedientes = new HashSet<>();

    @OneToMany(mappedBy = "expediente")
    @JsonIgnore
    private Set<FechasServicio> fechasServicioExpedientes = new HashSet<>();

    @ManyToOne
    private TipoServicio tipoServicio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJuzgado() {
        return juzgado;
    }

    public Expediente juzgado(String juzgado) {
        this.juzgado = juzgado;
        return this;
    }

    public void setJuzgado(String juzgado) {
        this.juzgado = juzgado;
    }

    public String getNumeroExpediente() {
        return numeroExpediente;
    }

    public Expediente numeroExpediente(String numeroExpediente) {
        this.numeroExpediente = numeroExpediente;
        return this;
    }

    public void setNumeroExpediente(String numeroExpediente) {
        this.numeroExpediente = numeroExpediente;
    }

    public String getJuicio() {
        return juicio;
    }

    public Expediente juicio(String juicio) {
        this.juicio = juicio;
        return this;
    }

    public void setJuicio(String juicio) {
        this.juicio = juicio;
    }

    public String getResponsable() {
        return responsable;
    }

    public Expediente responsable(String responsable) {
        this.responsable = responsable;
        return this;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getArchivo() {
        return archivo;
    }

    public Expediente archivo(String archivo) {
        this.archivo = archivo;
        return this;
    }

    public void setArchivo(String archivo) {
        this.archivo = archivo;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public Expediente observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Instant getFechaAlta() {
        return fechaAlta;
    }

    public Expediente fechaAlta(Instant fechaAlta) {
        this.fechaAlta = fechaAlta;
        return this;
    }

    public void setFechaAlta(Instant fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public Instant getFechaSentencia() {
        return fechaSentencia;
    }

    public Expediente fechaSentencia(Instant fechaSentencia) {
        this.fechaSentencia = fechaSentencia;
        return this;
    }

    public void setFechaSentencia(Instant fechaSentencia) {
        this.fechaSentencia = fechaSentencia;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Expediente cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Estatus getEstatusExpediente() {
        return estatusExpediente;
    }

    public Expediente estatusExpediente(Estatus estatus) {
        this.estatusExpediente = estatus;
        return this;
    }

    public void setEstatusExpediente(Estatus estatus) {
        this.estatusExpediente = estatus;
    }

    public Set<Parte> getPartes() {
        return partes;
    }

    public Expediente partes(Set<Parte> partes) {
        this.partes = partes;
        return this;
    }

    public Expediente addParte(Parte parte) {
        this.partes.add(parte);
        parte.setExpediente(this);
        return this;
    }

    public Expediente removeParte(Parte parte) {
        this.partes.remove(parte);
        parte.setExpediente(null);
        return this;
    }

    public void setPartes(Set<Parte> partes) {
        this.partes = partes;
    }

    public Set<ExpedienteAsociado> getExpAsociados() {
        return expAsociados;
    }

    public Expediente expAsociados(Set<ExpedienteAsociado> expedienteAsociados) {
        this.expAsociados = expedienteAsociados;
        return this;
    }

    public Expediente addExpAsociado(ExpedienteAsociado expedienteAsociado) {
        this.expAsociados.add(expedienteAsociado);
        expedienteAsociado.setExpediente(this);
        return this;
    }

    public Expediente removeExpAsociado(ExpedienteAsociado expedienteAsociado) {
        this.expAsociados.remove(expedienteAsociado);
        expedienteAsociado.setExpediente(null);
        return this;
    }

    public void setExpAsociados(Set<ExpedienteAsociado> expedienteAsociados) {
        this.expAsociados = expedienteAsociados;
    }

    public Set<CostoServicio> getCostos() {
        return costos;
    }

    public Expediente costos(Set<CostoServicio> costoServicios) {
        this.costos = costoServicios;
        return this;
    }

    public Expediente addCosto(CostoServicio costoServicio) {
        this.costos.add(costoServicio);
        costoServicio.setExpediente(this);
        return this;
    }

    public Expediente removeCosto(CostoServicio costoServicio) {
        this.costos.remove(costoServicio);
        costoServicio.setExpediente(null);
        return this;
    }

    public void setCostos(Set<CostoServicio> costoServicios) {
        this.costos = costoServicios;
    }

    public Set<Pagos> getPagos() {
        return pagos;
    }

    public Expediente pagos(Set<Pagos> pagos) {
        this.pagos = pagos;
        return this;
    }

    public Expediente addPagos(Pagos pagos) {
        this.pagos.add(pagos);
        pagos.setExpediente(this);
        return this;
    }

    public Expediente removePagos(Pagos pagos) {
        this.pagos.remove(pagos);
        pagos.setExpediente(null);
        return this;
    }

    public void setPagos(Set<Pagos> pagos) {
        this.pagos = pagos;
    }

    public Set<Documentos> getDocumentosExpedientes() {
        return documentosExpedientes;
    }

    public Expediente documentosExpedientes(Set<Documentos> documentos) {
        this.documentosExpedientes = documentos;
        return this;
    }

    public Expediente addDocumentosExpedientes(Documentos documentos) {
        this.documentosExpedientes.add(documentos);
        documentos.setExpediente(this);
        return this;
    }

    public Expediente removeDocumentosExpedientes(Documentos documentos) {
        this.documentosExpedientes.remove(documentos);
        documentos.setExpediente(null);
        return this;
    }

    public void setDocumentosExpedientes(Set<Documentos> documentos) {
        this.documentosExpedientes = documentos;
    }

    public Set<FechasServicio> getFechasServicioExpedientes() {
        return fechasServicioExpedientes;
    }

    public Expediente fechasServicioExpedientes(Set<FechasServicio> fechasServicios) {
        this.fechasServicioExpedientes = fechasServicios;
        return this;
    }

    public Expediente addFechasServicioExpediente(FechasServicio fechasServicio) {
        this.fechasServicioExpedientes.add(fechasServicio);
        fechasServicio.setExpediente(this);
        return this;
    }

    public Expediente removeFechasServicioExpediente(FechasServicio fechasServicio) {
        this.fechasServicioExpedientes.remove(fechasServicio);
        fechasServicio.setExpediente(null);
        return this;
    }

    public void setFechasServicioExpedientes(Set<FechasServicio> fechasServicios) {
        this.fechasServicioExpedientes = fechasServicios;
    }

    public TipoServicio getTipoServicio() {
        return tipoServicio;
    }

    public Expediente tipoServicio(TipoServicio tipoServicio) {
        this.tipoServicio = tipoServicio;
        return this;
    }

    public void setTipoServicio(TipoServicio tipoServicio) {
        this.tipoServicio = tipoServicio;
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
        Expediente expediente = (Expediente) o;
        if (expediente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), expediente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Expediente{" +
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
