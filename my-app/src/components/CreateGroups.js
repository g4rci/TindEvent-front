import React, { Component } from 'react'
import axios from "axios";


class CreateGroups extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            creator: "",
            name: "", 
            bio: "",
            eventID: ""
      }
    }
    
      handleFormSubmit = event => {
        event.preventDefault();
        
        axios
          .post(`${process.env.REACT_APP_API_URI}/groups/create/}`)
          .then(() => {
            this.setState({ 
                creator: "",
                name: "", 
                bio: "",
                eventID: ""
             });
          })
          .catch(error => console.log(error));
      };
    
      handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
    
      render() {
        return (
            <div>
          <div className="form">
            <form onSubmit={this.handleFormSubmit}>
              <label>Creator:</label>
              <input
                type="text"
                name="creator"
                value={this.state.creator}
                onChange={e => this.handleChange(e)}
              />
              <label>Name:</label>
               <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={e => this.handleChange(e)}
              />
              <label>Bio:</label>
              <textarea
                name="bio"
                value={this.state.bio}
                onChange={e => this.handleChange(e)}
              /> 
              <label>eventID:</label>
              <input
                type="text"
                name="eventID"
                value={this.state.eventID}
                onChange={e => this.handleChange(e)}
              /> 
              

    
              <a href="/AllBeers"><input type="submit" value="Submit" />Go back</a>
            </form>
          </div>
          </div>
        );
      
     }
    }
export default CreateGroups