import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import Nav from './Nav'

import Home from '../pages/Home';
import Next from '../pages/Next';


export default function NavBar() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/next" component={Next}></Route>
        </Switch>
      </Router>
    

    );
};
