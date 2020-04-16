import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";

class CreateGroup extends Component {
  state = { name: "", bio: "", eventID: "" };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const eventID = this.props.match.params.id;
    const {name, bio } = this.state;
    await axios
      .post(`${process.env.REACT_APP_API_URI}/groups/create`, { name, bio, eventID}, {withCredentials: true})
      this.props.history.push("/mygroups")
      
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={this.name}
            onChange={(e) => this.handleChange(e)}
          />
          <label>Bio:</label>
          <textarea
            type="text"
            name="bio"
            value={this.bio}
            onChange={(e) => this.handleChange(e)}
          />
          
          <button type="submit" value="Submit">Create</button>
        </form>
      </div>
    );
  }
}

export default withAuth(CreateGroup);
