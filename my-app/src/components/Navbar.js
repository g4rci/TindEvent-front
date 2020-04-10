import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import css from "../index.css"

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <nav className='navbar'>
        <Link to={"/"} id='home-btn'>
        <div className='navBar'>
                <nav className="navbar navbar-dark bg-primary">
                    <a className="navbar-brand" href="/">
                    <img src="https://image.flaticon.com/icons/png/512/306/306173.png" width="30" height="30" alt=""/>
                    </a>
                </nav>
        </div>
        </Link>
        {isLoggedin ? (
          <>
            <p className='navbar-user'>username: {user.username}</p>
            <button className='navbar-button' onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login'>
              <button className='navbar-button'>Login</button>
            </Link>
            <br />
            <Link to='/signup'>
              <button className='navbar-button'>Sign Up</button>
            </Link>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);