import React, { Component } from 'react'
import "./DiffBoids.css"
import of1 from '../images/of1.mp4';
import of5 from '../images/of5.mp4';
import of10 from '../images/of10.mp4';
import of25 from '../images/of25.mp4';
import of50 from '../images/of50.mp4'
import of150 from '../images/of150.mp4';

class DiffBoids extends Component { 
    render () {
        return (
            <div className="diff" id="diffboids">
                <h1>TYPES OF BOIDS</h1>
                <p>Each boid is unique, random, and generated algorithmically.  The list of boid features and a variety of examples are shown below.  Certain rare features will also be released at mint!</p>
                <div className="diff__dContainer">
                    <div>
                        <ul>
                            <li>Initial Boid Color</li>
                            <li>Background Color (Default Black)</li>
                            
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>Boid Connectivity</li>
                            <li>Boid Fade Color</li>
                            
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>Number of Individual Boids</li>
                            <li>Trail of Previous Locations</li>
                        </ul>
                    </div>
                    
                    
                </div>
                <div className="diff__container">
                    <div className="diff__member-individual">
                        <video id="of1" className='diff_video' autoPlay loop muted >
                            <source src={of1} type='video/mp4' />
                        </video>
                        <figcaption className="caption">1/1 Gold</figcaption>
                    </div>
                    <div className="diff__member-individual">
                        <video id="of5" className='diff_video' autoPlay loop muted >
                            <source src={of5} type='video/mp4' />
                        </video>
                        <figcaption className="caption">/5 Red</figcaption>
                    </div>
                    <div className="diff__member-individual">
                        <video id="of10" className='diff_video' autoPlay loop muted >
                            <source src={of10} type='video/mp4' />
                        </video>
                        <figcaption className="caption">/10 White</figcaption>
                    </div>

                    <div className="diff__member-individual">
                        <video id="of25" className='diff_video' autoPlay loop muted >
                            <source src={of25} type='video/mp4' />
                        </video>
                        <figcaption className="caption">/25 Blue</figcaption>
                    </div>

                    <div className="diff__member-individual">
                        <video id="of50" className='diff_video' autoPlay loop muted >
                            <source src={of50} type='video/mp4' />
                        </video>
                        <figcaption className="caption">/50 Forest</figcaption>
                    </div>

                    <div className="diff__member-individual">
                        <video id="of150" className='diff_video' autoPlay loop muted >
                            <source src={of150} type='video/mp4' />
                        </video>
                        <figcaption className="caption">/150 Gray</figcaption>
                    </div>
                </div>
            </div>
      
        );
    }
}

export default DiffBoids