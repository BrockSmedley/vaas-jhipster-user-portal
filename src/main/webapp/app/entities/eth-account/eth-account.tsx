import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './eth-account.reducer';
import { IEthAccount } from 'app/shared/model/eth-account.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEthAccountProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class EthAccount extends React.Component<IEthAccountProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { ethAccountList, match } = this.props;
    return (
      <div>
        <h2 id="eth-account-heading">
          <Translate contentKey="vaasJHipsterUserPortalApp.ethAccount.home.title">Eth Accounts</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="vaasJHipsterUserPortalApp.ethAccount.home.createLabel">Create new Eth Account</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="vaasJHipsterUserPortalApp.ethAccount.address">Address</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ethAccountList.map((ethAccount, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${ethAccount.id}`} color="link" size="sm">
                      {ethAccount.id}
                    </Button>
                  </td>
                  <td>{ethAccount.address}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${ethAccount.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${ethAccount.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${ethAccount.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ethAccount }: IRootState) => ({
  ethAccountList: ethAccount.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EthAccount);
