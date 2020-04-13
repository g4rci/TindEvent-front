import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import css from "../index.css"

class SearchEvents extends React.Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "https://ticketmaster-api-staging.github.io/products-and-docs/widgets/calendar/1.0.0/lib/main-widget.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.onload = () => {
          var myWidget = new SearchEvents({
              container: '#mycustom-container', // querySelector to the element that will contain the widget
              
          });
        }
    }
    render() {
        return (
    <div w-type="calendar" w-tmapikey="QDt0kSZEGRnYXjA1swZt9oSdGKMnjQM1" w-googleapikey="AIzaSyDhVx0oq3L3to4xqkVvu3pv9wtY5pTCuUw" w-keyword="" w-theme="calendar" w-colorscheme="dark" w-width="298" w-height="400" w-size="25" w-border="1" w-borderradius="15" w-postalcode="" w-radius="25" w-countrycode="ES" w-city="barcelona" w-period="week" w-periodweek="week" w-layout="vertical" w-classificationid="" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="standart" w-latlong=""></div>        
    
    ) }
}

export default SearchEvents;
