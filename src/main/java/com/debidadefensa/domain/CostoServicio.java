package com.debidadefensa.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A CostoServicio.
 */
@Entity
@Table(name = "costo_servicio")
@Document(indexName = "costoservicio")
public class CostoServicio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;   

    @Column(name = "tipo_costo")
    private String tipoCosto;

    @Column(name = "concepto")
    private String concepto;

    @Column(name = "costo")
    private Float costo;

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
    
    public String getTipoCosto() {
        return tipoCosto;
    }

    public CostoServicio tipoCosto(String tipoCosto) {
        this.tipoCosto = tipoCosto;
        return this;
    }

    public void setTipoCosto(String tipoCosto) {
        this.tipoCosto = tipoCosto;
    }
    
    public String getConcepto() {
        return concepto;
    }

    public CostoServicio concepto(String concepto) {
        this.concepto = concepto;
        return this;
    }

    public void setConcepto(String concepto) {
        this.concepto = concepto;
    }

    public Float getCosto() {
        return costo;
    }

    public CostoServicio costo(Float costo) {
        this.costo = costo;
        return this;
    }

    public void setCosto(Float costo) {
        this.costo = costo;
    }

    public Expediente getExpediente() {
        return expediente;
    }

    public CostoServicio expediente(Expediente expediente) {
        this.expediente = expediente;
        return this;
    }

    public void setExpediente(Expediente expediente) {
        this.expediente = expediente;
    }

    public TramiteMigratorio getTramiteMigratorio() {
        return tramiteMigratorio;
    }

    public CostoServicio tramiteMigratorio(TramiteMigratorio tramiteMigratorio) {
        this.tramiteMigratorio = tramiteMigratorio;
        return this;
    }

    public void setTramiteMigratorio(TramiteMigratorio tramiteMigratorio) {
        this.tramiteMigratorio = tramiteMigratorio;
    }

    public TramiteGeneral getTramiteGeneral() {
        return tramiteGeneral;
    }

    public CostoServicio tramiteGeneral(TramiteGeneral tramiteGeneral) {
        this.tramiteGeneral = tramiteGeneral;
        return this;
    }

    public void setTramiteGeneral(TramiteGeneral tramiteGeneral) {
        this.tramiteGeneral = tramiteGeneral;
    }

    public TipoServicio getTipoServicio() {
        return tipoServicio;
    }

    public CostoServicio tipoServicio(TipoServicio tipoServicio) {
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
        CostoServicio costoServicio = (CostoServicio) o;
        if (costoServicio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), costoServicio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CostoServicio{" +
            "id=" + getId() +
            ", tipoCosto='" + getTipoCosto() + "'" +
            ", concepto='" + getConcepto() + "'" +
            ", costo=" + getCosto() +
            "}";
    }
}
