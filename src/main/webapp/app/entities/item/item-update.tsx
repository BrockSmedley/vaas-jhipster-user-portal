import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEthAccount } from 'app/shared/model/eth-account.model';
import { getEntities as getEthAccounts } from 'app/entities/eth-account/eth-account.reducer';
import { getEntity, updateEntity, createEntity, reset } from './item.reducer';
import { IItem } from 'app/shared/model/item.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IItemUpdateState {
  isNew: boolean;
  ownerId: number;
}

export class ItemUpdate extends React.Component<IItemUpdateProps, IItemUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getEthAccounts();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { itemEntity } = this.props;
      const entity = {
        ...itemEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/item');
  };

  render() {
    const { itemEntity, ethAccounts, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="vaasJHipsterUserPortalApp.item.home.createOrEditLabel">
              <Translate contentKey="vaasJHipsterUserPortalApp.item.home.createOrEditLabel">Create or edit a Item</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : itemEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="item-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="vaasJHipsterUserPortalApp.item.name">Name</Translate>
                  </Label>
                  <AvField id="item-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="uniqueIDLabel" for="uniqueID">
                    <Translate contentKey="vaasJHipsterUserPortalApp.item.uniqueID">Unique ID</Translate>
                  </Label>
                  <AvField id="item-uniqueID" type="text" name="uniqueID" />
                </AvGroup>
                <AvGroup>
                  <Label id="brandLabel" for="brand">
                    <Translate contentKey="vaasJHipsterUserPortalApp.item.brand">Brand</Translate>
                  </Label>
                  <AvField id="item-brand" type="text" name="brand" />
                </AvGroup>
                <AvGroup>
                  <Label id="chainIDLabel" for="chainID">
                    <Translate contentKey="vaasJHipsterUserPortalApp.item.chainID">Chain ID</Translate>
                  </Label>
                  <AvField id="item-chainID" type="text" name="chainID" />
                </AvGroup>
                <AvGroup>
                  <Label for="owner.id">
                    <Translate contentKey="vaasJHipsterUserPortalApp.item.owner">Owner</Translate>
                  </Label>
                  <AvInput id="item-owner" type="select" className="form-control" name="owner.id">
                    <option value="" key="0" />
                    {ethAccounts
                      ? ethAccounts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/item" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  ethAccounts: storeState.ethAccount.entities,
  itemEntity: storeState.item.entity,
  loading: storeState.item.loading,
  updating: storeState.item.updating
});

const mapDispatchToProps = {
  getEthAccounts,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemUpdate);
