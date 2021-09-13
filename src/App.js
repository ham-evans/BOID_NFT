import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TheAlgorithm from './components/TheAlgorithm';
import DiffBoids from './components/DiffBoids';
import Mint from './components/Mint'
import MintHome from './components/MintHome'
import MintHome2 from './components/MintHome2'
import About from './components/About'
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
////import { ethers } from 'ethers';
//import Boid from './artifacts/contracts/Boid.sol/Boid.json';

//const boidAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

class App extends Component {
  
  render() {
    return (
      <>
        <Router>
          <Switch />
          <Navbar />
          <MintHome2 />
          <About />
          <TheAlgorithm />
          <DiffBoids />
          <Footer />

        </Router> 
      </>
    );
  }
}

export default App;
