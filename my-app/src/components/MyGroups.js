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
    const myGroups = await axios.get(`${process.env.REACT_APP_API_URI}/profile/${this.props.user._id}`)
    this.setState({groups: myGroups.data.groups});
    // const groupsList = this.state.groups.data.groups
    console.log("NUEVO CONSOLE LOG", myGroups.data.groups);
    // console.log("LA NUEVA LISTA DE GRUPOS", groupsList);
  }

  render() {
    return (
      <div className="">
          <h1>GROUPS</h1>
         {this.state.groups.map((group, index) => {
            return (
            <div key={index}>
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
              
             
              {/* <button>#Italian</button> */}
            </div>
            <h1>Group Name: {group.name}</h1> 
            <h3>BIO: {group.bio}</h3>
          </div>
          
        </div>
                
         </div>
         )}
         )}
         </div>
    );
  }
}

export default withAuth(Mygroups);


