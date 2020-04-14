import React, { Component } from 'react'
import axios from "axios";

class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
      componentDidMount() {
        this.getSingleEvent();
      }
     
    
      getSingleEvent = async() => {

        const { params } = this.props.match;
        //console.log(params);
        await axios
          .get(`https://app.ticketmaster.com/discovery/v2/events?apikey=QDt0kSZEGRnYXjA1swZt9oSdGKMnjQM1&id=${params.id}`)
          .then(responseFromApi => {
            const theEvent = responseFromApi.data._embedded.events[0];
            
            this.setState(theEvent);
            console.log("caca", this.state)
          })
          .catch(err => {
            console.log(err);
          });
      };
    
      

    render() {
        return (
            <div>
            
                <h1>Artista</h1>
                {/* <img src={this.state.images[0].url} alt={this.state.name}/> */}
                <h6>{this.state.name}</h6>
                <h6>{this.state.type}</h6>
                {/* <p>{this.state.dates.start.localDate}</p> */}
                {/* <h6>{this.state.dates.start.localTime}</h6> */}

                
                
    
            </div>
        )
    }
}

export default EventDetails
