import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./components/Routes";

/*
To run the app on your local browser - from your terminal run:
1. npm install 
2. npm run start
*/

function App() {
    return (
        <section className="body">
            <div>
                <AppRouter/>
            </div>
        </section>
    );
}

export default App;
