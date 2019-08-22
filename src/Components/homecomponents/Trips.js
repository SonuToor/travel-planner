import React from "react"


export default class Trips extends React.Component {

    componentDidMount = () => {
        this.props.display()
    }


    render() {
        return (
            <div>
                <h5>Trips</h5>
                {/* {if there are no trips yet} */}
                <p>no trips to display</p>
                {/* {else display the trips} */}
            </div>
        )
    }
}