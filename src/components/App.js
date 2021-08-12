import React, { Component } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import TheAlgorithm from './TheAlgorithm';
import { BrowserRouter as Router} from "react-router-dom";
import logo from '../logo.svg';
import './App.css';
import Boid from "../artifacts/contracts/Boid.sol/Boid.json"

class App extends Component {
 

  render() {
    return (
    <>
      <Router>
        <Navbar />
        <Home />
        <TheAlgorithm />

      </Router>
    </>
  );
  }
}

export default App;
