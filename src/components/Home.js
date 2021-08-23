import React, { Component } from 'react'; 
import bgVideo from '../images/mainBackgroundVideo.mp4';
import './Home.css'

class Home extends Component { 
    render () {
        return (
            <div className="home" id="#home">
                <div dangerouslySetInnerHTML={{ __html: `
                    <video
                    loop
                    muted
                    autoplay
                    playsinline
                    src="${bgVideo}"
                    class="videoTag"
                    />,
                `}}></div>
                
                <div className="home__textcontainer">
                    <h1>BOIDS</h1>
                    <h3>A collection of 2000 emergent video art pieces deployed on the ERC-721 token</h3>
                    <h3>LAUNCHING EARLY SEPTEMBER 2021</h3>

                </div>
            </div>
        );
    }
}

export default Home