import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import css from "../index.css"

class SearchEvents extends React.Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "https://ticketmaster-api-staging.github.io/products-and-docs/widgets/event-discovery/1.0.0/lib/main-widget.js";
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
        <div id="mycustom-container" w-type="event-discovery" w-tmapikey="QDt0kSZEGRnYXjA1swZt9oSdGKMnjQM1" w-googleapikey="AIzaSyDhVx0oq3L3to4xqkVvu3pv9wtY5pTCuUw" w-keyword="" w-theme="simple" w-colorscheme="light" w-width="350" w-height="600" w-size="25" w-border="0" w-borderradius="4" w-postalcode="" w-radius="25" w-city="barcelona" w-period="year" w-layout="vertical" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="xxl" w-titlelink="off" w-sorting="groupByName" w-id="id_e7qqga" w-countrycode="ES" w-source="" w-branding="Ticketmaster" w-latlong=""></div>
         ) }
}

export default SearchEvents
