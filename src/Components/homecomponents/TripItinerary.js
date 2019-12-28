import CalendarExport from "./itinerarycomponents/CalendarExport";
import { createArrayOfDates } from "../../utils";
import Fade from "react-reveal/Fade";
import firebase from "../../config/Firebase";
import Itinerary from "./itinerarycomponents/Itinerary";
import React, { useContext, useEffect } from "react";
import TravelAndAccommoDisplay from "./itinerarycomponents/TravelAndAccommoDisplay";
import TravelAndAccommoInput from "./itinerarycomponents/TravelAndAccommoInput";
import "./TripItinerary.css";
import { TripItineraryContext } from "../../Contexts/tripitinerary-context";
import { UserContext } from "../../Contexts/loggedin-context";

const TripItinerary = props => {
  const [trip, updateTrip] = useContext(TripItineraryContext);
  const [user] = useContext(UserContext);

  // get the trips for the selected trip add them to the TripContext so it's available wherever it might be needed in the app
  const fetchTripData = () => {
    firebase
      .database()
      .ref(`${props.trip.dates[0]}-${user}/`)
      .on("value", snapshot => {
        let tripsObj = snapshot.val();
        updateTrip(tripsObj);
      });
  };

  useEffect(() => {
    if (props.trip === null) {
      props.history.push(props.returnRoute);
    } else {
      fetchTripData();
    }
  }, []);

  return (
    <Fade bottom>
      {trip === "" || trip === null ? (
        <span>loading</span>
      ) : (
        <>
          <h2 className="trip-title">{`Your trip to ${props.trip["location"]}`}</h2>
          <h4 className="trip-date-title">{`${props.trip["dates"][0].slice(
            3
          )} to ${props.trip["dates"][1].slice(3)}`}</h4>
          <CalendarExport
            dates={createArrayOfDates(props.trip.dates[0], props.trip.dates[1])}
          />
          <div className="itinerary-data-display">
            <TravelAndAccommoDisplay />
            <Itinerary
              dates={createArrayOfDates(
                props.trip.dates[0],
                props.trip.dates[1]
              )}
              dateID={props.trip.dates[0]}
            />
          </div>
          <TravelAndAccommoInput startDate={props.trip.dates[0]} />
        </>
      )}
    </Fade>
  );
};

export default TripItinerary;
