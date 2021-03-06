import Button from "@material-ui/core/Button";
import Fade from "react-reveal/Fade";
import "./LocationForm.css";
import plane from "../../Images/airplane.png";
import React from "react";
import Script from "react-load-script";
import SearchBar from "material-ui-search-bar";

const API_KEY = process.env.REACT_APP_API_KEY;

const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;

export default class LocationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      city: "",
      query: ""
    };
  }
  // this loads the script for google autocomplete
  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    var options = {
      types: ["(cities)"]
    };

    // Initialize Google Autocomplete
    /*global google*/

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    this.autocomplete.setFields(["address_components", "formatted_address"]);
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    // Extract City From Address Object
    let place = this.autocomplete.getPlace();
    let address = place.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState({
        city: address[0].long_name,
        query: place.formatted_address
      });
    }
  };

  // pass the information on to the home componenet where it can be written to firebase, reset the inputs to empty string
  handleSubmit = event => {
    event.preventDefault();

    if (this.state.city === "") {
      // make sure the user doesn't submit an empty string, make sure they select from the autocomplete suggestions
      return;
    }

    this.props.handleLocation(this.state.city);
    this.setState({
      city: "",
      query: ""
    });
  };

  render() {
    return (
      <Fade top>
        <h2>
          Where are we off to?
          <img className="plane" src={plane} alt="paper airplane" />
        </h2>
        <div className="location-form">
          <Script url={url} onLoad={this.handleScriptLoad} />
          <form onSubmit={this.handleSubmit}>
            <SearchBar
              id="autocomplete"
              placeholder="Select a destination"
              required
              value={this.state.query}
              style={{
                marginLeft: "-50%",
                width: "200%"
              }}
            />
            <Button
              style={{
                backgroundColor: "#836529",
                marginTop: "5%",
                width: "50%",
                marginLeft: "25%"
              }}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </Fade>
    );
  }
}
