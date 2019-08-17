import Button from '@material-ui/core/Button';
import { placesKey } from "../../config/APIs"
import React from 'react';
import Script from 'react-load-script';
import SearchBar from 'material-ui-search-bar';

const url = `https://maps.googleapis.com/maps/api/js?key=${placesKey}&libraries=places`


export default class LocationForm extends React.Component {
    constructor() {
        super()
        this.state = {
            city : '',
            query : '',
        }
    }

    handleScriptLoad = () => {
        // Declare Options For Autocomplete 
        var options = { 
            types: ['(cities)'] 
        }; 
  
        // Initialize Google Autocomplete 
        /*global google*/ 
        this.autocomplete = new google.maps.places.Autocomplete(
                        document.getElementById('autocomplete'),
                        options );

        this.autocomplete.setFields(['address_components']);
         // Fire Event when a suggested name is selected
        this.autocomplete.addListener('place_changed',
                                this.handlePlaceSelect); 
    }

    handlePlaceSelect = () => {

        // Extract City From Address Object
        let place = this.autocomplete.getPlace();
        let address = place.address_components;
        console.log(address)
        console.log(place)
    
        // Check if address is valid
        if (address) {
          // Set State
          this.setState(
            {
              city: address[0].long_name,
              query: place.formatted_address,
            }
          );
        }
      }
      
      handleSubmit = (event) => {
          event.preventDefault()
      }
 

    render () {
        return (
            <div className="location-form">
                <Script url={url} onLoad={this.handleScriptLoad}/>  
                <h3>Where are we off to?</h3>
                <form onSubmit={this.handleSubmit}>
                    <SearchBar id="autocomplete" placeholder="Enter City" value={this.state.query}
                        style={{
                            margin: '0 auto',
                            maxWidth: 800,
                            }}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        )
    }
}

