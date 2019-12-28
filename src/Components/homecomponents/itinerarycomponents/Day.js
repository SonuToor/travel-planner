import Add from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import firebase from "../../../config/Firebase";
import IconButton from "@material-ui/core/IconButton";
import PeriodOfDayCard from "./PeriodOfDayCard";
import React, { useContext, useState } from "react";
import TimePicker from "react-time-picker";
import Typography from "@material-ui/core/Typography";
import { TripItineraryContext } from "../../../Contexts/tripitinerary-context";
import StyledTextInput from "./StyledTextInput";
import { UserContext } from "../../../Contexts/loggedin-context";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  details: {
    padding: "8px 8px 8px"
  }
}));

export default function Day(props) {
  const [trip] = useContext(TripItineraryContext);
  const [user] = useContext(UserContext);

  const tripDay = trip[props.date];

  const classes = useStyles();

  // the hooks for both the inputs
  const [time, handleTime] = useState("00:00");
  const [activity, handleActivity] = useState("");

  let onChange = time => handleTime(time);

  const handleDelete = (event, activity) => {
    let timeID = activity.slice(0, 5);

    firebase
      .database()
      .ref(`${trip.startDate}-${user}/${props.date}/${timeID}`)
      .remove();
  };

  const handleSubmit = event => {
    event.preventDefault();
    // validate the input before passing to Itinerary to write to firebase
    if (time === null || activity === "") {
      return;
    } else {
      props.handleAdd(props.date, time, activity);
      handleActivity("");
      handleTime("00:00");
    }
  };

  // create empty arrays to sort each activity into
  let mornList = [];
  let aftList = [];
  let eveList = [];
  let nightList = [];

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon id={`expand-icon-${props.index}`} />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading} aria-label="Header">
          {props.date}
        </Typography>
        <form
          className="event-form"
          onSubmit={handleSubmit}
          aria-label="Form"
          onClick={event => event.stopPropagation()}
          onFocus={event => event.stopPropagation()}
        >
          <StyledTextInput
            label="Enter Activity"
            value={activity}
            updateValue={handleActivity}
          />
          <TimePicker onChange={onChange} value={time} />
          <IconButton type="submit">
            <Add />
          </IconButton>
        </form>
      </ExpansionPanelSummary>
      <div className="individual-day">
        <ExpansionPanelDetails className={classes.details}>
          {tripDay === undefined
            ? null
            : Object.keys(tripDay).map(hour => {
                // append to the arrays above, so each array has the activities that belong to that part of day
                if (
                  Number(hour.slice(0, 2)) >= 5 &&
                  Number(hour.slice(0, 2)) < 12
                ) {
                  mornList.push(tripDay[hour]);
                } else if (
                  Number(hour.slice(0, 2)) >= 12 &&
                  Number(hour.slice(0, 2)) < 17
                ) {
                  aftList.push(tripDay[hour]);
                } else if (
                  Number(hour.slice(0, 2)) >= 17 &&
                  Number(hour.slice(0, 2)) < 21
                ) {
                  eveList.push(tripDay[hour]);
                } else {
                  nightList.push(tripDay[hour]);
                }
              })}
          <div className="cards">
            <PeriodOfDayCard
              class="individual-card"
              period={"Morning"}
              list={mornList}
              handleDelete={handleDelete}
            />
            <PeriodOfDayCard
              class="individual-card"
              period={"Afternoon"}
              list={aftList}
              handleDelete={handleDelete}
            />
            <PeriodOfDayCard
              class="individual-card"
              period={"Evening"}
              list={eveList}
              handleDelete={handleDelete}
            />
            <PeriodOfDayCard
              class="individual-card"
              period={"Night"}
              list={nightList}
              handleDelete={handleDelete}
            />
          </div>
        </ExpansionPanelDetails>
      </div>
    </ExpansionPanel>
  );
}
