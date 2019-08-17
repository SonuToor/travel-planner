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
                <div className="landing-banner">
                    <h1>Landing page</h1>
                    <p>Adds some catchy shit</p>
                </div>
                <div className="planner-demo">
                    <div className="first-step"></div>
                    <div className="second-step"></div>
                    <div className="third-step"></div>
                </div>
                <img className="bg" src={background}/>
            </div>

        )
    }
}
