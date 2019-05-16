import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { UserIsCitizen, UserIsAuthenticated } from '../util/wrappers';
import OrdersHistoryContainer from '../containers/citizen/OrdersHistoryContainer';
import CommonHomeContainer from '../containers/CommonHomeContainer';
import OrderDetails from '../components/citizen/OrderDetails';

const citizenRoutes = (
  <Route path="profile">
    <IndexRoute component={UserIsAuthenticated(CommonHomeContainer)} />
    <Route path="ordersHistory" component={UserIsCitizen(OrdersHistoryContainer)} />
    <Route path="/ordersHistory/orderDetails/:id" component={UserIsCitizen(OrderDetails)} />
  </Route>
);

export default citizenRoutes;
