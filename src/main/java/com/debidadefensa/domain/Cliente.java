package com.debidadefensa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Setting;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldIndex;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Mapping;
/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Document(indexName = "cliente", type = "cliente", shards = 1, replicas = 0)
@Setting(settingPath = "/config/es-settings.json")
// @Mapping(mappingPath = "/config/es-cliente-mapping.json")
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Field(index = FieldIndex.analyzed, store  = true, type = FieldType.Long)
    private Long id;

    @Column(name = "nombre")
    @Field(index = FieldIndex.analyzed, store  = true, type = FieldType.String, analyzer = "spanish", searchAnalyzer = "spanish")
    private String nombre;

    @Column(name = "telefonos")
    @Field(index = FieldIndex.analyzed, store  = true, type = FieldType.String, analyzer = "spanish", searchAnalyzer = "spanish")
    private String telefonos;

    @Column(name = "correo_electronico")
    @Field(index = FieldIndex.analyzed, store  = true, type = FieldType.String, analyzer = "spanish", searchAnalyzer = "spanish")
    private String correoElectronico;

    @Column(name = "domicilio")
    @Field(index = FieldIndex.analyzed, store  = true, type = FieldType.String, analyzer = "spanish", searchAnalyzer = "spanish")
    private String domicilio;

    @Column(name = "rfc")
    @Field(index = FieldIndex.analyzed, store  = true, type = FieldType.String, analyzer = "spanish", searchAnalyzer = "spanish")
    private String rfc;

    @Column(name = "referencia")
    @Field(index = FieldIndex.analyzed, store  = true, type = FieldType.String, analyzer = "spanish", searchAnalyzer = "spanish")
    private String referencia;

    @Column(name = "total_expediente")
    private Long totalExpediente;

    @Column(name = "total_migratorios")
    private Long totalMigratorios;

    @Column(name = "total_generales")
    private Long totalGenerales;

    @Column(name = "total_costo")
    private Float totalCosto;

    @OneToMany(mappedBy = "cliente")
    @JsonIgnore
    private Set<Expediente> expedientes = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    @JsonIgnore
    private Set<TramiteMigratorio> tramiteMigras = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    @JsonIgnore
    private Set<TramiteGeneral> tramiteGrals = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Cliente nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefonos() {
        return telefonos;
    }

    public Cliente telefonos(String telefonos) {
        this.telefonos = telefonos;
        return this;
    }

    public void setTelefonos(String telefonos) {
        this.telefonos = telefonos;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public Cliente correoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
        return this;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getDomicilio() {
        return domicilio;
    }

    public Cliente domicilio(String domicilio) {
        this.domicilio = domicilio;
        return this;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public String getRfc() {
        return rfc;
    }

    public Cliente rfc(String rfc) {
        this.rfc = rfc;
        return this;
    }

    public void setRfc(String rfc) {
        this.rfc = rfc;
    }

    public String getReferencia() {
        return referencia;
    }

    public Cliente referencia(String referencia) {
        this.referencia = referencia;
        return this;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public Long getTotalExpediente() {
        return totalExpediente;
    }

    public Cliente totalExpediente(Long totalExpediente) {
        this.totalExpediente = totalExpediente;
        return this;
    }

    public void setTotalExpediente(Long totalExpediente) {
        this.totalExpediente = totalExpediente;
    }

    public Long getTotalMigratorios() {
        return totalMigratorios;
    }

    public Cliente totalMigratorios(Long totalMigratorios) {
        this.totalMigratorios = totalMigratorios;
        return this;
    }

    public void setTotalMigratorios(Long totalMigratorios) {
        this.totalMigratorios = totalMigratorios;
    }

    public Long getTotalGenerales() {
        return totalGenerales;
    }

    public Cliente totalGenerales(Long totalGenerales) {
        this.totalGenerales = totalGenerales;
        return this;
    }

    public void setTotalGenerales(Long totalGenerales) {
        this.totalGenerales = totalGenerales;
    }

    public Float getTotalCosto() {
        return totalCosto;
    }

    public Cliente totalCosto(Float totalCosto) {
        this.totalCosto = totalCosto;
        return this;
    }

    public void setTotalCosto(Float totalCosto) {
        this.totalCosto = totalCosto;
    }

    public Set<Expediente> getExpedientes() {
        return expedientes;
    }

    public Cliente expedientes(Set<Expediente> expedientes) {
        this.expedientes = expedientes;
        return this;
    }

    public Cliente addExpediente(Expediente expediente) {
        this.expedientes.add(expediente);
        expediente.setCliente(this);
        return this;
    }

    public Cliente removeExpediente(Expediente expediente) {
        this.expedientes.remove(expediente);
        expediente.setCliente(null);
        return this;
    }

    public void setExpedientes(Set<Expediente> expedientes) {
        this.expedientes = expedientes;
    }

    public Set<TramiteMigratorio> getTramiteMigras() {
        return tramiteMigras;
    }

    public Cliente tramiteMigras(Set<TramiteMigratorio> tramiteMigratorios) {
        this.tramiteMigras = tramiteMigratorios;
        return this;
    }

    public Cliente addTramiteMigra(TramiteMigratorio tramiteMigratorio) {
        this.tramiteMigras.add(tramiteMigratorio);
        tramiteMigratorio.setCliente(this);
        return this;
    }

    public Cliente removeTramiteMigra(TramiteMigratorio tramiteMigratorio) {
        this.tramiteMigras.remove(tramiteMigratorio);
        tramiteMigratorio.setCliente(null);
        return this;
    }

    public void setTramiteMigras(Set<TramiteMigratorio> tramiteMigratorios) {
        this.tramiteMigras = tramiteMigratorios;
    }

    public Set<TramiteGeneral> getTramiteGrals() {
        return tramiteGrals;
    }

    public Cliente tramiteGrals(Set<TramiteGeneral> tramiteGenerals) {
        this.tramiteGrals = tramiteGenerals;
        return this;
    }

    public Cliente addTramiteGral(TramiteGeneral tramiteGeneral) {
        this.tramiteGrals.add(tramiteGeneral);
        tramiteGeneral.setCliente(this);
        return this;
    }

    public Cliente removeTramiteGral(TramiteGeneral tramiteGeneral) {
        this.tramiteGrals.remove(tramiteGeneral);
        tramiteGeneral.setCliente(null);
        return this;
    }

    public void setTramiteGrals(Set<TramiteGeneral> tramiteGenerals) {
        this.tramiteGrals = tramiteGenerals;
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
        Cliente cliente = (Cliente) o;
        if (cliente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cliente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", telefonos='" + getTelefonos() + "'" +
            ", correoElectronico='" + getCorreoElectronico() + "'" +
            ", domicilio='" + getDomicilio() + "'" +
            ", rfc='" + getRfc() + "'" +
            ", referencia='" + getReferencia() + "'" +
            ", totalExpediente=" + getTotalExpediente() +
            ", totalMigratorios=" + getTotalMigratorios() +
            ", totalGenerales=" + getTotalGenerales() +
            ", totalCosto=" + getTotalCosto() +
            "}";
    }
}
