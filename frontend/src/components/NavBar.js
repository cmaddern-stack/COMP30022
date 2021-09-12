import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import Nav from './Nav'

import Groups from '../pages/Groups';
import Contacts from '../pages/Contacts';


export default function NavBar() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Groups}></Route>
          <Route exact path="/contacts" component={Contacts}></Route>
        </Switch>
      </Router>
    

    );
};
