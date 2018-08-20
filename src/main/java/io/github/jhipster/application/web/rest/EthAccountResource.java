package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.EthAccount;
import io.github.jhipster.application.repository.EthAccountRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EthAccount.
 */
@RestController
@RequestMapping("/api")
public class EthAccountResource {

    private final Logger log = LoggerFactory.getLogger(EthAccountResource.class);

    private static final String ENTITY_NAME = "ethAccount";

    private final EthAccountRepository ethAccountRepository;

    public EthAccountResource(EthAccountRepository ethAccountRepository) {
        this.ethAccountRepository = ethAccountRepository;
    }

    /**
     * POST  /eth-accounts : Create a new ethAccount.
     *
     * @param ethAccount the ethAccount to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ethAccount, or with status 400 (Bad Request) if the ethAccount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/eth-accounts")
    @Timed
    public ResponseEntity<EthAccount> createEthAccount(@RequestBody EthAccount ethAccount) throws URISyntaxException {
        log.debug("REST request to save EthAccount : {}", ethAccount);
        if (ethAccount.getId() != null) {
            throw new BadRequestAlertException("A new ethAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EthAccount result = ethAccountRepository.save(ethAccount);
        return ResponseEntity.created(new URI("/api/eth-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /eth-accounts : Updates an existing ethAccount.
     *
     * @param ethAccount the ethAccount to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ethAccount,
     * or with status 400 (Bad Request) if the ethAccount is not valid,
     * or with status 500 (Internal Server Error) if the ethAccount couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/eth-accounts")
    @Timed
    public ResponseEntity<EthAccount> updateEthAccount(@RequestBody EthAccount ethAccount) throws URISyntaxException {
        log.debug("REST request to update EthAccount : {}", ethAccount);
        if (ethAccount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EthAccount result = ethAccountRepository.save(ethAccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ethAccount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /eth-accounts : get all the ethAccounts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ethAccounts in body
     */
    @GetMapping("/eth-accounts")
    @Timed
    public List<EthAccount> getAllEthAccounts() {
        log.debug("REST request to get all EthAccounts");
        return ethAccountRepository.findAll();
    }

    /**
     * GET  /eth-accounts/:id : get the "id" ethAccount.
     *
     * @param id the id of the ethAccount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ethAccount, or with status 404 (Not Found)
     */
    @GetMapping("/eth-accounts/{id}")
    @Timed
    public ResponseEntity<EthAccount> getEthAccount(@PathVariable Long id) {
        log.debug("REST request to get EthAccount : {}", id);
        Optional<EthAccount> ethAccount = ethAccountRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ethAccount);
    }

    /**
     * DELETE  /eth-accounts/:id : delete the "id" ethAccount.
     *
     * @param id the id of the ethAccount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/eth-accounts/{id}")
    @Timed
    public ResponseEntity<Void> deleteEthAccount(@PathVariable Long id) {
        log.debug("REST request to delete EthAccount : {}", id);

        ethAccountRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
