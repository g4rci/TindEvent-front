import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import AllEvents from "../components/AllEvents"

class Private extends Component {
  render() {
    return (
      <div>
        <h1>Welcome {this.props.user.username}</h1>
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
