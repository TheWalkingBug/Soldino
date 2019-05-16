import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect';
import { routerActions } from 'react-router-redux';

// Layout Component Wrappers

export const UserIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: state => state.user.data !== null,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export const UserIsCitizen = connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: state => state.user.type === 1,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsCitizen',
});

export const UserIsBusinessOwner = connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: state => state.user.type === 2 && state.user.data.confirmed !== '0',
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsBusinessOwner',
});

export const UserIsGovernment = connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: state => state.user.type === 3,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsGovernment',
});

export const AllUsersNoGovernment = connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: state => state.user.type === 0 || state.user.type === 1
      || state.user.type === 2,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsGovernment',
});

export const UserIsNotAuthenticated = connectedRouterRedirect({
  authenticatedSelector: state => state.user && state.user.type === 0,
  redirectAction: routerActions.replace,
  redirectPath: (state, ownProps) => ownProps.location.query.redirect || '/',
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
});

// UI Component Wrappers

export const VisibleOnlyAuth = connectedAuthWrapper({
  authenticatedSelector: state => state.user && state.user.data !== null,
  wrapperDisplayName: 'VisibleOnlyAuth',
});

export const VisibleOnlyCitizen = connectedAuthWrapper({
  authenticatedSelector: state => state.user && state.user.type === 1,
  wrapperDisplayName: 'VisibleOnlyCitizen',
});

export const VisibleOnlyBusinessOwner = connectedAuthWrapper({
  authenticatedSelector: state => state.user && state.user.type === 2,
  wrapperDisplayName: 'VisibleOnlyBusinessOwner',
});

export const VisibleOnlyGovernment = connectedAuthWrapper({
  authenticatedSelector: state => state.user && state.user.type === 3,
  wrapperDisplayName: 'VisibleOnlyGovernment',
});

export const HiddenOnlyAuth = connectedAuthWrapper({
  authenticatedSelector: state => state.user && state.user.type === 0,
  wrapperDisplayName: 'HiddenOnlyAuth',
});
