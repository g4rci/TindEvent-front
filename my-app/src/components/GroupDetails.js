import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    console.log("Este log pending antiguo", this.state.pending);
    const { id } = this.props.match.params;
    //console.log(idUser, id)
    axios.post(`${process.env.REACT_APP_API_URI}/groups/${id}/${pending._id}/accept`, {withCredentials: true})
    const filterUsers = [...this.state.pending].filter((element)=> {
      return element._id !== pending._id
    })
    console.log("Acepto", filterUsers)
    this.setState({
      pending: filterUsers,
      users: [...this.state.users, pending]
    })
  }

  handleDecline = (idUser) => { 
    const { id } = this.props.match.params;
    console.log(idUser)
    axios.post(`${process.env.REACT_APP_API_URI}/groups/${id}/${idUser}/delete`, {withCredentials: true})
    const filterPending = [...this.state.pending].filter((element)=> {
      return element._id !== idUser
    })
    console.log("Decline", filterPending)
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
        console.log("The users", this.state.users);
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
        <div>
          <h5>{i + 1}: {pend.username}</h5>
          <button onClick={ () => this.handleAccept(pend)}>Aceptar</button>
          <button onClick={ () => this.handleDecline(pend._id)}>Rechazar</button>
        </div>
      );
    });
    return (
      <div>
        <h1>Grupo</h1>
        <h6>{this.state.group.name}</h6>
        <h6>{this.state.creator}</h6>
        {this.state.users ? <div>{users}</div> : <h1>Loading</h1>}
        {this.state.pending ? <div>{pending}</div> : <h1>Loading</h1>}
        <h6>{this.state.group.bio}</h6>

        {/* <h6>{this.state.event.type}</h6>

        <div className="flex-container">
          <figure className="image-container">
          <img src="https://images.unsplash.com/photo-1474600056930-615c3d706456?ixlib=rb-0.3.5&s=dc82336ad3e3873b0a81e9389d346916&auto=format&fit=crop&w=1952&q=80" className="image-prop" alt="" />
          </figure>
          <div className="image-prop" style={{backgroundColor: `#fff`}}>
            <div className="flex-container">
              <h1>Evento</h1>
              <button>#Vegetarian</button>
              <button>#Italian</button>
            </div>
            <h2>Yummy veggie pizza with tasty olives, crisp peppers, fresh arugula and original italian tomato sauce.</h2>
          </div>
          </div>
        <Link to={`/groups/create/${this.props.match.params.id}`}>
          <button>Create Group</button>
        </Link> */}
      </div>
    );
  }
}

export default withAuth(GroupDetails);
