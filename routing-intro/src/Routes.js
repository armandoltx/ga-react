import React from 'react';
import  { HashRouter as Router, Route} from 'react-router-dom';
// user BrowserRouter to remove the # in the url

import Home from './components/Home';
import FAQ from './components/FAQ';

const Routes = (
  <Router>
    <div>
      <Route exact="/" component={ Home } />
      <Route exact="/fa " component={ FAQ } />
    </div>
  </Router>
);

export default Routes;