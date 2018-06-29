package com.debidadefensa.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Pagos.
 */
@Entity
@Table(name = "pagos")
@Document(indexName = "pagos")
public class Pagos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cantidad")
    private Float cantidad;

    @Column(name = "fecha")
    private LocalDate fecha;

    @Column(name = "forma_pago")
    private String formaPago;

    @Column(name = "tipo_abono")
    private String tipoAbono;

    @ManyToOne
    private Expediente expediente;

    @ManyToOne
    private TramiteMigratorio tramiteMigratorio;

    @ManyToOne
    private TramiteGeneral tramiteGeneral;

    @ManyToOne
    private TipoServicio tipoServicio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getCantidad() {
        return cantidad;
    }

    public Pagos cantidad(Float cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Float cantidad) {
        this.cantidad = cantidad;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public Pagos fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getFormaPago() {
        return formaPago;
    }

    public Pagos formaPago(String formaPago) {
        this.formaPago = formaPago;
        return this;
    }

    public void setFormaPago(String formaPago) {
        this.formaPago = formaPago;
    }

    public String getTipoAbono() {
        return tipoAbono;
    }

    public Pagos tipoAbono(String tipoAbono) {
        this.tipoAbono = tipoAbono;
        return this;
    }

    public void setTipoAbono(String tipoAbono) {
        this.tipoAbono = tipoAbono;
    }

    public Expediente getExpediente() {
        return expediente;
    }

    public Pagos expediente(Expediente expediente) {
        this.expediente = expediente;
        return this;
    }

    public void setExpediente(Expediente expediente) {
        this.expediente = expediente;
    }

    public TramiteMigratorio getTramiteMigratorio() {
        return tramiteMigratorio;
    }

    public Pagos tramiteMigratorio(TramiteMigratorio tramiteMigratorio) {
        this.tramiteMigratorio = tramiteMigratorio;
        return this;
    }

    public void setTramiteMigratorio(TramiteMigratorio tramiteMigratorio) {
        this.tramiteMigratorio = tramiteMigratorio;
    }

    public TramiteGeneral getTramiteGeneral() {
        return tramiteGeneral;
    }

    public Pagos tramiteGeneral(TramiteGeneral tramiteGeneral) {
        this.tramiteGeneral = tramiteGeneral;
        return this;
    }

    public void setTramiteGeneral(TramiteGeneral tramiteGeneral) {
        this.tramiteGeneral = tramiteGeneral;
    }

    public TipoServicio getTipoServicio() {
        return tipoServicio;
    }

    public Pagos tipoServicio(TipoServicio tipoServicio) {
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
        Pagos pagos = (Pagos) o;
        if (pagos.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pagos.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pagos{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            ", fecha='" + getFecha() + "'" +
            ", formaPago='" + getFormaPago() + "'" +
            ", tipoAbono='" + getTipoAbono() + "'" +
            "}";
    }
}
