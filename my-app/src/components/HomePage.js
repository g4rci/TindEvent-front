import React from "react";
import { Link } from "react-router-dom";


class HomePage extends React.Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "https://ticketmaster-api-staging.github.io/products-and-docs/widgets/event-discovery/1.0.0/lib/main-widget.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }
    render() {
        return (
            <div className="widget">
        
        <div w-type="event-discovery" w-tmapikey={process.env.REACT_APP_TICKETMASTERKEY} w-googleapikey={process.env.REACT_APP_GOOGLEKEY} w-keyword="" w-theme="grid" w-colorscheme="dark" w-width="1000%" w-height="550" w-size="25" w-border="2" w-borderradius="15" w-postalcode="" w-radius="25" w-city="Barcelona" w-period="week" w-layout="fullwidth" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="custom" w-titlelink="off" w-sorting="dateAscending" w-id="id_n2vi7o" w-countrycode="ES" w-source="" w-branding="Ticketmaster" w-maxheight="550" w-latlong=""></div>
        <Link to='/private'>
              <button className='navbar-button'>Buscar evento</button>
        </Link>
        </div>
         
        ) }
}

export default HomePage
