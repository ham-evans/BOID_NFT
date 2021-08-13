import React, { Component } from 'react'
import "./DiffBoids.css"
import of1 from '../images/of1.png';
import of5 from '../images/of5.png';
import of10 from '../images/of10.png';
import of25 from '../images/of25.png';
import of150 from '../images/of150.png';
import ofRest from '../images/ofRest.png';

class DiffBoids extends Component { 
    render () {
        return (
            <div className="team" id="diffboids">
                <h1>Meet the Team</h1>
                <div className="team__container">
                    <div className="team__member-group">
                        <div className="team__member-individual">
                            <img src={of1} alt="Member 1"/>
                            <figcaption className="caption">This is the caption</figcaption>
                        </div>
                        <div className="team__member-individual">
                            <img src={of25} alt="Member 2"/>
                            <figcaption className="caption">This is the caption</figcaption>
                        </div>
                    </div>
                    <div className="team__member-group">
                        <div className="team__member-individual">
                            <img src={of5} alt="Member 2"/>
                            <figcaption className="caption">This is the caption</figcaption>
                        </div>
                        <div className="team__member-individual">
                            <img src={of150} alt="Member 2"/>
                            <figcaption className="caption">This is the caption</figcaption>
                        </div>
                    </div>
                    <div className="team__member-group">
                        <div className="team__member-individual">
                            <img src={of10} alt="Member 2"/>
                            <figcaption className="caption">This is the caption</figcaption>
                        </div>
                        <div className="team__member-individual">
                            <img src={ofRest} alt="Member 2"/>
                            <figcaption className="caption">This is the caption</figcaption>
                        </div>
                    </div>
                </div>
            </div>
      
        );
    }
}

export default DiffBoids