 
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";

class Mygroups extends Component {
  state = { groups: [],
             image:"https://images.unsplash.com/photo-1557787163-1635e2efb160?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2552&q=80" };

  componentDidMount() {
    this.getMyGroups();
    // this.getSingleEvent();
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
    axios.put(
      `${process.env.REACT_APP_API_URI}/groups/${idGroup}/${this.props.user._id}/abandonar`,
      { withCredentials: true }
    );
    const filterGroups = [...this.state.groups].filter((element) => {
      return element._id !== idGroup;
    });
    this.setState({
      groups: filterGroups,
    });
  };
  
  getSingleImage = async (id) => {
      await axios
        .get(
            `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTERKEY}&id=${id}`
          )
          .then((responseFromApi) => {
            console.log("hola",responseFromApi.data._embedded.events[0].images[0].url)
                // return responseFromApi.data._embedded.events[0].images[0].url
                this.setState({ image: responseFromApi.data._embedded.events[0].images[1].url});
        
              //console.log("caca", this.state.event.images[0].url);
            })
            .catch((err) => {
                console.log(err);
              });
          };
         
          render() {
            
            return (
      <div className="groupsCard">
        <h1>GROUPS</h1>
        {this.state.groups.map((group, index) => {
          return (
            <div key={index}>
              <div className="flex-container">
                <figure className="image-container">
                  <img src="https://images.unsplash.com/photo-1557787163-1635e2efb160?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2552&q=80"
                  /*{this.getSingleImage(group.enventID) ? this.getSingleImage(group.enventID) : this.state.image}{this.state.image}*/
                    className="image-prop"
                    alt=""
                  />
                </figure>
                <div className="image-prop">
                  <div>
                    {/* <button>#Italian</button> */}
                  </div>
          
                  <Link to={`/groupdetails/${group._id}`} className="title">
                    {group.name}
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

