import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './eth-account.reducer';
import { IEthAccount } from 'app/shared/model/eth-account.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEthAccountDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class EthAccountDetail extends React.Component<IEthAccountDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { ethAccountEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="vaasJHipsterUserPortalApp.ethAccount.detail.title">EthAccount</Translate> [<b>{ethAccountEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="address">
                <Translate contentKey="vaasJHipsterUserPortalApp.ethAccount.address">Address</Translate>
              </span>
            </dt>
            <dd>{ethAccountEntity.address}</dd>
          </dl>
          <Button tag={Link} to="/entity/eth-account" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/eth-account/${ethAccountEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ ethAccount }: IRootState) => ({
  ethAccountEntity: ethAccount.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EthAccountDetail);
