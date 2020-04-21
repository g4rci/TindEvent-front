import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      image: "",
      groups: [],
      date: "",
      time:"",
      venue:""
    };
  }
  componentDidMount() {
    this.getSingleEvent();
    this.getGroupEventID();
  }

  getSingleEvent = async () => {
    const { params } = this.props.match;
    console.log("ESTE PARAMS", params);
    await axios
      .get(
        `http://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTERKEY}&id=${params.id}`
      )
      .then((responseFromApi) => {
        const theEvent = responseFromApi.data._embedded.events[0];

        this.setState({
          event: theEvent,
          image: theEvent.images[1].url,
          date: theEvent.dates.start.localDate.slice(0, 10).split('-').reverse().join('-'),
          time: theEvent.dates.start.localTime,
          venue: theEvent._embedded.venues[0].city.name
        });

        //console.log("caca", this.state.event.images[0].url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getGroupEventID = async () => {
    const { params } = this.props.match;
    console.log("Entrando en GetGroupEventID", params.id);
    const groups = await axios.get(
      `${process.env.REACT_APP_API_URI}/groups/grouplist/${params.id}`
    );
    this.setState({
      groups: groups.data,
    });
    console.log(groups);
  };

  handleJoin = async (groupid) => {
    await axios.post(
      `${process.env.REACT_APP_API_URI}/groups/${groupid}/join/${this.props.user._id}`,
      { withCredentials: true }
    );
    this.props.history.push("/myGroups");
  };

  render() {
    const groups = this.state.groups.map((group, i) => {
      return (
        <div className="flex-container">
          <figure className="image-container">
            <img src={this.state.image} className="image-prop" alt="" />
          </figure>
          <div className="image-prop">
            <button onClick={() => this.handleJoin(group._id)}>Join</button>
            <div className="flex-container">
              <h1>{group.name}</h1>

              {/* <button>#Italian</button> */}
            </div>
            <h2>BIO</h2>
            <h6>{group.bio}</h6>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div id="gradient"></div>
        <div id="cardDet">
          <img src={this.state.image} alt={this.state.name} />
          <h2>{this.state.event.name}</h2>
          <p>{this.state.event.type}</p>
          <p>{this.state.date}, h: {this.state.time}</p>
          <p className="left bottom">Venue: {this.state.venue}</p>
          <div>
        <Link to={`/groups/create/${this.props.match.params.id}`}>
          <button>Create Group</button>
        </Link>
        </div>
        </div>
        
      {this.state.groups  ? (<div>{groups}</div>) : (
        <h1>Loading</h1>
        )}
      </div>
    );
}}


export default withAuth(EventDetails);
