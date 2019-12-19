import LocalHotel from "@material-ui/icons/LocalHotel";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    overflow: "visible",
    marginBottom: "1%",
    color: "#836529"
  },
  gutters: {
    paddingLeft: "5px",
    paddingRight: "5px"
  }
}));

const AccommoDisplay = props => {
  const { data } = props;

  const formattedDate = date => {
    return `${date.slice(0, 5)} -${date.slice(9)}`;
  };

  const classes = useStyles();

  return (
    <ListItem className={classes.gutters}>
      <ListItemAvatar>
        <Avatar>
          <LocalHotel />
        </Avatar>
      </ListItemAvatar>
      {data === undefined ? (
        <ListItemText secondary="Nothing here yet!" />
      ) : (
        <ListItemText
          secondary={
            <Typography component={"span"} variant={"caption"}>
              {Object.keys(data).map(entry => (
                <Card className={classes.root}>
                  <ul
                    style={{
                      listStyle: "none",
                      marginBottom: "3%",
                      paddingInlineStart: "5px"
                    }}
                  >
                    <li>{`Reservation: ${data[entry]["reservation"]}`}</li>
                    <li>{`Lodging: ${data[entry]["location"]}`}</li>
                    <li>{`Check In: ${formattedDate(
                      data[entry]["checkIn"]
                    )}`}</li>
                    <li>{`Check Out: ${formattedDate(
                      data[entry]["checkOut"]
                    )}`}</li>
                  </ul>
                </Card>
              ))}
            </Typography>
          }
        />
      )}
    </ListItem>
  );
};

export default AccommoDisplay;
