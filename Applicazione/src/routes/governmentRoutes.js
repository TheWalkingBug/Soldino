import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { UserIsGovernment, UserIsAuthenticated } from '../util/wrappers';

import GovernmentFinancialContainer from '../containers/government/GovernmentFinancialContainer';
import ManageBusinessContainer from '../containers/government/ManageBusinessContainer';
import BusinessListContainer from '../containers/government/BusinessListContainer';

import CommonHomeContainer from '../containers/CommonHomeContainer';
import EconomyFormContainer from '../containers/government/EconomyFormContainer';
import VATDetailsContainer from '../containers/government/VATDetailsContainer';

const governmentRoutes = (
  <Route path="profile">
    <IndexRoute component={UserIsAuthenticated(CommonHomeContainer)} />
    <Route
      path="governmentEconomy"
      component={UserIsGovernment(EconomyFormContainer)}
    />
    <Route
      path="governmentFinancial"
      component={UserIsGovernment(GovernmentFinancialContainer)}
    />
    <Route path="manageBusiness" component={UserIsGovernment(ManageBusinessContainer)} />
    <Route path="businessList" component={UserIsGovernment(BusinessListContainer)} />
    <Route path="/governmentFinancial/VATDetails/:id" component={UserIsGovernment(VATDetailsContainer)} />
  </Route>
);

export default governmentRoutes;
