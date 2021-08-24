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
                            <li>Background Color<br />(Default Black)</li>
                            
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
                        <div dangerouslySetInnerHTML={{ __html: `
                            <video
                            loop
                            muted
                            autoplay
                            playsinline
                            src="${of1}"
                            class="diff_video"
                            id="of1"
                            />,
                        `}}></div>
                        <figcaption className="caption">1/1 Gold</figcaption>
                    </div>

                    <div className="diff__member-individual">
                        <div dangerouslySetInnerHTML={{ __html: `
                            <video
                            loop
                            muted
                            autoplay
                            playsinline
                            src="${of5}"
                            class="diff_video"
                            id="of5"
                            />,
                        `}}></div>
                        <figcaption className="caption">/5 Red</figcaption>
                    </div>

                    <div className="diff__member-individual">
                        <div dangerouslySetInnerHTML={{ __html: `
                            <video
                            loop
                            muted
                            autoplay
                            playsinline
                            src="${of10}"
                            class="diff_video"
                            id="of10"
                            />,
                        `}}></div>
                        <figcaption className="caption">/10 White</figcaption>
                    </div>

                    <div className="diff__member-individual">
                        <div dangerouslySetInnerHTML={{ __html: `
                            <video
                            loop
                            muted
                            autoplay
                            playsinline
                            src="${of25}"
                            class="diff_video"
                            id="of25"
                            />,
                        `}}></div>
                        <figcaption className="caption">/25 Blue</figcaption>
                    </div>

                    <div className="diff__member-individual">
                        <div dangerouslySetInnerHTML={{ __html: `
                            <video
                            loop
                            muted
                            autoplay
                            playsinline
                            src="${of50}"
                            class="diff_video"
                            id="of50"
                            />,
                        `}}></div>
                        <figcaption className="caption">/50 Forest</figcaption>
                    </div>

                    <div className="diff__member-individual">
                    <div dangerouslySetInnerHTML={{ __html: `
                            <video
                            loop
                            muted
                            autoplay
                            playsinline
                            src="${of150}"
                            class="diff_video"
                            id="of150"
                            />,
                        `}}></div>
                        <figcaption className="caption">/150 Gray</figcaption>
                    </div>
                </div>
            </div>
      
        );
    }
}

export default DiffBoids