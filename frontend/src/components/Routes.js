import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Groups from "../pages/Groups";
import Header from "./header/Header";
import Contacts from "../pages/Contacts";
import EnterEmail from "../pages/auth/EnterEmail";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import Profile from "../pages/Profile"
import ContactsOptionsBar from "./ContactsOptionsBar";

/**
 * App Router
 * @returns Router object with defined app routes
 */

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={EnterEmail}></Route>
                <Route exact path="/auth/signup" component={SignUp}></Route>
                <Route exact path="/auth/login" component={Login}></Route>
                <div>
                    <Header />
                    <Route exact path="/profile" component={Profile}></Route>
                    <div>
                        {/* <ContactsOptionsBar /> */}
                        <Route exact path="/groups" component={Groups}></Route>
                        <Route
                            exact
                            path="/contacts"
                            component={Contacts}
                        ></Route>
                    </div>
                </div>
            </Switch>
        </Router>
    );
}
