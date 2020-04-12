import React, { useState }from 'react'
import axios from "axios"
import Navbar from "./Navbar"
import { useHistory } from "react-router-dom"

export default function NewBeer() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPaswword] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [picture, setPicture] = useState("");

    console.log("name in new beer is: " + name)
    
    const history = useHistory();
    
    async function handleFormSubmit (event){
      event.preventDefault();
      try{
        await axios.post("https://ih-beers-api2.herokuapp.com/beers/new", { name, description, tagLine, firstBrewed})
            history.push("/Beers")
            ;
        }
        catch(error){
        console.log(error)
        }
    }


    return (
        <div>
        <Navbar/>
      <div className ="d-flex justify-content-center">
        <form className="d-flex flex-column justify-content-center formBeer text-center align-items-center" onSubmit={e => handleFormSubmit(e)}>
          <label>name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          
          <label>description:</label>
          <input
          type="text"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label>tagline:</label>
          <input
          type="pasword"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label>first brewed:</label>
          <input
          type="text"
            name="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <label>first brewed:</label>
          <textarea
          type="text"
            name="bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
          <label>first brewed:</label>
          <filr
          type="file"
            name="picture"
            value={picture}
            onChange={e => setPicture(e.target.value)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
      </div>
    )
}
