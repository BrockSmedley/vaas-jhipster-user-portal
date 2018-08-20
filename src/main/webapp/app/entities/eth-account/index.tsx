import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EthAccount from './eth-account';
import EthAccountDetail from './eth-account-detail';
import EthAccountUpdate from './eth-account-update';
import EthAccountDeleteDialog from './eth-account-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EthAccountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EthAccountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EthAccountDetail} />
      <ErrorBoundaryRoute path={match.url} component={EthAccount} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EthAccountDeleteDialog} />
  </>
);

export default Routes;
