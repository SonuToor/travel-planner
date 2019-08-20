import background from "../background.jpg"
import Container from '@material-ui/core/Container';
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
                <Container>
                {/* {style this image better} */}
                <img className="bg" src={background} alt="by Dariusz Sankowski"/>
                </Container>
            </div>

        )
    }
}
