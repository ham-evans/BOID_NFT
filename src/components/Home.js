import React, { Component } from 'react'; 
import bgVideo from '../images/BoidBackground.mp4';

class Home extends Component() { 
    render () {
        <video className='videoTag' autoPlay loop muted
        style={{
            position: "absolute", 
            width: "100%", 
            height: "100vh",
            left: "50%",
            top: "50%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: "-1"

        }}>
            <source src={bgVideo} typ='video/mp4' />
        </video>
    }
}

export default Home