import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import AllEvents from "../components/AllEvents"

class Private extends Component {
  render() {
    return (
      <div className="welcomDiv">
        <p className="welcome">Welcome: {this.props.user.username}</p>
        <div>
          <section className="carrousel buscador">
          <AllEvents />
          </section>
          <section className="eventosfamosos">
          
          </section>
          <section className="misGrupos">
            
          </section>

        </div>
      </div>
    );
  }
}

export default withAuth(Private);
