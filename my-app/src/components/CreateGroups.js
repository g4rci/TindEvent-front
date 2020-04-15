import React, { Component, useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";


class CreateGroup extends Component {
  state = { name: "", bio: "" };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    await axios
    .post(`${process.env.REACT_APP_API_URI}/groups/create`, this.state )
    .then(() => {
      console.log("STATE", this.state)
      this.setState({
        name: "", 
        bio: ""
      });
    })
      .catch(error => console.this.log(error));
  };
   
   
    // const { name, bio } = this.state;
    //console.log('Signup -> form submit', this.state );
   //this.props.signup({  name, bio });
  

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

      render() {
        return (
          
          <div className="form">
            <form onSubmit={this.handleFormSubmit}>
              {/* <label>Name:</label>
               <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={e => this.handleChange(e)}
              /> */}
               <label>Name:</label>
          <input
            type='text'
            name='name'
            value={this.name}
            onChange={this.handleChange}
          />
              {/* <label>Bio:</label>
              <textarea
                type='text'
                name="bio"
                value={this.state.bio}
                onChange={e => this.handleChange(e)}
              />  */}
                <label>Bio:</label>
           <textarea
            type='text'
            name='bio'
            value={this.bio}
            onChange={this.handleChange}
          />
              <input type="submit" value="Submit" />
            </form>
          </div>
          
        );
    }  
}
    
export default CreateGroup