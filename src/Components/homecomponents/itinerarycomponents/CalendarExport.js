import { Button } from "@material-ui/core";
import CalendarIcon from "@material-ui/icons/EventNote";
import React, { useContext, useState } from "react";
import moment from "moment";
import Script from "react-load-script";
import { TripItineraryContext } from "../../../Contexts/tripitinerary-context";
import { UserContext } from "../../../Contexts/loggedin-context";

const url = "https://apis.google.com/js/api.js";
var SCOPES = "https://www.googleapis.com/auth/calendar";
var GoogleAuth;

const API_KEY = process.env.REACT_APP_API_KEY;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const months = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12"
};

const CalendarExport = props => {
  const [showAuthButton, toggleAuthButton] = useState(true);
  const [eventsArray, setEventsArray] = useState([]);
  const [showErrorMessage, toggleErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [trip, updateTrip] = useContext(TripItineraryContext);
  const [user, updateUser] = useContext(UserContext);

  const handleScriptLoad = () => {
    window.gapi.load("client:auth2", initClient);
  };

  // once the script has loaded, provide credentials and set up an Authorization instance
  const initClient = () => {
    window.gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
      })
      .then(
        function() {
          GoogleAuth = window.gapi.auth2.getAuthInstance();
        },
        function(error) {
          //   appendPre(JSON.stringify(error, null, 2));
          console.log(error);
        }
      );
  };

  //    Sign in the user upon button click.
  const handleAuthClick = event => {
    GoogleAuth.signIn().then(() => {
      if (GoogleAuth.isSignedIn.get()) {
        toggleAuthButton(false);

        getEvents();
      }
    });
  };

  // Sign out the user upon button click.
  const handleSignoutClick = event => {
    GoogleAuth.signOut().then(() => {
      toggleAuthButton(true);
      toggleErrorMessage(false);
    });
  };

  const getEvents = () => {
    // map over the days of the itinerary
    let userEvents = props.dates.map(day => {
      // there is no entries for that day
      if (trip[day] === undefined) {
        return;
      }
      return { [day]: Object.values(trip[day]) };
    });
    setEventsArray(userEvents);
  };

  // export the users itinerary events to their Google Calendar
  const exportEvents = event => {
    eventsArray.forEach(entry => {
      if (entry === undefined) {
        return;
      } else {
        let date = Object.keys(entry)[0].split(" ");
        let events = Object.values(entry);

        // go over each event
        events[0].forEach(event => {
          let time = event.slice(0, 5);
          let eventDescription = event.slice(7);
          let day;

          // format the date according to the rfc3339 standard
          date[1].length === 3
            ? (day = `0${date[1].slice(0, 1)}`)
            : (day = date[1].slice(0, 2));

          let startTime = `${date[2]}-${months[date[0]]}-${day}T${time}:00`;

          // increment the data by 30 minutes to create the end time
          let endTime = moment(startTime)
            .add("30", "minutes")
            .format("YYYY-MM-DDTHH:mm:ss");

          let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          let uniqueID = `${user}${day}${startTime}${eventDescription}`
            .toLowerCase()
            .replace(/[\swxyz:-]/g, "");

          // create the meta details for the trip
          var eventEntry = {
            summary: eventDescription,
            id: uniqueID,
            start: {
              dateTime: startTime,
              timeZone: timeZone
            },
            end: {
              dateTime: endTime,
              timeZone: timeZone
            }
          };
          // write event to calendar
          window.gapi.client.load("calendar", "v3", function() {
            var request = window.gapi.client.calendar.events.insert({
              calendarId: "primary",
              resource: eventEntry
            });
            // change the colour of the button depending on whether the write was sucessful or unsuccesfull
            request.execute(function(resp) {
              if (resp.status === "confirmed") {
                let button = document.getElementById("export-button");
                button.classList.add("success");
                toggleErrorMessage(false);
              } else {
                let button = document.getElementById("export-button");
                button.classList.add("failure");
                if (resp.code === 404) {
                  setErrorMessage(
                    "Uh-oh we had trouble accessing your calendar, please try again later."
                  );
                }
                if (resp.code === 409) {
                  setErrorMessage(
                    "Uh-oh one or more of the itinerary events you wanted to export, have been exported before."
                  );
                }
                if (resp.code === 500) {
                  setErrorMessage(
                    "Uh-oh Google Calendar encountered an error on the backend, please try again later."
                  );
                }

                toggleErrorMessage(true);
              }
            });
          });
        });
      }
    });
  };

  return (
    <div className="google-calendar">
      <div className="google-calendar-export">
        <Script url={url} onLoad={handleScriptLoad} />
        <span>
          <CalendarIcon />
          Export trip itinerary to your Google Calendar?
        </span>
        {showAuthButton === true ? (
          <Button id="authorize-button" onClick={handleAuthClick}>
            Authorize
          </Button>
        ) : (
          <Button id="signout-button" onClick={handleSignoutClick}>
            Sign Out
          </Button>
        )}
        {showAuthButton === true ? null : (
          <Button id="export-button" onClick={exportEvents}>
            Export
          </Button>
        )}
      </div>
      {showErrorMessage === true ? (
        <span className="error">{errorMessage}</span>
      ) : null}
    </div>
  );
};

export default CalendarExport;
