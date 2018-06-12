package com.debidadefensa.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Parte.
 */
@Entity
@Table(name = "parte")
@Document(indexName = "parte")
public class Parte implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @ManyToOne
    private Expediente expediente;

    @OneToOne
    @JoinColumn(unique = true)
    private TipoParte tipoParte;

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

    public Parte nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Expediente getExpediente() {
        return expediente;
    }

    public Parte expediente(Expediente expediente) {
        this.expediente = expediente;
        return this;
    }

    public void setExpediente(Expediente expediente) {
        this.expediente = expediente;
    }

    public TipoParte getTipoParte() {
        return tipoParte;
    }

    public Parte tipoParte(TipoParte tipoParte) {
        this.tipoParte = tipoParte;
        return this;
    }

    public void setTipoParte(TipoParte tipoParte) {
        this.tipoParte = tipoParte;
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
        Parte parte = (Parte) o;
        if (parte.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parte.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Parte{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
