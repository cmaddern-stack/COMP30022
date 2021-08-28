import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


import logo from './logo.svg';
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

/*
To run the app on your local browser - from your terminal run:
1. npm install 
2. npm run start
*/

function App() {
  return (
    <section class="body">
      <div>
        <Header/> 
        <NavBar />
        {/* <img src={logo} width="100px" /> */}
        <Footer/>
      </div>
    </section>
  );
}

export default App;
