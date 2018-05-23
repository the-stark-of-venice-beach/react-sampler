import React from "react";
import { render } from "react-dom";
import axios from "axios";

import App from './App.jsx';
import Login from "./components/Login.jsx";

class Main extends React.Component {
 constructor(props){
   super(props);

   this.state = {
     loggedIn: false,
   }
   this.clickHandler = this.clickHandler.bind(this);

 }
 
 
 
 clickHandler(e) {
   e.preventDefault();
    if (e.target.id === "signup") {
      console.log("e target id: ", e.target.id)
      axios
        .post("/user", {
          username: e.target.parentElement.username.value,
          password: e.target.parentElement.password.value
        })
        .then(res => {
          console.log("res.data: ", res.data);
          if (res.data === "ok") {
            console.log("Setting State to Logged In!");
            let tempState = Object.assign({}, this.state);
            tempState.loggedIn = true;
            this.setState(tempState);
          }
        });
      }
      
      if (e.target.id === "login") {
        console.log("e target id: ", e.target.id)
        axios
        .post("/login", {
          username: e.target.parentElement.username.value,
          password: e.target.parentElement.password.value
        })
        .then(res => {
          let userData = res.data;
          console.log("userData: ", userData);
          if (userData['authenticated'] === true) {
            console.log("Setting State to Logged In!");

            let tempState = Object.assign({}, this.state);
            tempState.loggedIn = true;
            tempState.userid = userData['_id'];
            tempState.username = userData['username'];
            this.setState(tempState);
          }
        });
    }
  }




 render() {
   console.log("Main this.state.loggedIn: " ,  this.state.loggedIn);
   let label = <Login clickHandler={this.clickHandler}/>;
   if (this.state.loggedIn === true) {
     label = <App />;
   }
    return (
      <div id="mainpage">
        {label}
      </div>
    );

 }

}


export default Main;