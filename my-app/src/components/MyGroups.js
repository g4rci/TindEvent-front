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

  handleDelete = (idGroup) => { 
    console.log("ID GROUP", idGroup)
    axios.put(`${process.env.REACT_APP_API_URI}/groups/${idGroup}/${this.props.user._id}/abandonar`, {withCredentials: true})
    const filterGroups = [...this.state.groups].filter((element)=> {
      return element._id !== idGroup
    })
    console.log("Decline", filterGroups)
    this.setState({
      groups: filterGroups
    })
  }

  render() {
    return (
      <div className="groups">
          <h1>GROUPS</h1>
         {this.state.groups.map((group, index) => {
            return (
            <div key={index}>
                <Link to={`/groupdetails/${group._id}`}> <p>{group.name}</p> </Link>  <button onClick={ () => this.handleDelete(group._id)}>Abandonar grupo</button>
         </div>
         )}
         )}
         </div>
    );
  }
}

export default withAuth(Mygroups);


