import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import Nav from './Nav'

import Groups from '../pages/Groups';
import People from '../pages/People';


export default function NavBar() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Groups}></Route>
          <Route exact path="/people" component={People}></Route>
        </Switch>
      </Router>
    

    );
};
