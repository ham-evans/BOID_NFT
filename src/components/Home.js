import React, { Component } from 'react'; 
import bgVideo from '../images/mainBackgroundVideo.mp4';
import './Home.css'
import { Link } from "react-router-dom";

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
                    <h3 className="home_textcontainer-spiel">A collection of 2000 emergent video art pieces deployed on the ERC-721 token</h3>
                    <button className="home__textButton"><Link  to={{ pathname: "https://opensea.io/collection/boids-nft" }} target="_blank" rel="noreferrer">View on OpenSea</Link></button>
                    

                </div>
            </div>
        );
    }
}

export default Home