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
    await axios.post(`${process.env.REACT_APP_API_URI}/groups/${groupid}/join/${this.props.user._id}`, {withCredentials: true})
    this.props.history.push("/myGroups")
  }
  
  render() {
    
    const groups = this.state.groups.map((group, i) => {
      return (
        <div className="flex-container">
          <figure className="image-container">
            <img
              src="https://images.unsplash.com/photo-1474600056930-615c3d706456?ixlib=rb-0.3.5&s=dc82336ad3e3873b0a81e9389d346916&auto=format&fit=crop&w=1952&q=80"
              className="image-prop"
              alt=""
            />
          </figure>
          <div className="image-prop" style={{ backgroundColor: `#fff` }}>
            <div className="flex-container">
              <h1>{group.name}</h1>
              <button onClick={ () =>this.handleJoin(group._id)}>Join</button>
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
        <h1>Artista</h1>
        <img src={this.state.image} alt={this.state.name} />
        <h6>{this.state.event.name}</h6>
        <h6>{this.state.event.type}</h6>
        {this.state.groups ? (
          <div>
            {groups}
          </div>
        ) : (
          <h1>Loading</h1>
        )}
        <Link to={`/groups/create/${this.props.match.params.id}`}>
              <button>Create Group</button>
        </Link>
      </div>
    );
  }
}

export default withAuth(EventDetails);
