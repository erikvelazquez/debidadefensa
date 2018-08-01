package com.debidadefensa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Document(indexName = "cliente")
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "telefonos")
    private String telefonos;

    @Column(name = "correo_electronico")
    private String correoElectronico;

    @Column(name = "domicilio")
    private String domicilio;

    @Column(name = "rfc")
    private String rfc;

    @Column(name = "referencia")
    private String referencia;
   
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
         //   ", totalExpediente='" + getTotalExpediente() + "'" +            
            "}";
    }
}
