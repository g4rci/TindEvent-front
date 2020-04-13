import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { withAuth } from "../lib/AuthProvider";
import axiosRequestFunctions from "../lib/auth-service";
import axios from "axios";

class Profile extends Component {
  state = {
    username: "",
    email: "",
    location: "",
    birthDate: "",
    bio: "",
    isLoading: true,
  };

  componentDidMount() {
    this.getUser();
    console.log(this.state);
  }
  getUser = async () => {
    const newestUser = await axios.get(
      `http://localhost:4000/profile/${this.props.user._id}`
    );
    console.log("newestuser", newestUser.data);
    this.setState({
      username: newestUser.data.username,
      email: newestUser.data.email,
      location: newestUser.data.location,
      birthDate: newestUser.data.birthDate,
      bio: newestUser.data.bio,
      isLoading: false,
    });
  };

  render() {
    const { logout, isLoggedin } = this.props;
    console.log(this.state);

    return (
      <div className="profile">
        {isLoggedin ? (
          <>
<<<<<<< HEAD
            {!this.state.isLoading ? (
              <div>
                <div className="">
                  <img src={this.state.picture} width="210px"></img>
                </div>
                <p>{this.state.username}</p>
                <p>{this.state.email}</p>
                <p>{this.state.location}</p>
                <p>{this.state.birthDate}</p>
                <p>{this.state.bio}</p>
                <button className="profileLogoutBtn" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <h1>Loading</h1>
            )}
=======
          <div className="profileCard">
           <img src={user.picture} width="210px"></img>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.location}</p>
            <p>{user.birthDate}</p>
            <p>{user.bio}</p>
            <button className='profileLogoutBtn' onClick={logout}>
              Logout
            </button>
           </div>
>>>>>>> 309bbb68d4731012f77ef67f6802b2ecb3a23d1e
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
