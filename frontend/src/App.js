import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'

import logo from './logo.svg';
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
// import Nav from './components/Nav';
// import Home from './pages/Home'


function App() {
  return (
    
    <div>
      <Header/> 
      <NavBar />
      {/* <img src={logo} width="100px" /> */}
      <Footer/>
    </div>
  );
}

export default App;
