import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import css from "../index.css";

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div className="logo">
        <Link to={"/home"} id="home-btn">
          <nav>
            <a>
              <img src="./logo2.jpg" width="30" height="30" alt="" />
            </a>
          </nav>
        </Link>
        <p>TindEvent</p>
        <nav className="navbar">
          {isLoggedin ? (
            <>
              <p>Wecome: {user.username}</p>
              <Link to="/profile">
                <button className="navbar-button">Profile</button>
              </Link>
              <button className="navbar-button" onClick={logout}>
                Logout
              </button>
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
