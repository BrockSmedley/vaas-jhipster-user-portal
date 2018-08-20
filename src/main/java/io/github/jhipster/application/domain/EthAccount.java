package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A EthAccount.
 */
@Entity
@Table(name = "eth_account")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EthAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "address")
    private String address;

    @OneToMany(mappedBy = "owner")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Item> items = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public EthAccount address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<Item> getItems() {
        return items;
    }

    public EthAccount items(Set<Item> items) {
        this.items = items;
        return this;
    }

    public EthAccount addItem(Item item) {
        this.items.add(item);
        item.setOwner(this);
        return this;
    }

    public EthAccount removeItem(Item item) {
        this.items.remove(item);
        item.setOwner(null);
        return this;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
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
        EthAccount ethAccount = (EthAccount) o;
        if (ethAccount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ethAccount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EthAccount{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
