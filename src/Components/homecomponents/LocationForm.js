import Button from '@material-ui/core/Button';
import React from 'react';

export default class LocationForm extends React.Component {

    populateAutcomplete = () => {
        // call an api here to create an autocomplete
    }
    componentDidMount = () => {
        this.populateAutcomplete
    }

    render () {
        <div className="location-form">
            <h3>Where are we off to?</h3>
            <form>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    }
}
