import React, { useState, useEffect } from 'react';
import axios from 'axios';


 function AllEvents() {

        const [listOfEvents, setListOfEvents] = useState([])
    
        const getAllEvents = async () => {
            await axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.TICKETMASTERKEY}&countryCode=ES&city=barcelona`)
            .then(responseFromApi => {
                console.log(responseFromApi.data)
                setListOfEvents(
                    responseFromApi.data._embedded.events
                    
                );
            });
        };
    
        useEffect(function () {
            getAllEvents()
        }, [])

        return(
            <div className="eventsCard">
              { //this.state.listOfBeers.map( beer => {
                listOfEvents.map( event => {
                return (
                <div  className="card" key={event}>
                    <img src={event.images[3].url} alt=""/>
                    <h1>{event.name}</h1>
                    <a href={event.url}>Link</a>
                    
                </div>
                )})
              }

            </div>
          
        )
}

export default AllEvents
