import React, { Component } from 'react'
import "./DiffBoids.css"
import of1 from '../images/of1.mp4';
import of5 from '../images/of5.mp4';
import of10 from '../images/of10.mp4';
import of25 from '../images/of25.mp4';
import of150 from '../images/of150.mp4';
import rest from '../images/rest.mp4';

class DiffBoids extends Component { 
    render () {
        return (
            <div className="diff" id="diffboids">
                <h1>TYPES OF BOIDS</h1>
                <p>Each boid is unique, random, and generated algorithmically.  The list of boid features and a variety of examples are shown below.  Certain rare features will also be announced at mint!</p>
                <div className="diff__dContainer">
                    <div>
                        <ul>
                            <li>Initial Boid Color</li>
                            <li>Background Color</li>
                            
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
                        <video className='diff_video' onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} loop muted>
                            <source src={of1} typ='video/mp4' />
                        </video>
                        <figcaption className="caption">1/1 Gold Background </figcaption>
                    </div>
                    <div className="diff__member-individual">
                        <video className='diff_video' loop muted onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()}>
                            <source src={of5} typ='video/mp4' />
                        </video>
                        <figcaption className="caption">/5 Red Background</figcaption>
                    </div>
                    <div className="diff__member-individual">
                        <video className='diff_video' onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} loop muted>
                            <source src={of10} typ='video/mp4' />
                        </video>
                        <figcaption className="caption">/10 White Background</figcaption>
                    </div>
                    <div className="diff__member-individual">
                        <video className='diff_video' onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} loop muted>
                            <source src={of25} typ='video/mp4' />
                        </video>
                        <figcaption className="caption">/25 Blue Background</figcaption>
                    </div>
                    <div className="diff__member-individual">
                        <video className='diff_video' onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} loop muted>
                            <source src={of150} typ='video/mp4' />
                        </video>
                        <figcaption className="caption">/150 Gray Background</figcaption>
                    </div>
                    <div className="diff__member-individual">
                        <video className='diff_video' onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} loop muted>
                            <source src={rest} typ='video/mp4' />
                        </video>
                        <figcaption className="caption">Common Background</figcaption>
                    </div>
                </div>
            </div>
      
        );
    }
}

export default DiffBoids