import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { UserIsBusinessOwner, UserIsAuthenticated } from '../util/wrappers';

import OrdersManagementContainer from '../containers/business/OrdersManagementContainer';
import ProductsManagementContainer from '../containers/business/ProductsManagementContainer';
import VATManagementContainer from '../containers/business/VATManagementContainer';
import CommonHomeContainer from '../containers/CommonHomeContainer';
import AddProductFormContainer from '../containers/business/AddProductFormContainer';
import OrderDetails from '../components/business/OrderDetails';
import ModifyProductFormContainer from '../containers/business/ModifyProductFormContainer';
import VATTransactionLedgerContainer from '../containers/business/VATTransactionLedgerContainer';
import VATLedgerContainer from '../containers/business/VATLedgerContainer';
import VATLedger from '../components/business/VATLedger';

const businessRoutes = (
  <Route path="profile">
    <IndexRoute component={UserIsAuthenticated(CommonHomeContainer)} />
    <Route
      path="ordersManagement"
      component={UserIsBusinessOwner(OrdersManagementContainer)}
    />
    <Route
      path="productsManagement"
      component={UserIsBusinessOwner(ProductsManagementContainer)}
    />
    <Route
      path="vatManagement"
      component={UserIsBusinessOwner(VATManagementContainer)}
    />
    <Route
      path="AddProducts"
      component={UserIsBusinessOwner(AddProductFormContainer)}
    />
    <Route
      path="VATLedger"
      component={UserIsBusinessOwner(VATLedgerContainer)}
    />
    <Route
      path="VATTransactionLedger"
      component={UserIsBusinessOwner(VATTransactionLedgerContainer)}
    />
    <Route
      path="/VATTransactionLedger/VATLedger/:id"
      component={UserIsBusinessOwner(VATLedger)}
    />
    <Route
      path="/ordersManagement/orderDetails/:id"
      component={UserIsBusinessOwner(OrderDetails)}
    />
    <Route
      path="/productsManagement/ModifyProduct/:id"
      component={UserIsBusinessOwner(ModifyProductFormContainer)}
    />
  </Route>
);

export default businessRoutes;
