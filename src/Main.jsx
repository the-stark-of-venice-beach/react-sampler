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
   console.log("event: ", e.target)
   console.log("e.target.name: ", e.target.name)
    console.log("e: ", e);
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
            this.state.loggedIn = true;
            this.setState(this.state.loggedIn);
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
          console.log("res.data: ", res.data);
          console.log("res.data value ", res.data["?column?"]);
          if (res.data['?column?'] === true) {
            console.log("Setting State to Logged In!");
            this.state.loggedIn = true;
            this.setState(this.state.loggedIn);
          }
        });
    }
  }




 render() {
   console.log("Main this.state.loggedIn: " ,  this.state.loggedIn);
   let label = <Login clickHandler={this.clickHandler}/>;
   if (this.props.loggedIn === true) {
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