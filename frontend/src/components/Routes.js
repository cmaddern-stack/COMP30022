import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Groups from "../pages/Groups";
import Header from "./header/Header";
import Contacts from "../pages/Contacts";
import EnterEmail from "../pages/auth/EnterEmail";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import Profile from "../pages/Profile";
import ContactsOptionsBar from "./ContactsOptionsBar";

/**
 * App Router
 * @returns Router object with defined app routes
 */

class AppRouter extends React.Component {
    isLoggedIn = () => {
        const id = sessionStorage.getItem("userId");
        return id !== null;
    };

    contactsPage = () => {
        return (
            <div>
                <ContactsOptionsBar />
                <Contacts />
            </div>
        );
    };

    groupsPage = () => {
        return (
            <div>
                <ContactsOptionsBar />
                <Groups />
            </div>
        );
    };

    render() {
        return (
            <Router>
                <Switch>
                    this.isLoggedIn ?
                    <Route exact path="/">
                        <Redirect to="/groups" />
                    </Route>
                    : <Route exact path="/" component={EnterEmail}/>
                    <Route exact path="/auth/signup" component={SignUp}/>
                    <Route exact path="/auth/login" component={Login}/>
                    <Route exact path="/auth/logout">
                        <Redirect to="/" />
                    </Route>
                    <div>
                        <Header />
                        <Route
                            exact
                            path="/profile"
                            component={Profile}
                        ></Route>
                        <Route
                            exact
                            path="/groups"
                            component={this.groupsPage}
                        ></Route>
                        <Route
                            exact
                            path="/contacts"
                            component={this.contactsPage}
                        ></Route>
                    </div>
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;
