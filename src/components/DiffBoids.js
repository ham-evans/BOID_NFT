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
            <div className="team" id="diffboids">
                <h1>Meet the Team</h1>
                <div className="team__container">
                    <div className="team__member-group">
                        <div className="team__member-individual">
                            <video className='team_video' onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} loop muted>
                                <source src={of1} typ='video/mp4' />
                            </video>
                            <figcaption className="caption">This is the caption</figcaption>
                        </div>
                        <div className="team__member-individual">
                            <video className='team_video' loop muted onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()}>
                                <source src={of5} typ='video/mp4' />
                            </video>
                            <figcaption className="caption">This is the caption</figcaption>
                        </div>
                    </div>
                    <div className="team__member-group">
                        <div className="team__member-individual">
                            <video className='team_video' onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} loop muted>
                                <source src={of10} typ='video/mp4' />
                            </video>
                            <figcaption className="caption">This is the caption</figcaption>
                        </div>
                        <div className="team__member-individual">
                            <video className='team_video' onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} loop muted>
                                <source src={of25} typ='video/mp4' />
                            </video>
                            <figcaption className="caption">This is the caption</figcaption>
                        </div>
                    </div>
                    <div className="team__member-group">
                        <div className="team__member-individual">
                            <video className='team_video' onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} loop muted>
                                <source src={of150} typ='video/mp4' />
                            </video>
                            <figcaption className="caption">This is the caption</figcaption>
                        </div>
                        <div className="team__member-individual">
                            <video className='team_video' onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} loop muted>
                                <source src={rest} typ='video/mp4' />
                            </video>
                            <figcaption className="caption">This is the caption</figcaption>
                        </div>
                    </div>
                </div>
            </div>
      
        );
    }
}

export default DiffBoids