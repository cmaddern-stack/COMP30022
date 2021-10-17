import React from "react";
import "./css/App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./components/Routes";

/*
To run the app on your local browser - from your terminal run:
1. npm install 
2. npm run start
*/

class App extends React.Component {
    constructor(props) {
        super(props);
        localStorage.setItem("theme", "light");
    }

    render() {
        return (
            <section className="body">
                <div>
                    <AppRouter />
                </div>
            </section>
        );
    }
}

export default App;
