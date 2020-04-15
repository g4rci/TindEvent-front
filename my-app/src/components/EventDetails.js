import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from "axios";

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      image: "",
    };
  }
  componentDidMount() {
    this.getSingleEvent();
  }

  getSingleEvent = async () => {
    const { params } = this.props.match;
    //console.log(params);
    await axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTERKEY}&id=${params.id}`
      )
      .then((responseFromApi) => {
        const theEvent = responseFromApi.data._embedded.events[0];

        this.setState({
          event: theEvent,
          image: theEvent.images[1].url,
        });

        //console.log("caca", this.state.event.images[0].url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Artista</h1>
        <img src={this.state.image} alt={this.state.name} />
        <h6>{this.state.event.name}</h6>
        <h6>{this.state.event.type}</h6>
        <Link to={`/groups/create/${this.props.match.params.id}`}>
        <button>Create Group</button>
        </Link>
      </div>
    );
  }
}

export default EventDetails;
