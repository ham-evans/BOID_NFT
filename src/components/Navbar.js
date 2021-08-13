import React, { Component } from 'react'; 
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component { 
  state = {
    isOpen: false
  };

  handleToggle = () => { 
    this.setState({ isOpen: !this.state.isOpen })
  };

  render () {
    return (
      <nav className="navbar" id="#home">
        <div className="nav-container">
          <HashLink smooth to="#home" className="nav-logo">
            BOIDS
          </HashLink>

          <ul className={this.state.isOpen ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <HashLink
                smooth 
                to="#thealgorithm"
                className="nav-links"
              >
                THE ALGORITHM
              </HashLink>
            </li>
            <li className="nav-item">
              <HashLink
                smooth
                to="#diffboids"
                className="nav-links"
              >
                ABOUT BOIDS
              </HashLink>
            </li>
            <li className="nav-item">
            <Link className="nav-links" to={{ pathname: "https://twitter.com/BOIDS_NFT" }} target="_blank" >
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-links" to={{ pathname: "https://twitter.com/BOIDS_NFT" }} target="_blank" >
                <i className="fab fa-discord"></i>
              </Link>
            </li>
          </ul>
          <div className="nav-icon" onClick={this.handleToggle}>
            <i className={this.state.isOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar