import background from "../background.jpg"
import "./Landing.css"
import React from 'react';


export default class Landing extends React.Component {


    componentDidMount = () => {
        this.props.logOut();
    }

    render() {
        return (
            <div>
                <h1>Welcome to your new travel buddy.</h1>
                <div className="planner-demo">
                    <div className="first-step">
                        <p>1. Choose a destination.</p>
                        <span>image representing step goes here</span>
                    </div>
                    <div className="second-step">
                        <p>2. Pick your dates.</p>
                        <span>image representing step goes here</span>
                    </div>
                    <div className="third-step">
                        <p>Fill in your desired itinerary.</p>
                        <span>image representing step goes here</span>
                    </div>
                </div>
                <h3>We'll organize all the details, so you'll always be ontop of things!</h3>
                <img className="bg" src={background} alt="by Dariusz Sankowski"/>
            </div>
        )
    }
}
