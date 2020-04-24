import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";


class Profile extends Component {
  state = {
    picture: "",
    username: "",
    email: "",
    location: "",
    birthDate: "",
    bio: "",
    isLoading: true,
  };

  componentDidMount() {
    this.getUser();
  }
  getUser = async () => {
    const newestUser = await axios.get(
      `${process.env.REACT_APP_API_URI}/profile/${this.props.user._id}`
    );
    this.setState({
      picture: newestUser.data.picture,
      username: newestUser.data.username,
      email: newestUser.data.email,
      location: newestUser.data.location,
      birthDate: newestUser.data.birthDate.slice(0, 10).split('-').reverse().join('-'),
      bio: newestUser.data.bio,
      isLoading: false,
    });
  };

  render() {
    const { isLoggedin } = this.props;
    

    return (
      <div className="profile">
        {isLoggedin ? (
          <>
            {!this.state.isLoading ? (
              <div>
                <div className="profileCard">
                <img src={this.state.picture} width="210px" alt={this.state.username}/>
                <p>{this.state.username}</p>
                <p>{this.state.email}</p>
                <p>{this.state.location}</p>
                <p>{this.state.birthDate}</p>
                <p>{this.state.bio}</p>
                <Link to="/editprofile">
                  <button className="profileLoginBtn">Edit</button>
                </Link>
                </div>
              </div>
            ) : (
              <h1>Loading</h1>
            )}
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="profileLoginBtn">Login</button>
            </Link>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(Profile);
