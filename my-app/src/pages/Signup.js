import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Signup extends Component {
  state = { picture: "", username: "", email: "", password: "", location: "", birthDate: "", bio: ""};

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { picture, username, email, password, location, birthDate, bio } = this.state;
    console.log('Signup -> form submit', this.state );
    this.props.signup({  picture, username, email, password, location, birthDate, bio });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { picture, username, email, password, location, birthDate, bio } = this.state;
    return (
      <div>
        <h1>Sign Up</h1>

        <form onSubmit={this.handleFormSubmit}>
        <label>Photo:</label>
          <input
            type='text'
            name='picture'
            value={picture}
            alt='Profile picture'
            onChange={this.handleChange}/>
          <br></br>
          <label>Username:</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={this.handleChange}
          /><br></br>
          <label>Email:</label>
          <input
            type='text'
            name='email'
            value={email}
            onChange={this.handleChange}
          /><br></br>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
          /><br></br>
           <label>Tu ubicación:</label>
          <input
            type='text'
            name='location'
            value={location}
            onChange={this.handleChange}
          /><br></br>
           <label>Fecha de nacimiento:</label>
          <input
            type='Date'
            name='birthDate'
            value={birthDate}
            onChange={this.handleChange}
          /><br></br>
          <label>Bio:</label>
           <textarea
            type='text'
            name='bio'
            value={bio}
            onChange={this.handleChange}
          />
          <input type='submit' value='Signup' />
          <br></br>
        </form>

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);