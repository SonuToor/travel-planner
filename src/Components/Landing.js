import background from "../Images/background.jpg";
import datesFormImage from "../Images/date-selection.png";
import itineraryImage from "../Images/itinerary-input.png";
import "./Landing.css";
import locationFormImage from "../Images/location-selection.png";
import React from "react";

// this is the landing page that users first see when they navigate to travel-planner
export default class Landing extends React.Component {
  // if this page is rendered make sure no user is logged in
  componentDidMount = () => {
    this.props.logOut();
  };

  render() {
    return (
      <div>
        <h1>Welcome to your new travel buddy.</h1>
        <div className="planner-demo">
          <div className="first-step">
            <p>1. Choose a destination.</p>
            <img
              className="demo-pics"
              src={locationFormImage}
              alt="the destination form"
            />
          </div>
          <div className="second-step">
            <p>2. Pick your dates.</p>
            <img
              className="demo-pics"
              src={datesFormImage}
              alt="the dates form"
            />
          </div>
          <div className="third-step">
            <p>3. Fill in your desired itinerary.</p>
            <img
              className="demo-pics"
              src={itineraryImage}
              alt="the sample itinerary"
            />
          </div>
        </div>
        <img className="bg" src={background} alt="by Dariusz Sankowski" />
      </div>
    );
  }
}
