import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Groups from "../pages/Groups";
import Header from "./Header";
import Contacts from "../pages/Contacts";
import EnterEmail from "../pages/auth/EnterEmail";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import ContactsOptionsBar from "./ContactsOptionsBar";

export default function DefaultContainer() {
    return (
        <div>
            <Route exact path="/auth/email" component={EnterEmail}></Route>
            <Route exact path="/auth/signup" component={SignUp}></Route>
            <Route exact path="/auth/login" component={Login}></Route>
            <div>
                <Header />
                {/* <Nav /> */}
                <ContactsOptionsBar />
                <Route exact path="/" component={Groups}></Route>
                <Route exact path="/contacts" component={Contacts}></Route>
            </div>
        </div>
    );
}
