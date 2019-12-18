import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { Typography } from "@material-ui/core";

const TransportDisplay = props => {
  const { icon, data, transport } = props;
  console.log(data);
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{icon}</Avatar>
      </ListItemAvatar>
      {data === undefined ? (
        <ListItemText primary={transport} secondary="Nothing here yet!" />
      ) : (
        <ListItemText
          primary={transport}
          secondary={
            <Typography component={"span"} variant={"caption"}>
              {Object.keys(data).map(entry => (
                <ul style={{ listStyle: "none" }}>
                  <li>{`Departs from: ${data[entry]["destination"]}`}</li>
                  <li>{`Destination: ${data[entry]["destination"]}`}</li>
                  <li>{`Destination: ${data[entry]["destination"]}`}</li>
                  <li>{`Destination: ${data[entry]["destination"]}`}</li>
                </ul>
              ))}
            </Typography>
          }
        />
      )}
    </ListItem>
  );
};

export default TransportDisplay;
