import React from 'react';
import {
  Route, IndexRoute, Router, browserHistory,
} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import businessRoutes from './businessRoutes';
import citizenRoutes from './citizenRoutes';
import governmentRoutes from './governmentRoutes';
import publicRoutes from './publicRoutes';


import App from '../components/App';
import Homepage from '../components/public/Home';
import NotFound from '../components/public/NotFound';
import store from '../store';

const SoldinoRoutes = () => {
  const history = syncHistoryWithStore(browserHistory, store);
  return (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Homepage} />
        {publicRoutes}
        {citizenRoutes}
        {businessRoutes}
        {governmentRoutes}
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};

export default SoldinoRoutes;
