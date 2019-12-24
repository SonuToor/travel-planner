import pickDates from "../Images/pickdates.svg";
import pickLocation from "../Images/pickdestination.svg";
import itineraryDemo from "../Images/itinerary-demo.png";
import fillItinerary from "../Images/fillinitinerary.svg";
import { Link } from "react-router-dom";
import StyledButton from "../Components/homecomponents/StyledButton";
import "./Landing.css";
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
        <h1>Welcome to your travel planner.</h1>
        <div className="planner-demo">
          <img
            className="demo-pic"
            src={itineraryDemo}
            alt="the destination form"
          />
          <div style={{ marginLeft: "3%" }}>
            <h3 style={{ marginTop: "15%" }}>
              Everything you need to know about your trip in one place, whenever
              you need it.
            </h3>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <StyledButton text="Sign up now!" />
            </Link>
          </div>
        </div>
        <div
          style={{
            marginTop: "5%",
            display: "flex",
            justifyContent: "space-evenly"
          }}
        >
          <div className="steps-left-align">
            <img
              src={pickLocation}
              alt="choose a destination"
              className="steps-picture"
            />
          </div>
          <div className="steps-right-align">
            <img
              src={pickDates}
              alt="choose a destination"
              className="steps-picture"
            />
          </div>
          <div className="steps-left-align">
            <img
              src={fillItinerary}
              alt="choose a destination"
              className="steps-picture"
            />
          </div>
        </div>
        {/* <div className="first-step">
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
        </div> */}
        <footer className="landing-footer">
          <span>Designed and Developed by Sonu Toor</span>
        </footer>
      </div>
    );
  }
}
