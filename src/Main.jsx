import React from "react";
import { render } from "react-dom";

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
    console.log("event: ", e.target)
    if (e.target.id === "signup") {
      console.log("e target id: ", e.target.id)
      axios.post(
        "user",
        {
          username: e.target.username.value,
          password: e.target.password.value
        }).then(res => {
          if (res.data === true) {
            this.state.loggedIn = true;
          }
        })
    }

    if (e.target.id = "login") {
      console.log("e target id: ", e.target.id)
      axios.post(
        "login",
        {
          username: e.target.username.value,
          password: e.target.password.value
        }).then(res => {
          if (res.data === true) {
            this.state.loggedIn = true;
          }
        })
    }
  }




 render() {

   let label = <Login />;
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