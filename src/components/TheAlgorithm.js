import React, { Component } from 'react'; 
import "./TheAlgorithm.css";
import towardMiddle from '../images/towardMiddle.mp4';
import avoidOthers from '../images/avoidOthers.mp4';
import matchVelo from '../images/matchVelo.mp4';

class TheAlgorithm extends Component { 
    render () {
        return (
            <div className="services" id="thealgorithm">
                <div className="services__dContainer">
                    <h1>BOIDS ALGORITHM</h1>

                    <p className="services_description">Boids Algorithm was developed by Craig Reynolds in 1986 to describe the flocking behaviour of groups of birds.  BOIDS exhibit emergent behavior- the complexity is derived from individuals making decisions based only on simple rules.  For boids, there are three simple rules in which the individuals follow.</p>
                </div>
                <div className="services__container">
                    <div className="services__card hideme">
                        <div dangerouslySetInnerHTML={{ __html: `
                            <video
                            loop
                            muted
                            autoplay
                            playsinline
                            src="${towardMiddle}"
                            class="videoTag"
                            />,
                        `}}></div>
                        <h2>Cohesion</h2>
                        <p>Boids steer gradually towards center of the group of boids within their visual range.</p>
                    </div>
                    <div className="services__card hideme">
                        <div dangerouslySetInnerHTML={{ __html: `
                            <video
                            loop
                            muted
                            autoplay
                            playsinline
                            src="${avoidOthers}"
                            class="videoTag"
                            />,
                        `}}></div>
                        <h2>Separation</h2>
                        <p>To avoid collisions, boids move away from each other if they get too close.</p>
                    </div>
                    <div className="services__card hideme">
                        <div dangerouslySetInnerHTML={{ __html: `
                            <video
                            loop
                            muted
                            autoplay
                            playsinline
                            src="${matchVelo}"
                            class="videoTag"
                            />,
                        `}}></div>
                        <h2>Alignment</h2>
                        <p>Boids attempt to match the vector (speed and direction), of the boids around them.</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default TheAlgorithm