import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { withAuth } from "../lib/AuthProvider";

class Profile extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;

    return (
      <div className='profile'>
        {isLoggedin ? (
          <>
          <div className="">
           <img src={user.picture} width="210px"></img>
           </div>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.location}</p>
            <p>{user.birthDate}</p>
            <p>{user.bio}</p>
            <button className='profileLogoutBtn' onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login'>
              <button className='profileLoginBtn'>Login</button>
            </Link>
            </>
            )}
            </div>
        )

      }
    }
export default withAuth(Profile);