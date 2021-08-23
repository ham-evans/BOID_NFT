import React, { Component } from 'react'; 
import bgVideo from '../images/mainBackgroundVideo.mp4';
import './Home.css'

class Home extends Component { 
    render () {
        return (
            <div className="home" id="#home">
                <video className='videoTag' autoPlay loop muted>
                    <source src={bgVideo} type='video/mp4' />
                </video>
                <div className="home__textcontainer">
                    <h1>BOIDS</h1>
                    <h3>A collection of 2000 emergent video art pieces deployed on the ERC-721 token</h3>
                </div>
            </div>
        );
    }
}

export default Home