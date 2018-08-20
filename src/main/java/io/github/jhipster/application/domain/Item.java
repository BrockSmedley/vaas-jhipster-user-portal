package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Item.
 */
@Entity
@Table(name = "item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "unique_id")
    private String uniqueID;

    @Column(name = "brand")
    private String brand;

    @Column(name = "chain_id")
    private String chainID;

    @ManyToOne
    @JsonIgnoreProperties("items")
    private EthAccount owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Item name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUniqueID() {
        return uniqueID;
    }

    public Item uniqueID(String uniqueID) {
        this.uniqueID = uniqueID;
        return this;
    }

    public void setUniqueID(String uniqueID) {
        this.uniqueID = uniqueID;
    }

    public String getBrand() {
        return brand;
    }

    public Item brand(String brand) {
        this.brand = brand;
        return this;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getChainID() {
        return chainID;
    }

    public Item chainID(String chainID) {
        this.chainID = chainID;
        return this;
    }

    public void setChainID(String chainID) {
        this.chainID = chainID;
    }

    public EthAccount getOwner() {
        return owner;
    }

    public Item owner(EthAccount ethAccount) {
        this.owner = ethAccount;
        return this;
    }

    public void setOwner(EthAccount ethAccount) {
        this.owner = ethAccount;
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
        Item item = (Item) o;
        if (item.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), item.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Item{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", uniqueID='" + getUniqueID() + "'" +
            ", brand='" + getBrand() + "'" +
            ", chainID='" + getChainID() + "'" +
            "}";
    }
}
