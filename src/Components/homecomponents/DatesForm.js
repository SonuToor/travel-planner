import Button from '@material-ui/core/Button';
import calendarPic from "./calendario.jpeg"
import "./DatesForm.css"
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import React from "react";
import { CSSTransitionGroup } from 'react-transition-group';

export default class DateForm extends React.Component {
    constructor () {
        super()
        this.state = {
            date: [new Date(), new Date()],
        }
    }
    onChange = date => this.setState({ date })


    // TO DO
        // this.state.date here is an array of two dates (date objects I believe)
        // you only want the day, month and year, drop the rest of it for both the first and second date

        // pass it to Home.js to be stored on state, so it can be written to the database. 
    handleSubmit = (event) => {
        event.preventDefault()
 
        this.props.handleDate([this.state.date[0].toDateString(), this.state.date[1].toDateString()])

        this.setState({
            date: [new Date(), new Date()]
        })
    }

    render() {
        return (
            <CSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={true}
                transitionLeave={true}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                <h2>What are our dates?<img className="calendar-pic" src={calendarPic}/></h2>
                <form className="dates-form" onSubmit={this.handleSubmit}>
                    <DateRangePicker
                        required
                        onChange={this.onChange}
                        value={this.state.date}
                        minDate={new Date()}
                    />
                    <Button 
                        style={{
                            backgroundColor : "#836529", 
                            marginTop : "5%",
                            width : "10%",
                            }}
                        type="submit">
                        Submit
                        </Button>
                </form>
            </CSSTransitionGroup>
        )
    }
}