import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axiosRequestFunctions from "../lib/auth-service";
import axios from "axios";

class Mygroups extends Component {
  state = { groups: [] };

  componentDidMount() {
    this.getMyGroups();
  }

  getMyGroups = async () => {
    const myGroups = await axios.get(
      `${process.env.REACT_APP_API_URI}/profile/${this.props.user._id}`
    );
    this.setState({ groups: myGroups.data.groups });
    // const groupsList = this.state.groups.data.groups

    // console.log("LA NUEVA LISTA DE GRUPOS", groupsList);
  };

  handleDelete = (idGroup) => {
    console.log("ID GROUP", idGroup);
    axios.put(
      `${process.env.REACT_APP_API_URI}/groups/${idGroup}/${this.props.user._id}/abandonar`,
      { withCredentials: true }
    );
    const filterGroups = [...this.state.groups].filter((element) => {
      return element._id !== idGroup;
    });
    console.log("Decline", filterGroups);
    this.setState({
      groups: filterGroups,
    });
  };

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

  // getSingleEvent = async (url) => {
  //   const { params } = this.props.match;
  //   await axios
  //     .get(
  //       `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTERKEY}&id=${url}`
  //     )
  //     .then((responseFromApi) => {
  //         return responseFromApi
        

  //       //console.log("caca", this.state.event.images[0].url);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  
  render() {
    return (
      <div className="groupsCard">
        <h1>GROUPS</h1>
        {this.state.groups.map((group, index) => {
          this.getSingleEvent(group.eventID)
          console.log(group.eventID)
          return (
            <div key={index}>
              <div className="flex-container">
                <figure className="image-container">
                  <img
                    src="https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-1.2.1&auto=format&fit=crop&w=3450&q=80"
                    className="image-prop"
                    alt=""
                  />
                </figure>
                <div className="image-prop" style={{ backgroundColor: `#fff` }}>
                  <div className="flex-container">
                    {/* <button>#Italian</button> */}
                  </div>
                  <Link to={`/groupdetails/${group._id}`}>
                    <button>{group.name}</button>
                  </Link>
                  <h6>BIO: {group.bio}</h6>
              <button onClick={() => this.handleDelete(group._id)}>
                Abandonar grupo
              </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withAuth(Mygroups);
