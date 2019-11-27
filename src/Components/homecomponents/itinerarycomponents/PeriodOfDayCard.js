import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import React from "react";

export default function PeriodOfDayCard(props) {
  return (
    <Card className={props.class}>
      <CardContent>
        <h3 className="card-title">{props.period}</h3>
        <ul className="activities-list">
          {props.list.map(activity => (
            <li key={activity}>
              {activity}
              <IconButton
                id={activity}
                onClick={e => props.handleDelete(e, activity)}
              >
                <DeleteIcon id={activity} fontSize="small" />
              </IconButton>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
