import React, { useState }from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom"
import { withAuth } from "../lib/AuthProvider";

function EditProfile(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [picture, setPicture] = useState("");
    const [birthDate, setBirthDate] = useState("");

    console.log("has editado tu perfil, " + username)
    
    const history = useHistory();
    
    async function handleFormSubmit (event){
      event.preventDefault();
      try{
        console.log(props.user._id)
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
            value={props.user.picture}
            alt='Profile picture'
            onChange={e => setPicture(e.target.value)}
            />
          <br></br>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={props.user.username}
            onChange={e => setUsername(e.target.value)}
          />
          <br></br>
          <label>Email:</label>
          <input
          type="text"
            name="email"
            value={props.user.email}
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
            value={props.user.location}
            onChange={e => setLocation(e.target.value)}
          />
          <br></br>
          <label>Birthdate:</label>
          <input
          type="Date"
            name="birthDate"
            value={props.user.birthDate}
            onChange={e => setBirthDate(e.target.value)}
          />
          <br></br>
          <label>Bio:</label>
          <textarea
          type="text"
            name="bio"
            value={props.user.bio}
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