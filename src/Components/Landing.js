import React from 'react';

export default class Landing extends React.Component {


    componentDidMount = () => {
        // state in App.js should have loggedIn as false 
        this.props.logOut();
    }

    render() {
        return (
            <div>
                <h1>Landing page</h1>
                <p>Adds some catchy shit</p>
            </div>

        )
    }
}
