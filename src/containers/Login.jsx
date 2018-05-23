import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Sign from "../components/Sign.jsx";

class Login extends React.Component {

    render(){

        return (
          <div id="login-page">
            <img
              class="background-image"
              src="https://i.ytimg.com/vi/AH8SCMMOZn8/maxresdefault.jpg"
            />
           <Sign />
          </div>
        );
      }
    }
    
    
    export default withRouter(Login);