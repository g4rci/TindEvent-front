import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import "../index.css";

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div className="logo">
        <Link to={"/"} id="home-btn">
          <nav>
            
              <img src="./logo2.png" width="30" height="30" alt="" />
            
          </nav>
        </Link>
        <p>TindEvent</p>
        <nav className="navbar">
          {isLoggedin ? (
            <>
              <p>Welcome: {user.username}</p>
              <Link to="/mygroups">
                <button className="navbar-button">My Groups</button>
              </Link>
              <Link to="/profile">
                <button className="navbar-button">Profile</button>
              </Link>
              <Link to="/">
              <button className="navbar-button" onClick={logout}>
                Logout
              </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="navbar-button">Login</button>
              </Link>
              <br />
              <Link to="/signup">
                <button className="navbar-button">Sign Up</button>
              </Link>
            </>
          )}
        </nav>
      </div>
    );
  }
}

export default withAuth(Navbar);
