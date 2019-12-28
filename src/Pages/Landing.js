import pickDates from "../Images/pickdates.svg";
import pickLocation from "../Images/pickdestination.svg";
import itineraryDemo from "../Images/itinerary-demo.png";
import fillItinerary from "../Images/fillinitinerary.svg";
import { Link } from "react-router-dom";
import pieDrawing from "../Images/piedrawing.jpg";
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
        <h3 className="steps-title">
          Easy as{" "}
          {<img src={pieDrawing} className="pie-pic" alt="pie drawing" />}
        </h3>
        <div className="steps">
          <div className="step">
            <img
              src={pickLocation}
              alt="choose a destination"
              className="steps-picture"
            />
            <p>Choose a destination.</p>
          </div>
          <div className="step">
            <img src={pickDates} alt="choose dates" className="steps-picture" />
            <p>Set your dates.</p>
          </div>
          <div className="step">
            <img
              src={fillItinerary}
              alt="fill in itinerary"
              className="steps-picture"
            />
            <p>Fill in your easy to read itinerary.</p>
          </div>
        </div>
        <footer className="landing-footer">
          <span>
            Designed and Developed by{" "}
            <a
              href="https://github.com/SonuToor/travel-planner"
              target="_blank"
            >
              Sonu Toor
            </a>
          </span>
        </footer>
      </div>
    );
  }
}
