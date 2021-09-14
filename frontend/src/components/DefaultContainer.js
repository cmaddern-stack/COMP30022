import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


// import Nav from './Nav'

import Groups from '../pages/Groups';
import Header from './Header';
import Contacts from '../pages/Contacts';
import ContactsOptionsBar from './ContactsOptionsBar';


export default function DefaultContainer() {
    return (
      <div>
        <Header />
        {/* <Nav /> */}
        <ContactsOptionsBar/>
        <Route exact path="/" component={Groups}></Route>
        <Route exact path="/contacts" component={Contacts}></Route>
      </div>
    );
};
