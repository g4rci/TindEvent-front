import React, { useState, useEffect, createRef }from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom"
import { withAuth } from "../lib/AuthProvider";
//import {useDatepicker, useMonth, useDay} from '@datepicker-react/hooks'


function EditProfile(props) {
  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.email);
  // const [password, setPassword] = useState("");
  const [location, setLocation] = useState(props.user.location);
  const [bio, setBio] = useState(props.user.bio);
  const [picture, setPicture] = useState(props.user.picture);
  const [birthDate, setBirthDate] = useState(props.user.birthDate);
  
  const getUserInfo = async () => {
    const me = await axios.get(`${process.env.REACT_APP_API_URI}/profile/${props.user._id}`);
    setUsername(me.data.username)
    setEmail(me.data.email)
    setLocation(me.data.location)
    setBio(me.data.bio)
    setBirthDate(me.data.birthDate)
    setPicture(me.data.picture)  
  }

  // const newBirthDate =(value) => {
  //   var date = new Date(value);
  //   setBirthDate(date.toISOString());
  // } 

  useEffect( () => {
    getUserInfo()
    }, []);
  
  
  const history = useHistory();
  
  async function handleFormSubmit (event){
    event.preventDefault();
    try{
      await axios.put(`${process.env.REACT_APP_API_URI}/profile/${props.user._id}/edit`, { picture, username, email, location, birthDate, bio })
      history.push("/Profile")
      ;
    }
    catch(error){
      console.log(error)
    }
  }
  
  return (
        <div>
      <div className ="profile">
        <form className="profileCard" onSubmit={e => handleFormSubmit(e)}>
          
        <label>Photo:</label>
          <input
            type='file'
            name='picture'
            alt='Profile picture'
            //onChange={e => setPicture(e.target.value)}
            />
          <br></br>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <br></br>
          <label>Email:</label>
          <input
          type="text"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <br></br>
          <label>Location:</label>
          <input
          type="text"
            name="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <br></br>
          <label>Birthdate:</label>
          <input
          type="Date"
            name="birthDate" 
            value={birthDate}
            onChange={e =>setBirthDate(e.target.value)}
          />
          <br></br>
          <label>Bio:</label>
          <textarea
          type="text"
            name="bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
          <br></br>

          <button type="submit" value="Submit">Edit</button>
        </form>
      </div>
      </div>
    )
}
export default withAuth(EditProfile)