import React from "react";

import Login from "./containers/Login.jsx";
import Home from "./containers/Home.jsx";

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loggedIn = false,
        }
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler(e){
      if(e.target.id === "user"){
        axios.post(
          "user",
          {username: e.target.username.value,
            password: e.target.password.value
          }).then(res => {
            if(res.data === true){
              this.state.loggedIn = true;
            }
          })
        }

      if(e.target.id = "login"){
          axios.post(
            "login",
            {username: e.target.username.value,
              password: e.target.password.value
            }).then(res => {
              if(res.data === true){
                this.state.loggedIn = true;

              }
            })
          }
    }

    render(){
        let label = <Login />;
        if(this.props.loggedIn === true){
            label = <Home />;
        }
    return (
          <div id="mainpage">
          {label}
          </div>
        );
      }
    }


export default Main;