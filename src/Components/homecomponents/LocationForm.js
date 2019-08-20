import Button from '@material-ui/core/Button';
import { CSSTransitionGroup } from 'react-transition-group';
import "./LocationForm.css"
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

        this.autocomplete.setFields(['address_components', 'formatted_address']);
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
            <CSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={true}
            transitionLeave={true}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
                <div className="location-form">
                    <Script url={url} onLoad={this.handleScriptLoad}/>  
                    <h2 style={{textAlign : "center", fontSize : "250%"}}>Where are we off to?</h2>
                    <form onSubmit={this.handleSubmit}>
                        <SearchBar id="autocomplete" placeholder="Enter City" value={this.state.query}
                            style={{
                                marginLeft : "-50%",
                                width: "200%",
                                }}
                        />
                        {/* {style button the way you want to} */}
                        <Button 
                            style={{backgroundColor : "#836529", 
                                    marginTop : "5%",
                                    width : "50%",
                                    marginLeft : "25%"
                                }}
                            type="submit">
                        Submit
                        </Button>
                    </form>
                </div>
            </CSSTransitionGroup>
        )
    }
}

