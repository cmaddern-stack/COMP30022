import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "./logo.svg";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DefaultContainer from "./components/DefaultContainer";

/*
To run the app on your local browser - from your terminal run:
1. npm install 
2. npm run start
*/

function App() {
    return (
        <section class="body">
            <div>
                <Router>
                    <Switch>
                        <DefaultContainer/>
                    </Switch>
                </Router>
                {/* <Footer /> */}
            </div>
        </section>
    );
}

export default App;
