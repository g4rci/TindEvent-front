import React, { useState, useEffect }from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom"
import { withAuth } from "../lib/AuthProvider";
import DatePicker from 'react-date-picker';
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
    const me = await axios.get(`http://localhost:4000/profile/${props.user._id}`);
    console.log("MEMEME", me);
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
      console.log("nuevo console", props.user._id)
      await axios.put(`http://localhost:4000/profile/${props.user._id}/edit`, { picture, username, email, location, birthDate, bio })
      history.push("/Profile") /*como devolver a profile los datos actualizado recein */
      ;
    }
    catch(error){
      console.log(error)
    }
  }
  
  return (
        <div>
      <div className ="d-flex justify-content-center">
        <form className="d-flex flex-column justify-content-center formBeer text-center align-items-center" onSubmit={e => handleFormSubmit(e)}>
          
        <label>Photo:</label>
          <input
            type='text'
            name='picture'
            value={picture}
            alt='Profile picture'
            onChange={e => setPicture(e.target.value)}
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
            {/* <br></br>
          <label>Password:</label>
          <input
          type="password"
            name="password"
            value={password: hashPass}
            onChange={e => setPassword(e.target.value)}
          /> */}
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
          <DatePicker
          type="Date"
            name="birthDate"
            value={birthDate}
            onChange={e =>setBirthDate(e.target.value)}/>
          
          <br></br>
          <label>Bio:</label>
          <textarea
          type="text"
            name="bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
          <br></br>

          <input type="submit" value="Submit" />
        </form>
      </div>
      </div>
    )
}
export default withAuth(EditProfile)