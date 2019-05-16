import React from 'react';
import { Route } from 'react-router';
import { UserIsNotAuthenticated, AllUsersNoGovernment } from '../util/wrappers';

import Help from '../components/public/Help';
import SignUp from '../components/public/SignUp';
import Price from '../components/public/Price';
import SignUpCitizenFormContainer from '../containers/public/SignUpCitizenFormContainer';
import SignUpBusinessOwnerFormContainer from '../containers/public/SignUpBusinessOwnerFormContainer';
import CartContainer from '../containers/public/CartContainer';
import ProductPageContainer from '../containers/public/ProductPageContainer';
import ProductSearchContainer from '../containers/public/ProductSearchContainer';

const publicRoutes = (
  <div>
    <Route path="products" component={AllUsersNoGovernment(ProductSearchContainer)} />
    <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
    <Route path="costs" component={Price} />
    <Route path="help" component={Help} />
    <Route path="signupcitizen" component={UserIsNotAuthenticated(SignUpCitizenFormContainer)} />
    <Route path="signupbusinessowner" component={UserIsNotAuthenticated(SignUpBusinessOwnerFormContainer)} />
    <Route path="cart" component={AllUsersNoGovernment(CartContainer)} />
    <Route path="product/:id" component={AllUsersNoGovernment(ProductPageContainer)} />
  </div>
);

export default publicRoutes;
