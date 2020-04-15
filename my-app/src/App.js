import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import AuthProvider from "./lib/AuthProvider";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import HomePage from "./components/HomePage";
import EventDetails from "./components/EventDetails";
import CreateGroups from "./components/CreateGroups";
import MyGroups from "./components/MyGroups";
import GroupDetails from "./components/GroupDetails";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className='container'>
          <Navbar />

          <Switch>
            <Route exact path='/home' component={HomePage} />
            <AnonRoute exact path='/signup' component={Signup} />
            <AnonRoute exact path='/login' component={Login} />
            <PrivateRoute exact path='/private' component={Private} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PrivateRoute exact path='/editprofile' component={EditProfile} />
            <PrivateRoute exact path='/mygroups' component={MyGroups} />
            <PrivateRoute exact path='/eventdetails/:id' component={EventDetails} />
            <PrivateRoute exact path='/groupdetails/:id' component={GroupDetails} />
            <PrivateRoute exact path='/groups/create/:id' component={CreateGroups} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
