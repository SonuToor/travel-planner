import DatesForm from "./homecomponents/DatesForm";
import firebase from "../config/Firebase";
import LocationForm from "./homecomponents/LocationForm";
import React from "react";
import Trips from "./homecomponents/Trips";
import { Route, Switch } from "react-router-dom";
import TripItinerary from "./homecomponents/TripItinerary";
import { ItineraryProvider } from "../Contexts/tripitinerary-context";
import { UserContext } from "../Contexts/loggedin-context";

const routes = {
  dates: "/home/dates",
  location: "/home/location",
  trips: "/home/trips",
  itinerary: "/home/:tripselected"
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    // the location, dates and duration are stored here in state simply to write to the database, as the meta details of the newly created trip.
    // selectedTrip is used to temporarily keep track of the trip that the user wants to edit in TripItinerary
    this.state = {
      location: "",
      dates: null,
      tripDuration: null,
      selectedTrip: null
    };
  }

  handleLocationFormSubmit = place => {
    // take the selected destination and store in state
    this.setState({
      location: place
    });
    this.props.history.push(routes.dates);
  };

  handleDateFormSubmit = (dates, duration) => {
    // store the dates in state
    this.setState(
      {
        dates: dates,
        tripDuration: duration
      },
      this.createTripInFirebase
    );
    this.props.history.push(routes.trips);
  };

  createTripInFirebase = () => {
    // create a trip details node in firebase to hold the meta details for the new trip
    firebase
      .database()
      .ref(`trip-details-${this.context[0]}/${this.state.dates[0]}`)
      .set({
        location: this.state.location,
        dates: this.state.dates,
        duration: this.state.tripDuration
      });
    // create an empty node in firebase to store the itinerary details
    firebase
      .database()
      .ref(`${this.state.dates[0]}-${this.context[0]}/`)
      .set({
        flight: "",
        accommodation: "",
        carrental: "",
        train: ""
      });
  };

  displayTrip = trip => {
    // grab the trip the user has selected from firebase and store it in state so it can be passed to the itinerary components
    firebase
      .database()
      .ref(`trip-details-${this.context[0]}/${trip}`)
      .on("value", snapshot => {
        let tripsObj = snapshot.val();
        this.setState(
          {
            selectedTrip: tripsObj
          },
          this.props.history.push(`/home/${trip}`)
        );
      });
  };

  componentDidMount = () => {
    // if there is no user logged in, redirect to the landing page, but clear whatever is stored in state
    if (this.props.loggedIn === false) {
      this.setState({
        location: "",
        dates: null,
        tripDuration: null,
        selectedTrip: null
      });
      this.props.history.push(this.props.route);
    } else {
      let setter = this.context[1];
      setter(this.props.user);
      this.props.history.push(routes.location);
    }
  };

  render() {
    return (
      <div>
        <ItineraryProvider>
          <Switch>
            <Route
              path={routes.location}
              render={() => (
                <LocationForm handleLocation={this.handleLocationFormSubmit} />
              )}
            />
            <Route
              path={routes.dates}
              render={() => (
                <DatesForm handleDate={this.handleDateFormSubmit} />
              )}
            />
            <Route
              path={routes.trips}
              render={props => (
                <Trips {...props} displayTrip={this.displayTrip} />
              )}
            />
            <Route
              path={routes.itinerary}
              render={props => (
                <TripItinerary
                  {...props}
                  returnRoute={routes.trips}
                  trip={this.state.selectedTrip}
                />
              )}
            />
          </Switch>
        </ItineraryProvider>
      </div>
    );
  }
}

Home.contextType = UserContext;
