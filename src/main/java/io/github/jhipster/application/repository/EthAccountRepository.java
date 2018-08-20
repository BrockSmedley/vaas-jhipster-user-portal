package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.EthAccount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EthAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EthAccountRepository extends JpaRepository<EthAccount, Long> {

}
