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
