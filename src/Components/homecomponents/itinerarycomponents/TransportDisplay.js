import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { Typography, Card } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    overflow: "visible",
    marginBottom: "1%",
    backgroundColor: "#f0f1f2",
    color: "#836529"
  }
}));

const TransportDisplay = props => {
  const { icon, data, transport } = props;

  const formattedDate = date => {
    return `${date.slice(0, 5)} -${date.slice(9)}`;
  };

  const classes = useStyles();

  return (
    <ListItem disableGutters={true}>
      <ListItemAvatar>
        <Avatar>{icon}</Avatar>
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
                    <li>{`${transport} Number: ${data[entry]["id"]}`}</li>
                    <li>{`Departs: ${data[entry]["departsFrom"]}`}</li>
                    <li>{`Destination: ${data[entry]["destination"]}`}</li>
                    <li>{`When: ${formattedDate(
                      data[entry]["departDate"]
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

export default TransportDisplay;
