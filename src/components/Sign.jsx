import React, { PropTypes } from "react";

const Sign = props => {

  // const submit = (e) => props.clickHandler;
  
  return (
    <div id="log">
      {/*} <form class="user-form" onSubmit={(e) => submit(e)}> */}
      <form method="post" class="user-form">
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button id="signup" type="submit" onClick={props.clickHandler}>Signup</button>
        <button id="login" type="submit" onClick={props.clickHandler}>Login</button>
      </form>
      <br />
    </div>
  );
};

export default Sign;