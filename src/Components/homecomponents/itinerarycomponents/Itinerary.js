import Day from "./Day";
import firebase from "../../../config/Firebase";
import React, { useContext } from "react";
import { UserContext } from "../../../Contexts/loggedin-context";

export default function Itinerary(props) {
  const [user, updateUser] = useContext(UserContext);

  const handleActivityAdd = (day, time, activity) => {
    if (activity === "") {
      return;
    }

    let activityEntry = `${time} - ${activity}`;

    // add the newly created event to firebase, once it is written to firebase it automatically updates the UI
    firebase
      .database()
      .ref(`${props.dateID}-${user}/${day}`)
      .update({
        [time]: activityEntry
      });
  };

  return (
    <div className="itinerary">
      {props.dates.map((day, i) => (
        <Day key={day} date={day} index={i} handleAdd={handleActivityAdd} />
      ))}
    </div>
  );
}
