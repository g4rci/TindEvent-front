import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";

class GroupDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: [],
      creator: "",
      users: [],
      pending: [],
      isLoading: true,
    };
  }

  handleAccept = (pending) => { 
    const { id } = this.props.match.params;
    axios.post(`${process.env.REACT_APP_API_URI}/groups/${id}/${pending._id}/accept`, {withCredentials: true})
    const filterUsers = [...this.state.pending].filter((element)=> {
      return element._id !== pending._id
    })
    this.setState({
      pending: filterUsers,
      users: [...this.state.users, pending]
    })
  }

  handleDecline = (idUser) => { 
    const { id } = this.props.match.params;
    axios.post(`${process.env.REACT_APP_API_URI}/groups/${id}/${idUser}/delete`, {withCredentials: true})
    const filterPending = [...this.state.pending].filter((element)=> {
      return element._id !== idUser
    })
    this.setState({
      pending: filterPending
    })
  }

  componentDidMount() {
    this.getSingleGroup();
  }

  getSingleGroup = () => {
    const { params } = this.props.match;
    axios
      .get(`${process.env.REACT_APP_API_URI}/groups/${params.id}`, {
        withCredentials: true,
      })
      .then((data) => {
        const theGroup = data.data;
        this.setState({
          group: theGroup,
          creator: theGroup.creator.username,
          users: theGroup.users,
          pending: theGroup.pending,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const users = this.state.users.map((user, i) => {
      return <h5>{i + 1}: {user.username}</h5>;
    });
    const pending = this.state.pending.map((pend, i) => {
      return (
        <div className="profile">
        <div className="profileCard">
          <h5>{i + 1}: {pend.username}</h5>
          <button onClick={ () => this.handleAccept(pend)}>Aceptar</button>
          <button onClick={ () => this.handleDecline(pend._id)}>Rechazar</button>
        </div>
        </div>
      );
    });
    return (
      <div className="profile">
      <div className="profileCard">
        <h1>Grupo</h1>
        <h6>{this.state.group.name}</h6>
        <h6>{this.state.creator}</h6>
        {this.state.users ? <div>{users}</div> : <h1>Loading</h1>}
        {this.state.pending ? <div>{pending}</div> : <h1>Loading</h1>}
        <h6>{this.state.group.bio}</h6>
        </div> 
       
      </div>
    );
  }
}

export default withAuth(GroupDetails);
