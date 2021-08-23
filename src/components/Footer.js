import React, { Component } from 'react'; 
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'

import "./Footer.css";

class Footer extends Component { 
  render () {
    return (
      <nav className="footerbar">
        <div className="footer-container">
          <div className="footer-logo">
            BOIDS
          </div>

          <ul className="footer-menu">
            <li className="footer-item">
              <Link className="footer-links" to={{ pathname: "https://twitter.com/BOIDS_NFT" }} target="_blank" >
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
            </li>
            <li className="footer-item">
              <Link className="footer-links" to={{ pathname: "https://discord.gg/XvWwuVdQ" }} target="_blank" >
                <FontAwesomeIcon icon={faDiscord} />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Footer